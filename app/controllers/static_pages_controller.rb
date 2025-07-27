class StaticPagesController < ApplicationController
#skip_before_action :require_login, only: %i[top]


  def top
    #if logged_in?
    #redirect_to homes_path ログインしていたらhomeページへリダイレクト
    #return
    #end
  end
end
