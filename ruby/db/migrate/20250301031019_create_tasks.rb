class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.date :date, null: false
      t.string :task_name, null: false
      t.string :assigned_to
      t.string :assigned_by
      t.date :date_completed
      t.string :completed_by
      t.text :remarks
      t.boolean :is_routinary, default: false

      t.timestamps
    end
  end
end
