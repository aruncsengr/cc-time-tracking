Rails.application.routes.draw do
  resources :tasks, except: [:destroy]
  resources :users, only: [:show]
end
