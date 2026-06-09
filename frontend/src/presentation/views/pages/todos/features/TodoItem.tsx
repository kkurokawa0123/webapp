import { useState } from 'react'
import Icon from '@mui/material/Icon'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import Undo from '@mui/icons-material/Undo'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import { lightBlue, pink, grey } from '@mui/material/colors'
import type { Todo } from '@/shared/types/todo'
import { TODO_FILTER_TYPE } from '@/shared/constants/todo_filter_type'
import { useTodoStatusContext } from '@/presentation/contexts/todo_status_context'
import { IS_DONE_STATUS } from '@/shared/constants/is_done_status'
import { IS_TRASHED_STATUS } from '@/shared/constants/is_trashed_status'
import { type TodoForm } from '@/presentation/views/shared/types/todoForm'

const TodoCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  padding: theme.spacing(1),
  fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
  width: '320px',
}))

const Form = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  fontSize: '16px',
}))

const ButtonContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}))

const CustomButton = styled('button')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}))

const Trash = styled('button')(() => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  outline: 'none',
}))

export type TodoItemProps = {
  todo: Todo
  onUpdateTodo: (id: number, form: TodoForm) => Promise<void>
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdateTodo }) => {
  const { todoFilter } = useTodoStatusContext()

  const [form, setForm] = useState<TodoForm>({
    name: todo.name,
    memo: todo.memo,
    is_done: todo.is_done ? IS_DONE_STATUS.CHECKED : IS_DONE_STATUS.UNCHECKED,
    is_trashed: todo.is_trashed ? IS_TRASHED_STATUS.CHECKED : IS_TRASHED_STATUS.UNCHECKED,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleUpdateTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V,
  ) => {
    // setForm({ ...form, [key]: value });
    const updatedForm = { ...form, [key]: value }
    setForm(updatedForm)
    onUpdateTodo(id, updatedForm)
  }

  return (
    <TodoCard key={todo.id}>
      <Form>
        <TextField
          name="name"
          aria-label={`todo-${todo.name}`}
          fullWidth
          variant="standard"
          value={form.name}
          onChange={handleChange}
          // onBlur={() => onUpdateTodo(todo.id, "name", value)}
        />
        <ButtonContainer>
          <CustomButton
            name="is_done"
            aria-label={`todo-check-${todo.name}`}
            onClick={() =>
              // onUpdateTodo(todo.id, "is_done", Number(!todo.is_done))
              handleUpdateTodo(todo.id, 'is_done', Number(!form.is_done))
            }
            disabled={todoFilter === TODO_FILTER_TYPE.TRASH}
          >
            {todo.is_done ? (
              <Icon
                aria-label={`todo-removed-${todo.name}`}
                style={{
                  color: todoFilter !== TODO_FILTER_TYPE.TRASH ? pink.A200 : grey[500],
                }}
              >
                <CheckCircleOutlineIcon />
              </Icon>
            ) : (
              <Icon
                aria-label={`todo-removed-${todo.name}`}
                style={{
                  color: todoFilter !== TODO_FILTER_TYPE.TRASH ? lightBlue[500] : grey[500],
                }}
              >
                <RadioButtonUncheckedIcon />
              </Icon>
            )}
            <Typography
              style={{
                userSelect: 'none',
                color:
                  todo.is_done && todoFilter !== TODO_FILTER_TYPE.TRASH ? pink.A200 : grey[500],
              }}
            >
              Done
            </Typography>
          </CustomButton>
          <Button
            aria-label={`todo-updated-${todo.name}`}
            variant="contained"
            color="primary"
            onClick={
              () => handleUpdateTodo(todo.id, 'name', form.name)
              // () => onUpdateTodo(todo.id, "name", todoName)
            }
            disabled={form.name.length === 0}
          >
            タスク名称更新
          </Button>
          <Trash
            name="is_trashed"
            aria-label={`todo-trash-${todo.name}`}
            onClick={() =>
              // onUpdateTodo(todo.id, "is_trashed", Number(!todo.is_trashed))
              handleUpdateTodo(todo.id, 'is_trashed', Number(!form.is_trashed))
            }
          >
            {todo.is_trashed && !todo.is_deleted ? (
              <Icon aria-label={`todo-undo-${todo.name}`} style={{ color: lightBlue[500] }}>
                <Undo />
              </Icon>
            ) : (
              <Icon aria-label={`todo-delete-${todo.name}`} style={{ color: grey[500] }}>
                <DeleteIcon />
              </Icon>
            )}
          </Trash>
        </ButtonContainer>
      </Form>
    </TodoCard>
  )
}
