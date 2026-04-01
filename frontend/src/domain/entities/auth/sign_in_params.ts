import { Email } from "@/domain/value_objects/auth/email";
import { Password } from "@/domain/value_objects/auth/password";

export class SignInParams {
  private _email: Email;
  private _password: Password;

  constructor(email: Email, password: Password) {
    this._email = email;
    this._password = password;
  }

  public delete() {
    // 削除時のロジックがあれば書く
  }

  get email(): Email {
    return this._email;
  }

  get passwrd(): Password {
    return this._password;
  }
}
