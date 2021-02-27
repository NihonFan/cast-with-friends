class Podcast < ApplicationRecord

  has_many :episodes

  validates :LN_title, presence: true
  validates :LN_podcast_id, presence: true

end
