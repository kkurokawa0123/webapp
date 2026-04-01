export interface ApiResponse<T> {
  data: T;
  // is_login: boolean;
}

export interface Todo {
  id: number;
  name: string;
  is_done: boolean;
  is_deleted: boolean;
  memo: string;
  userName: string;
}
