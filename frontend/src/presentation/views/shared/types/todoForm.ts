import { type IsDoneStatus } from '@/shared/constants/is_done_status'

import { type IsTrashedStatus } from '@/shared/constants/is_trashed_status'

type IsDoneValue = IsDoneStatus
type IsTrashedValue = IsTrashedStatus

export type TodoForm = {
  name: string
  memo: string
  is_done: IsDoneValue
  is_trashed: IsTrashedValue
}
