import { Password } from "@/domain/value_objects/auth/password";
import { BaseEntity } from "@/domain/entities/share/base_entity";

export class PasswordChangeParams extends BaseEntity<PasswordChangeParams> {
  private current_password: Password;
  private password: Password;
  private password_confirmation: Password;

  private constructor(
    current_password: Password,
    password: Password,
    password_confirmation: Password,
  ) {
    super();

    this.current_password = current_password;
    this.password = password;
    this.password_confirmation = password_confirmation;

    this.assertPasswordConfirmationMatches();
  }

  static create(
    current_password: Password,
    password: Password,
    password_confirmation: Password,
  ) {
    return new PasswordChangeParams(
      current_password,
      password,
      password_confirmation,
    );
  }

  // 確認用パスワードと同一であること
  assertPasswordConfirmationMatches() {
    if (!this.password.equals(this.password_confirmation)) {
      throw new Error(
        "新パスワードと確認用パスワードの値が異なります。再度入力してください",
      );
    }
  }

  get currentPassword(): Password {
    return this.current_password;
  }
  get newPassword(): Password {
    return this.password;
  }
  get newPasswordConfirmation(): Password {
    return this.password_confirmation;
  }
}
