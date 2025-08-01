Rails.application.routes.draw do
  root "static_pages#top"
  get "contact", to: "static_pages#contact"
  get "terms", to: "static_pages#terms"
  get "home", to: "static_pages#home"
  get "login", to: "user_sessions#new"
  post "login", to: "user_sessions#create"
  delete "logout", to: "user_sessions#destroy"


  get "up" => "rails/health#show", as: :rails_health_check

  resources :posts, only: %i[index new create show edit destroy update]
  resources :users, only: %i[new create destroy]
  resource :profile, only: %i[show edit update]
end
