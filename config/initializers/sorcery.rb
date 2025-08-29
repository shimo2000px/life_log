Rails.application.config.sorcery.submodules = [ :reset_password, :remember_me ]

Rails.application.config.sorcery.configure do |config|
  # Remember Me機能のグローバル設定
  config.remember_me_httponly = true  # XSS攻撃対策
  config.remember_me_secure = Rails.env.production?  # HTTPS必須
  config.remember_me_token_persist_globally = false  # セキュリティ向上

  # 本番環境用の追加設定
  if Rails.env.production?
    config.remember_me_same_site = :lax
  end

  config.user_config do |user|
    # 既存のパスワードリセット設定
    user.reset_password_mailer = UserMailer
    user.reset_password_email_method_name = :reset_password_email
    user.reset_password_expiration_period = 60 * 60
    user.reset_password_email_sent_at_attribute_name = :reset_password_sent_at

    # Remember Me機能の設定
    user.remember_me_for = 60 * 60 * 24 * 14  # 2週間
    user.remember_me_token_attribute_name = :remember_me_token
    user.remember_me_token_expires_at_attribute_name = :remember_me_token_expires_at
  end

  config.user_class = "User"
end

# テスト環境の高速化設定
if Rails.env.test?
  Rails.application.config.sorcery.configure do |config|
    config.user_config do |user|
      user.stretches = 1
    end
  end
end
