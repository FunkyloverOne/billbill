class CreateDebt
  include UseCase

  def initialize(input)
    @loaner = input[:loaner]
    @title = input[:title]
    @amount = input[:amount]
    @debtor = input[:debtor]
    @split = input[:split] || false
    @status = input[:status] || 1
    @created_bills = []
  end

  def perform
    validate_input
    return if errors.any?
    fetch_loaner
    create_bills
  end

  attr_reader :created_bills

  private

  attr_reader :loaner, :title, :amount, :debtor, :fetched_loaner, :split,
              :status

  STATUSES = Bill.statuses.freeze

  def validate_input
    errors.add(:debtor, 'debtor should be a User') unless debtor.is_a?(User)
    errors.add(:loaner, 'loaner should be an email string') unless loaner.is_a?(String)
    return if STATUSES.keys.include?(status) || STATUSES.values.include?(status)
    errors.add(:status, "status should be in #{STATUSES.keys} or #{STATUSES.values} respectively")
  end

  def fetch_loaner
    # NOTE: maybe we should receive just an ids here?..
    @fetched_loaner = User.find_by(email: loaner)
    return if @fetched_loaner
    # TODO: invite user here
  end

  def create_bills
    @created_bills << Bill.create(
      loaner: fetched_loaner,
      debtor: debtor,
      debt: split ? (amount / 2.0).round(2) : amount.round(2),
      status: status,
      title: title
    )
  end
end
