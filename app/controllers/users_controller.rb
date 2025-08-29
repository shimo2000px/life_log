class UsersController < ApplicationController
  skip_before_action :require_login, only: [ :new, :create ]

  def new
      @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      auto_login(@user)
      redirect_to home_path, success: "ユーザー登録が完了しました"
    else
      flash.now[:danger] = "ユーザー登録に失敗しました"
      render :new, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :nick_name, :email, :password, :password_confirmation, :profile_image)
  end
end
