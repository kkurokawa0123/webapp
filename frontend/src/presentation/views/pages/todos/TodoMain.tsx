import { useState } from 'react'
import Typography from '@mui/material/Typography'
import CreateIcon from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAuthContex } from '@/presentation/contexts/auth_context'
import { useLoadingContext } from '@/presentation/contexts/loding_context'
import {
  useTodosById,
  useCreateTodo,
  useUpdateTodo,
  useBulkDeleteTodo,
} from '@/presentation/hooks/todo_hook'
import { TodoList } from '@/presentation/views/pages/todos/features/TodoList'
import { TodoAddFormDialog } from '@/presentation/views/pages/todos/features/TodoAddFormDialog'
import { TodoActionButton } from '@/presentation/views/pages/todos/features/TodoActionButton'
import { TodoAlertDialog } from '@/presentation/views/pages/todos/features/TodoAlertDialog'
import { useMessageContext } from '@/presentation/contexts/message_context'
import { useTodoStatusContext } from '@/presentation/contexts/todo_status_context'
import { TODO_FILTER_TYPE } from '@/shared/constants/todo_filter_type'
import { SEVERITY } from '@/shared/constants/severity'
import { COMMON_ERROR_MESSAGES } from '@/shared/constants/common_error_message'
import { TodoName } from '@/domain/value_objects/todo/todo_name'
import { Memo } from '@/domain/value_objects/todo/memo'
import { IsDone } from '@/domain/value_objects/todo/is_done'
import { IsTrashed } from '@/domain/value_objects/todo/is_trashed'
import { UserId } from '@/domain/value_objects/todo/user_id'
import { TodoParams } from '@/domain/entities/todo/todo_params'
import { IS_DONE_STATUS } from '@/shared/constants/is_done_status'
import { IS_TRASHED_STATUS } from '@/shared/constants/is_trashed_status'
import { type TodoForm } from '@/presentation/views/shared/types/todoForm'

const TodoMain: React.FC = () => {
  const [form, setForm] = useState<TodoForm>({
    name: '',
    memo: '',
    is_done: IS_DONE_STATUS.UNCHECKED,
    is_trashed: IS_TRASHED_STATUS.UNCHECKED,
  })
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  const { showMessage } = useMessageContext()
  const { openLoading, closeLoading } = useLoadingContext()
  const { authData, isAuthenticated } = useAuthContex()
  const { todoFilter } = useTodoStatusContext()
  const authData_id = isAuthenticated ? authData?.id : undefined
  const { data, isLoading } = useTodosById()

  const createTodo = useCreateTodo()
  const updateTodo = useUpdateTodo()
  const bulkDeleteTodo = useBulkDeleteTodo()

  if (!authData_id || isLoading) return

  const handleToggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen)
    setForm({
      name: '',
      memo: '',
      is_done: IS_DONE_STATUS.UNCHECKED,
      is_trashed: IS_TRASHED_STATUS.UNCHECKED,
    })
  }

  const handleChangeTodo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen)
  }

  const handleCreateTodo = async () => {
    try {
      openLoading()
      // （超重要）
      ;(document.activeElement as HTMLElement)?.blur()

      showMessage('入力したタスク内容を追加しています....しばらくお待ちください', SEVERITY.INFO)
      const params = TodoParams.create(
        new TodoName(form.name),
        new Memo(form.memo),
        new IsDone(form.is_done),
        new IsTrashed(form.is_trashed),
        new UserId(authData_id),
      )
      await createTodo.mutateAsync(params)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      showMessage('タスクを新たに追加しました', SEVERITY.SUCCESS)
      setDialogOpen(false)
    } catch (err) {
      const message =
        err instanceof Error && err.message ? err.message : COMMON_ERROR_MESSAGES.UNEXPECTED_ERROR

      showMessage(message, SEVERITY.ERROR)
    } finally {
      closeLoading()
    }
  }
  // const handleUpdateTodo = async <K extends keyof Todo, V extends Todo[K]>(
  const handleUpdateTodo = async (id: number, form: TodoForm) => {
    try {
      openLoading()
      showMessage('タスクを更新しています....しばらくお待ちください', SEVERITY.INFO)

      const params = TodoParams.create(
        new TodoName(form.name),
        new Memo(form.memo),
        new IsDone(form.is_done),
        new IsTrashed(form.is_trashed),
        new UserId(authData_id),
      )
      await updateTodo.mutateAsync({ id, todo: params })
      await new Promise((resolve) => setTimeout(resolve, 3000))
      showMessage('タスクの更新が完了しました', SEVERITY.SUCCESS)
    } catch (err) {
      showMessage('タスクの更新に失敗しました', SEVERITY.ERROR)
      throw err
    } finally {
      closeLoading()
    }
  }

  const handleDeleteTodo = async () => {
    try {
      openLoading()
      showMessage('指定したタスクを削除しています....しばらくお待ちください', SEVERITY.INFO)
      await bulkDeleteTodo.mutateAsync()
      await new Promise((resolve) => setTimeout(resolve, 3000))
      showMessage('タスクを削除しました', SEVERITY.SUCCESS)
    } catch (err) {
      showMessage('タスクの削除ができませんでした', SEVERITY.ERROR)
      throw err
    } finally {
      closeLoading()
    }
  }

  return (
    <>
      <TodoAddFormDialog
        todoName={form.name}
        dialogOpen={dialogOpen}
        onCreateTodo={handleCreateTodo}
        onChangeTodo={handleChangeTodo}
        onToggleDialog={handleToggleDialog}
      />
      {isAuthenticated && !!data?.length ? (
        <>
          <TodoList todos={data} onUpdateTodo={handleUpdateTodo} />
        </>
      ) : (
        <>
          {todoFilter === TODO_FILTER_TYPE.TRASH ? (
            <Typography variant="h5" color="text.secondary">
              ゴミ箱
              <DeleteIcon sx={{ fontSize: '1.2em', verticalAlign: 'middle', mx: 0.5 }} />
              は空の状態です
            </Typography>
          ) : (
            <Typography variant="h5" color="text.secondary">
              タスクが未登録です。右下の
              <CreateIcon sx={{ fontSize: '1.2em', verticalAlign: 'middle', mx: 0.5 }} />
              ボタンよりタスクの新規登録が行えます
            </Typography>
          )}
        </>
      )}
      <TodoActionButton
        isNotTrashedTodo={!(data?.some((todo) => todo.is_trashed && !todo.is_deleted) ?? false)}
        onToggleDialog={handleToggleDialog}
        onToggleAlert={handleToggleAlert}
      />
      <TodoAlertDialog
        alertOpen={alertOpen}
        onEmpty={handleDeleteTodo}
        onToggleAlert={handleToggleAlert}
      />
    </>
  )
}
export default TodoMain
