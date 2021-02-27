class AddEpisodeToEvents < ActiveRecord::Migration[6.0]
  def change
    add_reference :events, :episode, foreign_key: true
  end
end
