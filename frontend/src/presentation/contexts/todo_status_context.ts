import { type Todo_type } from "@/domain/datas/@types/TodoFilter";
import { createContext, useContext } from "react";

export type TodoStatusContextType = {
  todoFilter: Todo_type;
  onSetTodoFilter: (todo_type: Todo_type) => void;
};

export const TodoStatusContext = createContext<
  TodoStatusContextType | undefined
>({} as TodoStatusContextType);

export const useTodoStatusContext = () => {
  const context = useContext(TodoStatusContext);
  if (!context) {
    throw new Error("useAuth must be used within TodoStatusProvider");
  }
  return context;
};
