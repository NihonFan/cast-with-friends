class AddStartedFromToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :started_from, :datetime
  end
end
