import type { ReactNode } from "react";
import { useAuth } from "@/components/hooks/auth_hook";

import type { AuthContextType } from "@/components/contexts/auth_context";
import { AuthContext } from "@/components/contexts/auth_context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useAuth();

  const value: AuthContextType = {
    authData: data ?? null,
    isLoading,
    isAuthenticated: !!data,
    refetch,
  };
  console.log("AuthProvider_認証状態");
  console.log("AuthProvider_value", value);
  console.log("AuthProvider_isLoading", value.isLoading);
  console.log("AuthProvider_isAuthenticated", value.isAuthenticated);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
