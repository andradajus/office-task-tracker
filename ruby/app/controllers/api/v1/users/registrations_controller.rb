class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  skip_before_action :authenticate_request, only: [:create]

  def create
    build_resource(sign_up_params)

    if resource.save
      render_resource(resource)
    else
      Rails.logger.error(resource.errors.full_messages)
      render_resource(resource)
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
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
