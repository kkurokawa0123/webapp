import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuthContex } from "@/components/contexts/auth_context";

import { useSingOut } from "@/components/hooks/auth_hook";

type Props = {
  loading: boolean;
  isSignedIn: boolean;
  handleSignOut: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<void>;
};
const AuthButtons = (props: Props) => {
  if (props.loading) return null;

  return (
    <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
      {props.isSignedIn ? (
        <Button
          color="inherit"
          sx={{ textTransform: "none" }}
          onClick={props.handleSignOut}
        >
          ログアウト
        </Button>
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};

const Header: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthContex();
  const navigate = useNavigate();
  const singOut = useSingOut();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      await singOut.mutateAsync();

      // navigate("/signin");
      navigate("/signin");

      console.log("Succeeded in sign out");
    } catch (err) {
      console.log(err);
      console.log("サインアウト致命的エラー", err);
    }
  };

  return (
    <>
      {/* <Box sx={{ flexGrow: 1 }}> */}
      <Box>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography
              component={RouterLink}
              to="/"
              variant="h6"
              color="inherit"
            >
              メニュー
            </Typography>
            <AuthButtons
              loading={isLoading}
              isSignedIn={isAuthenticated}
              handleSignOut={handleSignOut}
            />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
export default Header;
