class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :loans, foreign_key: 'loaner_id', class_name: 'Bill'
  has_many :debts, foreign_key: 'debtor_id', class_name: 'Bill'

  has_many :contactings
  has_many :contacts, through: :contactings

  has_attached_file :avatar,
                    styles: { medium: '300x300>', thumb: '100x100>' },
                    default_url: '/assets/missing.jpg'
  validates_attachment_content_type :avatar, content_type: %r{\Aimage/.*\z/}

  validates :username, presence: true, uniqueness: true
end
