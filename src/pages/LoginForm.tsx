import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { SyntheticEvent, useEffect, useState } from "react";
import ProgressBar from "../components/Spinner";
import ApiService from "../api/ApiService";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    ApiService.loginStudent(form.email, form.password)
      .then((res) => {
        localStorage.setItem("user-type", "student");
        localStorage.setItem("token", res.data["token"]);
        localStorage.setItem("profile", JSON.stringify(res.data["profile"]));
        navigate("/hostels", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <h3>Login as a Student</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>

        {!isLoading ? (
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        ) : (
          <ProgressBar />
        )}
        <p>
          Don't have an account yet? Register <Link to="/register">here</Link>
        </p>
      </Form>
    </>
  );
}

export default LoginForm;
