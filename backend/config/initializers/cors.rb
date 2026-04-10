# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # origins "localhost:8000" # React側はポート番号8000で作るので「localhost:8000」を指定
    origins "webapp-six-indol.vercel.app" # React側はポート番号8000で作るので「localhost:8000」を指定

    resource "*",
      headers: :any,
      expose: ["access-token", "expiry", "token-type", "uid", "client"], # 追記
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true
  end
end
