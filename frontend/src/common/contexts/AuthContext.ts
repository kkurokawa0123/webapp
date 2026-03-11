import { createContext } from "react";

import type { AuthState } from "@/domain/auth_state";

type AuthContextType = {
  // loading: boolean;
  // setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // isSignedIn: boolean;
  // setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  // currentUser: User | undefined;
  // setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  authState: AuthState;
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>;
};
// グローバルで扱う変数・関数
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
