class CreateStaff < ActiveRecord::Migration[7.1]
  def change
    create_table :staff do |t|
      t.string :first_name, null: false
      t.string :middle_name
      t.string :last_name, null: false
      t.string :designation, null: false

      t.timestamps
    end
  end
end
