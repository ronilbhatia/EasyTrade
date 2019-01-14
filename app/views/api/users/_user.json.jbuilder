json.extract! user, :id, :username, :email
json.image_url url_for(user.photo)
json.buying_power user.calculate_buying_power
json.balance user.calculate_balance
json.stocks user.calculate_stocks
json.balance_data user.calculate_balance_data(1)
json.daily_data user.calculate_daily_data
