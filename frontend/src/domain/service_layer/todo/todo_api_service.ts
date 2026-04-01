import * as api from "@/infrastructure/api_layer/todo/todo_api_request";
import { HTTP_STATUS } from "@/domain/datas/api/http_status";
// import type { ResponseData } from "@/domain/datas/api/todo_data";
import type { Todo } from "@/domain/datas/api/todo_data";

export const fetchTodosById = async (
  id: number | undefined,
): Promise<Todo[]> => {
  const response = await api.requestFetchTodosById(id);
  // プログレスバー起動確認用
  // await new Promise((resolve) => setTimeout(resolve, 7000));
  if (response.status === HTTP_STATUS.OK) {
    console.log("TODO情報取得成功", response.data);
  }
  return response.data.data;
};
