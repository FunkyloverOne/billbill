require 'rails_helper'

RSpec.describe CreateLoans do
  logger = Rails.logger

  if User.count < 3
    emails = %w(funky@gmail.com lenni@gmail.com yura@gmail.com)
    usernames = %w(funky lenni yura)
    emails.each_with_index do |email, i|
      u = User.new(email: email, username: usernames[i], password: '12345678')
      u.skip_confirmation!
      u.save
    end
  end

  describe '#perform' do
    input = {
      loaner: User.find_by(username: 'funky'),
      debtors: [{email: 'lenni@gmail.com'}, {email: 'yura@gmail.com'}],
      title: 'djoghurt',
      amount: 4
    }
    subject(:use_case) { CreateLoans.perform(input) }

    it 'creates a bill records' do
      expect { use_case }.to change { Bill.count }.by 2
    end

    it 'is successful' do
      logger.debug(use_case.errors.inspect)
      expect(use_case.success?).to be true
    end
  end
end
