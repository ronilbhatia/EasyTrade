json.extract! user, :id, :username, :email
json.buying_power user.calculate_buying_power
json.stocks user.calculate_stocks
