class AddIsCompletedToTasksAndRoutinaryTaskInstances < ActiveRecord::Migration[7.1]
  def change
    add_column :tasks, :is_completed, :boolean, default: false
    add_column :routinary_task_instances, :is_completed, :boolean, default: false
  end
end
