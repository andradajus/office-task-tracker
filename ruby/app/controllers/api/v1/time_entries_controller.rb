class Api::V1::TimeEntriesController < ApplicationController
  def create
    check_for_unchecked_entries

    latest_entry = current_user.time_entries.order(created_at: :desc).first

    if latest_entry&.status == 'time_in'
      time_out_entry = current_user.time_entries.create(date: Date.current, time: Time.current, status: 'time_out')
      render json: { message: 'Checked out successfully', time_entry: time_out_entry }, status: :ok
    else
      time_in_entry = current_user.time_entries.create(date: Date.current, time: Time.current, status: 'time_in')
      render json: { message: 'Checked in successfully', time_entry: time_in_entry }, status: :created
    end
  end

  def index
    month = params[:month] || Date.current.month
    year = params[:year] || Date.current.year

    start_date = Date.new(year.to_i, month.to_i, 1)
    end_date = start_date.end_of_month

    time_entries = current_user.time_entries.where(date: start_date..end_date).order(date: :desc, created_at: :desc)

    total_hours_rendered = calculate_total_hours(time_entries)

    render json: { time_entries: time_entries, total_hours_rendered_this_month: total_hours_rendered }, status: :ok
  end

  private

  def check_for_unchecked_entries
    open_time_entries = current_user.time_entries.where(status: 'time_in').where('date < ?', Date.current)

    open_time_entries.each do |entry|
      entry.update(time: entry.date.end_of_day, status: 'time_out')
    end
  end

  def calculate_total_hours(entries)
    total_seconds = 0
    entries.group_by(&:date).each do |date, daily_entries|
      daily_entries.sort_by!(&:created_at) # Ensure entries are sorted by creation time
      daily_entries.each_slice(2) do |time_in, time_out|
        if time_in.status == 'time_in' && time_out&.status == 'time_out'
          total_seconds += (time_out.time - time_in.time).to_i
        end
      end
    end
    (total_seconds / 3600.0).round(2)
  end
end
