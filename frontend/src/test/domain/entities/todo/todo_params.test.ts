import { describe, it, expect } from 'vitest'

import { TodoParams } from '@/domain/entities/todo/todo_params'
import { TodoName } from '@/domain/value_objects/todo/todo_name'
import { Memo } from '@/domain/value_objects/todo/memo'
import { IsDone } from '@/domain/value_objects/todo/is_done'
import { IsTrashed } from '@/domain/value_objects/todo/is_trashed'
import { UserId } from '@/domain/value_objects/todo/user_id'

import {
  IS_DONE_STATUS,
  // type IsDoneStatus,
} from '@/shared/constants/is_done_status'
import {
  IS_TRASHED_STATUS,
  // type IsTrashedStatus,
} from '@/shared/constants/is_trashed_status'

describe('TodoParams', () => {
  const validData = () => ({
    todoName: new TodoName('taro'),
    memo: new Memo('memo'),
    isDone: new IsDone(IS_DONE_STATUS.UNCHECKED),
    isTrashed: new IsTrashed(IS_TRASHED_STATUS.UNCHECKED),
    userId: new UserId(10),
  })

  describe('正常系', () => {
    it('インスタンス生成できる', () => {
      const { todoName, memo, isDone, isTrashed, userId } = validData()

      const entity = TodoParams.create(todoName, memo, isDone, isTrashed, userId)
      expect(entity.todoName.value).toBe('taro')
      expect(entity.memo.value).toBe('memo')
      expect(entity.isDone.value).toBe(IS_DONE_STATUS.UNCHECKED)
      expect(entity.isTrashed.value).toBe(IS_TRASHED_STATUS.UNCHECKED)
      expect(entity.userId.value).toBe(10)
    })
  })
})
