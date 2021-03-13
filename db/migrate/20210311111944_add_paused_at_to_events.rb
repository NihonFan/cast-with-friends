class AddPausedAtToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :paused_at, :datetime
  end
end
