import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "@/common/contexts/AuthContext";
import CommonLayout from "@/components/views/layouts/CommonLayout";
// import Home from "@/components/views/pages/Home";
import TodoMain from "@/components/views/pages/Todos/TodoMain";
import SignIn from "@/components/views/pages/SignIn";
import SignUp from "@/components/views/pages/SignUp";

import { AuthAppService } from "@/domain/application_service/auth_app_service";
import { AuthRepository } from "@/infrastructure/repository/auth_repository";
import type { AuthState } from "@/domain/auth_state";

const repository = new AuthRepository();
const appService = new AuthAppService(repository);

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    loading: true,
    isSignedIn: false,
    currentUser: undefined,
  });

  // const [loading, setLoading] = useState<boolean>(true);
  // const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  // const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await appService.getCurrentUser();
        console.log("現在のログインユーザの取得", response);
        if (response.data.is_login) {
          setAuthState((prev) => ({
            ...prev,
            isSignedIn: true,
            currentUser: response?.data.data,
          }));

          // setIsSignedIn(true);
          // setCurrentUser(response?.data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
        }));
        // setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!authState.loading) {
      if (authState.isSignedIn) {
        return children;
      } else {
        return <Navigate to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
      }}
    >
      <CommonLayout>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <Private>
                <TodoMain />
              </Private>
            }
          />
        </Routes>
      </CommonLayout>
    </AuthContext.Provider>
  );
};

export default App;
