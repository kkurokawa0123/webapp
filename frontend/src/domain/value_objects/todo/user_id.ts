import { BaseValueObject } from '@/domain/value_objects/share/base_value_objext'

type UserIdValue = number

export class UserId extends BaseValueObject<UserIdValue, 'UserId'> {
  constructor(value: UserIdValue) {
    super(value, 'UserId')
  }
  protected validate(value: UserIdValue): void {
    if (!value) {
      throw new Error('ユーザー情報が取得できません')
    }
  }
}
