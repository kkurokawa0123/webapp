import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import AlertMessage from "@/components/views/utils/AlertMessage";
import { useSingIn } from "@/components/hooks/auth_hook";

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
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const singIn = useSingIn();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await singIn.mutateAsync({ email, password });

      navigate("/");
      console.log("Signed in successfully!");
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
      console.log("サインイン致命的エラー", err);
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
              disabled={!email || !password} // 空欄があった場合はボタンを押せないように
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
