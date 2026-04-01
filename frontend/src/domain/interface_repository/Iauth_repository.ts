import type { AxiosResponse } from "axios";
import type {
  ReqestSignIn,
  ReqestSignUp,
  ResponseData,
} from "@/common/api_params/auth";

export interface IAuthRepository {
  requestSignUp(params: ReqestSignUp): Promise<AxiosResponse<ResponseData>>;
  requestSignIn(params: ReqestSignIn): Promise<AxiosResponse<ResponseData>>;
  requestSignOut(): Promise<AxiosResponse<ResponseData>>;
  requestrGetCurrentUser(): Promise<AxiosResponse<ResponseData>>;
}
