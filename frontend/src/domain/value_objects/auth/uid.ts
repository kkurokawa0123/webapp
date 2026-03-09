import { BaseValueObject } from "../share/base_value_objext";

type UidValue = string;
export class Uid extends BaseValueObject<UidValue, "Uid"> {
  constructor(value: UidValue) {
    super(value);
  }
  protected validate(value: UidValue): void {
    if (value.length < 1) {
      throw new Error("XXXXは必須です");
    }
  }
}
