class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :user_id
      t.integer :stock_id
      t.float :price
      t.integer :num_shares

      t.timestamps
    end

    add_index :transactions, [:user_id, :stock_id]
    add_index :transactions, :stock_id
  end
end
