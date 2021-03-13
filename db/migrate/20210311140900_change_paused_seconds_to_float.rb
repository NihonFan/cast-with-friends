class ChangePausedSecondsToFloat < ActiveRecord::Migration[6.0]
  def change
    change_column :events, :paused_seconds, :float
  end
end
