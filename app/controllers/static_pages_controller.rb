class StaticPagesController < ApplicationController
  # skip_before_action :require_login, only: %i[top]

  def top
    # redirect_to home_path if logged_in?#ログインしていたらhomeページへリダイレクト
    # ログイン前のページ
   
  end

  def home
    # ログイン後のページ
  end


end
