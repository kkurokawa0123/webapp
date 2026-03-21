export interface ReqestSignIn {
  email: string;
  password: string;
}

export interface ReqestSignUp {
  name: string;
  email: string;
  password: string;
}

// ユーザー
export interface ResponseData {
  data: User;
  is_login: boolean;
}

export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
}
export interface AuthAccount {
  id: number;
  email: string;
  name: string;
}
