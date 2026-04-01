import { useContext } from "react";
import { createContext } from "react";

import { type Severity } from "@/domain/datas/@types/Severity";

type MessageContextType = {
  showMessage: (message: string, severity?: Severity) => void;
};

export const MessageContext = createContext<MessageContextType | undefined>(
  undefined,
);

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within MessageProvider");
  }
  return context;
};
