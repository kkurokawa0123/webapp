import { useState } from "react";

import { type ReactNode } from "react";
import { type Todo_type, TODO_TYPE } from "@/domain/datas/@types/TodoFilter";

import {
  TodoStatusContext,
  type TodoStatusContextType,
} from "@/presentation/contexts/todo_status_context";

export const TodoFilterProvider = ({ children }: { children: ReactNode }) => {
  const [todoType, setTodoType] = useState<Todo_type>(TODO_TYPE.A);

  const onSetTodoFilter = (type: Todo_type) => {
    setTodoType(type);
  };

  const value: TodoStatusContextType = {
    todoFilter: todoType,
    onSetTodoFilter: onSetTodoFilter,
  };

  return (
    <TodoStatusContext.Provider value={value}>
      {children}
    </TodoStatusContext.Provider>
  );
};
