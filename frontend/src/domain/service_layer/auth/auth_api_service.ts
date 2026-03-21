import * as api from "@/infrastructure/api_layer/auth/auth_api_request";
import type {
  ReqestSignIn,
  ReqestSignUp,
  ResponseData,
  AuthAccount,
} from "@/domain/datas/api/auth_data";
import { HTTP_STATUS } from "@/domain/datas/api/http_status";

export const onSignUp = async (params: ReqestSignUp): Promise<ResponseData> => {
  console.log("サインアップ開始");
  const response = await api.requestSignUp(params);
  console.log("サインアップ結果ステータス", response.status);
  if (response.status === HTTP_STATUS.OK) {
    console.log("サインアップ成功", response);
  } else {
    console.log("サインアップ失敗", response);
  }
  return response.data as ResponseData;
};

export const onSignIn = async (params: ReqestSignIn): Promise<ResponseData> => {
  console.log("サインイン開始");
  const response = await api.requestSignIn(params);
  console.log("サインイン結果ステータス", response.status);
  if (response.status === HTTP_STATUS.OK) {
    console.log("サインイン成功", response);
  } else {
    console.log("サインイン失敗", response);
  }
  return response.data as ResponseData;
};

export const onSignOut = async (): Promise<ResponseData | null> => {
  try {
    console.log("サインアウト開始");
    const response = await api.requestSignOut();
    console.log("サインアウト結果ステータス", response.status);
    if (response.status === HTTP_STATUS.OK) {
      console.log("サインアウト成功", response);
    }
    return response.data as ResponseData;
  } catch (error) {
    console.log("サインアウト例外", error);
    return null;
  }
};

export const getAuthUser = async (): Promise<
  AuthAccount | undefined | null
> => {
  const response = await api.requestrFetchValidateToken();
  console.log("validate_token成功", response.data);
  console.log("認証情報取結果ステータス", response.status);
  if (response.status === HTTP_STATUS.OK) {
    console.log("認証情報取得成功", response);
  }
  return {
    id: response.data.data.id,
    email: response.data.data.email,
    name: response.data.data.name,
  };
};
