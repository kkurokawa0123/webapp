import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/shared/types/api/api_response";
import type { User } from "@/shared/types/user";
import { ApiRequest } from "@/infrastructure/api/api_request";
import { SignUpParams } from "@/domain/entities/auth/sign_up_params";
import { SignInParams } from "@/domain/entities/auth/sign_in_params";

// サインアップ（新規アカウント作成）Promise<AxiosResponse<ResponseData>>
export const requestSignUp = async (
  params: SignUpParams,
): Promise<AxiosResponse<ApiResponse<User>>> => {
  return ApiRequest.post("auth", params.toRequestData());
};

// サインイン（ログイン）Promise<AxiosResponse<ResponseData>>
export const requestSignIn = async (
  params: SignInParams,
): Promise<AxiosResponse<ApiResponse<User>>> => {
  return ApiRequest.post("auth/sign_in", params.toRequestData());
};

// サインアウト（ログアウト）: Promise<AxiosResponse<ResponseData>>
export const requestSignOut = async (): Promise<
  AxiosResponse<ApiResponse<User>>
> => {
  return ApiRequest.delete("auth/sign_out");
};
// 認証済みのユーザーを取得 Promise<AxiosResponse<ResponseData>>
export const requestrFetchValidateToken = async () => {
  return ApiRequest.get<ApiResponse<User>>("/auth/validate_token");
};
