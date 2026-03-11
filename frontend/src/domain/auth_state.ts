import type { User } from "@/common/api_params/auth";

export type AuthState = {
  loading: boolean;
  isSignedIn: boolean;
  currentUser?: User;
};
