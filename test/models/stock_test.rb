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

require 'test_helper'

class StockTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
