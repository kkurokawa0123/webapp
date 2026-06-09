import { BaseValueObject } from '@/domain/value_objects/share/base_value_objext'

type ProviderValue = string
export class Provider extends BaseValueObject<ProviderValue, 'Provider'> {
  constructor(value: ProviderValue) {
    super(value, 'Provider')
  }
  protected validate(value: ProviderValue): void {
    if (value.length < 1) {
      throw new Error('XXXXは必須です')
    }
  }
}
