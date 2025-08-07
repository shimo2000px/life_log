class PostsController < ApplicationController
  before_action :require_login
  before_action :set_post, only: [ :show, :edit, :update, :destroy, :share_to_twitter ]
  before_action :ensure_correct_user, only: [ :edit, :update, :destroy, :share_to_twitter ]
  layout "shared", only: [ :share_to_twitter ]

  def index
    @posts = current_user.posts.includes(:user).order(created_at: :desc).page(params[:page])
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
    alert = "削除権限がありません" unless @post.user == current_user
  end

  def update
    @post = Post.find(params[:id])
    redirect_to posts_path, alert = "削除権限がありません" unless @post.user == current_user

    if @post.update(post_params)
      redirect_to posts_path(@post), success: "投稿を更新しました"
    else
      render :edit
    end
  end

  def destroy
  @post = Post.find(params[:id])
  redirect_to posts_path, alert = "削除権限がありません" unless @post.user == current_user

  @post.destroy
  redirect_to posts_path, danger: "投稿を削除しました"
  end


  def share_to_twitter
    @post = Post.find(params[:id])

    # トークンがなければ生成
    if @post.share_token.blank?
      @post.share_token = SecureRandom.urlsafe_base64(32)
    end

    # is_shared を true に（管理者画面で取得対象にする）
    @post.is_shared = true

    # 変更があれば保存
    @post.save! if @post.changed?

    # シェア用の文言とURLを生成
    tweet_text = "#{@post.user.nick_name}さんの素敵な1日をのぞいてみよう✨ #ふぅ日記"
    share_url = shared_post_url(@post.share_token, host: "d4bc3ac321f7.ngrok-free.app", protocol: "https", port: nil)
    tweet_url = "https://twitter.com/intent/tweet?url=#{CGI.escape(share_url)}&text=#{CGI.escape(tweet_text)}"

    # Twitter投稿画面にリダイレクト
    redirect_to tweet_url, allow_other_host: true
  end


  private

  def set_post
    @post = current_user.posts.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    @post = Post.find(params[:id]) if action_name == "show"
  end

  def ensure_correct_user
    redirect_to posts_path, alert: "権限がありません。" unless @post.user == current_user
  end

  def check_owner
    @post = Post.find(params[:id])
    redirect_to posts_path, alert = "削除権限がありません" unless @post.user == current_user
  end

  def post_params
    params.require(:post).permit(:title, :body, :diary_date)
  end
end
