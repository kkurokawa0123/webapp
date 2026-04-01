import React, { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { AuthContext } from "@/common/contexts/AuthContext";
import { AuthAppService } from "@/domain/application_service/auth_app_service";
import { AuthRepository } from "@/infrastructure/repository/auth_repository";

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
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const repository = new AuthRepository();
  const appService = new AuthAppService(repository);

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await appService.signOut();

      if (response.status === 200) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        setAuthState((prev) => ({
          ...prev,
          isSignedIn: false,
          currentUser: response?.data.data,
        }));
        // setIsSignedIn(false);
        navigate("/signin");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
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
            loading={authState.loading}
            isSignedIn={authState.isSignedIn}
            handleSignOut={handleSignOut}
          />
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
