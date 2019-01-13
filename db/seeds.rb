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
  demo_user.photo.attach(io: File.open("#{Rails.root}/app/assets/images/ronil.jpg"), filename: 'ronil')

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