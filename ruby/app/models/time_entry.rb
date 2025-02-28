class TimeEntry < ApplicationRecord
  belongs_to :user

  validates :date, presence: true
  validates :time, presence: true
  validates :status, presence: true, inclusion: { in: %w[time_in time_out] }
end
