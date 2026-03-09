import axiosClient from "../api/client";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

export class ApiRequest {
  static async post<T>(url: string, body: T, config?: AxiosRequestConfig) {
    return await axiosClient.post(url, body, config);
  }
  static async getFetchData<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await axiosClient.get<T>(url, config);
    return response.data;
  }
  static async postFetchData<T, U>(
    url: string,
    body: T,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<U>> {
    return await axiosClient.post<U>(url, body, config);
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
    if (
      !Cookies.get("_access_token") ||
      !Cookies.get("_client") ||
      !Cookies.get("_uid")
    ) {
      return;
    }
    return await axiosClient.get(url, {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
  }
}
