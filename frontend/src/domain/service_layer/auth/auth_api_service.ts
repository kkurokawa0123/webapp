import * as api from "@/infrastructure/api_layer/auth/auth_api_request";
import { authStorage } from "@/infrastructure/lib/auth_storage";
import type {
  ReqestSignIn,
  ReqestSignUp,
  AuthAccount,
  User,
} from "@/domain/datas/api/auth_data";
import { HTTP_STATUS } from "@/domain/datas/api/http_status";

export const onSignUp = async (
  params: ReqestSignUp,
): Promise<User | undefined> => {
  try {
    const response = await api.requestSignUp(params);
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("onSignUp failed");
    }
    return response.data.data as User;
  } catch (err) {
    console.error("onSignUp failed");
    throw err;
  }
};

export const onSignIn = async (
  params: ReqestSignIn,
): Promise<User | undefined> => {
  try {
    const response = await api.requestSignIn(params);
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("onSignIn failed");
    }
    return response.data.data as User;
  } catch (err) {
    console.error("onSignIn failed");
    throw err;
  }
};

export const onSignOut = async () => {
  try {
    const response = await api.requestSignOut();
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("onSignOut failed");
    }
  } catch (err) {
    console.error("onSignOut failed");
    throw err;
  } finally {
    authStorage.clear();
  }
};

export const getAuthUser = async (): Promise<AuthAccount | undefined> => {
  try {
    const response = await api.requestrFetchValidateToken();
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("getAuthUser failed");
    }
    return response.data.data as AuthAccount;
  } catch (err) {
    console.error("getAuthUser failed");
    throw err;
  }
};
