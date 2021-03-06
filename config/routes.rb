Rails.application.routes.draw do

  devise_for :users
  root to: 'pages#home'
  resources :users, only: [:show, :edit, :update] do

  end

  get "/podcasts/search", to: "podcasts#search", as: "podcasts_search"
  resources :podcasts, only: [:index, :show]

  resources :episodes, only: [:show] do
    resources :events, only: [:new, :create]
  end

  post '/events/:id/plays', to: 'events#plays', as: 'plays'
  post '/events/:id/pauses', to: 'events#pauses', as: 'pauses'

  resources :events, only: [:index, :show] do
    resources :participations, only: [:new, :create]
    resources :bookmarks, only: [:new, :create]
  end


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
