import { describe, it, expect } from 'vitest'

import { SignInParams } from '@/domain/entities/auth/sign_in_params'

import { Email } from '@/domain/value_objects/auth/email'
import { Password } from '@/domain/value_objects/auth/password'

describe('SignInParams', () => {
  const validData = () => ({
    email: new Email('test@example.com'),
    password: new Password('Password1234'),
  })
  describe('正常系', () => {
    it('インスタンス生成できる', () => {
      const { email, password } = validData()

      const entity = SignInParams.create(email, password)

      expect(entity.email.value).toBe('test@example.com')
      expect(entity.password.value).toBe('Password1234')
    })
  })
})
