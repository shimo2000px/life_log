class AddDiaryDateToPosts < ActiveRecord::Migration[8.0]
  def change
    add_column :posts, :diary_date, :date, default: -> { 'CURRENT_DATE' }
  end
end
