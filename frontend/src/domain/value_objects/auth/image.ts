import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";

type ImageValue = string;
export class Image extends BaseValueObject<ImageValue, "Image"> {
  constructor(value: ImageValue) {
    super(value);
  }
  protected validate(value: ImageValue): void {
    if (value != null && value.length > 100) {
      throw new Error("XXXXの長さは100以上です");
    }
  }
}
