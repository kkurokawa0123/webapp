import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Person from "@mui/icons-material/Person";
import { SEVERITY } from "@/domain/datas/@types/Severity";
import { type Todo_type } from "@/domain/datas/@types/TodoFilter";
import { TODO_TYPE } from "@/domain/datas/@types/TodoFilter";
import { useAuthContex } from "@/presentation/contexts/auth_context";
import { useMessageContext } from "@/presentation/contexts/message_context";
import { useTodoStatusContext } from "@/presentation/contexts/todo_status_context";
import { useSingOut } from "@/presentation/hooks/auth_hook";
import { TodoSideBar } from "@/presentation/views/pages/Todos/partial/TodoSideBar";

type Props = {
  todoFilter: Todo_type;
  loading: boolean;
  isSignedIn: boolean;
  onToggleDrawer: () => void;
  handleSignOut: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<void>;
};

const toConvertTodoStatus = (arg: Todo_type) => {
  switch (arg) {
    case TODO_TYPE.ALL:
      return "すべてのタスク";
    case TODO_TYPE.UNCHECK:
      return "未完了のタスク";
    case TODO_TYPE.CHECK:
      return "完了したタスク";
    case TODO_TYPE.TRASH:
      return "ごみ箱";
    default:
      return "TODO";
  }
};

const AuthButtons = (props: Props) => {
  if (props.loading) return null;

  return (
    <AppBar>
      <Toolbar>
        {props.isSignedIn ? (
          <>
            {/* 左側（メニュー） */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={props.onToggleDrawer}
              >
                <Person />
              </IconButton>
              <Typography
                component={RouterLink}
                to="/"
                variant="h6"
                color="inherit"
              >
                {toConvertTodoStatus(props.todoFilter)}
              </Typography>
            </Box>
            {/* 右側（ログアウト） */}
            <Box sx={{ ml: "auto" }}>
              <Button
                color="inherit"
                sx={{ textTransform: "none" }}
                onClick={props.handleSignOut}
              >
                ログアウト
              </Button>
              <Button
                component={RouterLink}
                to="/passwordchange"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                パスワード変更
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
              <Button
                component={RouterLink}
                to="/signin"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                ログイン
              </Button>
              <Button
                component={RouterLink}
                to="/signup"
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                アカウント新規登録
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { todoFilter, onSetTodoFilter } = useTodoStatusContext();
  const { isAuthenticated, isLoading } = useAuthContex();
  const { showMessage } = useMessageContext();
  const singOut = useSingOut();

  const handleToggleDrawer = () => {
    setDrawerOpen((drawerOpen) => !drawerOpen);
  };

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      await singOut.mutateAsync();
      showMessage("サインアウトしました", SEVERITY.SUCCESS);
    } catch (err) {
      showMessage("サインアウトに失敗しました", SEVERITY.ERROR);
      throw err;
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AuthButtons
          todoFilter={todoFilter}
          onToggleDrawer={handleToggleDrawer}
          loading={isLoading}
          isSignedIn={isAuthenticated}
          handleSignOut={handleSignOut}
        />
      </Box>
      <TodoSideBar
        drawerOpen={drawerOpen}
        onToggleDrawer={handleToggleDrawer}
        onFilter={onSetTodoFilter}
      />
    </>
  );
};
export default Header;
