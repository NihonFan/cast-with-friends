Rails.application.routes.draw do
  get 'bookmarks/new'
  get 'bookmarks/create'
  get 'participations/new'
  get 'participations/create'
  get 'events/index'
  get 'events/show'
  get 'events/new'
  get 'events/create'
  get 'users/show'
  get 'users/edit'
  get 'users/update'
  devise_for :users
  root to: 'pages#home'
  resources :users, only: [:show, :edit, :update]
  resources :events, only: [:index, :new, :create, :show] do
    resources :participations, only: [:new, :create]
    resources :bookmarks, only: [:new, :create]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
