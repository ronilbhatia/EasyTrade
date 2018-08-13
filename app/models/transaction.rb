class Transaction < ApplicationRecord
  validates :user_id, :stock_id, :price, :num_shares, null: false

  belongs_to :user
  belongs_to :stock
end
