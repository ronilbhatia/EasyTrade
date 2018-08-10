class ChangeIntegerLimitInStocksTable < ActiveRecord::Migration[5.2]
  def change
    change_column :stocks, :max_shares, :integer, limit: 8
  end
end
