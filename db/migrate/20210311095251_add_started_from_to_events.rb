class AddStartedToToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :started_to, :datetime
  end
end
