// import client from "../api/client";
import Cookies from "js-cookie";

import { SignInParams } from "../../domain/entities/auth/sign_in_params";
import { SignUpParams } from "../../domain/entities/auth/sign_up_params";

import { ApiRequest } from "../api/api_request";

// サインアップ（新規アカウント作成）
export const signUp = (params: SignUpParams) => {
  return ApiRequest.postFetchData<SignUpParams>("auth", params);
  // return client.post("auth", params);
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  return ApiRequest.postFetchData<SignInParams>("auth/sign_in", params);
};
