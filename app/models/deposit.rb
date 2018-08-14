# == Schema Information
#
# Table name: deposits
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer          not null
#  amount     :float            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Deposit < ApplicationRecord
  validates :user_id, presence: true

  belongs_to :user
end
