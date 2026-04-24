import { UserName } from "@/domain/value_objects/auth/username";
import { Email } from "@/domain/value_objects/auth/email";
import { Password } from "@/domain/value_objects/auth/password";
import { BaseEntity } from "@/domain/entities/share/base_entity";

export class SignUpParams extends BaseEntity<SignUpParams> {
  private _userName: UserName;
  private _email: Email;
  private _password: Password;
  private _password_confirmation: Password;

  constructor(
    userName: UserName,
    email: Email,
    password: Password,
    passwordConfirmation: Password,
  ) {
    super();
    this._userName = userName;
    this._email = email;
    this._password = password;
    this._password_confirmation = passwordConfirmation;

    this.assertPasswordConfirmationMatches();
  }

  // 新規エンティティの生成
  static create(
    userName: UserName,
    email: Email,
    password: Password,
    passwordConfirmation: Password,
  ) {
    return new SignUpParams(userName, email, password, passwordConfirmation);
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
  get passwordConfirmation(): Password {
    return this._password_confirmation;
  }
  // 確認用パスワードと同一であること
  assertPasswordConfirmationMatches() {
    if (!this.password.equals(this.passwordConfirmation)) {
      throw new Error(
        "新パスワードと確認用パスワードの値が異なります。再度入力してください",
      );
    }
  }

  toRequestData() {
    return {
      name: this.userName.value,
      email: this.email.value,
      password: this.password.value,
    };
  }
}
