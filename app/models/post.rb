class Post < ApplicationRecord
  belongs_to :user


  validates :title, presence: true, length: { maximum: 255 }
  validates :body, presence: true, length: { maximum: 65535 }

  def auto_likes_count
    # 投稿IDをシードにしてランダム値を固定
    Random.srand(id)

    body_length = body.length

    # 1. 文字数による基本いいね数
    base_likes = case body_length
    when 0..20
      Random.rand(80..150)
    when 21..50
      Random.rand(150..300)
    when 51..100
      Random.rand(300..500)
    when 101..200
      Random.rand(500..800)
    else
      Random.rand(800..1200)
    end

  # 2. ポジティブワードボーナス
  positive_words = %w[嬉しい 楽しい 良かった よかった 最高 素晴らしい 幸せ 感謝 ありがとう 頑張 がんば 褒め]
  positive_bonus = positive_words.count { |word| body.include?(word) } * Random.rand(100..200)

  # 3. ネガティブワードボーナス（共感系）
  pessimistic_words = %w[疲れ つかれ 辛 つらい めんど 苦し くるし 最悪 大変 不幸 頑張った 無理 嫌だ 悲し かなし]
  pessimistic_bonus = pessimistic_words.count { |word| body.include?(word) } * Random.rand(100..200)

  # 4. 合計計算
  total = base_likes + positive_bonus + pessimistic_bonus

  # 5. 最低保証いいね数
  result = [ total, 50 ].max

  # ランダムシードリセット
  Random.srand

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
