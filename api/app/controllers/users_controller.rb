class UsersController < ApplicationController
  def show
    user = User.find(user_id)
    return render(json: { success: false, errors: 'User not found' }) if user.nil?

    response_data = build_data_with_stats(user)
    render json: { success: true, data: response_data }, status: 200
  end

  private

  def user_id
    params[:id]
  end

  def build_data_with_stats(user)
    data = task.attributes
    data[:statistics] = StatisticalService.new(user).task_statistics_overall
    data
  end
end
