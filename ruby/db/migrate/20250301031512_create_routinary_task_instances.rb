class CreateRoutinaryTaskInstances < ActiveRecord::Migration[7.1]
  def change
    create_table :routinary_task_instances do |t|
      t.references :task, null: false, foreign_key: true
      t.date :date, null: false
      t.string :task_name, null: false
      t.string :assigned_to
      t.string :assigned_by
      t.date :date_completed
      t.string :completed_by
      t.text :remarks

      t.timestamps
    end
  end
end
