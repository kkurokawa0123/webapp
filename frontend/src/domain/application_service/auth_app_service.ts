import type { AxiosResponse } from "axios";

import type { IAuthRepository } from "@/domain/interface_repository/Iauth_repository";
import type {
  ReqestSignUp,
  ReqestSignIn,
  ResponseData,
} from "@/common/api_params/auth";

export class AuthAppService {
  private _authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this._authRepository = authRepository;
  }

  async signUp(params: ReqestSignUp): Promise<AxiosResponse<ResponseData>> {
    return await this._authRepository.requestSignUp(params);
  }
  async signIn(params: ReqestSignIn): Promise<AxiosResponse<ResponseData>> {
    return await this._authRepository.requestSignIn(params);
  }

  async signOut(): Promise<AxiosResponse<ResponseData>> {
    return await this._authRepository.requestSignOut();
  }
  async getCurrentUser(): Promise<AxiosResponse<ResponseData>> {
    return await this._authRepository.requestrGetCurrentUser();
  }
}
