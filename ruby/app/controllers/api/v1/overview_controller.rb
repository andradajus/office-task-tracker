class Api::V1::OverviewController < ApplicationController
  def index
    today = Date.current

    latest_time_in = current_user.time_entries
                                 .where(status: 'time_in', date: today)
                                 .order(created_at: :desc)
                                 .first

    latest_time_out = current_user.time_entries
                                  .where(status: 'time_out', date: today)
                                  .order(created_at: :desc)
                                  .first

    if latest_time_in && latest_time_out && latest_time_out.created_at < latest_time_in.created_at
      latest_time_out = nil
    end

    time_entries = [latest_time_in, latest_time_out].compact

    daily_tasks = Task.where(date: today).or(Task.where(is_routinary: true))

    render json: { time_entries: time_entries, daily_tasks: daily_tasks }, status: :ok
  end
end
