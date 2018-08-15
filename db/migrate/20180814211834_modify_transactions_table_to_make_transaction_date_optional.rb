class ModifyTransactionsTableToMakeTransactionDateOptional < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :transaction_date, :datetime
    add_column :transactions, :transaction_date, :datetime
  end
end
