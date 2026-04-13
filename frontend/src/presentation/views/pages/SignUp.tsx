import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SEVERITY } from "@/domain/datas/@types/Severity";
import { useMessageContext } from "@/presentation/contexts/message_context";
import { useSingUp } from "@/presentation/hooks/auth_hook";
import { useLoadingContext } from "@/presentation/contexts/loding_context";

// サインアップ用ページ
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const singUp = useSingUp();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");

  const { showMessage } = useMessageContext();
  const { openLoading, closeLoading } = useLoadingContext();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      openLoading();

      showMessage(
        "ユーザーアカウントを登録しております....しばらくお待ちください",
        SEVERITY.INFO,
      );
      await singUp.mutateAsync({
        name,
        email,
        password,
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      showMessage("サインアップが完了しました", SEVERITY.SUCCESS);
      navigate("/signin");
    } catch (err) {
      showMessage(
        "入力データに誤りがあります。再度正しい値を入力してください。",
        SEVERITY.ERROR,
      );

      throw err;
    } finally {
      closeLoading();
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ mt: 6, display: "flex", justifyContent: "center" }}
      >
        <Card sx={{ p: 2, maxWidth: 400, width: "100%" }}>
          <CardHeader title="アカウント新規登録" sx={{ textAlign: "center" }} />

          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Name"
              value={name}
              margin="dense"
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={email}
              margin="dense"
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password Confirmation"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!name || !email || !password || !passwordConfirmation}
              sx={{
                mt: 2,
                textTransform: "none",
              }}
              onClick={handleSubmit}
            >
              登録
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
export default SignUp;
