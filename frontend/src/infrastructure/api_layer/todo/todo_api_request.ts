import type { AxiosResponse } from "axios";
import { ApiRequest } from "@/infrastructure/api/api_request";
import type { ResponseData } from "@/domain/datas/api/todo_data";

export const requestFetchTodosById = async (
  id: number | undefined,
): Promise<AxiosResponse<ResponseData>> => {
  return ApiRequest.get(`/todos/${id}`);
};
