import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getAuthUser,
  onSignIn,
  onSignUp,
  onSignOut,
} from "@/domain/services/auth/auth_api_service";
import { SignUpParams } from "@/domain/entities/auth/sign_up_params";
import { SignInParams } from "@/domain/entities/auth/sign_in_params";

export const useAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    staleTime: 1000 * 60 * 1, // 5分キャッシュ
    gcTime: 1000 * 60 * 1, // 5分キャッシュ
    retry: false, // 認証はリトライしない
  });
};

export const useSingIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: SignInParams) => onSignIn(params),
    onSuccess: (user) => {
      queryClient.setQueryData(["authUser"], {
        id: user?.id,
        email: user?.email,
        name: user?.name,
      });
    },
    onError: (error) => {
      console.error("useSingIn fail", error);
    },
  });
};

export const useSingUp = () => {
  return useMutation({
    mutationFn: (params: SignUpParams) => onSignUp(params),
    onSuccess: async () => {
      // DeviseTokenAuthの仕様で、自動ログインが走るため、強制的にサインアウトする
      await onSignOut();
    },
    onError: (error) => {
      console.error("useSingUp fail", error);
    },
  });
};

export const useSingOut = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => onSignOut(),

    onSuccess: () => {
      queryClient.setQueryData(["authUser"], null);
      // 認証情報を完全削除
      // queryClient.removeQueries({ queryKey: ["authUser"] });
    },
  });
};
