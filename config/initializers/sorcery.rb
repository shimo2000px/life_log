Rails.application.config.sorcery.submodules = [ :reset_password ]

Rails.application.config.sorcery.configure do |config|
  config.user_config do |user|
    user.reset_password_mailer = UserMailer  # ← クラス名（文字列でもOK）
    user.reset_password_email_method_name = :reset_password_email
    user.reset_password_expiration_period = 60 * 60

    # 重要：カラム名を明示的に指定
    user.reset_password_email_sent_at_attribute_name = :reset_password_sent_at
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
