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
    stocks = {}

    self.transactions.each do |transaction|
      curr_stock = Stock.find(transaction.stock_id)
      if stocks[curr_stock.ticker]
        if transaction.order_type == 'buy'
          stocks[curr_stock.ticker] += transaction.num_shares
        else
          stocks[curr_stock.ticker] -= transaction.num_shares
        end
      else
        if transaction.order_type == 'buy'
          stocks[curr_stock.ticker] = transaction.num_shares
        else
          stocks[curr_stock.ticker] = -transaction.num_shares
        end
      end
    end

    url = 'https://www.alphavantage.co/query?function=BATCH_QUOTES_US&apikey=B46V4AYA6Y9N0447&symbols='
    stocks.each { |k, _| url += "#{k},"}
    stocks = stocks.map { |stock| { symbol: stock[0], shares: stock[1]}}.sort_by { |stock| stock[:symbol] }

    #Credit to user245031 and lolmaus - Andrey Mikhaylov on Stack Overflow for the code to make API call in Ruby
    response = JSON.parse(open(url).read)
    if response['Information']
      sleep(10)
      calculate_stocks
    else
      response = response['Stock Batch Quotes'].sort_by { |stock| stock['1. symbol'] }
    end
    puts stocks
    puts response
    stocks.each_with_index do |stock, idx|
      price = response[idx]['5. price'].to_f.round(2).to_s
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
    net_deposits = self.deposits.to_a.reduce(0) do |acc, deposit|
      acc += deposit.amount
    end
    data = []
    sorted_transactions = transactions.sort_by { |transaction| transaction.transaction_date }.to_a
    # (5.years.ago.to_datetime..sorted_transactions.first.transaction_date.to_datetime).each do |time|
    #   data.push({ time: time, balance: net_deposits })
    # end

    user_transactions = self.transactions
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
      if curr_stocks[curr_stock.ticker]
        if transaction.order_type == 'buy'
          curr_stocks[curr_stock.ticker] += transaction.num_shares
          cash_balance -= transaction.num_shares * transaction.price
        else
          curr_stocks[curr_stock.ticker] -= transaction.num_shares
          cash_balance += transaction.num_shares * transaction.price
        end
      else
        curr_stocks[curr_stock.ticker] = transaction.num_shares
        cash_balance -= transaction.num_shares * transaction.price
      end
      if idx == sorted_transactions.length - 1
        range = transaction.transaction_date.to_datetime..Time.now.to_datetime
      else
        range = transaction.transaction_date.to_datetime..sorted_transactions[idx+1].transaction_date.to_datetime
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
        balance = cash_balance + stock_value
        data.push({ time: time, balance: balance }) unless stock_day_info.nil?
      end
    end

    return data
  end
end
