import React, { useContext } from "react";

import { AuthContext } from "@/common/contexts/AuthContext";

export const Todo = () => {
  const { isSignedIn, currentUser } = useContext(AuthContext);

  return <>{isSignedIn && currentUser ? <></> : <></>}</>;
};
