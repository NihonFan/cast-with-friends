class ChangeSomeName < ActiveRecord::Migration[6.0]
  def change
    rename_column :events, :started_from, :started_at
  end
end
