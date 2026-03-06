import { BaseValueObject } from "../share/base_value_objext";

type PasswordValue = string;
export class Password extends BaseValueObject<PasswordValue, "Password"> {
  constructor(value: PasswordValue) {
    super(value);
  }
  protected validate(value: PasswordValue): void {
    if (value.length < 1) {
      throw new Error("XXXXは必須です");
    }
  }
}
