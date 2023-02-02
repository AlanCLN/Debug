Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :users, only:  [:create, :show, :index, :update]
    resource :session, only: [:create, :destroy]
    resources :confirmation_files, only: [:create]
    resources :replacements, only: [:create, :index, :update, :destroy]
    resources :cards, only: [:create, :index, :update, :destroy]
    resources :settings, only: [:index,:update]
  end
end
