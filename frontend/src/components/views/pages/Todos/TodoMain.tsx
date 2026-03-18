import React from "react";
import { useAuthContex } from "@/components/contexts/auth_context";

const TodoMain: React.FC = () => {
  const authState = useAuthContex();

  return (
    <>
      {/* <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} /> */}
      {authState.isAuthenticated && authState.responseData ? (
        <>
          <h1>Welcome To Todos</h1>
          <h2>Email:{authState.responseData?.data.email}</h2>
          <h2>Name:{authState.responseData?.data.name}</h2>
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
