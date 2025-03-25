Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  mount ActionCable.server => '/cable'

    namespace :api do
      namespace :v1 do

        get 'health/check', to: 'health#check'
        get 'overview', to: 'overview#index'

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

        resource :user, only: [:show] do
          post 'toggle_availability', on: :collection
          get 'index_students', on: :collection
        end

        resources :tasks, only: [:create, :update, :index, :destroy] do
          collection do
            put ':id/complete_tasks', to: 'tasks#complete_tasks'
          end
        end

        resources :time_entries, only: [:create, :index] do
          collection do
            post :check_for_unchecked_entries
          end
        end

        resources :staffs, only: [:index, :create, :update, :destroy]
    end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  end
end
