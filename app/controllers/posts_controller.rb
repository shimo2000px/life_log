class PostsController < ApplicationController
  before_action :require_login
  before_action :check_owner, only: [:edit, :update, :destroy]

  def index
    @posts = current_user.posts.order(created_at: :desc)
  end

  def new
    @post = current_user.posts.new
  end

  def create
    @post = current_user.posts.new(post_params)
    if @post.save
      redirect_to posts_path, success: "日記を投稿しました！えらいです🫶"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def edit
    @post = Post.find(params[:id])
    alert = '削除権限がありません' unless @post.user == current_user
  end

  def update
    @post = Post.find(params[:id])
    redirect_to posts_path, alert = '削除権限がありません' unless @post.user == current_user


    if @post.update(post_params)
      redirect_to posts_path(@post), success: '投稿を更新しました'
    else
      render :edit
    end
  end

  def destroy
  @post = Post.find(params[:id])
  redirect_to posts_path, alert = '削除権限がありません' unless @post.user == current_user
  
  @post.destroy
  redirect_to posts_path, danger: '投稿を削除しました'
  end

  private

  def check_owner
    @post = Post.find(params[:id])
    redirect_to posts_path, alert = '削除権限がありません' unless @post.user == current_user
  end

  def post_params
    params.require(:post).permit(:title, :body)
  end
end
