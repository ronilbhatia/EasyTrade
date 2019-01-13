# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ActiveRecord::Base.transaction do 
  User.destroy_all
  Stock.destroy_all
  Exchange.destroy_all
  Deposit.destroy_all
  Transaction.destroy_all


  # Create demo user
  demo_user = User.new({ email: 'user@user.com', username: 'user', password: 'testing' })
  demo_user.save!

  # Build exchanges
  nasdaq = Exchange.create({ name: 'NASDAQ'})
  nyse = Exchange.create({ name: 'NYSE' })

  def grab_stocks(stock_str)
    stock_str.split("\n")
  end

  def grab_tickers(stock_arr)
    stock_arr.map { |stock| stock.split("|")[0] }
  end

  def grab_stock_names(stock_arr)
    stock_arr.map { |stock| stock.split("|")[1].split(" -")[0] }
  end

  def build_stock_objects(stock_string, exchange_id)
    tickers = grab_tickers(grab_stocks(stock_string))
    stocks = grab_stock_names(grab_stocks(stock_string))
    stock_objects = []

    tickers.each_with_index do |ticker, idx|
      stock_objects.push({
        ticker: ticker,
        name: stocks[idx],
        exchange_id: exchange_id
      })
    end

    stock_objects
  end

  nasdaq_stock_string = File.read("#{Rails.root}/db/nasdaq.csv")

  stocks = build_stock_objects(nasdaq_stock_string, nasdaq.id)

  stocks.each do |stock|
    Stock.create(stock)
  end

  nyse_stocks = File.readlines("#{Rails.root}/db/nyse.csv")[1..-1]

  nyse_stocks.map! do |stock|
    stock.split(",")
  end

  nyse_stocks.map! do |stock|
    {
      ticker: stock[0].delete("\""),
      name: stock[1].delete("\""),
      exchange_id: nyse.id
    }
  end

  nyse_stocks.each do |stock|
    Stock.create(stock)
  end

  # Deposit money into demo user account
  Deposit.create({user_id: demo_user.id, amount: 50000})

  # Find stocks for portfolio
  aapl = Stock.find_by(ticker: :AAPL)
  amzn = Stock.find_by(ticker: :AMZN)
  fb = Stock.find_by(ticker: :FB)
  nflx = Stock.find_by(ticker: :NFLX)
  twtr = Stock.find_by(ticker: :TWTR)
  msft = Stock.find_by(ticker: :MSFT)
  sbux = Stock.find_by(ticker: :SBUX)
  amd = Stock.find_by(ticker: :AMD)
  blue = Stock.find_by(ticker: :BLUE)
  gild = Stock.find_by(ticker: :GILD)
  nktr = Stock.find_by(ticker: :NKTR)
  lulu = Stock.find_by(ticker: :LULU)
  stz = Stock.find_by(ticker: :STZ)

  # Generate transactions based on actual close prices for each stock at given date
  Time.zone = 'Eastern Time (US & Canada)'

  Transaction.create([
    {user_id: demo_user.id, stock_id: aapl.id, price: 68.45, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2014, 4, 16, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: amzn.id, price: 305.84, num_shares: 20, order_type: 'buy', transaction_date: Time.zone.local(2014, 12, 10, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: fb.id, price: 92.31, num_shares: 40, order_type: 'buy', transaction_date: Time.zone.local(2015, 9, 14, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: nflx.id, price: 57.99, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2014, 2, 4, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: twtr.id, price: 54.50, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2014, 3, 12, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: msft.id, price: 37.91, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2014, 7, 14, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: sbux.id, price: 37.54, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2014, 12, 17, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: amd.id, price: 2.32, num_shares: 1000, order_type: 'buy', transaction_date: Time.zone.local(2015, 5, 20, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: blue.id, price: 90.34, num_shares: 30, order_type: 'buy', transaction_date: Time.zone.local(2015, 2, 17, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: gild.id, price: 104.48, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2015, 8, 7, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: nktr.id, price: 15.27, num_shares: 100, order_type: 'buy', transaction_date: Time.zone.local(2016, 4, 13, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: lulu.id, price: 51.91, num_shares: 50, order_type: 'buy', transaction_date: Time.zone.local(2015, 10, 12, 16, 0, 0)},
    {user_id: demo_user.id, stock_id: stz.id, price: 152.50, num_shares: 20, order_type: 'buy', transaction_date: Time.zone.local(2017, 2, 9, 16, 0, 0)}
  ])
end

################## OLD ##################

# With stocks starting from 0
# Transaction.create({user_id: 1, stock_id: 6, price: 180.10, num_shares: 10, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# Transaction.create({user_id: 1, stock_id: 2017, price: 95.14, num_shares: 15, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# Transaction.create({user_id: 1, stock_id: 6234, price: 20.43, num_shares: 30, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# Transaction.create({user_id: 1, stock_id: 2102, price: 180.22, num_shares: 7, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# Transaction.create({user_id: 1, stock_id: 384, price: 30.20, num_shares: 6, order_type: 'buy', transaction_date: (500 + (365*rand)).days.ago})
# Transaction.create({user_id: 1, stock_id: 1077, price: 5.10, num_shares: 200, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# Transaction.create({user_id: 1, stock_id: 1076, price: 143.45, num_shares: 5, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# Transaction.create({user_id: 1, stock_id: 175, price: 1540.42, num_shares: 3, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# Transaction.create({user_id: 1, stock_id: 5243, price: 73.68, num_shares: 20, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# Transaction.create({user_id: 1, stock_id: 6, price: 195.42, num_shares: 2, order_type: 'sell', transaction_date: (200*rand).days.ago})
# Transaction.create({user_id: 1, stock_id: 2017, price: 106.67, num_shares: 5, order_type: 'sell', transaction_date: (200*rand).days.ago})
# Transaction.create({user_id: 1, stock_id: 6234, price: 32.43, num_shares: 10, order_type: 'sell', transaction_date: (200*rand).days.ago})
# Transaction.create({user_id: 1, stock_id: 2102, price: 345.22, num_shares: 2, order_type: 'sell', transaction_date: (200*rand).days.ago})
# Transaction.create({user_id: 1, stock_id: 384, price: 155.12, num_shares: 1, order_type: 'sell', transaction_date: (200*rand).days.ago})
# Transaction.create({user_id: 1, stock_id: 1077, price: 2.10, num_shares: 50, order_type: 'sell', transaction_date: (200*rand).days.ago})
# Transaction.create({user_id: 1, stock_id: 1076, price: 174.12, num_shares: 1, order_type: 'sell', transaction_date: (200*rand).days.ago})
# Transaction.create({user_id: 1, stock_id: 5243, price: 68.12, num_shares: 4, order_type: 'sell', transaction_date: (200*rand).days.ago})

# With Local stock ids
# # Transaction.create({user_id: 1, stock_id: 19766, price: 208.10, num_shares: 10, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# # Transaction.create({user_id: 1, stock_id: 21777, price: 109.67, num_shares: 15, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# # Transaction.create({user_id: 1, stock_id: 25994, price: 32.43, num_shares: 30, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# # Transaction.create({user_id: 1, stock_id: 21862, price: 345.22, num_shares: 7, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# # Transaction.create({user_id: 1, stock_id: 20144, price: 155.12, num_shares: 6, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# # Transaction.create({user_id: 1, stock_id: 20837, price: 2.10, num_shares: 200, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# # Transaction.create({user_id: 1, stock_id: 20836, price: 174.12, num_shares: 5, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# # Transaction.create({user_id: 1, stock_id: 19935, price: 1836.72, num_shares: 3, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# # Transaction.create({user_id: 1, stock_id: 25003, price: 68.12, num_shares: 20, order_type: 'buy', transaction_date: (200 + (365*rand)).days.ago})
# # Transaction.create({user_id: 1, stock_id: 19766, price: 208.10, num_shares: 2, order_type: 'sell', transaction_date: (200*rand).days.ago})
# # Transaction.create({user_id: 1, stock_id: 21777, price: 109.67, num_shares: 5, order_type: 'sell', transaction_date: (200*rand).days.ago})
# # Transaction.create({user_id: 1, stock_id: 25994, price: 32.43, num_shares: 10, order_type: 'sell', transaction_date: (200*rand).days.ago})
# # Transaction.create({user_id: 1, stock_id: 21862, price: 345.22, num_shares: 2, order_type: 'sell', transaction_date: (200*rand).days.ago})
# # Transaction.create({user_id: 1, stock_id: 20144, price: 155.12, num_shares: 1, order_type: 'sell', transaction_date: (200*rand).days.ago})
# # Transaction.create({user_id: 1, stock_id: 20837, price: 2.10, num_shares: 50, order_type: 'sell', transaction_date: (200*rand).days.ago})
# # Transaction.create({user_id: 1, stock_id: 20836, price: 174.12, num_shares: 1, order_type: 'sell', transaction_date: (200*rand).days.ago})
# # Transaction.create({user_id: 1, stock_id: 25003, price: 68.12, num_shares: 4, order_type: 'sell', transaction_date: (200*rand).days.ago})
#
# # transactions = Transaction.all
# # transactions.each do |transaction|
# #   if (transaction.order_type == 'buy')
# #     transaction.created_at = ((rand*365) + 200).days.ago
# #   else
# #     transaction.created_at = (rand*200).days.ago
# #   end
# # end
# # Transaction.create({user_id: 1, stock_id: 13251, price: 208.10, num_shares: 10, order_type: 'buy', transaction_date: Time.new(2018, 1, 17)})
# # Transaction.create({user_id: 1, stock_id: 15262, price: 109.67, num_shares: 15, order_type: 'buy', transaction_date: Time.new(2018, 1, 19)})
# # Transaction.create({user_id: 1, stock_id: 19479, price: 32.43, num_shares: 30, order_type: 'buy', transaction_date: Time.new(2018, 2, 12)})
# # Transaction.create({user_id: 1, stock_id: 15347, price: 345.22, num_shares: 7, order_type: 'buy', transaction_date: Time.new(2018, 2, 23)})
# # Transaction.create({user_id: 1, stock_id: 13629, price: 155.12, num_shares: 6, order_type: 'buy', transaction_date: Time.new(2018, 2, 25)})
# # Transaction.create({user_id: 1, stock_id: 14322, price: 2.10, num_shares: 200, order_type: 'buy', transaction_date: Time.new(2018, 3, 15)})
# # Transaction.create({user_id: 1, stock_id: 14321, price: 174.12, num_shares: 5, order_type: 'buy', transaction_date: Time.new(2018, 4, 18)})
# # Transaction.create({user_id: 1, stock_id: 13420, price: 1836.72, num_shares: 3, order_type: 'buy', transaction_date: Time.new(2018, 4, 20)})
# # Transaction.create({user_id: 1, stock_id: 18488, price: 68.12, num_shares: 20, order_type: 'buy', transaction_date: Time.new(2018, 5, 1)})
# # Transaction.create({user_id: 1, stock_id: 13251, price: 208.10, num_shares: 2, order_type: 'sell', transaction_date: Time.new(2018, 3, 1)})
# # Transaction.create({user_id: 1, stock_id: 15262, price: 109.67, num_shares: 5, order_type: 'sell', transaction_date: Time.new(2018, 3, 5)})
# # Transaction.create({user_id: 1, stock_id: 15347, price: 32.43, num_shares: 10, order_type: 'sell', transaction_date: Time.new(2018, 4, 12)})
# # Transaction.create({user_id: 1, stock_id: 19479, price: 345.22, num_shares: 2, order_type: 'sell', transaction_date: Time.new(2018, 5, 15)})
# # Transaction.create({user_id: 1, stock_id: 13629, price: 155.12, num_shares: 1, order_type: 'sell', transaction_date: Time.new(2018, 6, 7)})
# # Transaction.create({user_id: 1, stock_id: 14322, price: 2.10, num_shares: 50, order_type: 'sell', transaction_date: Time.new(2018, 6, 15)})
# # Transaction.create({user_id: 1, stock_id: 14321, price: 174.12, num_shares: 1, order_type: 'sell', transaction_date: Time.new(2018, 7, 1)})
# # Transaction.create({user_id: 1, stock_id: 18488, price: 68.12, num_shares: 4, order_type: 'sell', transaction_date: Time.new(2018, 8, 3)})
