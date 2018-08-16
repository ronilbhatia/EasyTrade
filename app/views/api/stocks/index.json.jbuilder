# @stocks.each do |stock|
#   json.set! stock.id do
#     json.extract! stock, :id, :ticker, :name
#   end
# end

json.array! @stocks do |stock|
  json.ticker stock.ticker
  json.name stock.name
end
