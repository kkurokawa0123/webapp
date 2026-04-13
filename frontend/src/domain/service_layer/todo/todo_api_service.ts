import * as api from "@/infrastructure/api_layer/todo/todo_api_request";
import { HTTP_STATUS } from "@/domain/datas/api/http_status";
import type { Todo, ApiResponse } from "@/domain/datas/api/todo_data";
import type {
  RequestTodoCreate,
  RequestTodoUpdate,
} from "@/domain/datas/api/todo_data";

export const fetchTodosByUserId = async (
  id: number | undefined,
): Promise<Todo[] | undefined> => {
  try {
    const response = await api.requestFetchTodosById(id);
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("TodosByUserId failed");
    }
    const apiResponse = response.data as ApiResponse<Todo[]>;
    const todos = apiResponse.data as Todo[];
    return todos;
  } catch (err) {
    console.error("TodosByUserId failed");
    throw err;
  }
};

export const createTodo = async (
  todo: RequestTodoCreate,
): Promise<Todo | undefined> => {
  try {
    const response = await api.requestCreateTodo(todo);
    if (response.status !== HTTP_STATUS.CREATED) {
      throw new Error("createTodo failed");
    }
    return response.data as Todo;
  } catch (err) {
    console.error("createTodo failed");
    throw err;
  }
};

export const updateTodo = async (
  id: number,
  todo: RequestTodoUpdate,
): Promise<Todo | undefined> => {
  try {
    const response = await api.requestUpdateTodo(id, todo);
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("updateTodo failed");
    }
    return response.data as Todo;
  } catch (err) {
    console.error("updateTodo failed");
    throw err;
  }
};

export const bulkDeleteTodo = async (
  user_id: number | undefined,
): Promise<Todo | undefined> => {
  try {
    const response = await api.requestBulkDeleteTodo(user_id);
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("bulkDeleteTodo failed");
    }
    return response.data as Todo;
  } catch (err) {
    console.error("bulkDeleteTodo failed");
    throw err;
  }
};
