import { useState } from "react";

import { useAuthContex } from "@/presentation/contexts/auth_context";
import { useLoadingContext } from "@/presentation/contexts/loding_context";
import { useTodoById } from "@/presentation/hooks/todo_hook";

import { TodoList } from "@/presentation/views/pages/Todos/partial/TodoList";
import { TodoAddFormDialog } from "@/presentation/views/pages/Todos/partial/TodoAddFormDialog";
import { TodoActionButton } from "@/presentation/views/pages/Todos/partial/TodoActionButton";

const TodoMain: React.FC = () => {
  const [todoName, setTodoname] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { openLoading, closeLoading } = useLoadingContext();
  openLoading();
  const { authData, isAuthenticated } = useAuthContex();
  const id = authData?.id;
  const { data, isLoading } = useTodoById(id);

  const handleToggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen);
    setTodoname("");
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTodoname(e.target.value);
  };
  const handleSubmit = () => {};

  if (!id || isLoading) return;

  closeLoading();

  return (
    <>
      {isAuthenticated && authData ? (
        <>
          <div>
            <h1>Welcome To Todos</h1>
            <h2>Email:{authData.email}</h2>
            <h2>Name:{authData.name}</h2>
          </div>
          <TodoAddFormDialog
            name={todoName}
            dialogOpen={dialogOpen}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onToggleDialog={handleToggleDialog}
          />
          <TodoList todos={data} />
          <TodoActionButton onToggleDialog={handleToggleDialog} />
        </>
      ) : (
        <>
          <h1>エラーTodo Main</h1>
        </>
      )}
    </>
  );
};
export default TodoMain;
