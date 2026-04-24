import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";

type MemoValue = string;

export class Memo extends BaseValueObject<MemoValue, "Memo"> {
  constructor(value: MemoValue) {
    super(value, "Memo");
  }
  protected validate(value: MemoValue): void {
    if (value.length > 40) {
      throw new Error("メモは40字以内で入力してください");
    }
  }
}
