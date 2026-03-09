import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";

type NickNameValue = string;
export class NickName extends BaseValueObject<NickNameValue, "NickName"> {
  constructor(value: NickNameValue) {
    super(value);
  }
  protected validate(value: NickNameValue): void {
    if (value != null && value.length < 10) {
      throw new Error("XXXXは１０文字以上です");
    }
  }
}
