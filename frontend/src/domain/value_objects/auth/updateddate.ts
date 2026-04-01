import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";

type UpdatedDateValue = Date;
export class UpdatedDate extends BaseValueObject<
  UpdatedDateValue,
  "UpdatedDate"
> {
  constructor(value: UpdatedDateValue) {
    super(value);
  }
  protected validate(value: UpdatedDateValue): void {
    if (isNaN(value.getTime())) {
      throw new Error("XXXXは不正な時間です");
    }
  }
}
