class ChangeColumn < ActiveRecord::Migration[6.0]
  def change
    change_column :podcasts, :LN_podcast_id, :string, unique: true
  end
end
