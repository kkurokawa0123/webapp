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
    staleTime: 1000 * 60 * 5, // 5分キャッシュ
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
        id: user.data.id,
        email: user.data.email,
        name: user.data.name,
      });
    },
  });
};

export const useSingUp = () => {
  const queryClient = useQueryClient();

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
      queryClient.setQueryData(["authUser"], user);
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

  // return useMutation({
  //   mutationFn: onSignOut,
  //   onSuccess: () => {
  //     queryClient.setQueryData(["authUser"], null);
  //   },
  // });
};
