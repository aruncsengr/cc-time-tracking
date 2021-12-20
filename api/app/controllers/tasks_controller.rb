class TasksController < ApplicationController
  def index
    tasks = Task.all
    render json: { success: true, data: tasks }, status: 200
  end

  def show
    task = Task.find(task_id)
    return render(json: { success: false, errors: 'Task not found' }) \
      if task.nil?

    response_data = build_data_with_stats(task)
    render json: { success: true, data: response_data }, status: 200
  end

  def update
    task = Task.find(task_id)

    if task.submitted?
      return render(
        json: { success: false, errors: 'Task already submitted' },
        status: 403
      )
    end

    success = task.update(task_params)
    response_data = build_data_with_stats(task)
    return render(
      json: {
        success: success,
        errors: task.errors,
        data: response_data
      },
      status: success ? 200 : 422
    )
  end

private

  def task_params
    params.require(:task).permit(
      :submitted,
      :answer,
      :start_time,
      :end_time
    )
  end

  def task_id
    params[:id]
  end

  def build_data_with_stats(task)
    data = task.attributes
    data[:statistics] = StatisticalService.new(task).task_statistics_specific
    data
  end
end
