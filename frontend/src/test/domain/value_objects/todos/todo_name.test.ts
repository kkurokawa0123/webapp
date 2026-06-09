import { describe, it, expect } from 'vitest'
import { TodoName } from '@/domain/value_objects/todo/todo_name'

describe('TodoName', () => {
  describe('正常系', () => {
    it('ユーザー名称: 最小1文字', () => {
      const userName = new TodoName('t')
      expect(userName.value).toBe('t')
    })
    it('ユーザー名称: 25文字', () => {
      const userName = new TodoName('a'.repeat(25))
      expect(userName.value).toBe('a'.repeat(25))
    })
  })

  describe('異常系', () => {
    it('ユーザー名称: 空文字', () => {
      expect(() => new TodoName('')).toThrow('タスク名は入力必須です')
    })

    it('ユーザー名称: 文字数超え 25文字オーバー', () => {
      expect(() => new TodoName('a'.repeat(26))).toThrow('タスク名は25字以内で入力してください')
    })
  })
})
