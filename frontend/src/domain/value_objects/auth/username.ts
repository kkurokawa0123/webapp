import { BaseValueObject } from "../share/base_value_objext";

type UserNameValue = string;

export class UserName extends BaseValueObject<UserNameValue, "UserName"> {
  constructor(value: UserNameValue) {
    super(value);
  }
  protected validate(value: UserNameValue): void {
    if (value.length < 1) {
      throw new Error("ユーザ名は必須です");
    }
  }
}
