class TaskSession < ApplicationRecord
  belongs_to :task
  belongs_to :user

  validates :start_time, :end_time, :duration, presence: true

  before_save :set_duration

  private

  def set_duration
    self.duration = (end_time - start_time)
  end
end
