import * as api from "@/infrastructure/api_layer/auth/auth_api_request";
import type {
  ReqestSignIn,
  ReqestSignUp,
  ResponseData,
} from "@/domain/datas/api/auth_data";
import { HTTP_STATUS } from "@/domain/datas/api/http_status";

export const onSignUp = async (params: ReqestSignUp) => {
  console.log("サインアップ開始");
  const response = await api.requestSignUp(params);
  if (response.status === HTTP_STATUS.OK) {
    console.log("サインアップ成功", response);
  } else {
    console.log("サインアップ失敗", response);
  }
  return response.data as ResponseData;
};

export const onSignIn = async (params: ReqestSignIn) => {
  console.log("サインイン開始");
  const response = await api.requestSignIn(params);
  if (response.status === HTTP_STATUS.OK) {
    console.log("サインイン成功", response);
  } else {
    console.log("サインイン失敗", response);
  }
  return response.data as ResponseData;
};

export const onSignOut = async () => {
  console.log("サインアウト開始");
  const response = await api.requestSignOut();
  if (response.status === HTTP_STATUS.OK) {
    console.log("サインアウト成功", response);
  }
  return response.data as ResponseData;
};

export const fetchCurrentUser = async () => {
  const response = await api.requestrGetCurrentUser();

  if (!response.data.is_login) {
    return null;
  }
  return response.data;
};
