Rails.application.routes.draw do
  devise_for :users
  get 'hello_world', to: 'hello_world#index'
  root 'home#index'
  resources :bills, only: [] do
    collection do
      post 'create_loan'
      post 'create_debt'
    end
  end
end
