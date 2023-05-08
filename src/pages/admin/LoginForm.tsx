import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SyntheticEvent, useEffect, useState } from "react";

import ApiService from "../../api/ApiService";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

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
    ApiService.loginAdmin(form.email, form.password)
      .then((res) => {
        localStorage.setItem("user-type", "admin");
        localStorage.setItem("token", res.data["token"]);
        localStorage.setItem("profile", JSON.stringify(res.data["profile"]));
        navigate("/admin/bookings", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <h3>Login as Admin</h3>
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
        {isLoading ? <Spinner /> : <></>}
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Login
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
