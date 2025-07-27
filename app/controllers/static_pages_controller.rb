class StaticPagesController < ApplicationController
  # skip_before_action :require_login, only: %i[top]

  def top
    # redirect_to home_path if logged_in?#ログインしていたらhomeページへリダイレクト
    # return
    # end
  end
end
