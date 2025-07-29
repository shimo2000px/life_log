class User < ApplicationRecord
  authenticates_with_sorcery!

  has_one_attached :profile_image
  has_many :posts, dependent: :destroy

  validates :first_name, presence: true, length: { maximum: 255 }
  validates :last_name, presence: true, length: { maximum: 255 }
  validates :nick_name, presence: true, length: { maximum: 255 }
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 6 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  def full_name
    "#{first_name} #{last_name}"
  end

  def display_name
    nick_name.present? ? nick_name : full_name
  end
end
