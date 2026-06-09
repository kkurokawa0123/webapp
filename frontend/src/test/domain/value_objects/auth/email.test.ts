import { describe, it, expect } from 'vitest'
import { Email } from '@/domain/value_objects/auth/email'

describe('Email', () => {
  describe('正常系', () => {
    it('Email: 1.test@example.com 2. test.taro@gmail.com', () => {
      const email = new Email('test@example.com')
      expect(email.value).toBe('test@example.com')
      const email2 = new Email('test.taro@gmail.com')
      expect(email2.value).toBe('test.taro@gmail.com')
    })
  })
  describe('異常系', () => {
    it('Email: 空文字', () => {
      expect(() => new Email('')).toThrow('Eメールアドレスは入力必須です')
    })
    it('Email: 形式不正 @なし', () => {
      expect(() => new Email('test')).toThrow('Eメールアドレスの入力形式が不正です')
    })
    it('Email: 形式不正 @あり .なし', () => {
      expect(() => new Email('test@com')).toThrow('Eメールアドレスの入力形式が不正です')
      expect(() => new Email('test@cojp')).toThrow('Eメールアドレスの入力形式が不正です')
    })
    it('Email: 形式不正 空白ありsample@ test.com', () => {
      expect(() => new Email('sample@ test.com')).toThrow('Eメールアドレスの入力形式が不正です')
      expect(() => new Email('sample @test.com')).toThrow('Eメールアドレスの入力形式が不正です')
    })
  })
})
