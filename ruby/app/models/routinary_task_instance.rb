class RoutinaryTaskInstance < ApplicationRecord
  belongs_to :task

  validates :date, presence: true
  validates :task_name, presence: true
end
