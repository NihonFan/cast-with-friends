class CreatePodcasts < ActiveRecord::Migration[6.0]
  def change
    create_table :podcasts do |t|
      t.string :LN_title
      t.string :LN_image_URL
      t.text :LN_description
      t.string :LN_podcast_id

      t.timestamps
    end
  end
end
