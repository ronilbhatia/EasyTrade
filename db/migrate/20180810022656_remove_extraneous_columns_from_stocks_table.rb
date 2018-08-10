class RemoveExtraneousColumnsFromStocksTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :stocks, :max_shares
    remove_column :stocks, :ceo
    remove_column :stocks, :hq_location
  end
end
