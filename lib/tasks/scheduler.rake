desc "This task is called by the Heroku scheduler add-on"
task :add_portfolio_snapshots_for_day => :environment do
  puts "Adding day's portfolio snapshots..."

  # Grab today's date, skip if day is on weekend (markets are closed). Using 'next'
  # because you can't return in rake tasks
  date = Date.today
  next if date.on_weekend?
  
  # Grab all users
  users = User.all

  # Add day's snapshot for each user
  users.each do |user| 
    balance = user.calculate_balance
    PortfolioSnapshot.create({ date: date, balance: balance, user_id: user.id })
  end
  
  puts "done."
end