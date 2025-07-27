class CreateUsers < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      # Sorcery必須カラム
      t.string :email,            null: false, index: { unique: true }
      t.string :crypted_password
      t.string :salt

      # アプリ固有のカラム
      t.string :first_name,       null: false
      t.string :last_name,        null: false
      t.string :nick_name

      t.timestamps
    end
  end
end
