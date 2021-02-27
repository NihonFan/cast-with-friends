class CreateEpisodes < ActiveRecord::Migration[6.0]
  def change
    create_table :episodes do |t|
      t.references :podcast, null: false, foreign_key: true
      t.string :LN_audio_URL
      t.string :LN_title
      t.text :LN_description
      t.string :LN_episode_id

      t.timestamps
    end
  end
end
