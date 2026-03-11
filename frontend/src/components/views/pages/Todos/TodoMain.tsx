import React, { useContext } from "react";

import { AuthContext } from "@/common/contexts/AuthContext";

const TodoMain: React.FC = () => {
  const { authState } = useContext(AuthContext);

  return (
    <>
      {authState.isSignedIn && authState.currentUser ? (
        <>Welcome To Todos</>
      ) : (
        <></>
      )}
    </>
  );
};
export default TodoMain;
