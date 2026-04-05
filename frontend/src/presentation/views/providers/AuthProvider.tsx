import { type ReactNode } from "react";
import { useAuth } from "@/presentation/hooks/auth_hook";

import {
  AuthContext,
  type AuthContextType,
} from "@/presentation/contexts/auth_context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useAuth();

  const value: AuthContextType = {
    authData: data ?? null,
    isLoading,
    isAuthenticated: !!data,
    refetch,
  };
  console.log("認証情報の取得");
  console.log("AuthProvider:value", value);
  console.log("AuthProvider:isLoading", value.isLoading);
  console.log("AuthProvider:isAuthenticated", value.isAuthenticated);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
