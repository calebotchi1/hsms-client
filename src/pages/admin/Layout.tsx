import React from "react";
import { Link, Outlet } from "react-router-dom";

import { Container } from "react-bootstrap";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <Container style={{ margin: "0 auto", padding: "2rem" }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
