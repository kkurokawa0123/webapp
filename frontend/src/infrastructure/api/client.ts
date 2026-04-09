import applyCaseMiddleware from "axios-case-converter";
import axios, { type AxiosHeaders } from "axios";
import { authStorage } from "@/infrastructure/lib/auth_storage";
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
  const { token, client, uid } = authStorage.get();

  console.log("axiosClient.interceptors.request");
  console.log("interceptors_token:", token);
  console.log("interceptors_client:", client);
  console.log("interceptors_uid:", uid);
  if (token && client && uid) {
    config.headers.set("access-token", token);
    config.headers.set("client", client);
    config.headers.set("uid", uid);
  }

  return config;
});

// 🔥 レスポンスでトークン更新
axiosClient.interceptors.response.use((response) => {
  const headers = response.headers as AxiosHeaders;

  console.log("axiosClient.interceptors.response");
  console.log("interceptors_token:", headers["access-token"]);
  console.log("interceptors_client:", headers["client"]);
  console.log("interceptors_uid:", headers["uid"]);

  authStorage.set(headers);

  return response;
});

export default axiosClient;
