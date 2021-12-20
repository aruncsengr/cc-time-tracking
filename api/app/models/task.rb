class Task < ApplicationRecord
  attr_accessor :start_time, :end_time

  belongs_to :user
  has_many :task_sessions

  validates :answer, presence: true, if: :submitted?

  after_save :create_task_session

  scope :submitted, -> { where(submitted: true) }

  private

  def create_task_session
    task_sessions.create!(
      user_id: user_id,
      start_time: start_time,
      end_time: end_time
    )
  end
end
