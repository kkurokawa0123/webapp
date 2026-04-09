import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  fetchTodosByUserId,
  createTodo,
  updateTodo,
  bulkDeleteTodo,
} from "@/domain/service_layer/todo/todo_api_service";
import type {
  RequestTodoCreate,
  RequestTodoUpdate,
  RequestTodoDelete,
} from "@/domain/datas/api/todo_data";

export const useTodosById = (id: number | undefined) => {
  return useQuery({
    queryKey: ["todos", id], // IDごとにキャッシュ分離
    queryFn: () => {
      return fetchTodosByUserId(id);
    },
    enabled: !!id, // idがあるときだけ実行
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: RequestTodoCreate) => {
      return createTodo(todo);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["todos", variables.user_id],
      });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: RequestTodoUpdate) => {
      return updateTodo(todo.id, todo);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["todos", variables.user_id],
      });
    },
  });
};

export const useBulk_deleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (param: RequestTodoDelete) => {
      return bulkDeleteTodo(param.user_id);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["todos", variables.user_id],
      });
    },
  });
};
