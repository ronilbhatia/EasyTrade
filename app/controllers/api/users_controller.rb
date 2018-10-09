class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render 'api/users/show', status: 200
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id]);
    if @user.update(user_params)
      render 'api/users/show', status: 200
    else
      render json: ["Please choose a file to upload"], status: 422
    end
  end

  def info
    @user = User.find(params[:id])
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :photo)
  end
end
