import { ApiRequest } from "@/infrastructure/api/api_request";
import type { ApiResponse, Todo } from "@/domain/datas/api/todo_data";

export const requestFetchTodosById = async (id: number | undefined) => {
  return ApiRequest.get<ApiResponse<Todo[]>>(`/todos/${id}`);
};
