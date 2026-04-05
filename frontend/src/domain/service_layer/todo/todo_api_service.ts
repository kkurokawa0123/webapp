import * as api from "@/infrastructure/api_layer/todo/todo_api_request";
import { HTTP_STATUS } from "@/domain/datas/api/http_status";
import type { Todo, ApiResponse } from "@/domain/datas/api/todo_data";
import type {
  RequestTodoCreate,
  RequestTodoUpdate,
} from "@/domain/datas/api/todo_data";

export const fetchTodosByUserId = async (
  id: number | undefined,
): Promise<Todo[]> => {
  // ) => {
  const response = await api.requestFetchTodosById(id);
  // プログレスバー起動確認用
  // await new Promise((resolve) => setTimeout(resolve, 7000));
  if (response.status === HTTP_STATUS.OK) {
    console.log("TODO情報取得成功", response.data);
  } else {
    console.log("TODO情報取得失敗", response.status);
    throw new Error("FETCH_TODO_FAILED");
  }
  const apiResponse = response.data as ApiResponse<Todo[]>;
  const todos = apiResponse.data as Todo[];
  return todos;
};

export const createTodo = async (todo: RequestTodoCreate): Promise<Todo> => {
  const response = await api.requestCreateTodo(todo);
  if (response.status === HTTP_STATUS.CREATED) {
    console.log("TODO作成成功", response.data);
  } else {
    console.log("TODO作成失敗", response.status);
    throw new Error("CREATE_TODO_FAILED");
  }
  return response.data as Todo;
};

export const updateTodo = async (
  id: number,
  todo: RequestTodoUpdate,
): Promise<Todo> => {
  console.log("serviceTodoUpdate開始");
  const response = await api.requestUpdateTodo(id, todo);
  return response.data as Todo;
};

export const deleteTodo = async (
  user_id: number | undefined,
): Promise<Todo> => {
  const response = await api.requestDeleteTodo(user_id);
  console.log("serviceTodoDelete結果", response);
  return response.data as Todo;
};
