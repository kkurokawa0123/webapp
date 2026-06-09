import { useState } from 'react'
import { type ReactNode } from 'react'
import { type Todo_Filter_Type, TODO_FILTER_TYPE } from '@/shared/constants/todo_filter_type'
import {
  TodoStatusContext,
  type TodoStatusContextType,
} from '@/presentation/contexts/todo_status_context'

export const TodoFilterProvider = ({ children }: { children: ReactNode }) => {
  const [todoType, setTodoType] = useState<Todo_Filter_Type>(TODO_FILTER_TYPE.ALL)

  const onSetTodoFilter = (type: Todo_Filter_Type) => {
    setTodoType(type)
  }

  const value: TodoStatusContextType = {
    todoFilter: todoType,
    onSetTodoFilter: onSetTodoFilter,
  }

  return <TodoStatusContext.Provider value={value}>{children}</TodoStatusContext.Provider>
}
