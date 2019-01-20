class CreatePortfolioSnapshots < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolio_snapshots do |t|
      t.integer :user_id
      t.date :date
      t.float :balance

      t.timestamps
    end

    add_index :portfolio_snapshots, :user_id
  end
end
