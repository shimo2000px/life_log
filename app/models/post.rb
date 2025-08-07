class Post < ApplicationRecord
  belongs_to :user


  validates :title, presence: true, length: { maximum: 255 }
  validates :body, presence: true, length: { maximum: 65535 }

  def auto_likes_count
    body_length = body.length

    case body_length
    when 0..20
      rand(80..150)
    when 21..50
      rand(150..300)
    when 51..100
      rand(300..500)
    when 101..200
      rand(500..800)
    else
      rand(800..1200)
    end

    base_likes = body.length * rand(8..12)

  # ポジティブワードボーナス
  positive_words = %w[嬉しい 楽しい 良かった 最高 素晴らしい 幸せ 感謝 ありがとう 頑張]
  positive_bonus = positive_words.count { |word| body.include?(word) } * rand(100..200)

  # お疲れ様ワードボーナス
  pessimistic_words = %w[疲れた 辛い 苦しい 最悪 大変 不幸 頑張った 無理 嫌だ]
  pessimistic_bonus = pessimistic_words.count { |word| body.include?(word) } * rand(100..200)

  total = base_likes + positive_bonus + pessimistic_bonus

  # 最低保証いいね数
  [ total, 50 ].max

  # 投稿IDをシードにしてランダム値を固定
  Random.srand(id)
  result = body.length * Random.rand(8..12)
  Random.srand # リセット
  result
  end

  # Xシェア用トークンの生成

  scope :shared, -> { where(is_shared: true) }

  # 投稿作成時に share_token を生成する（is_shared は false のまま）
  before_create :generate_share_token

  # シェア済みにするメソッド（管理者画面以外でシェアボタン押した時など）
  def share!
    update!(is_shared: true)
  end

  # shared? 判定メソッド（シェア済みかどうか）
  def shared?
    is_shared == true && share_token.present?
  end

  private

  def generate_share_token
    self.share_token ||= SecureRandom.urlsafe_base64(32)
  end
end
