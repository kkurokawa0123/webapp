import { createContext } from "react";

import type { User } from "../api_body_values/auth";

type AuthContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSignedIn: boolean;
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};
// グローバルで扱う変数・関数
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);
