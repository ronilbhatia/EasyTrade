class ChangeNameOfTypeColumnInTransactionsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :type
    add_column :transactions, :order_type, :string, null: false
  end
end
