import { TodoName } from "@/domain/value_objects/todo/todo_name";
import { Memo } from "@/domain/value_objects/todo/memo";
import { IsDone } from "@/domain/value_objects/todo/is_done";
import { IsTrashed } from "@/domain/value_objects/todo/is_trashed";
import { UserId } from "@/domain/value_objects/todo/user_id";
import { BaseEntity } from "@/domain/entities/share/base_entity";

export class TodoParams extends BaseEntity<TodoParams> {
  private _todoName: TodoName;
  private _memo: Memo;
  private _isDone: IsDone;
  private _isTrashed: IsTrashed;
  private _userId: UserId;

  constructor(
    todoName: TodoName,
    memo: Memo,
    isDone: IsDone,
    isTrashed: IsTrashed,
    userId: UserId,
  ) {
    super();
    this._todoName = todoName;
    this._memo = memo;
    this._isDone = isDone;
    this._isTrashed = isTrashed;
    this._userId = userId;
  }

  // 新規エンティティの生成
  static create(
    todoName: TodoName,
    memo: Memo,
    isDone: IsDone,
    isTrashed: IsTrashed,
    userId: UserId,
  ) {
    return new TodoParams(todoName, memo, isDone, isTrashed, userId);
  }

  public delete() {
    // 削除時のロジックがあれば書く
  }

  get todoName(): TodoName {
    return this._todoName;
  }
  get memo(): Memo {
    return this._memo;
  }

  get isDone(): IsDone {
    return this._isDone;
  }

  get isTrashed(): IsTrashed {
    return this._isTrashed;
  }
  get userId(): UserId {
    return this._userId;
  }

  toRequestCreateData() {
    return {
      name: this.todoName.value,
      memo: this.memo.value,
      user_id: this.userId.value,
    };
  }
  toRequestUpdateData(id: number) {
    return {
      id: id,
      name: this.todoName.value,
      memo: this.memo.value,
      is_done: this.isDone.value,
      is_trashed: this.isTrashed.value,
      user_id: this.userId.value,
    };
  }
}
