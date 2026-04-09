import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Undo from "@mui/icons-material/Undo";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";
import { lightBlue, pink, grey } from "@mui/material/colors";

import type { Todo } from "@/domain/datas/api/todo_data";

import { TODO_TYPE } from "@/domain/datas/@types/TodoFilter";
import { useTodoStatusContext } from "@/presentation/contexts/todo_status_context";
import { useState } from "react";

const TodoCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
  width: "320px",
}));

const Form = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  fontSize: "16px",
}));

const ButtonContainer = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

const CustomButton = styled("button")(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  background: "none",
  border: "none",
  cursor: "pointer",
  outline: "none",
}));

const Trash = styled("button")(() => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  outline: "none",
}));

export type TodoItemProps = {
  todo: Todo;
  onUpdateTodo: <K extends keyof Todo>(
    id: number,
    key: K,
    value: Todo[K],
  ) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateTodo }) => {
  const [todoName, setTodoName] = useState(todo.name);
  const { todoFilter } = useTodoStatusContext();

  return (
    <TodoCard key={todo.id}>
      <Form>
        <TextField
          aria-label={`todo-${todo.name}`}
          fullWidth
          variant="standard"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          // onBlur={() => onUpdateTodo(todo.id, "name", value)}
        />
        <ButtonContainer>
          <CustomButton
            aria-label={`todo-check-${todo.name}`}
            onClick={() =>
              onUpdateTodo(todo.id, "isDone", todo.isDone === 1 ? 0 : 1)
            }
            disabled={todoFilter === "deleted"}
          >
            {todo.isDone ? (
              <Icon
                aria-label={`todo-removed-${todo.name}`}
                style={{
                  color: todoFilter !== TODO_TYPE.TRASH ? pink.A200 : grey[500],
                }}
              >
                <CheckCircleOutlineIcon />
              </Icon>
            ) : (
              <Icon
                aria-label={`todo-removed-${todo.name}`}
                style={{
                  color:
                    todoFilter !== TODO_TYPE.TRASH ? lightBlue[500] : grey[500],
                }}
              >
                <RadioButtonUncheckedIcon />
              </Icon>
            )}
            <Typography
              style={{
                userSelect: "none",
                color:
                  todo.isDone && todoFilter !== TODO_TYPE.TRASH
                    ? pink.A200
                    : grey[500],
              }}
            >
              Done
            </Typography>
          </CustomButton>
          <Button
            aria-label={`todo-updated-${todo.name}`}
            variant="contained"
            color="primary"
            onClick={() => onUpdateTodo(todo.id, "name", todoName)}
            disabled={todoName.length === 0}
          >
            タスク名称更新
          </Button>
          <Trash
            aria-label={`todo-trash-${todo.name}`}
            onClick={() =>
              onUpdateTodo(todo.id, "isTrashed", todo.isTrashed === 1 ? 0 : 1)
            }
          >
            {todo.isTrashed && !todo.isDeleted ? (
              <Icon
                aria-label={`todo-undo-${todo.name}`}
                style={{ color: lightBlue[500] }}
              >
                <Undo />
              </Icon>
            ) : (
              <Icon
                aria-label={`todo-delete-${todo.name}`}
                style={{ color: grey[500] }}
              >
                <DeleteIcon />
              </Icon>
            )}
          </Trash>
        </ButtonContainer>
      </Form>
    </TodoCard>
  );
};
