require 'rails_helper'

RSpec.describe CreateDebt do
  logger = Rails.logger

  if User.count < 2
    emails = %w(funky@gmail.com lenni@gmail.com)
    usernames = %w(funky lenni)
    emails.each_with_index do |email, i|
      u = User.new(email: email, username: usernames[i], password: '12345678')
      u.skip_confirmation!
      u.save
    end
  end

  describe '#perform' do
    input = {
      debtor: User.find_by(username: 'funky'),
      loaner: 'lenni@gmail.com',
      title: 'djoghurt',
      amount: 4
    }
    subject(:use_case) { CreateDebt.perform(input) }

    it 'creates a bill record' do
      expect { use_case }.to change { Bill.count }.by 1
    end

    it 'is successful' do
      logger.debug(use_case.errors.inspect)
      expect(use_case.success?).to be true
    end
  end
end
