import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

import { styled } from "@mui/material/styles";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import AlertMessage from "../utils/AlertMessage";
import { AuthContext } from "../../../common/contexts/AuthContext";
import { signIn } from "../../../infrastructure/repository/auth_repository";
import { Email } from "../../../domain/value_objects/auth/email";
import { Password } from "../../../domain/value_objects/auth/password";
import type { ResponseUser } from "../../../common/api_body_values/auth";

export const ContainerBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  flexGrow: 1,
  textTransform: "none",
}));

export const HeaderBox = styled(Box)(() => ({
  textAlign: "center",
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400,
}));

export const SpacingBox = styled(Box)(() => ({
  marginTop: "2rem",
}));

export const StyledLink = styled("a")(() => ({
  textDecoration: "none",
}));

// サインイン用ページ
const SignIn: React.FC = () => {
  //

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const _email = new Email(email);
      const _password = new Password(password);

      const res = await signIn({
        email: _email.value,
        password: _password.value,
      });
      console.log(res);
      if (res.status === 200) {
        // ログインに成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);
        setIsSignedIn(true);
        const data = res?.data.data as ResponseUser;
        console.log("ログインアカウント##デバック用");
        console.log("ログインアカウントEMAIL##デバック用");
        console.log(data.email);
        console.log("ログインアカウント名前##デバック用");
        console.log(data.name);
        setCurrentUser(data);
        navigate("/");
        console.log("ログイン成功##デバック用");
        console.log("Signed in successfully!");
      } else {
        console.log("ログイン失敗##デバック用");
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log("ログイン処理例外##デバック用");
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
        <Card>
          <CardHeader title="Sign In" />
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
              disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
              onClick={handleSubmit}
            >
              Submit
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
      <AlertMessage // エラーが発生した場合はアラートを表示
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid emai or password"
      />
    </>
  );
};
export default SignIn;
