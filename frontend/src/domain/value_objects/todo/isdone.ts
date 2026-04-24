import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";
import {
  IS_DONE_STATUS,
  type IsDoneStatus,
} from "@/shared/constants/is_done_status";

type IsDoneValue = IsDoneStatus;

export class IsDone extends BaseValueObject<IsDoneValue, "IsDone"> {
  constructor(value: IsDoneValue) {
    super(value, "IsDone");
  }
  protected validate(value: IsDoneValue): void {
    if (!Object.values(IS_DONE_STATUS).includes(value)) {
      throw new Error("無効なステータスです。");
    }
  }
}
