import { useQuery } from "@tanstack/react-query";
import { fetchTodosById } from "@/domain/service_layer/todo/todo_api_service";

export const useTodoById = (id: number | undefined) => {
  return useQuery({
    queryKey: ["todo", id], // IDごとにキャッシュ分離
    queryFn: () => {
      if (!id) throw new Error("id is undefined");
      return fetchTodosById(id);
    },
    // enabled: id !== undefined,
    enabled: !!id, // idがあるときだけ実行
  });
};
