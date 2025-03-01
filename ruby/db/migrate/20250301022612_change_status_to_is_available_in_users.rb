class ChangeStatusToIsAvailableInUsers < ActiveRecord::Migration[7.1]
  def change
    remove_column :users, :status, :string
    add_column :users, :is_available, :boolean, default: true
  end
end
