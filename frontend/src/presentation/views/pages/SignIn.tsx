import React, { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";

// import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { SEVERITY } from "@/domain/datas/@types/Severity";
import { useMessageContext } from "@/presentation/contexts/message_context";
import { useAuthContex } from "@/presentation/contexts/auth_context";
import { useSingIn } from "@/presentation/hooks/auth_hook";
import { useLoadingContext } from "@/presentation/contexts/loding_context";

// サインイン用ページ
const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isAuthenticated } = useAuthContex();
  const { showMessage } = useMessageContext();
  const { openLoading, closeLoading } = useLoadingContext();
  const singIn = useSingIn();

  if (isAuthenticated) {
    // navigate("/");
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openLoading();
    showMessage("ログイン中....しばらくお待ちください", SEVERITY.SUCCESS);

    try {
      await singIn.mutateAsync({
        email,
        password,
      });

      await new Promise((resolve) => setTimeout(resolve, 5000));
      closeLoading();

      navigate("/");
    } catch (err) {
      console.log(err);
      closeLoading();
      showMessage(
        "サインインに失敗しました。IDもしくはパスワードを確認してください。",
        SEVERITY.ERROR,
      );
      console.log("サインイン致命的エラー", err);
    }
  };
  return (
    <>
      <Box component="form" sx={{ display: "flex" }}>
        <Card>
          <CardHeader title="ログイン" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!email || !password} // 空欄があった場合はボタンを押せないように
              onClick={handleSubmit}
            >
              実行
            </Button>
            <Box textAlign="center">
              <Typography variant="body2">
                Don't have an account? &nbsp;
                <Link to="/signup">Sign Up now!</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
      {/* <ShowMessageAction // エラーが発生した場合はアラートを表示
        open={messageOpen}
        setOpen={setMessageOpen}
        severity={severity}
        message={messageContent}
      /> */}
    </>
  );
};
export default SignIn;
