import { ApiRequest } from "@/infrastructure/api/api_request";
// import type { ApiResponse, Todo } from "@/domain/datas/api/todo_data";
import type { RequestTodoCreate } from "@/domain/datas/api/todo_data";
import type { RequestTodoUpdate } from "@/domain/datas/api/todo_data";

export const requestFetchTodosById = async (id: number | undefined) => {
  // return ApiRequest.get<ApiResponse<Todo[]>>(`/todos/${id}`);
  return ApiRequest.get(`/todos/${id}`);
};

export const requestCreateTodo = async (todo: RequestTodoCreate) => {
  return ApiRequest.post(`/todos`, todo);
};

export const requestUpdateTodo = async (
  id: number,
  todo: RequestTodoUpdate,
) => {
  console.log("apiTodoUpdate開始");
  return ApiRequest.put(`/todos/${id}`, todo);
};

export const requestDeleteTodo = async (user_id: number | undefined) => {
  return ApiRequest.delete(`/todos/${user_id}`);
};
