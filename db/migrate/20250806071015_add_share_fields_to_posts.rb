class AddShareFieldsToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :is_shared, :boolean, default: false, null: false
    add_column :posts, :share_token, :string
    add_column :posts, :view_count, :integer, default: 0, null: false

    add_index :posts, :share_token, unique: true
  end
end
