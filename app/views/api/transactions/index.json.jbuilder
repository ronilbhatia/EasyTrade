@transactions.each do |transaction|
  json.set! transaction.id do
    json.extract! transaction, :id, :user_id, :price, :num_shares, :order_type, :transaction_date
    json.stock transaction.stock.ticker
    json.amount transaction.price * transaction.num_shares
  end
end