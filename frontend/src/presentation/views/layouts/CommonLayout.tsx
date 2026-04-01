import React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";

import Header from "@/presentation/views/layouts/Header";

interface CommonLayoutProps {
  children: React.ReactElement;
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container>
          <Box
            sx={{
              minHeight: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {children}
          </Box>
        </Container>
        {/* <Container maxWidth="lg" sx={{ mt: "3rem" }}>
          <Grid container justifyContent="space-between">
            <Grid>{children}</Grid>
          </Grid>
        </Container> */}
      </main>
    </>
  );
};

export default CommonLayout;
