class Participation < ApplicationRecord
  belongs_to :user
  belongs_to :event

  validates :role, presence: true


end
