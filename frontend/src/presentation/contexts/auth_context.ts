import { createContext, useContext } from "react";
import type { AuthAccount } from "@/domain/datas/api/auth_data";

export type AuthContextType = {
  authData: AuthAccount;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  {} as AuthContextType,
);

export const useAuthContex = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
