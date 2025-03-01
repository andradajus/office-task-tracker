class Task < ApplicationRecord
  has_many :routinary_task_instances, dependent: :destroy

  validates :date, presence: true
  validates :task_name, presence: true

end
