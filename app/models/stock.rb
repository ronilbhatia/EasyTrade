# == Schema Information
#
# Table name: stocks
#
#  id          :bigint(8)        not null, primary key
#  name        :string           not null
#  ticker      :string           not null
#  exchange_id :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Stock < ApplicationRecord
  validates :name, :ticker, :exchange_id, presence: true
  validates :ticker, uniqueness: true

  has_many :transactions
end
