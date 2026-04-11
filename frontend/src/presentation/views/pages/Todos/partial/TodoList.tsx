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

  console.log("props.todos値", props.todos);
  const filteredTodos = props.todos?.filter((todo) => {
    switch (todoFilter) {
      case TODO_TYPE.ALL:
        return !todo.is_trashed;
      case TODO_TYPE.CHECK:
        console.log(
          "TODO_TYPE.CHECK値",
          todo.name,
          todo.is_done,
          !todo.is_trashed,
          todo.is_done && !todo.is_trashed,
        );
        return todo.is_done && !todo.is_trashed;
      case TODO_TYPE.UNCHECK:
        return !todo.is_done && !todo.is_trashed;
      case TODO_TYPE.TRASH:
        return todo.is_trashed && !todo.is_deleted;
      default:
        return !todo.is_deleted;
    }
  });
  console.log("todoFilter値", todoFilter);
  console.log("ユーザー別TodoList_filteredTodos", filteredTodos);

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
