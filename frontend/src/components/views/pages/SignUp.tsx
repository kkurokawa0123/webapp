import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import AlertMessage from "@/components/views/utils/AlertMessage";
import { useSingUp } from "@/components/hooks/auth_hook";

// サインアップ用ページ
const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const singUp = useSingUp();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      console.log("サインアップ開始");
      await singUp.mutateAsync({ name, email, password });

      navigate("/");
      console.log("Signed in successfully!");
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
      console.log("サインアップ致命的エラー", err);
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
          <CardHeader title="Sign Up" sx={{ textAlign: "center" }} />

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
              Submit
            </Button>
          </CardContent>
        </Card>
      </Box>
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </>
  );
};
export default SignUp;
