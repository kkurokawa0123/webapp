import { describe, it, expect } from 'vitest'
import { Password } from '@/domain/value_objects/auth/password'

// パスワードはA-Z 、 a-zをそれぞれ1文字以上使用した最大12文字以内
describe('Password', () => {
  describe('正常系', () => {
    it('パスワード: 文字数8 (大文字小文字含む', () => {
      const password = new Password('Password')
      expect(password.value).toBe('Password')
    })
    it('パスワード: 文字数12 (大文字小文字含む', () => {
      const password = new Password('P' + 'a'.repeat(11))
      expect(password.value).toBe('P' + 'a'.repeat(11))
    })
  })
  describe('異常系', () => {
    it('パスワード: 空文字', () => {
      expect(() => new Password('')).toThrow('パスワードは入力必須です')
    })
    it('パスワード: 文字数7', () => {
      expect(() => new Password('P' + 'a'.repeat(6))).toThrow(
        'パスワードは大文字（A–Z）と小文字を（a–z）を含んだ8文字以上13文字未満で設定してください',
      )
    })
    it('パスワード: 文字数13', () => {
      expect(() => new Password('P' + 'a'.repeat(12))).toThrow(
        'パスワードは大文字（A–Z）と小文字を（a–z）を含んだ8文字以上13文字未満で設定してください',
      )
    })
    it('パスワード: すべて大文字', () => {
      expect(() => new Password('A'.repeat(10))).toThrow(
        'パスワードは大文字（A–Z）と小文字を（a–z）を含んだ8文字以上13文字未満で設定してください',
      )
    })
    it('パスワード: すべて小文字', () => {
      expect(() => new Password('a'.repeat(10))).toThrow(
        'パスワードは大文字（A–Z）と小文字を（a–z）を含んだ8文字以上13文字未満で設定してください',
      )
    })
  })
})
