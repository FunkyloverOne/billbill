class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :loans, foreign_key: 'loaner_id', class_name: 'Bill'
  has_many :debts, foreign_key: 'debtor_id', class_name: 'Bill'

  has_many :contactings
  has_many :contacts, through: :contactings
end
