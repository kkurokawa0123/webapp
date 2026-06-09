import { describe, it, expect } from 'vitest'
import { IsTrashed } from '@/domain/value_objects/todo/is_trashed'

import { IS_TRASHED_STATUS, type IsTrashedStatus } from '@/shared/constants/is_trashed_status'

describe('IsTrashed', () => {
  describe('正常系', () => {
    it('IsTrashed: CHECKEDならインスタンス正常生成', () => {
      const isDone = new IsTrashed(IS_TRASHED_STATUS.CHECKED)
      expect(isDone.value).toBe(IS_TRASHED_STATUS.CHECKED)
    })
    it('IsTrashed: UNCHECKEDならインスタンス正常生成', () => {
      const isDone = new IsTrashed(IS_TRASHED_STATUS.UNCHECKED)
      expect(isDone.value).toBe(IS_TRASHED_STATUS.UNCHECKED)
    })
  })
  describe('異常系', () => {
    it('IsTrashed: 定義外の値', () => {
      expect(() => new IsTrashed(999 as unknown as IsTrashedStatus)).toThrow(
        '無効なステータスです。',
      )
    })
    it('IsTrashed: nullならエラー', () => {
      expect(() => new IsTrashed(null as unknown as IsTrashedStatus)).toThrow(
        '無効なステータスです。',
      )
    })
    it('IsTrashed: undefinedならエラー', () => {
      expect(() => new IsTrashed(undefined as unknown as IsTrashedStatus)).toThrow(
        '無効なステータスです。',
      )
    })
  })
})
