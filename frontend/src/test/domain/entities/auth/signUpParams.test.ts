import { describe, it, expect } from "vitest";

import { SignUpParams } from "@/domain/entities/auth/sign_up_params";
import { UserName } from "@/domain/value_objects/auth/username";
import { Email } from "@/domain/value_objects/auth/email";
import { Password } from "@/domain/value_objects/auth/password";

describe("SignUpParams", () => {
  const validData = () => ({
    userName: new UserName("taro"),
    email: new Email("test@example.com"),
    password: new Password("Password1234"),
    passwordConfirmation: new Password("Password1234"),
  });

  it("正常な場合インスタンス生成できる", () => {
    const { userName, email, password, passwordConfirmation } = validData();

    const entity = SignUpParams.create(
      userName,
      email,
      password,
      passwordConfirmation,
    );
    expect(entity.userName.value).toBe("taro");
    expect(entity.email.value).toBe("test@example.com");
    expect(entity.password.value).toBe("Password1234");
    expect(entity.passwordConfirmation.value).toBe("Password1234");
  });
  it("パスワード不一致でエラー", () => {
    const { userName, email, password } = validData();

    const passwordConfirmation = new Password("Password1230");

    expect(() =>
      SignUpParams.create(userName, email, password, passwordConfirmation),
    ).toThrow("新パスワードと確認用パスワードの値が異なります");
  });
});
