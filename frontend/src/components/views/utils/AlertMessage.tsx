import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// import type { AlertProps } from "@mui/material/Alert";

// const AlertComponent = React.forwardRef<HTMLDivElement, AlertProps>(
//   function AlertComponent(props, ref) {
//     return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
//   },
// );

interface AlertMessageProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  severity: "error" | "success" | "info" | "warning";
  message: string;
}

// アラートメッセージ（何かアクションを行なった際の案内用に使い回す）
const AlertMessage = ({
  open,
  setOpen,
  severity,
  message,
}: AlertMessageProps) => {
  const handleCloseAlertMessage = (
    e?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleCloseAlertMessage}
    >
      <Alert
        severity={severity}
        variant="filled"
        onClose={handleCloseAlertMessage}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
