class Api::V1::OverviewController < ApplicationController
  def index
    today = Date.current

    if current_user.role == 'admin'
      daily_tasks = Task.where(date: today).or(Task.where(is_routinary: true))
      users_with_time_in = User.joins(:time_entries)
                               .where(time_entries: { status: 'time_in', date: today })
                               .distinct
                               .map do |user|
                                 latest_time_entry = user.time_entries
                                                         .where(date: today)
                                                         .order(created_at: :desc)
                                                         .first

                                 if latest_time_entry&.status == 'time_in'
                                   {
                                     id: user.id,
                                     id_number: user.id_number,
                                     email: user.email,
                                     first_name: user.first_name,
                                     middle_name: user.middle_name,
                                     last_name: user.last_name,
                                     birthday: user.birthday,
                                     course: user.course,
                                     contact_number: user.contact_number,
                                     emergency_contact: user.emergency_contact,
                                     emergency_contact_number: user.emergency_contact_number,
                                     role: user.role,
                                     away_remarks: user.away_remarks,
                                     is_available: user.is_available,
                                     profile_photo_path: user.profile_photo.attached? ? Rails.application.routes.url_helpers.rails_blob_path(user.profile_photo, only_path: true) : nil
                                   }
                                 end
                               end.compact

      render json: { daily_tasks: daily_tasks, users_with_time_in: users_with_time_in }, status: :ok
    else
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

      render json: {
        time_entries: time_entries,
        daily_tasks: daily_tasks,
        user: {
          id: current_user.id,
          id_number: current_user.id_number,
          email: current_user.email,
          first_name: current_user.first_name,
          middle_name: current_user.middle_name,
          last_name: current_user.last_name,
          birthday: current_user.birthday,
          course: current_user.course,
          contact_number: current_user.contact_number,
          emergency_contact: current_user.emergency_contact,
          emergency_contact_number: current_user.emergency_contact_number,
          role: current_user.role,
          is_available: current_user.is_available,
          away_remarks: current_user.away_remarks,
          profile_photo_path: current_user.profile_photo.attached? ? Rails.application.routes.url_helpers.rails_blob_path(current_user.profile_photo, only_path: true) : nil
        }
      }, status: :ok
    end
  end
end
