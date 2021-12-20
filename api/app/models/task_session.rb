class TaskSession < ApplicationRecord
  belongs_to :task
  belongs_to :user

  validates :start_time, :end_time, presence: true

  before_save :set_duration

  scope :submitted, -> { joins(:task).merge(Task.submitted) }

  private

  def set_duration
    self.duration = (end_time - start_time)
  end
end
