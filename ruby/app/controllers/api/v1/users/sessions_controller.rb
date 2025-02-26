class Api::V1::Users::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :authenticate_request, only: [:create]

  def create
    user = User.find_by_email(sign_in_params[:email])

    if user&.valid_password?(sign_in_params[:password])
      # Commenting out the confirmation check
      # if user.confirmed?
        render json: { token: user.generate_jwt }
      # else
      #   render json: { errors: { 'email' => ['is not confirmed'] } }, status: :unprocessable_entity
      # end
    else
      render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
    end
  end

  private

  def sign_in_params
    params.require(:user).permit(:email, :password)
  end

  def respond_with(resource, _opts = {})
    render json: { status: :ok, user: resource }
  end

  def respond_to_on_destroy
    head :no_content
  end

  def set_flash_message(_key, _kind, _options = {})
  end

  def require_no_authentication
  end
end
