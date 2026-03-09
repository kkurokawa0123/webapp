import React from "react";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

// import { styled } from "@mui/material/styles";

import Header from "../layouts/Header";

interface CommonLayoutProps {
  children: React.ReactElement;
}

// const Container = styled(MuiContainer)({
//   marginTop: "3rem",
//   justifyContent: "center",
// });

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  return (
    <>
      <header>
        <Header />
      </header>

      <Container maxWidth="lg" sx={{ mt: "3rem", justifyContent: "center" }}>
        <Grid>{children}</Grid>
      </Container>
    </>
  );
};

export default CommonLayout;
