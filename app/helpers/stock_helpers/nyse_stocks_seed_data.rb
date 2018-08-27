nyse_stocks = File.readlines("./companylist.csv")[1..-1]
nyse_stocks.delete("\"")
nyse_stocks.map! do |stock|
  stock.split(",")
end

nyse_stocks.map! do |stock|
  {
    ticker: stock[0].delete("\""),
    name: stock[1].delete("\""),
    ticker2: "DDD"
  }
end
puts nyse_stocks[0][:name]
