import type { AxiosResponse } from "axios";
import type {
  ReqestSignUp,
  ReqestSignIn,
  ResponseData,
} from "@/common/api_body_values/auth";

import type { IAuthRepository } from "@/domain/interface_repository/Iauth_repository";
import { ApiRequest } from "@/infrastructure/api/api_request";

export class AuthRepository implements IAuthRepository {
  // サインアップ（新規アカウント作成）
  async requestSignUp(
    params: ReqestSignUp,
  ): Promise<AxiosResponse<ResponseData>> {
    return ApiRequest.post<ReqestSignUp>("auth", params);
  }

  // サインイン（ログイン）
  async requestSignIn(
    params: ReqestSignIn,
  ): Promise<AxiosResponse<ResponseData>> {
    return ApiRequest.post<ReqestSignIn>("auth/sign_in", params);
  }

  // サインアウト（ログアウト）
  async requestSignOut(): Promise<AxiosResponse<ResponseData>> {
    return ApiRequest.deleteSession("auth/sign_out");
  }

  // 認証済みのユーザーを取得
  async requestrGetCurrentUser(): Promise<
    AxiosResponse<ResponseData> | undefined
  > {
    return ApiRequest.getCookiesData("/auth/sessions");
  }
}
