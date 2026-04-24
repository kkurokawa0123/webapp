import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";
import {
  IS_TRASHED_STATUS,
  type IsTrashedStatus,
} from "@/shared/constants/is_trashed_status";

type IsTrasheValue = IsTrashedStatus;

export class IsTrashed extends BaseValueObject<IsTrasheValue, "IsTrashed"> {
  constructor(value: IsTrasheValue) {
    super(value, "IsTrashed");
  }
  protected validate(value: IsTrasheValue): void {
    if (!Object.values(IS_TRASHED_STATUS).includes(value)) {
      throw new Error("無効なステータスです。");
    }
  }
}
