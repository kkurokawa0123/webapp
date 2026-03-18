import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "@/components/views/providers/AuthProvider";
import CommonLayout from "@/components/views/layouts/CommonLayout";
import TodoMain from "@/components/views/pages/Todos/TodoMain";
import SignIn from "@/components/views/pages/SignIn";
import SignUp from "@/components/views/pages/SignUp";

// import { useAuth } from "@/components/hooks/auth_hook";
import { useAuthContex } from "@/components/contexts/auth_context";

const queryClient = new QueryClient();

const PrivateRoute = () => {
  // const { data, isLoading } = useAuth();
  const authState = useAuthContex();
  const isAuthenticated = !!authState.responseData;
  console.log("1.AuthProvider_認証状態");
  console.log("XX.AuthProvider_data", authState?.responseData);
  console.log("2.AuthProvider_isLoading", authState.isLoading);
  console.log("3.AuthProvider_isAuthenticated", isAuthenticated);

  if (authState.isLoading) return null;
  console.log("4.PrivateRoute認証結果", isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CommonLayout>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
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
