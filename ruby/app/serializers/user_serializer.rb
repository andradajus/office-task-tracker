class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :middle_name, :last_name, :birthday, :course, :contact_number, :emergency_contact, :emergency_contact_number, :role, :profile_photo_path

  def profile_photo_path
    return unless object.profile_photo.attached?

    Rails.application.routes.url_helpers.rails_blob_path(object.profile_photo, only_path: true)
  end
end
