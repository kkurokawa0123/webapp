import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "@/components/views/providers/AuthProvider";
import CommonLayout from "@/components/views/layouts/CommonLayout";
import TodoMain from "@/components/views/pages/Todos/TodoMain";
import SignIn from "@/components/views/pages/SignIn";
import SignUp from "@/components/views/pages/SignUp";

import { useAuthContex } from "@/components/contexts/auth_context";

const queryClient = new QueryClient();

const PrivateRoute = () => {
  const { authData, isLoading, isAuthenticated } = useAuthContex();
  // const isAuthenticated = !!authState.authData;
  console.log("1.AuthProvider_認証状態");
  console.log("XX.AuthProvider_data", authData);
  // console.log("2.AuthProvider_isLoading", authData.isLoading);
  console.log("2.AuthProvider_isAuthenticated", isAuthenticated);

  if (isLoading) return null;
  console.log("3.PrivateRoute認証結果", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

const App: React.FC = () => {
  // const authState = useAuthContex();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CommonLayout>
          <Routes>
            {/* <Route
              path="/"
              element={
                authState.authData ? (
                  <Navigate to="/todomain" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            /> */}

            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todomain" element={<TodoMain />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<TodoMain />} />
            </Route>
          </Routes>
        </CommonLayout>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
