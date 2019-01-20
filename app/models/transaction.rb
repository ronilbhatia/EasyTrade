# == Schema Information
#
# Table name: transactions
#
#  id               :bigint(8)        not null, primary key
#  user_id          :integer          not null
#  stock_id         :integer          not null
#  price            :float            not null
#  num_shares       :integer          not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  order_type       :string           not null
#  transaction_date :datetime
#

class Transaction < ApplicationRecord
  validates :user_id, :stock_id, :price, :num_shares, :order_type, presence: true

  belongs_to :user
  belongs_to :stock
end
