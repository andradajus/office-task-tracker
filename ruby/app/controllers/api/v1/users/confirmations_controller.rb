class Api::V1::Users::ConfirmationsController < Devise::ConfirmationsController
  respond_to :json
  skip_before_action :authenticate_request

  def show
    self.resource = resource_class.confirm_by_token(params[:confirmation_token])
    if resource.errors.empty?
      redirect_to "#{ENV['FRONTEND_BASE_URL']}confirmation-success", allow_other_host: true
    else
      redirect_to "#{ENV['FRONTEND_BASE_URL']}confirmation-failure?error=#{resource.errors.full_messages.to_sentence}", allow_other_host: true
    end
  end
end
