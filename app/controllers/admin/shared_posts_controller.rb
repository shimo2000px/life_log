class Admin::SharedPostsController < ApplicationController
  before_action :require_login
  before_action :require_admin 

  def index
    # is_sharedフラグを使った方が確実
    @shared_posts = Post.where(is_shared: true)
                      .where.not(share_token: [nil, ""])
                      .includes(:user)
                      .order(created_at: :desc)
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.shared?
      @post.destroy
      redirect_to admin_shared_posts_path, notice: 'シェアされた投稿を削除しました', status: :see_other
    else
      redirect_to admin_shared_posts_path, alert: 'この投稿はシェアされていません'
    end
  end

  private

  def require_admin
    unless current_user&.admin?
      redirect_to root_path, alert: "管理者のみアクセスできます"
    end
  end
end