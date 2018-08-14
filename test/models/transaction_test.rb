# == Schema Information
#
# Table name: transactions
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  stock_id   :integer          not null
#  price      :float            not null
#  num_shares :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  order_type :string           not null
#

require 'test_helper'

class TransactionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
