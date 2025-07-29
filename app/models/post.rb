class Post < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 255 }
  validates :body, presence: true, length: { maximum: 65535 }

  def auto_likes_count
    # 基本いいね数（文字数ベース）
    base_likes = body.length / 10
    
    # ボーナスいいね（感嘆符や疑問符）
    bonus_likes = body.scan(/[!!？?]/).length
    
    # 最低1いいね保証
    [base_likes + bonus_likes, 1].max

      positive_words = %w[嬉しい 楽しい 良かった 最高 素晴らしい]
      positive_bonus = positive_words.count { |word| body.include?(word) }
  
      [base_likes + positive_bonus, 1].max
  end

end
