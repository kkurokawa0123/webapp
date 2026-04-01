import type { Todo } from "@/domain/datas/api/todo_data";

type Props = {
  todos: Todo[] | undefined;
};

export const TodoList = (props: Props) => {
  return (
    <>
      <div>
        <div>
          <h2>タスク一覧</h2>
        </div>
        <div>
          <ul>
            {props.todos?.map((todo) => {
              return (
                <li key={todo.id}>
                  <h3>{todo.name}</h3>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
export default TodoList;
