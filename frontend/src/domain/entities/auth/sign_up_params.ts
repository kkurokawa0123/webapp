import { UserName } from "@/domain/value_objects/auth/username";
import { Email } from "@/domain/value_objects/auth/email";
import { Password } from "@/domain/value_objects/auth/password";

export class SignUpParams {
  private _userName: UserName;
  private _email: Email;
  private _password: Password;

  constructor(userName: UserName, email: Email, password: Password) {
    this._userName = userName;
    this._email = email;
    this._password = password;
  }

  // 新規エンティティの生成
  static create(userName: UserName, email: Email, password: Password) {
    return new SignUpParams(userName, email, password);
  }

  public delete() {
    // 削除時のロジックがあれば書く
  }

  get userName(): UserName {
    return this._userName;
  }

  get email(): Email {
    return this._email;
  }

  get password(): Password {
    return this._password;
  }
}
