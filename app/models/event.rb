class Event < ApplicationRecord
  belongs_to :user
  belongs_to :episode
  has_many :bookmarks
  has_many :participations, :dependent => :delete_all
  has_many :participants, class_name: 'User', through: :participations, source: :user

  validates :title, presence: true
  validates :description, presence: true
  validates :date, presence: true


end
