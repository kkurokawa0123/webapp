import { ApiRequest } from "@/infrastructure/api/api_request";
import type { RequestTodoCreate } from "@/domain/datas/api/todo_data";
import type { RequestTodoUpdate } from "@/domain/datas/api/todo_data";

export const requestFetchTodosById = async () => {
  return ApiRequest.get(`/todos`);
};

export const requestCreateTodo = async (todo: RequestTodoCreate) => {
  return ApiRequest.post(`/todos`, { todo });
};

export const requestUpdateTodo = async (
  id: number,
  todo: RequestTodoUpdate,
) => {
  return ApiRequest.put(`/todos/${id}`, { todo });
};

export const requestBulkDeleteTodo = async (user_id: number | undefined) => {
  return ApiRequest.patch(`/todos/bulk_delete?user_id=${user_id}`);
};
