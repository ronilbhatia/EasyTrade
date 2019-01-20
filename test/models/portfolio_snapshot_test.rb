# == Schema Information
#
# Table name: portfolio_snapshots
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  date       :date             not null
#  balance    :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class PortfolioSnapshotTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
