import { useState } from "react";

import { useAuthContex } from "@/presentation/contexts/auth_context";
import { useLoadingContext } from "@/presentation/contexts/loding_context";
import {
  useTodosById,
  useCreateTodo,
  useUpdateTodo,
  useBulk_deleteTodo,
} from "@/presentation/hooks/todo_hook";

import { TodoList } from "@/presentation/views/pages/Todos/partial/TodoList";
import { TodoAddFormDialog } from "@/presentation/views/pages/Todos/partial/TodoAddFormDialog";
import { TodoActionButton } from "@/presentation/views/pages/Todos/partial/TodoActionButton";
import { TodoAlertDialog } from "@/presentation/views/pages/Todos/partial/TodoAlertDialog";

import { SEVERITY } from "@/domain/datas/@types/Severity";
import { type Todo } from "@/domain/datas/api/todo_data";
import { useMessageContext } from "@/presentation/contexts/message_context";

const TodoMain: React.FC = () => {
  const [todoName, setTodoName] = useState("");
  const [todoMemo, setTodoMemo] = useState("固定メモ");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const { showMessage } = useMessageContext();
  const { openLoading, closeLoading } = useLoadingContext();
  const { authData, isAuthenticated } = useAuthContex();
  const authData_id = isAuthenticated ? authData.id : undefined;
  const { data, isLoading } = useTodosById(authData_id);
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const bulk_deleteTodo = useBulk_deleteTodo();

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

      // 🔽 これを追加（超重要）
      (document.activeElement as HTMLElement)?.blur();

      showMessage("タスク追加中....しばらくお待ちください", SEVERITY.SUCCESS);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      // 追加のAPI処理を呼ぶ
      await createTodo.mutateAsync({
        name: todoName,
        memo: todoMemo,
        user_id: authData_id,
      });
      closeLoading();
      // setDialogOpen((dialogOpen) => !dialogOpen);
      setDialogOpen(false); // ← ここはシンプルに
    } catch (err) {
      console.log(err);
      closeLoading();
      showMessage(
        "入力データに誤りがあります。再度正しい値を入力してください。",
        "error",
      );
      console.log("サインアップ致命的エラー", err);
    }
  };

  const handleToggleAlert = () => {
    setAlertOpen((alertOpen) => !alertOpen);
  };

  const handleEmpty = async () => {
    // setAlertOpen((alertOpen) => !alertOpen);
    openLoading();
    showMessage(
      "タスクを完全に削除しています....しばらくお待ちください",
      SEVERITY.SUCCESS,
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
    // 削除のAPI処理を呼ぶ
    await bulk_deleteTodo.mutateAsync({ user_id: authData_id });
    closeLoading();
  };

  const handleUpdateTodo = async <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V,
  ) => {
    openLoading();
    showMessage(
      "タスク情報を更新います....しばらくお待ちください",
      SEVERITY.SUCCESS,
    );
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await updateTodo.mutateAsync({
      id,
      [key]: value,
      user_id: authData_id,
    });
    closeLoading();
  };

  if (!authData_id || isLoading) return;
  return (
    <>
      {isAuthenticated && authData ? (
        <>
          <TodoAddFormDialog
            name={todoName}
            dialogOpen={dialogOpen}
            onSubmit={handleSubmit}
            onChange={handleChange}
            onToggleDialog={handleToggleDialog}
          />
          <TodoList todos={data} onUpdateTodo={handleUpdateTodo} />
          <TodoAlertDialog
            alertOpen={alertOpen}
            onEmpty={handleEmpty}
            onToggleAlert={handleToggleAlert}
          />
          <TodoActionButton
            isNotTrashedTodo={
              !(
                data?.some((todo) => todo.isTrashed && !todo.isDeleted) ?? false
              )
            }
            onToggleDialog={handleToggleDialog}
            onToggleAlert={handleToggleAlert}
          />
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
