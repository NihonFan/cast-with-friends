class AddSecondsPausedToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :seconds_paused, :decimal
  end
end
