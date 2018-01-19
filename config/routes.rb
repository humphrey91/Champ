Rails.application.routes.draw do
  resources :posts, only: [:create, :update, :destroy, :index, :show]
  root "posts#main", as: "/"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
