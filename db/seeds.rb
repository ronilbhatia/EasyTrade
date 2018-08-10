# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

stocks = [
  {
    name: 'Starbucks',
    ticker: 'SBUX',
    max_shares: 1380000000,
    exchange_id: 1,
    ceo: 'Kevin Johnson',
    hq_location: 'Seattle, Washington'
  },
  {
    name: 'Microsoft',
    ticker: 'MSFT',
    max_shares: 7683198000,
    exchange_id: 1,
    ceo: 'Satya Nadella',
    hq_location: 'Redmond, Washington'
  }
]

exchanges = Exchange.create([{ name: 'NASDAQ'}, { name: 'NYSE' }])
stocks.each do |stock|
  Stock.create({
    name: stock[:name],
    ticker: stock[:ticker],
    max_shares: stock[:max_shares],
    exchange_id: stock[:exchange_id],
    ceo: stock[:ceo],
    hq_location: stock[:hq_location]
  })
end
