class Contacting < ApplicationRecord
  self.primary_keys = :user_id, :contact_id
  belongs_to :user
  belongs_to :contact, class_name: 'User'
end
