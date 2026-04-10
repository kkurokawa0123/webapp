import * as api from "@/infrastructure/api_layer/auth/auth_api_request";
import { authStorage } from "@/infrastructure/lib/auth_storage";
import type {
  ReqestSignIn,
  ReqestSignUp,
  AuthAccount,
  User,
} from "@/domain/datas/api/auth_data";
import { HTTP_STATUS } from "@/domain/datas/api/http_status";

export const onSignUp = async (params: ReqestSignUp): Promise<User> => {
  const response = await api.requestSignUp(params);
  if (response.status !== HTTP_STATUS.OK) {
    console.log("サインアップ失敗", response);
    throw new Error("SIGN_UP_FAILED");
  }
  return response.data.data as User;
};

export const onSignIn = async (params: ReqestSignIn): Promise<User> => {
  const response = await api.requestSignIn(params);
  if (response.status !== HTTP_STATUS.OK) {
    console.log("サインイン失敗_apiservice", response);
    throw new Error("SIGN_UP_FAILED");
  }
  return response.data.data as User;
};

export const onSignOut = async () => {
  const response = await api.requestSignOut();
  if (response.status !== HTTP_STATUS.OK) {
    console.log("サインアウト失敗", response);
    throw new Error("SIGN_OUT_FAILED");
  }
  authStorage.clear();
};

export const getAuthUser = async (): Promise<AuthAccount> => {
  const response = await api.requestrFetchValidateToken();

  if (response.status === HTTP_STATUS.OK) {
    console.log("認証情報取得成功", response);
  }
  return {
    id: response.data.data.id,
    email: response.data.data.email,
    name: response.data.data.name,
  };
};
