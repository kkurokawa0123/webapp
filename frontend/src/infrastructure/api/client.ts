import axios, { type AxiosHeaders } from "axios";
import { authStorage } from "@/infrastructure/lib/auth_storage";

// applyCaseMiddleware:
// axiosで受け取ったレスポンスの値をスネークケース→キャメルケースに変換
// または送信するリクエストの値をキャメルケース→スネークケースに変換してくれるライブラリ

// ヘッダーに関してはケバブケースのままで良いので適用を無視するオプションを追加
// const options = {
//   ignoreHeaders: true,
// };

// const axiosClient = applyCaseMiddleware(
//   axios.create({
//     // baseURL: "http://localhost:3000/api/v1",
//     baseURL: import.meta.env.VITE_API_URL,
//     withCredentials: true,
//   }),
//   options,
// );

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// 🔥 リクエスト時にトークン付与
axiosClient.interceptors.request.use((config) => {
  const { token, client, uid } = authStorage.get();

  if (token && client && uid) {
    config.headers.set("access-token", token);
    config.headers.set("client", client);
    config.headers.set("uid", uid);
  }

  return config;
});

// 🔥 レスポンスでトークン更新
axiosClient.interceptors.response.use(
  (response) => {
    const headers = response.headers as AxiosHeaders;
    if (headers?.["access-token"]) {
      authStorage.set(headers);
    }
    return response;
  },
  (error) => {
    const headers = error.response?.headers as AxiosHeaders;

    // リクエスト送信時サーバー側トークン更新に伴い、error側でもトークン更新する
    if (headers?.["access-token"]) {
      authStorage.set(headers);
    }

    if (!error.response) {
      console.error("Network error", error);
    }
    // 401 Unauthorizedならログイン画面へ
    if (error.response?.status === 401) {
      console.error("Unauthorized error", error);
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
