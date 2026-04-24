import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  fetchTodosByUserId,
  createTodo,
  updateTodo,
  bulkDeleteTodo,
} from "@/domain/service_layer/todo/todo_api_service";
import { TodoParams } from "@/domain/entities/todo/todo_params";

export const useTodosById = (id: number | undefined) => {
  return useQuery({
    queryKey: ["todos"], // IDごとにキャッシュ分離
    queryFn: () => {
      return fetchTodosByUserId();
    },
    enabled: !!id, // idがあるときだけ実行
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (todo: TodoParams) => {
      return createTodo(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, todo }: { id: number; todo: TodoParams }) => {
      return updateTodo(id, todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useBulkDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return bulkDeleteTodo();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
