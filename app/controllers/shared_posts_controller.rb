class SharedPostsController < ApplicationController
  layout 'shared'  # 専用レイアウトを使用
  
  def show
    @post = Post.shared.find_by!(share_token: params[:token])
    
    # アクセス数カウント
    @post.increment!(:view_count)
    
  rescue ActiveRecord::RecordNotFound
    redirect_to root_path, alert: 'シェアされた投稿が見つかりません。'
  end
end
