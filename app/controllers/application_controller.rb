class ApplicationController < ActionController::Base
include Sorcery::Controller
before_action :require_login

add_flash_types :success, :danger

  private

  def not_authenticated
      redirect_to login_path, danger: "ログインしてください"
    end
  end

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
end
