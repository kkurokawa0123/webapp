import type { AxiosResponse } from "axios";
import type {
  ReqestSignUp,
  ReqestSignIn,
  ResponseData,
} from "../../common/api_body_values/auth";

import type { IAuthRepository } from "../../domain/interface_repository/Iauth_repository";
import { ApiRequest } from "../api/api_request";

export class AuthRepository implements IAuthRepository {
  // サインアップ（新規アカウント作成）
  //responseSignUp
  async requestSignUp(
    params: ReqestSignUp,
  ): Promise<AxiosResponse<ResponseData>> {
    return ApiRequest.post<ReqestSignUp>("auth", params);
  }

  // サインイン（ログイン）
  //responseSignIn
  async requestSignIn(
    params: ReqestSignIn,
  ): Promise<AxiosResponse<ResponseData>> {
    return ApiRequest.post<ReqestSignIn>("auth/sign_in", params);
  }

  // サインアウト（ログアウト）
  //responseSignOut
  async requestSignOut(): Promise<AxiosResponse<ResponseData>> {
    return ApiRequest.deleteSession("auth/sign_out");
  }

  // 認証済みのユーザーを取得
  //responseGetCurrentUse
  async requestrGetCurrentUser(): Promise<
    AxiosResponse<ResponseData> | undefined
  > {
    return ApiRequest.getCookiesData("/auth/sessions");
  }
}
