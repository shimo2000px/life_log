class SharedPostsController < ApplicationController
  skip_before_action :require_login # シェアページなので

def show
  @post = Post.shared.find_by!(share_token: params[:token])
  @post.increment!(:view_count)
  render layout: "shared"  # 共通レイアウト指定
rescue ActiveRecord::RecordNotFound
  redirect_to root_path, alert: "シェアされた投稿が見つかりません。"
end
end
