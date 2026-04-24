import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { SEVERITY } from "@/shared/constants/severity";
import { useMessageContext } from "@/presentation/contexts/message_context";
import { useSingUp } from "@/presentation/hooks/auth_hook";
import { useLoadingContext } from "@/presentation/contexts/loding_context";
import { COMMON_ERROR_MESSAGES } from "@/shared/constants/common_error_message";

import { UserName } from "@/domain/value_objects/auth/username";
import { Email } from "@/domain/value_objects/auth/email";
import { Password } from "@/domain/value_objects/auth/password";
import { SignUpParams } from "@/domain/entities/auth/sign_up_params";

// サインアップ用ページ
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const singUp = useSingUp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const { showMessage } = useMessageContext();
  const { openLoading, closeLoading } = useLoadingContext();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      openLoading();

      showMessage(
        "ユーザーアカウントを登録しています....しばらくお待ちください",
        SEVERITY.INFO,
      );

      const params = SignUpParams.create(
        new UserName(form.name),
        new Email(form.email),
        new Password(form.password),
        new Password(form.passwordConfirmation),
      );
      await singUp.mutateAsync(params);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      showMessage("サインアップが完了しました", SEVERITY.SUCCESS);
      navigate("/signin");
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : COMMON_ERROR_MESSAGES.UNEXPECTED_ERROR;
      showMessage(message, SEVERITY.ERROR);
    } finally {
      closeLoading();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
              name="name"
              variant="outlined"
              required
              fullWidth
              label="Name"
              value={form.name}
              margin="dense"
              onChange={handleChange}
            />

            <TextField
              name="email"
              variant="outlined"
              required
              fullWidth
              label="Email"
              value={form.email}
              margin="dense"
              onChange={handleChange}
            />

            <TextField
              name="password"
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              value={form.password}
              margin="dense"
              autoComplete="current-password"
              placeholder="At least 8 characters"
              onChange={handleChange}
            />

            <TextField
              name="passwordConfirmation"
              variant="outlined"
              required
              fullWidth
              label="Password Confirmation"
              type="password"
              value={form.passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              placeholder="At least 8 characters"
              onChange={handleChange}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={
                !form.name ||
                !form.email ||
                !form.password ||
                !form.passwordConfirmation
              }
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
