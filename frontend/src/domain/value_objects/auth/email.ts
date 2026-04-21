import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";

type EmailValue = string;
export class Email extends BaseValueObject<EmailValue, "Email"> {
  constructor(value: EmailValue) {
    super(value, "Email");
  }
  protected validate(value: EmailValue): void {
    if (value.length < 1) {
      throw new Error("XXXXは必須です");
    }
  }
}
