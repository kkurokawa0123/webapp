import { describe, it, expect } from 'vitest'
import { PasswordChangeParams } from '@/domain/entities/auth/password_change_params'

import { Password } from '@/domain/value_objects/auth/password'

describe('PasswordChangeParams', () => {
  const validData = () => ({
    current_password: new Password('Password1234'),
    password: new Password('Password1230'),
    password_confirmation: new Password('Password1230'),
  })
  describe('正常系', () => {
    it('インスタンス生成できる', () => {
      const { current_password, password, password_confirmation } = validData()

      const entity = PasswordChangeParams.create(current_password, password, password_confirmation)
      expect(entity.currentPassword.value).toBe('Password1234')
      expect(entity.newPassword.value).toBe('Password1230')
      expect(entity.newPasswordConfirmation.value).toBe('Password1230')
    })
  })
  describe('異常系', () => {
    it('新しいパスワードと確認用パスワードが異なる場合', () => {
      const { current_password, password } = validData()
      const password_confirmation = new Password('Password1231')

      expect(() =>
        PasswordChangeParams.create(current_password, password, password_confirmation),
      ).toThrow('新パスワードと確認用パスワードの値が異なります。再度入力してください')
    })
  })
})
