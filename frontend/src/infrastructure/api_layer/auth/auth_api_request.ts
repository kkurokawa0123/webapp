import type { AxiosResponse } from "axios";
import type {
  ReqestSignIn,
  ReqestSignUp,
  ResponseData,
} from "@/domain/datas/api/auth_data";
import { ApiRequest } from "@/infrastructure/api/api_request";

// サインアップ（新規アカウント作成）Promise<AxiosResponse<ResponseData>>
export const requestSignUp = async (
  params: ReqestSignUp,
): Promise<AxiosResponse<ResponseData>> => {
  return ApiRequest.post<ReqestSignUp>("auth", params);
};

// サインイン（ログイン）Promise<AxiosResponse<ResponseData>>
export const requestSignIn = async (
  params: ReqestSignIn,
): Promise<AxiosResponse<ResponseData>> => {
  return ApiRequest.post<ReqestSignIn>("auth/sign_in", params);
};

// サインアウト（ログアウト）: Promise<AxiosResponse<ResponseData>>
export const requestSignOut = async (): Promise<
  AxiosResponse<ResponseData>
> => {
  return ApiRequest.delete("auth/sign_out");
};
// 認証済みのユーザーを取得 Promise<AxiosResponse<ResponseData>>

export const requestrFetchValidateToken = async () => {
  return ApiRequest.get<ResponseData>("/auth/validate_token");
};
