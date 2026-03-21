import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";
// import { saveAuthHeaders } from "@/infrastructure/lib/auth_storage";

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
  const token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  // const headers = getAuthHeaders();
  console.log("interceptors_リクエスト");
  console.log("interceptors_token中身", token);
  console.log("interceptors_client中身", client);
  console.log("interceptors_uid中身", uid);
  if (token && client && uid) {
    config.headers.set("access-token", token);
    config.headers.set("client", client);
    config.headers.set("uid", uid);
  }

  return config;
});

// 🔥 レスポンスでトークン更新
axiosClient.interceptors.response.use((response) => {
  const headers = response.headers;

  console.log("interceptors_レスポンス");
  console.log("interceptors_token中身", headers["access-token"]);
  console.log("interceptors_client中身", headers["client"]);
  console.log("interceptors_uid中身", headers["uid"]);

  if (headers["access-token"]) {
    localStorage.setItem("access-token", headers["access-token"]);
    localStorage.setItem("client", headers["client"]);
    localStorage.setItem("uid", headers["uid"]);
  }

  return response;
});

export default axiosClient;
