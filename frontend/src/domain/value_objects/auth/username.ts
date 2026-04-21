import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";

type UserNameValue = string;

export class UserName extends BaseValueObject<UserNameValue, "UserName"> {
  constructor(value: UserNameValue) {
    super(value, "UserName");
  }
  protected validate(value: UserNameValue): void {
    if (value.length < 1) {
      throw new Error("ユーザ名は必須です");
    }
  }
}
