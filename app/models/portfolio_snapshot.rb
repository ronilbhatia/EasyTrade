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

class PortfolioSnapshot < ApplicationRecord
  validates :date, :balance, presence: true
  validates :date, uniqueness: { scope: :user_id, message: 'Should have at most one portfolio snapshot per date'} 
  
  belongs_to :user  
end
