import client from "../api/client";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

export class ApiRequest {
  static async getFetchData<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await client.get<T>(url, config);
    return response.data;
  }
  static async postFetchData<T>(
    url: string,
    data: T,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    const response = await client.post<T>(url, data, config);
    return response;
  }
  static async deleteSession(url: string) {
    return await client.delete(url, {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    });
  }
}
