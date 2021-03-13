class AddPausedSecondsToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :paused_seconds, :decimal
  end
end
