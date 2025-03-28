class Api::V1::UsersController < ApplicationController
  def show
    if current_user
      render json: {
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
      }, status: :ok
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  def toggle_availability
    if current_user
      if current_user.is_available
        current_user.update(is_available: false, away_remarks: params[:away_remarks])
      else
        current_user.update(is_available: true, away_remarks: nil)
      end

      users_with_time_in = User.joins(:time_entries)
                               .where(time_entries: { status: 'time_in', date: Date.current })
                               .distinct
                               .map do |user|
                                 latest_time_entry = user.time_entries
                                                         .where(date: Date.current)
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

      ActionCable.server.broadcast "overview_channel", { users_with_time_in: users_with_time_in }

      render json: { is_available: current_user.is_available, away_remarks: current_user.away_remarks }, status: :ok
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end

  def index_students
    students = User.where(role: 'student').map do |user|
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
        is_available: user.is_available,
        away_remarks: user.away_remarks,
        profile_photo_path: user.profile_photo.attached? ? Rails.application.routes.url_helpers.rails_blob_path(user.profile_photo, only_path: true) : nil
      }
    end
    render json: students, status: :ok
  end
end
