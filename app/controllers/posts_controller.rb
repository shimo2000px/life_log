class PostsController < ApplicationController
  before_action :require_login
  
  def index
    @posts = current_user.posts.order(created_at: :desc)
  end
end
