import { type ReactNode } from "react";
import { useAuth } from "@/presentation/hooks/auth_hook";
import {
  AuthContext,
  type AuthContextType,
} from "@/presentation/contexts/auth_context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useAuth();

  const value: AuthContextType = {
    authData: data,
    isLoading,
    isAuthenticated: !!data,
    refetch,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
