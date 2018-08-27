nyse_stocks = File.readlines("./companylist.csv")[1..-1]
# puts nyse_stocks;

IO.write('nyse_stocks_string', nyse_stocks)
