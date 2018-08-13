class ModifyTransactionsTableToAddConstraints < ActiveRecord::Migration[5.2]
  def change
    change_column :transactions, :user_id, :integer, null: false
    change_column :transactions, :stock_id, :integer, null: false
    change_column :transactions, :price, :float, null: false
    change_column :transactions, :num_shares, :integer, null: false
  end
end
