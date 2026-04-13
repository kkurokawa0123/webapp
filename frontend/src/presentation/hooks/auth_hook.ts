import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  getAuthUser,
  onSignIn,
  onSignUp,
  onSignOut,
} from "@/domain/service_layer/auth/auth_api_service";

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
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      onSignIn({ email, password }),
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
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => onSignUp({ name, email, password }),
    onSuccess: (user) => {
      // サインアップでは、サーバーキャッシュに情報を保存しない
      console.log("useSingUp success", user);
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
