class BillsController < ApplicationController
  def debt_board
    @debt_board_props = {
      loans: bills_as_loans(current_user.loans),
      debts: bills_as_debts(current_user.debts),
      createLoansPath: create_loan_bills_path,
      createDebtsPath: create_debt_bills_path
    }
  end

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

  def create_debt
    use_case = CreateDebt.perform(
      loaner: params[:loaner][:email],
      title: params[:title],
      amount: params[:amount],
      debtor: current_user
    )
    return head(:bad_request) unless use_case.success?
    render json: bills_as_debts(use_case.created_bills)
  end

  private

  def bills_as_loans(bills)
    bills.map do |b|
      {
        title: b.title,
        amount: b.debt,
        status: b.status,
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
        status: b.status,
        user: {
          avatarUrl: b.loaner.avatar.url(:thumb),
          fullName: b.loaner.full_name
        }
      }
    end
  end
end
