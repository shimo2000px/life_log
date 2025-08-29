class AddRememberMeToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :remember_me_token, :string, default: nil
    add_column :users, :remember_me_token_expires_at, :datetime, default: nil

    add_index :users, :remember_me_token, unique: true
  end
end
