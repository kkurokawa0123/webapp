import axiosClient from "../api/client";
import type { AxiosRequestConfig } from "axios";
// import Cookies from "js-cookie";

export class ApiRequest {
  static async get(url: string, config?: AxiosRequestConfig) {
    return await axiosClient.get(url, config);
  }

  static async post<T>(url: string, body: T, config?: AxiosRequestConfig) {
    return await axiosClient.post(url, body, config);
  }

  static async delete(url: string) {
    return await axiosClient.delete(url);
  }
  // 認証済みのユーザーを取得
  // static async fetchValidateToken(url: string) {
  //   return await axiosClient.get(url);
  // }
}
