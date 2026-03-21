import React from "react";
import { useAuthContex } from "@/components/contexts/auth_context";
import { useTodoById } from "@/components/hooks/todo_hook";
// import { Todo } from "@/domain/datas/api/todo_data";
// import type { ResponseData } from "@/domain/datas/api/todo_data";
// import { useNavigate } from "react-router-dom";

const TodoMain: React.FC = () => {
  const { authData, isAuthenticated } = useAuthContex();

  // const navigate = useNavigate();
  console.log("TodoMain表示前認証確認", isAuthenticated);
  // if (isAuthenticated) {
  //   navigate("/signin");
  // }
  const id = authData?.id;
  const { data, isLoading } = useTodoById(id);
  console.log("useTodoById結果data", data);

  if (!id || isLoading) return <div>Loading...</div>;

  return (
    <>
      {/* <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} /> */}
      {isAuthenticated && authData ? (
        <>
          <div>
            <h1>Welcome To Todos</h1>
            <h2>Email:{authData?.email}</h2>
            <h2>Name:{authData?.name}</h2>
          </div>

          <div>
            <div>
              <h2>タスク名</h2>
            </div>
            <ul>
              {data?.data.map((todo) => {
                return (
                  <li key={todo.id}>
                    <h3>{todo.name}</h3>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <>
          <h1>エラーTodo Main</h1>
        </>
      )}
    </>
  );
};
export default TodoMain;
