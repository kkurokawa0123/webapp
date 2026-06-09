import { describe, it, expect } from 'vitest'
import { IsDone } from '@/domain/value_objects/todo/is_done'
import { IS_DONE_STATUS, type IsDoneStatus } from '@/shared/constants/is_done_status'

describe('IsDone', () => {
  describe('正常系', () => {
    it('IsDone: CHECKEDならインスタンス正常生成', () => {
      const isDone = new IsDone(IS_DONE_STATUS.CHECKED)
      expect(isDone.value).toBe(IS_DONE_STATUS.CHECKED)
    })
    it('IsDone: UNCHECKEDならインスタンス正常生成', () => {
      const isDone = new IsDone(IS_DONE_STATUS.UNCHECKED)
      expect(isDone.value).toBe(IS_DONE_STATUS.UNCHECKED)
    })
  })
  describe('異常系', () => {
    it('IsDone: 定義外の値', () => {
      expect(() => new IsDone(999 as unknown as IsDoneStatus)).toThrow('無効なステータスです。')
    })
    it('IsDone: nullならエラー', () => {
      expect(() => new IsDone(null as unknown as IsDoneStatus)).toThrow('無効なステータスです。')
    })
    it('IsDone: undefinedならエラー', () => {
      expect(() => new IsDone(undefined as unknown as IsDoneStatus)).toThrow(
        '無効なステータスです。',
      )
    })
  })
})
// it("正常系:チェック無, () => {
//   const userName = new IsDone(2);
//   expect(userName.value).toBe("t");
// });
// it("正常系:ユーザー名称-文字数上限 25文字", () => {
//   const userName = new TodoName("a".repeat(25));
//   expect(userName.value).toBe("a".repeat(25));
// });

// it("異常系:ユーザー名称:空文字", () => {
//   expect(() => new TodoName("")).toThrow("ユーザ名は入力必須です");
// });

// it("異常系:ユーザー名称:文字数超え 25文字オーバー", () => {
//   expect(() => new TodoName("a".repeat(25))).toThrow(
//     "ユーザ名は20字以内で入力してください",
//   );
// });
