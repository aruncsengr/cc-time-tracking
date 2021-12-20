class StatisticalService
  METRIC_UNIT = "seconds".freeze

  attr_reader :obj

  def initialize(obj)
    @obj = obj
  end

  def task_statistics_specific
    collection = obj.task_sessions.submitted
    collection.empty? ? {} : compute_statistics(collection)
  end

  def task_statistics_overall
    collection = obj.task_sessions
    stats = compute_statistics(collection)
    stats[:average_duration_to_submit] = collection.submitted.average(:duration).round(2)
    stats
  end

  private

  def compute_statistics(collection)
    arel_table = TaskSession.arel_table
    stats = collection.pluck(
      arel_table[:duration].sum,
      arel_table[:duration].average,
      arel_table[:id].count
    ).first

    stats_with_units(stats)
  end

  def stats_with_units(stats)
    total_duration, average_duration, session_count = stats

    {
      total_duration: total_duration,
      average_duration: average_duration.round(2),
      session_count: session_count,
      metric_unit: METRIC_UNIT
    }
  end
end
