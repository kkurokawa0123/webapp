import { BaseValueObject } from "@/domain/value_objects/share/base_value_objext";

type TodoNameValue = string;

export class TodoName extends BaseValueObject<TodoNameValue, "TodoName"> {
  constructor(value: TodoNameValue) {
    super(value, "TodoName");
  }
  protected validate(value: TodoNameValue): void {
    if (!value) {
      throw new Error("タスク名は入力必須です");
    }
    if (value.length > 25) {
      throw new Error("タスク名は25字以内で入力してください");
    }
  }
}
