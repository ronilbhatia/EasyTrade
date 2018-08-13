class CreateDeposits < ActiveRecord::Migration[5.2]
  def change
    create_table :deposits do |t|
      t.integer :user_id, null: false
      t.float :amount, null: false

      t.timestamps
    end
    add_index :deposits, :user_id
  end
end
