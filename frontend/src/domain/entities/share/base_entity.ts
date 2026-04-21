import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";

type ToPrimitive<T> =
  T extends BaseValueObject<infer U, "ToPrimitive">
    ? U
    : T extends object
      ? { [K in keyof T]: ToPrimitive<T[K]> }
      : T;

export abstract class BaseEntity<T> {
  constructor() {}
  toRequestData(): ToPrimitive<T> {
    const result = {} as ToPrimitive<T>;

    Object.entries(this).forEach(([key, value]) => {
      if (value instanceof BaseValueObject) {
        (result as Record<string, unknown>)[key] = value.value;
      } else {
        (result as Record<string, unknown>)[key] = value;
      }
    });

    return result;
  }
}
