import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import {
  fetchTodosByUserId,
  createTodo,
  updateTodo,
  bulkDeleteTodo,
} from '@/domain/services/todo/todo_api_service'
import { TodoParams } from '@/domain/entities/todo/todo_params'
import { queryKeys } from '@/shared/query_keys/query_keys'

export const useTodosById = () => {
  return useQuery({
    queryKey: queryKeys.todo.key, // ユーザーIDはuseAuthから取得するため、クエリキーには含めない
    queryFn: fetchTodosByUserId,
  })
}

export const useCreateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (todo: TodoParams) => {
      return createTodo(todo)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.todo.key,
      })
    },
  })
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: TodoParams }) => {
      return updateTodo(id, todo)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.todo.key,
      })
    },
  })
}

export const useBulkDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => {
      return bulkDeleteTodo()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.todo.key,
      })
    },
  })
}
