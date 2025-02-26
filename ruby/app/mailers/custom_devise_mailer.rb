class CustomDeviseMailer < Devise::Mailer
  default template_path: 'devise/mailer'

  def reset_password_instructions(record, token, opts = {})
    opts[:subject] = "Reset password instructions"
    frontend_url = ENV['FRONTEND_URL']
    @reset_password_url = "http://#{frontend_url}/forgot-password?token=#{token}"
    devise_mail(record, :reset_password_instructions, opts)
  end
end
