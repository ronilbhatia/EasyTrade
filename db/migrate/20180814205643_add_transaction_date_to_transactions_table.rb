class AddTransactionDateToTransactionsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :transaction_date, :datetime, null: false
  end
end
