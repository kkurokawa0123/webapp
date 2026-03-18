import axiosClient from "../api/client";
import type { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export class ApiRequest {
  static async get(url: string, config?: AxiosRequestConfig) {
    return await axiosClient.get(url, config);
  }

  static async post<T>(url: string, body: T, config?: AxiosRequestConfig) {
    return await axiosClient.post(url, body, config);
  }

  static async deleteSession(url: string) {
    return await axiosClient.delete(url, {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
  }
  // 認証済みのユーザーを取得
  static async getCookiesData(url: string) {
    return await axiosClient.get(url, {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
  }
}
