import { styled } from "@mui/material/styles";

import type { Todo } from "@/domain/datas/api/todo_data";
import { TODO_TYPE } from "@/domain/datas/@types/TodoFilter";

import { useTodoStatusContext } from "@/presentation/contexts/todo_status_context";
import { TodoItem } from "@/presentation/views/pages/Todos/partial/TodoItem";

// import { useState } from "react";

type Props = {
  todos: Todo[] | undefined;
  onUpdateTodo: <K extends keyof Todo>(
    id: number,
    key: K,
    value: Todo[K],
  ) => Promise<void>;
};

const Container = styled("div")({
  // margin: "0 auto",
  marginTop: "80px",
  maxWidth: "640px",
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
});

export const TodoList = (props: Props) => {
  const { todoFilter } = useTodoStatusContext();

  const filteredTodos = props.todos?.filter((todo) => {
    switch (todoFilter) {
      case TODO_TYPE.ALL:
        return !todo.isTrashed;
      case TODO_TYPE.CHECK:
        return todo.isDone && !todo.isTrashed;
      case TODO_TYPE.UNCHECK:
        return !todo.isDone && !todo.isTrashed;
      case TODO_TYPE.TRASH:
        return todo.isTrashed;
      default:
        return todo;
    }
  });

  return (
    <>
      <Container>
        {filteredTodos?.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdateTodo={props.onUpdateTodo}
          />
        ))}
      </Container>
    </>
  );
};
export default TodoList;
