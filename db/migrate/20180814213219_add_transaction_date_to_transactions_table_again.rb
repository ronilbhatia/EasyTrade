class AddTransactionDateToTransactionsTableAgain < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :transaction_date, :datetime
  end
end
