class AddParticipantListToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :participant_list, :text, array: true, default: []
  end
end
