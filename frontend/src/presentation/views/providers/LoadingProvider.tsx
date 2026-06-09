import React, { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { LoadingContext } from "@/presentation/contexts/loding_context";

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const openLoading = () => setLoading(true);
  const closeLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ openLoading, closeLoading }}>
      {children}
      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};
