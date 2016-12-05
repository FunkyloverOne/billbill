class CreateLoans
  include UseCase

  def initialize(input)
    @loaner = input[:loaner]
    @title = input[:title]
    @amount = input[:amount]
    @debtors = input[:debtors]
    @split_mode = input[:split_mode] || 'duplicate'
    @status = input[:status] || 0
    @created_bills = []
  end

  def perform
    validate_input
    return if errors.any?
    fetch_debtors
    create_bills
  end

  attr_reader :created_bills

  private

  attr_reader :loaner, :title, :amount, :debtors, :fetched_debtors, :split_mode,
              :status

  SPLIT_MODES = %w(split_by_all split_by_debtors duplicate).freeze
  STATUSES = Bill.statuses.freeze

  def validate_input
    errors.add(:loaner, 'loaner should be a User') unless loaner.is_a?(User)
    unless debtors.is_a?(Array)
      errors.add(:debtors, 'debtors should be an array')
    end
    unless STATUSES.keys.include?(status) || STATUSES.values.include?(status)
      errors.add(:status, "status should be in #{STATUSES.keys} or #{STATUSES.values} respectively")
    end
    return if SPLIT_MODES.include?(split_mode)
    errors.add(:split_mode, "split_mode should be in #{SPLIT_MODES}")
  end

  def fetch_debtors
    @fetched_debtors = []
    debtors.each do |d|
      user = User.find_by(email: d[:email])
      unless user
        # TODO: invite user here
      end
      @fetched_debtors << user
    end
  end

  def create_bills
    final_amount =
      case split_mode
      when 'split_by_all' then (amount / (fetched_debtors.size + 1.0)).round(2)
      when 'split_by_debtors' then (amount / fetched_debtors.size.to_f).round(2)
      when 'duplicate' then amount.round(2)
      end
    fetched_debtors.each do |d|
      @created_bills << Bill.create(
        loaner: loaner,
        debtor: d,
        debt: final_amount,
        status: status,
        title: title
      )
    end
  end
end
