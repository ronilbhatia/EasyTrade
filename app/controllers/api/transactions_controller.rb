class Api::TransactionsController < ApplicationController
  def index
    @transactions = current_user.transactions
  end

  def show
    @transaction = Transaction.find(params[:id])
  end

  def create
    @transaction = Transaction.new(transaction_params)
    @transaction.user_id = current_user.id
    if @transaction.save
      render 'api/transactions/show', status: 200
    else
      render json: @transaction.errors.full_messages, status: 422
    end
  end

  def create
    @transaction = Transaction.find(params[:id])

    if @transaction.update(transaction_params)
      render 'api/transactions/show', status: 200
    else
      render json: @transaction.errors.full_messages, status: 422
    end
  end

  def delete
    @transaction = Transaction.find(params[:id])
    @transaction.destroy
  end

  private

  def transaction_params
    params.require(:transaction).params(:stock_id, :price, :num_shares, :order_type)
  end
end
