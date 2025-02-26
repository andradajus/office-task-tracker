Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

    namespace :api do
      namespace :v1 do
        get 'health/check', to: 'health#check'

        devise_for :users, path: '', path_names: {
          sign_in: 'login',
          sign_out: 'logout',
          sign_up: '',
          registration: 'signup',
          password: 'password'
        },
        controllers: {
          sessions: 'api/v1/users/sessions',
          registrations: 'api/v1/users/registrations',
          passwords: 'api/v1/users/passwords',
          confirmations: 'api/v1/users/confirmations'
        }
    end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  end
end
