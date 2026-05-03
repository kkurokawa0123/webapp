import { ApiRequest } from "@/infrastructure/api/api_request";
import { PasswordChangeParams } from "@/domain/entities/auth/password_change_params";

// パスワード変更
export const requestUpdatePassword = async (params: PasswordChangeParams) => {
  return ApiRequest.put("/password", params.toRequestData());
};
