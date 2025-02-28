class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_before_action :authenticate_request, only: [:create]

  def create
    build_resource(sign_up_params)
    resource.role = 'student'

    begin
      if resource.save
        if params[:user].present? && params[:user][:profile_photo].present?
          resource.profile_photo.attach(params[:user][:profile_photo])
        end
        render_resource(resource)
      else
        Rails.logger.error(resource.errors.full_messages)
        render_error_response(resource)
      end
    rescue ActiveRecord::RecordNotUnique => e
      if e.message.include?("index_users_on_id_number")
        resource.errors.add(:id_number, "has already been taken")
      else
        resource.errors.add(:base, "An error occurred")
      end
      Rails.logger.error(resource.errors.full_messages)
      render_error_response(resource)
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
      render json: { errors: format_errors(resource.errors) }, status: :unprocessable_entity
    end
  end

  def render_error_response(resource)
    render json: { errors: format_errors(resource.errors) }, status: :unprocessable_entity
  end

  def format_errors(errors)
    errors.messages.transform_values do |messages|
      messages.map { |msg| "#{errors.attribute_names.first.to_s.humanize} #{msg}" }
    end
  end
end
