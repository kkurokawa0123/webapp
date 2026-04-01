import axiosClient from "../api/client";
import type { AxiosRequestConfig } from "axios";
import type { AxiosResponse } from "axios";

export class ApiRequest {
  static async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return await axiosClient.get(url, config);
  }

  static async post<T>(url: string, body: T, config?: AxiosRequestConfig) {
    return await axiosClient.post(url, body, config);
  }

  static async delete(url: string) {
    return await axiosClient.delete(url);
  }
}
