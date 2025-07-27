class UserSessionsController < ApplicationController
  def new
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
    redirect_to root_path, notice: "ログアウトしました"
  end
end
