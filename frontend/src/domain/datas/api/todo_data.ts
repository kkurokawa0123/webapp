export interface RequestTodoCreate {
  name: string;
  memo: string;
  user_id: number | undefined;
}

export type RequestTodoUpdate = {
  id: number;
} & Partial<Omit<Todo, "id">> & {
    user_id?: number;
  };

export interface RequestTodoDelete {
  // id: number;
  user_id: number | undefined;
}

// export interface RequestTodoUpdate<K extends keyof Todo, V extends Todo[K]> {
//   K: V;
// }

export interface ApiResponse<T> {
  data: T;
  // is_login: boolean;
}

export interface Todo {
  id: number;
  name: string;
  isDone: number;
  isDeleted: number;
  memo: string;
  userName: string;
  isTrashed: number;
}

export interface Todo2 {
  id: number;
  name: string;
  isDone: number;
  isDeleted: number;
  memo: string;
  userName: string;
  isTrashed: number;
}
