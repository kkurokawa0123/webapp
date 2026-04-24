import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/domain/service_layer/password/password_api_service";
import { PasswordChangeParams } from "@/domain/entities/auth/password_change_params";

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (params: PasswordChangeParams) => {
      return updatePassword(params);
    },
    onSuccess: (message) => {
      return message;
    },
  });
};
