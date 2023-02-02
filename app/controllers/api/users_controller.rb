class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
      @user = User.new(username: user_params[:username],password: user_params[:password])
      if @user.save
          login!(@user)
          render :show
      else
          render json: @user.errors.full_messages, status: 403
      end
  end

  def update
    @user = User.find_by(id: current_user.id)

    @user.errors.add(:base,'Incorrect Password') unless @user.is_password?(update_params['password'])
    @user.errors.add(:base,'Passwords do not match') unless update_params['newPassword']==update_params['confirmPassword']


    @user.username = current_user.username
    @user.password = update_params['newPassword'] unless update_params['newPassword'] == ''
    if @user.errors.full_messages.length() == 0 && @user.save
        render :show
    else
        render json: @user.errors.full_messages, status: 422
    end

  end

  private
  
  def update_params
    params.require(:user).permit(:password,:newPassword,:confirmPassword)
  end

  def user_params
      params.require(:user).permit(:username, :password)
  end
end