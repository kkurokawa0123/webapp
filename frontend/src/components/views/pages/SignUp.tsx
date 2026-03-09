import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { AuthContext } from "../../../common/contexts/AuthContext";
import AlertMessage from "../utils/AlertMessage";

import { AuthAppService } from "../../../domain/application_service/auth_app_service";
import { AuthRepository } from "../../../infrastructure/repository/auth_repository";

import { UserName } from "../../../domain/value_objects/auth/username";
import { Email } from "../../../domain/value_objects/auth/email";
import { Password } from "../../../domain/value_objects/auth/password";

import type { ResponseData, User } from "../../../common/api_body_values/auth";

// サインアップ用ページ
const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      console.log("登録開始");

      const _username = new UserName(name);
      const _email = new Email(email);
      const _password = new Password(password);

      const repository = new AuthRepository();
      const appService = new AuthAppService(repository);

      const response = await appService.signUp({
        name: _username.value,
        email: _email.value,
        password: _password.value,
      });

      console.log(response);

      if (response.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", response.headers["access-token"]);
        Cookies.set("_client", response.headers["client"]);
        Cookies.set("_uid", response.headers["uid"]);

        setIsSignedIn(true);
        const data = response?.data as ResponseData;
        const user = data.data as User;

        setCurrentUser(user);

        navigate("/");

        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
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
