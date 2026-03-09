import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthContext } from "@/common/contexts/AuthContext";
import CommonLayout from "@/components/views/layouts/CommonLayout";
import Home from "@/components/views/pages/Home";
import SignIn from "@/components/views/pages/SignIn";
import SignUp from "@/components/views/pages/SignUp";

import { AuthAppService } from "@/domain/application_service/auth_app_service";
import { AuthRepository } from "@/infrastructure/repository/auth_repository";
import type { User } from "@/common/api_body_values/auth";

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const repository = new AuthRepository();
  const appService = new AuthAppService(repository);

  const fetchUser = async () => {
    try {
      const response = await appService.getCurrentUser();
      console.log("現在のログインユーザの取得");
      console.log(response);
      if (response?.data.is_login) {
        setIsSignedIn(true);
        setCurrentUser(response?.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページに促す
  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Navigate to="/signin" />;
      }
    } else {
      return <></>;
    }
  };

  return (
    // <Router>
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
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
                <Home />
              </Private>
            }
          />
        </Routes>
      </CommonLayout>
    </AuthContext.Provider>
  );
};

export default App;
