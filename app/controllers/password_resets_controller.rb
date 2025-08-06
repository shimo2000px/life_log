class PasswordResetsController < ApplicationController
skip_before_action :require_login

  # パスワードリセット申請画面
  def new
  end

  # パスワードリセット申請処理
  def create
    @user = User.find_by(email: params[:email])

    # ユーザーが存在する場合のみメール送信
    @user&.deliver_reset_password_instructions!

    # セキュリティ上、存在しないメールでも同じメッセージを表示
    redirect_to login_path, notice: "パスワードリセット手順を送信しました"
  end

  # パスワード変更画面
  def edit
    @token = params[:id]
    @user = User.load_from_reset_password_token(@token)

    not_authenticated if @user.blank?
  end

  # パスワード変更処理
  def update
    @token = params[:id]
    @user = User.load_from_reset_password_token(@token)

    if @user.blank?
      not_authenticated
      return
    end

    @user.password_confirmation = params[:user][:password_confirmation]

    if @user.change_password(params[:user][:password])
      redirect_to login_path, notice: "パスワードが更新されました"
    else
      render :edit
    end
  end
end
