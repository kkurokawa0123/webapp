import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { getAuthUser, onSignIn, onSignUp, onSignOut } from '@/domain/services/auth/auth_api_service'
import { SignUpParams } from '@/domain/entities/auth/sign_up_params'
import { SignInParams } from '@/domain/entities/auth/sign_in_params'
import { queryKeys } from '@/shared/query_keys/query_keys'

export const useAuth = () => {
  return useQuery({
    queryKey: queryKeys.authUser.key,
    queryFn: getAuthUser,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: false,
  })
}

export const useSingIn = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: SignInParams) => onSignIn(params),
    onSuccess: (user) => {
      queryClient.setQueryData(queryKeys.authUser.key, {
        id: user?.id,
        email: user?.email,
        name: user?.name,
      })
    },
    onError: (error) => {
      console.error('useSingIn fail', error)
    },
  })
}

export const useSingUp = () => {
  return useMutation({
    mutationFn: (params: SignUpParams) => onSignUp(params),
    onSuccess: async () => {
      // DeviseTokenAuthの仕様で、自動ログインが走るため、強制的にサインアウトする
      await onSignOut()
    },
    onError: (error) => {
      console.error('useSingUp fail', error)
    },
  })
}

export const useSingOut = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => onSignOut(),
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.authUser.key, null)
    },
    onError: (error) => {
      console.error('useSingOut fail', error)
    },
  })
}
