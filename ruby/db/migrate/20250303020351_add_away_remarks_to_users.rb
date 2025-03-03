class AddAwayRemarksToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :away_remarks, :string
  end
end
