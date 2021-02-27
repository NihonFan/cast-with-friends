class Episode < ApplicationRecord
  belongs_to :podcast

  has_many :events

  validates :title, presence: true
  validates :LN_audio_URL, presence: true
  validates :LN_episode_id, presence: true

end
