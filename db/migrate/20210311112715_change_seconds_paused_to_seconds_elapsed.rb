class ChangeSecondsPausedToSecondsElapsed < ActiveRecord::Migration[6.0]
  def change
    rename_column :events, :seconds_paused, :seconds_elapsed
  end
end
