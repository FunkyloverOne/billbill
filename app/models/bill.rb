class Bill < ApplicationRecord
  belongs_to :loaner, class_name: 'User'
  belongs_to :debtor, class_name: 'User'

  enum status: [:new_bill, :open_bill, :declined, :pending, :paid, :reopen]
end
