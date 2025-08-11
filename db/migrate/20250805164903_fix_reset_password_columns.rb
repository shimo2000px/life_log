class FixResetPasswordColumns < ActiveRecord::Migration[8.0]
  def change
    # 不足しているカラムを安全に追加
    unless column_exists?(:users, :reset_password_token_expires_at)
      add_column :users, :reset_password_token_expires_at, :datetime, default: nil
    end

    unless column_exists?(:users, :access_count_to_reset_password_page)
      add_column :users, :access_count_to_reset_password_page, :integer, default: 0
    end

    # 不足しているインデックスを安全に追加
    unless index_exists?(:users, :reset_password_token)
      add_index :users, :reset_password_token, unique: true
    end
  end
end
