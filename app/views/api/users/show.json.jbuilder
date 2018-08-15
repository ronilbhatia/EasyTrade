json.extract! @user, :id, :username, :email
json.buying_power @user.calculate_buying_power
json.balance @user.calculate_balance
json.stocks @user.calculate_stocks
json.balance_data @user.calculate_balance_data
