import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  fetchCurrentUser,
  onSignIn,
  onSignUp,
} from "@/domain/service_layer/auth/auth_api_service";

export const useAuth = () => {
  return useQuery({
    queryKey: ["authUser"],
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export const useSingIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      onSignIn({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["authUser"], user);
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

  const signout = () => {
    queryClient.removeQueries({ queryKey: ["authUser"] });
  };

  return { signout };

  // return useMutation({
  //   mutationFn: onSignOut,
  //   onSuccess: () => {
  //     queryClient.setQueryData(["authUser"], null);
  //   },
  // });
};
