class BillsController < ApplicationController
  def create_loan
    use_case = CreateLoans.perform(
      loaner: current_user,
      title: params[:title],
      amount: params[:amount],
      debtors: params[:debtors]
    )
    return head(:bad_request) unless use_case.success?
    render json: bills_as_loans(use_case.created_bills)
  end

  private

  def bills_as_loans(bills)
    bills.map do |b|
      {
        title: b.title,
        amount: b.debt,
        user: {
          avatarUrl: b.debtor.avatar.url(:thumb),
          fullName: b.debtor.full_name
        }
      }
    end
  end

  def bills_as_debts(bills)
    bills.map do |b|
      {
        title: b.title,
        amount: b.debt,
        user: {
          avatarUrl: b.loaner.avatar.url(:thumb),
          fullName: b.loaner.full_name
        }
      }
  end
end
