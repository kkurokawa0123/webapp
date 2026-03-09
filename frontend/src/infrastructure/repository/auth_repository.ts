import type {
  ResponseUser,
  ReqestSignUp,
  ReqestSignIn,
} from "../../common/api_body_values/auth";

import { ApiRequest } from "../api/api_request";

// サインアップ（新規アカウント作成）
//responseSignUp
export const signUp = (params: ReqestSignUp) => {
  return ApiRequest.post<ReqestSignUp>("auth", params);
};

// サインイン（ログイン）
//responseSignIn
export const signIn = (params: ReqestSignIn) => {
  return ApiRequest.post<ReqestSignIn>("auth/sign_in", params);
};

// サインアウト（ログアウト）
//responseSignOut
export const signOut = () => {
  return ApiRequest.deleteSession("auth/sign_out");
};

// 認証済みのユーザーを取得
//responseGetCurrentUse
export const getCurrentUser = () => {
  return ApiRequest.getCookiesData("/auth/sessions");
};
