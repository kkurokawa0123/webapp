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
        id: user.id,
        email: user.email,
        name: user.name,
      });
    },
    onError: (error) => {
      console.error("hook1サインインエラー", error);
    },
    // onSettled: () => {
    //   console.log("処理の成功か否かに関わらず、データ更新の処理が完了した際の副作用として使用することができます。");
    // },
  });
};

export const useSingUp = () => {
  // const queryClient = useQueryClient();

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
      console.error("hook1サインアップ成功", user);
      // queryClient.setQueryData(["authUser"], {
      //   id: user.id,
      //   email: user.email,
      //   name: user.name,
      // });
    },
    onError: (error) => {
      console.error("hook1サインアップエラー", error);
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
