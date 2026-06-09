import { Email } from '@/domain/value_objects/auth/email'
import { Password } from '@/domain/value_objects/auth/password'
import { BaseEntity } from '@/domain/entities/share/base_entity'

export class SignInParams extends BaseEntity<SignInParams> {
  private _email: Email
  private _password: Password

  constructor(email: Email, password: Password) {
    super()
    this._email = email
    this._password = password
  }

  // 新規エンティティの生成
  static create(email: Email, password: Password) {
    return new SignInParams(email, password)
  }

  public delete() {
    // 削除時のロジックがあれば書く
  }

  get email(): Email {
    return this._email
  }

  get password(): Password {
    return this._password
  }
  toRequestData() {
    return {
      email: this.email.value,
      password: this.password.value,
    }
  }
}
