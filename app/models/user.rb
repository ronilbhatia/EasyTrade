# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'open-uri'

class User < ApplicationRecord
  validates :username, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :transactions
  has_many :deposits

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    return nil unless @user
    @user.is_password?(password) ? @user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def shares_owned(stock_id)
    transactions.where(stock_id: stock_id).reduce(0) do |shares, transaction|
      if transaction.order_type == 'buy'
        shares + transaction.num_shares
      else
        shares - transaction.num_shares
      end
    end
  end

  def calculate_buying_power
    buying_power = 0
    self.deposits.each { |deposit| buying_power += deposit.amount }

    self.transactions.each do |transaction|
      transaction_amount = transaction.price * transaction.num_shares
      if transaction.order_type == 'buy'
        buying_power -= transaction_amount
      else
        buying_power += transaction_amount
      end
    end

    buying_power.round(2)
  end

  def calculate_stocks
    stocks = Hash.new(0)
    return stocks if transactions.empty?

    self.transactions.each do |transaction|
      curr_stock = Stock.find(transaction.stock_id)
      if transaction.order_type == 'buy'
        stocks[curr_stock.ticker] += transaction.num_shares
      else
        stocks[curr_stock.ticker] -= transaction.num_shares
      end
    end

    url = 'https://api.iextrading.com/1.0/stock/market/batch?types=quote&range=1d&last=5&symbols='
    stocks.each { |k, _| url += "#{k},"}
    stocks = stocks.map { |stock| { symbol: stock[0], shares: stock[1]}}.sort_by { |stock| stock[:symbol] }

    #Credit to user245031 and lolmaus - Andrey Mikhaylov on Stack Overflow for the code to make API call in Ruby
    response = JSON.parse(open(url).read)
    stocks.each_with_index do |stock, idx|
      price = response[stock[:symbol]]['quote']['latestPrice'].to_f.round(2).to_s
      if !price.include?('.')
        price += '.00'
      elsif price.split('.')[1].length == 1
        price += '0'
      end
      stock[:price] = price
    end
    return stocks
  end

  def calculate_balance
    stocks = calculate_stocks
    balance = calculate_buying_power
    stocks.each do |stock|
      balance += (stock[:price].to_f * stock[:shares])
    end

    return balance.round(2)
  end

  def calculate_balance_data
    net_deposits = self.deposits.to_a.reduce(0) { |acc, deposit| acc += deposit.amount }
    data = []
    return data if transactions.empty?

    sorted_transactions = transactions.sort_by { |transaction| transaction.transaction_date }.to_a
    unique_stocks = transactions.select(:stock_id).distinct.to_a
    unique_stocks.map! { |transaction| Stock.find(transaction.stock_id) }

    range = ((Time.now - sorted_transactions.first.transaction_date.to_time)/(60*60*24*365)).ceil
    url = "https://api.iextrading.com/1.0/stock/market/batch?types=quote,news,chart&range=#{range}y&last=5&symbols="
    unique_stocks.each { |stock| url += "#{stock.ticker}, " }
    response = JSON.parse(open(url).read)
    cash_balance = net_deposits
    curr_stocks = Hash.new(0)

    sorted_transactions.each_with_index do |transaction, idx|
      curr_stock = Stock.find(transaction.stock_id)
      transaction_amount = transaction.num_shares * transaction.price

      if transaction.order_type == 'buy'
        curr_stocks[curr_stock.ticker] += transaction.num_shares
        cash_balance -= transaction_amount
      else
        curr_stocks[curr_stock.ticker] -= transaction.num_shares
        cash_balance += transaction_amount
      end

      if idx == sorted_transactions.length - 1
        range = transaction.transaction_date.to_datetime..Time.now.to_datetime
      else
        transaction_datetime = transaction.transaction_date.to_datetime
        next_transaction_datetime = sorted_transactions[idx+1].transaction_date.to_datetime
        range = transaction_datetime..next_transaction_datetime
        next if transaction_datetime.year == next_transaction_datetime.year && transaction_datetime.month == next_transaction_datetime.month && transaction_datetime.day == next_transaction_datetime.day
      end
      stock_value = 0
      range.each do |time|
        stock_value = 0
        year = time.year.to_s
        month = time.month < 10 ? '0' + time.month.to_s : time.month.to_s
        day = time.day < 10 ? '0' + time.day.to_s : time.day.to_s
        date_string = "#{year}-#{month}-#{day}"
        stock_day_info = nil
        curr_stocks.each do |k, v|
          stock_day_info = response[k]['chart'].find { |days| days['date'] == date_string}
          stock_value += stock_day_info['close'] * v unless stock_day_info.nil?
        end
        formattedTime = "#{time.month}/#{time.day}/#{time.year}"
        balance = cash_balance + stock_value
        data.push({ time: formattedTime, balance: balance.round(2) }) unless stock_day_info.nil?
      end
    end

    return data
  end

  def increment_time(time)
    time_nums = time.split(':').map(&:to_i)
    time_nums[-1] = (time_nums.last + 1) % 60
    time_nums[0] += 1 if time_nums.last == 0
    hour = time_nums.first < 10 ? "0#{time_nums.first}" : time_nums.first.to_s
    minute = time_nums.last < 10 ? "0#{time_nums.last}" : time_nums.last.to_s

    "#{hour}:#{minute}"
  end

  def calculate_daily_data
    ## Get total amount user has ever deposited
    net_deposits = self.deposits.to_a.reduce(0) do |acc, deposit|
      acc += deposit.amount
    end

    data = []
    return data if transactions.empty?

    # Grab transactions from earliest to most recent to iterate through in order
    sorted_transactions = transactions.sort_by { |transaction| transaction.transaction_date }.to_a

    # Grab unique stocks from transactions to get user's portfolio
    unique_stocks = transactions.select(:stock_id).distinct.to_a
    unique_stocks.map! { |transaction| Stock.find(transaction.stock_id) }

    # Dynamically generate API url based on stocks owned by user and make batch request to IEX
    url = "https://api.iextrading.com/1.0/stock/market/batch?types=quote,news,chart&range=1d&last=5&symbols="
    unique_stocks.each { |stock| url += "#{stock.ticker}, " }
    response = JSON.parse(open(url).read)

    times = ['09:30', '09:35', '09:40', '09:45', '09:50', '09:55', '10:00', '10:05', '10:10', '10:15', '10:20', '10:25', '10:30', '10:35', '10:40', '10:45', '10:50', '10:55', '11:00', '11:05', '11:10', '11:15', '11:20', '11:25', '11:30', '11:35', '11:40', '11:45', '11:50', '11:55', '12:00', '12:05', '12:10', '12:15', '12:20', '12:25', '12:30', '12:35', '12:40', '12:45', '12:50', '12:55', '13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55', '14:00', '14:05', '14:10', '14:15', '14:20', '14:25', '14:30', '14:35', '14:40', '14:45', '14:50', '14:55', '15:00', '15:05', '15:10', '15:15:', '15:20', '15:25', '15:30', '15:35', '15:40', '15:45', '15:50', '15:55', '16:00']

    open_balance = net_deposits
    curr_stocks = Hash.new(0)
    transaction_index = sorted_transactions.length

    ## Iterate through all transactions previous to the current day to get closing balance of previous day
    sorted_transactions.each_with_index do |transaction, idx|
      curr_stock = Stock.find(transaction.stock_id)

      if transaction.transaction_date.year >= Time.now.year && transaction.transaction_date.month >= Time.now.month && transaction.transaction_date.day >= Time.now.day
        transaction_index = idx
        break
      end

      if transaction.order_type == 'buy'
        curr_stocks[curr_stock.ticker] += transaction.num_shares
        open_balance -= transaction.num_shares * transaction.price
      else
        curr_stocks[curr_stock.ticker] -= transaction.num_shares
        open_balance += transaction.num_shares * transaction.price
      end
    end

    prev_balance = open_balance
    curr_bal_pushed = false

    # iterate through times and add data points as necessary
    times.each do |time|
      timeObject = Time.new(Time.now.year, Time.now.month, Time.now.day, time.split(':')[0].to_i + 4, time.split(':')[1], 0, "+00:00")

      ## if time we are iterating over is within 20 mins of current time, push in current balance the first time and nil every time after (IEX API has 15 minute delay)
      if timeObject > Time.now.getgm - 1200
        unless curr_bal_pushed
          data.push({ time: "#{time} ET", balance: calculate_balance })
          curr_bal_pushed = true
          next
        else
          data.push({ time: "#{time} ET", balance: nil })
          next
        end
      end


      if transaction_index < sorted_transactions.length
        if timeObject > sorted_transactions[transaction_index].transaction_date
          transaction = sorted_transactions[transaction_index]
          curr_stock = Stock.find(transaction.stock_id)

          if transaction.order_type == 'buy'
            curr_stocks[curr_stock.ticker] += transaction.num_shares
            open_balance -= transaction.num_shares * transaction.price
          else
            curr_stocks[curr_stock.ticker] -= transaction.num_shares
            open_balance += transaction.num_shares * transaction.price
          end

          transaction_index += 1
        end
      end

      stock_value = 0
      stock_day_info = nil
      if response.all? { |k, _| response[k]['chart'].empty? }
        return []
      end

      curr_stocks.each do |k, v|
        search_time = time == '16:00' ? '15:59' : time
        stock_day_info = response[k]['chart'].find { |times| times['minute'] == search_time}
        if stock_day_info && stock_day_info['marketOpen']
          stock_value += stock_day_info['marketOpen'] * v unless stock_day_info.nil?
        end

        until stock_day_info && stock_day_info['marketOpen']
          search_time = increment_time(search_time)
          stock_day_info = response[k]['chart'].find { |times| times['minute'] == search_time}
          stock_value += stock_day_info['marketOpen'] * v unless stock_day_info.nil? || !stock_day_info['marketOpen']
        end
      end

      balance = open_balance

      if stock_value == 0
        balance = prev_balance
      else
        balance = open_balance + stock_value
        prev_balance = balance
      end

      data.push({ time: "#{time} ET", balance: balance.round(2) }) unless stock_day_info.nil?
    end

    data
  end
end
