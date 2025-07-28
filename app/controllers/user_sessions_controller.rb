class UserSessionsController < ApplicationController
  skip_before_action :require_login, only: [:new, :create]

  def new
    redirect_to root_path if logged_in?
  end

  def create
    @user = login(params[:email], params[:password])
  if @user
    redirect_to home_path, success: "ログインしました"
  else
    flash.now[:danger] = "メールアドレスまたはパスワードが間違っています"
    render :new, status: :unprocessable_entity
  end
end

  def destroy
    logout
    redirect_to root_path, danger: "ログアウトしました", status: :see_other
  end
end
