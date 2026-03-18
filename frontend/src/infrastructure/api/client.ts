import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";
import {
  getAuthHeaders,
  saveAuthHeaders,
} from "@/infrastructure/lib/auth_storage";

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
const options = {
  ignoreHeaders: true,
};

const axiosClient = applyCaseMiddleware(
  axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
  }),
  options,
);

// 🔥 リクエスト時にトークン付与
axiosClient.interceptors.request.use((config) => {
  const headers = getAuthHeaders();

  if (headers["access-token"]) {
    config.headers.set("access-token", headers["access-token"]);
    config.headers.set("client", headers["client"]);
    config.headers.set("uid", headers["uid"]);
  }

  return config;
});

// 🔥 レスポンスでトークン更新
axiosClient.interceptors.response.use((response) => {
  saveAuthHeaders(response.headers);
  return response;
});

export default axiosClient;
