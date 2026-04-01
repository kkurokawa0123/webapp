# app/controllers/api/base_api_controller.rb
module Api
  class BaseApiController < ActionController::API
    # API用の共通処理（JSONレスポンス設定、トークン認証など）
  end
end