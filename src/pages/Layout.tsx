import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Container } from "react-bootstrap";

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
