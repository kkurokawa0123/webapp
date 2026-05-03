import axios from "axios";
import * as api from "@/infrastructure/api_layer/auth/auth_api_request";
import { authStorage } from "@/infrastructure/lib/auth_storage";
import type { AuthAccount } from "@/shared/types/auth_account";
import type { User } from "@/shared/types/user";
import { HTTP_STATUS } from "@/shared/constants/http_status";
import { SignUpParams } from "@/domain/entities/auth/sign_up_params";
import { SignInParams } from "@/domain/entities/auth/sign_in_params";

export const onSignUp = async (
  params: SignUpParams,
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
  params: SignInParams,
): Promise<User | undefined> => {
  try {
    const response = await api.requestSignIn(params);
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("onSignIn failed");
    }
    return response.data.data as User;
  } catch (err: unknown) {
    // APIコントローラーのエラーメッセージを受取
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || err.response?.data?.errors?.join(", ");

      throw new Error(message);
    } else {
      throw err;
    }
  }
};

export const onSignOut = async () => {
  try {
    const response = await api.requestSignOut();
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("onSignOut failed");
    }
  } catch (err: unknown) {
    // APIコントローラーのエラーメッセージを受取
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || err.response?.data?.errors?.join(", ");

      throw new Error(message);
    } else {
      throw err;
    }
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
  } catch (err: unknown) {
    // APIコントローラーのエラーメッセージを受取
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || err.response?.data?.errors?.join(", ");

      throw new Error(message);
    } else {
      throw err;
    }
  }
};
