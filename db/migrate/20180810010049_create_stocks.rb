class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :name, null: false
      t.string :ticker, null: false
      t.integer :max_shares, null: false
      t.integer :exchange_id, null: false
      t.string :ceo
      t.string :hq_location

      t.timestamps
    end

    add_index :stocks, :exchange_id
    add_index :stocks, :ticker, unique: true
  end
end
