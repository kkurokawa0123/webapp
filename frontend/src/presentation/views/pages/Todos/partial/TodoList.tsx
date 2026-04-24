import { styled } from "@mui/material/styles";
import type { Todo } from "@/shared/types/todo";
import { TODO_FILTER_TYPE } from "@/shared/constants/todo_filter_type";
import { useTodoStatusContext } from "@/presentation/contexts/todo_status_context";
import { TodoItem } from "@/presentation/views/pages/Todos/partial/TodoItem";
import { type TodoForm } from "@/presentation/views/shared/types/todoForm";

type Props = {
  todos: Todo[] | undefined;
  onUpdateTodo: (id: number, form: TodoForm) => Promise<void>;
};

const Container = styled("div")({
  marginTop: "80px",
  maxWidth: "640px",
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
});

export const TodoList = (props: Props) => {
  const { todoFilter } = useTodoStatusContext();
  const filteredTodos = props.todos?.filter((todo) => {
    switch (todoFilter) {
      case TODO_FILTER_TYPE.ALL:
        return !todo.is_trashed;
      case TODO_FILTER_TYPE.CHECK:
        return todo.is_done && !todo.is_trashed;
      case TODO_FILTER_TYPE.UNCHECK:
        return !todo.is_done && !todo.is_trashed;
      case TODO_FILTER_TYPE.TRASH:
        return todo.is_trashed && !todo.is_deleted;
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
