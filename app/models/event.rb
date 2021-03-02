class Event < ApplicationRecord
  belongs_to :user
  belongs_to :episode
  has_many :bookmarks
  has_many :participations, :dependent => :delete_all

  validates :title, presence: true
  validates :description, presence: true
  validates :date, presence: true


end
