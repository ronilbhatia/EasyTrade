class Api::StocksController < ApplicationController
  def show
    @stock = Stock.find_by(ticker: params[:id])
  end
end
