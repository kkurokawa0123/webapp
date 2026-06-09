import { ApiRequest } from "@/infrastructure/api/api_request";
import { TodoParams } from "@/domain/entities/todo/todo_params";

export const requestFetchTodosById = async () => {
  return ApiRequest.get(`/todos`);
};

export const requestCreateTodo = async (todo_params: TodoParams) => {
  const datas = todo_params.toRequestCreateData();
  return ApiRequest.post(`/todos`, { todo: datas });
};

export const requestUpdateTodo = async (
  id: number,
  todo_params: TodoParams,
) => {
  const datas = todo_params.toRequestUpdateData(id);
  return ApiRequest.put(`/todos/${id}`, { todo: datas });
};

export const requestBulkDeleteTodo = async () => {
  return ApiRequest.patch(`/todos/bulk_delete`);
};
