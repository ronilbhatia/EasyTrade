class AddPresenceValidationsToPortfolioSnapshots < ActiveRecord::Migration[5.2]
  def change
    change_column :portfolio_snapshots, :user_id, :integer, null: false
    change_column :portfolio_snapshots, :date, :date, null: false
    change_column :portfolio_snapshots, :balance, :float, null: false
  end
end
