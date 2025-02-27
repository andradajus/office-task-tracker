class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_before_action :authenticate_request, only: [:create]

  def create
    build_resource(sign_up_params)
    resource.role = 'student'

    if resource.save
      if params[:user].present? && params[:user][:profile_photo].present?
        resource.profile_photo.attach(params[:user][:profile_photo])
      end
      render_resource(resource)
    else
      Rails.logger.error(resource.errors.full_messages)
      render_resource(resource)
    end
  end

  private

  def sign_up_params
    params.permit(:email, :password, :password_confirmation, :id_number, :first_name, :middle_name, :last_name, :birthday, :profile_photo, :course, :contact_number, :emergency_contact, :emergency_contact_number)
  end

  def render_resource(resource)
    if resource.errors.empty?
      render json: {
        status: 'success',
        user: {
          email: resource.email,
          created_at: resource.created_at,
        }
      }, status: :created
    else
      render json: resource.errors, status: :unprocessable_entity
    end
  end
end
