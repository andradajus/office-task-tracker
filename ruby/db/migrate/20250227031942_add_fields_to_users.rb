class AddFieldsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :id_number, :string
    add_column :users, :first_name, :string
    add_column :users, :middle_name, :string
    add_column :users, :last_name, :string
    add_column :users, :birthday, :date
    add_column :users, :profile_photo, :string
    add_column :users, :course, :string
    add_column :users, :contact_number, :string
    add_column :users, :emergency_contact, :string
    add_column :users, :emergency_contact_number, :string
    add_index :users, :id_number, unique: true
  end
end
