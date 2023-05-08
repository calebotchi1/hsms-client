import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Container, Stack } from "react-bootstrap";

function Index() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <Container>
      {searchParams.get("unauthorized") == "true" ? (
        <Alert variant={"danger"}>You need to login in first</Alert>
      ) : (
        <></>
      )}

      <h3>Ashesi Hostel Management System </h3>
      <br />
      <Stack direction="vertical">
        <Button type="submit" size="lg" onClick={() => navigate("/login")}>
          Login in as Student
        </Button>
        <br />
        <Button
          type="submit"
          size="lg"
          onClick={() => navigate("/admin/login")}
        >
          Login in as Admin
        </Button>
      </Stack>
    </Container>
  );
}

export default Index;
