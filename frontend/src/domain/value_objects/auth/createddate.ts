import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";

type CreatedDateValue = Date;
export class CreatedDate extends BaseValueObject<
  CreatedDateValue,
  "CreatedDate"
> {
  constructor(value: CreatedDateValue) {
    super(value);
  }
  protected validate(value: CreatedDateValue): void {
    if (isNaN(value.getTime())) {
      throw new Error("XXXXは不正な時間です");
    }
  }
}
