import { useState } from "react";
import Typography from "@mui/material/Typography";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthContex } from "@/presentation/contexts/auth_context";
import { useLoadingContext } from "@/presentation/contexts/loding_context";
import {
  useTodosById,
  useCreateTodo,
  useUpdateTodo,
  useBulkDeleteTodo,
} from "@/presentation/hooks/todo_hook";
import { TodoList } from "@/presentation/views/pages/Todos/partial/TodoList";
import { TodoAddFormDialog } from "@/presentation/views/pages/Todos/partial/TodoAddFormDialog";
import { TodoActionButton } from "@/presentation/views/pages/Todos/partial/TodoActionButton";
import { TodoAlertDialog } from "@/presentation/views/pages/Todos/partial/TodoAlertDialog";
import { useMessageContext } from "@/presentation/contexts/message_context";
import { useTodoStatusContext } from "@/presentation/contexts/todo_status_context";
import { TODO_TYPE } from "@/domain/datas/@types/TodoFilter";
import { SEVERITY } from "@/domain/datas/@types/Severity";
import { type Todo } from "@/domain/datas/api/todo_data";
import { COMMON_MESSAGES } from "@/domain/datas/@types/Message";

const TodoMain: React.FC = () => {
  const [todoName, setTodoName] = useState("");
  const [todoMemo, setTodoMemo] = useState("固定メモ");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const { showMessage } = useMessageContext();
  const { openLoading, closeLoading } = useLoadingContext();
  const { authData, isAuthenticated } = useAuthContex();
  const { todoFilter } = useTodoStatusContext();
  const authData_id = isAuthenticated ? authData?.id : undefined;
  const { data, isLoading } = useTodosById(authData_id);
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const bulkDeleteTodo = useBulkDeleteTodo();

  const handleToggleDialog = () => {
    setDialogOpen((dialogOpen) => !dialogOpen);
    setTodoName("");
    setTodoMemo("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTodoName(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      openLoading();
      // （超重要）
      (document.activeElement as HTMLElement)?.blur();

      showMessage(
        "入力したタスク内容を追加しています....しばらくお待ちください",
        SEVERITY.INFO,
      );
      await createTodo.mutateAsync({
        name: todoName,
        memo: todoMemo,
        user_id: authData_id,
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));
      showMessage("タスクを新たに追加しました", SEVERITY.SUCCESS);

      setDialogOpen(false);
    } catch (err) {
      showMessage(COMMON_MESSAGES.VALIDATION_ERROR, SEVERITY.ERROR);

      throw err;
    } finally {
      closeLoading();
      setDialogOpen(false);
    }
  };

  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen);
  };

  const handleEmpty = async () => {
    try {
      openLoading();
      showMessage(
        "指定したタスクを削除しています....しばらくお待ちください",
        SEVERITY.INFO,
      );
      await bulkDeleteTodo.mutateAsync({ user_id: authData_id });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      showMessage("タスクを削除しました", SEVERITY.SUCCESS);
    } catch (err) {
      showMessage("タスクの削除ができませんでした", SEVERITY.ERROR);
      throw err;
    } finally {
      closeLoading();
    }
  };

  const handleUpdateTodo = async <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V,
  ) => {
    try {
      openLoading();
      showMessage(
        "タスクを更新しています....しばらくお待ちください",
        SEVERITY.INFO,
      );

      await updateTodo.mutateAsync({
        id,
        [key]: value,
        user_id: authData_id,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));

      showMessage("タスクの更新が完了しました", SEVERITY.SUCCESS);
    } catch (err) {
      showMessage("タスクの更新に失敗しました", SEVERITY.ERROR);

      throw err;
    } finally {
      closeLoading();
    }
  };

  if (!authData_id || isLoading) return;

  return (
    <>
      <TodoAddFormDialog
        name={todoName}
        dialogOpen={dialogOpen}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onToggleDialog={handleToggleDialog}
      />
      {isAuthenticated && !!data?.length ? (
        <>
          <TodoList todos={data} onUpdateTodo={handleUpdateTodo} />
        </>
      ) : (
        <>
          {todoFilter === TODO_TYPE.TRASH ? (
            <Typography variant="h5" color="text.secondary">
              ゴミ箱
              <DeleteIcon
                sx={{ fontSize: "1.2em", verticalAlign: "middle", mx: 0.5 }}
              />
              は空の状態です
            </Typography>
          ) : (
            <Typography variant="h5" color="text.secondary">
              タスクが未登録です。右下の
              <CreateIcon
                sx={{ fontSize: "1.2em", verticalAlign: "middle", mx: 0.5 }}
              />
              ボタンよりタスクの新規登録が行えます
            </Typography>
          )}
        </>
      )}
      <TodoActionButton
        isNotTrashedTodo={
          !(data?.some((todo) => todo.is_trashed && !todo.is_deleted) ?? false)
        }
        onToggleDialog={handleToggleDialog}
        onToggleAlert={handleToggleAlert}
      />
      <TodoAlertDialog
        alertOpen={alertOpen}
        onEmpty={handleEmpty}
        onToggleAlert={handleToggleAlert}
      />
    </>
  );
};
export default TodoMain;
