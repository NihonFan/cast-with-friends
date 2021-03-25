class Event < ApplicationRecord
  belongs_to :user
  belongs_to :episode
  has_many :bookmarks
  has_many :participations, :dependent => :delete_all
  has_many :participants, class_name: 'User', through: :participations, source: :user

  validates :title, presence: true
  validates :description, presence: true
  validates :date, presence: true

  include PgSearch::Model
  pg_search_scope :search_by_title_and_description,
    against: [ :title, :description ],
    using: {
      tsearch: { prefix: true }
    }


  def elapsed_seconds
    if self.state != "unplayed"
      Time.now - (started_at) - (paused_seconds || 0)
      # Time.now - (started_at || Time.now) - (paused_seconds || 0)
    else
      0
    end
  end

  def participant_list_names
    name_array = []
    self.participant_list.each do |id|
      name_array << User.find(id).username
    end
    return name_array
  end

end
