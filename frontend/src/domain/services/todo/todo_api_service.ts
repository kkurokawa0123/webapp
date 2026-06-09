import axios from "axios";
import * as api from "@/infrastructure/api_services/todo/todo_api_request";
import { HTTP_STATUS } from "@/shared/constants/http_status";
import { type Todo } from "@/shared/types/todo";
import { type ApiResponse } from "@/shared/types/api/api_response";
// import type { Todo, ApiResponse } from "@/domain/datas/api/todo_data";
import { TodoParams } from "@/domain/entities/todo/todo_params";

export const fetchTodosByUserId = async (): Promise<Todo[] | undefined> => {
  try {
    const response = await api.requestFetchTodosById();
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("TodosByUserId failed");
    }
    const apiResponse = response.data as ApiResponse<Todo[]>;
    const todos = apiResponse.data as Todo[];
    return todos;
  } catch (err: unknown) {
    // APIコントローラーのエラーメッセージを受取
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.full_messages.join(", ") ||
        err.response?.data?.errors?.join(", ") ||
        "タスク情報の取得に失敗しました";
      throw new Error(message);
    } else {
      throw err;
    }
  }
};

export const createTodo = async (
  todo: TodoParams,
): Promise<Todo | undefined> => {
  try {
    const response = await api.requestCreateTodo(todo);
    if (response.status !== HTTP_STATUS.CREATED) {
      throw new Error("createTodo failed");
    }
    return response.data as Todo;
  } catch (err: unknown) {
    // APIコントローラーのエラーメッセージを受取
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.full_messages?.join(", ") ||
        err.response?.data?.errors?.join(", ") ||
        "タスク情報の登録に失敗しました";
      throw new Error(message);
    } else {
      throw err;
    }
  }
};

export const updateTodo = async (
  id: number,
  todo: TodoParams,
): Promise<Todo | undefined> => {
  try {
    const response = await api.requestUpdateTodo(id, todo);
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("updateTodo failed");
    }
    return response.data as Todo;
  } catch (err: unknown) {
    // APIコントローラーのエラーメッセージを受取
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.full_messages?.join(", ") ||
        err.response?.data?.errors?.join(", ") ||
        "タスク情報の更新に失敗しました";
      throw new Error(message);
    } else {
      throw err;
    }
  }
};

export const bulkDeleteTodo = async (): Promise<Todo | undefined> => {
  try {
    const response = await api.requestBulkDeleteTodo();
    if (response.status !== HTTP_STATUS.OK) {
      throw new Error("bulkDeleteTodo failed");
    }
    return response.data as Todo;
  } catch (err: unknown) {
    // APIコントローラーのエラーメッセージを受取
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.errors?.full_messages?.join(", ") ||
        err.response?.data?.errors?.join(", ") ||
        "タスク情報の削除に失敗しました";
      throw new Error(message);
    } else {
      throw err;
    }
  }
};
