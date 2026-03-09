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
export interface ResponseUser {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
}
