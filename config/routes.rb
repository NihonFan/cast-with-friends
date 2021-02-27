Rails.application.routes.draw do

  devise_for :users
  root to: 'pages#home'
  resources :users, only: [:show, :edit, :update] do
    get "/podcasts/search", to: "podcasts#search", as: "podcasts_search"

    resources :podcasts, only: [:index, :show]
  end

  resources :events, only: [:index, :new, :create, :show] do
    resources :participations, only: [:new, :create]
    resources :bookmarks, only: [:new, :create]
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
