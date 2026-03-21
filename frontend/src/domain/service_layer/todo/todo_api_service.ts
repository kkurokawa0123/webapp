import * as api from "@/infrastructure/api_layer/todo/todo_api_request";
import { HTTP_STATUS } from "@/domain/datas/api/http_status";
import type { ResponseData } from "@/domain/datas/api/todo_data";

export const fetchTodosById = async (
  id: number | undefined,
): Promise<ResponseData> => {
  const response = await api.requestFetchTodosById(id);
  if (response.status === HTTP_STATUS.OK) {
    console.log("TODO情報取得成功", response.data);
  }
  return response.data as ResponseData;
};
