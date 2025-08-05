class Admin::UsersController < ApplicationController
  before_action :require_login
  before_action :require_admin

  def index
    @users = User.all
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    redirect_to admin_users_path, notice: "ユーザーを削除しました"
  end

  private

  def require_admin
    unless current_user&.admin?
      redirect_to root_path, alert: "管理者のみアクセスできます"
    end
  end
end
