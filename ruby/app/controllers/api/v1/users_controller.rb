class Api::V1::UsersController < ApplicationController
  def show
    if current_user
      render json: {
        id: current_user.id,
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
        profile_photo_path: current_user.profile_photo.attached? ? Rails.application.routes.url_helpers.rails_blob_path(current_user.profile_photo, only_path: true) : nil
      }, status: :ok
    else
      render json: { error: 'User not found' }, status: :not_found
    end
  end
end
