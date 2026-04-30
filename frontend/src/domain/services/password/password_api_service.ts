import axios from "axios";
import * as api from "@/infrastructure/api_services/password/password_api_request";
import { HTTP_STATUS } from "@/shared/constants/http_status";
import { PasswordChangeParams } from "@/domain/entities/auth/password_change_params";

export const updatePassword = async (
  params: PasswordChangeParams,
): Promise<string> => {
  try {
    const response = await api.requestUpdatePassword(params);

    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("updatePassword unexpected status");
    }
    return response.data.message as string;
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
