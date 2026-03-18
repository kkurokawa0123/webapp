import type { AxiosResponse } from "axios";
import type {
  ReqestSignIn,
  ReqestSignUp,
  ResponseData,
} from "@/domain/datas/api/auth_data";
import { ApiRequest } from "@/infrastructure/api/api_request";

// サインアップ（新規アカウント作成）
export const requestSignUp = async (
  params: ReqestSignUp,
): Promise<AxiosResponse<ResponseData>> => {
  return ApiRequest.post<ReqestSignUp>("auth", params);
};

// サインイン（ログイン）
export const requestSignIn = async (
  params: ReqestSignIn,
): Promise<AxiosResponse<ResponseData>> => {
  return ApiRequest.post<ReqestSignIn>("auth/sign_in", params);
};

// サインアウト（ログアウト）
export const requestSignOut = async (): Promise<
  AxiosResponse<ResponseData>
> => {
  return ApiRequest.deleteSession("auth/sign_out");
};
// 認証済みのユーザーを取得
export const requestrGetCurrentUser = async (): Promise<
  AxiosResponse<ResponseData>
> => {
  // return ApiRequest.getCookiesData("/auth/sessions");
  return ApiRequest.get("/auth/validate_token");
};
