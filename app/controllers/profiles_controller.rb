class ProfilesController < ApplicationController
  before_action :require_login
  before_action :set_user

  def show
  end

  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to profile_path, success: 'プロフィールを更新しました'
    else
      flash.now[:danger] = 'プロフィールを更新できませんでした'
      render :edit, status: :unprocessable_entity
    end
  end
  
  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:nick_name, :profile_image)
  end
end
