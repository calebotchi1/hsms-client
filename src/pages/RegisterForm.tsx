import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SyntheticEvent, useState } from "react";
import ApiService from "../api/ApiService";
import { Row } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    studentId: "",
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    ApiService.registerStudent(
      form.firstName,
      form.lastName,
      form.studentId,
      form.email,
      form.password
    )
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
    <Form>
      <Row className="mb-3" md={2}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            name="firstName"
            onChange={handleChange}
            type="email"
            placeholder="John"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name={"lastName"}
            type="email"
            placeholder="John Doe"
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Student Id</Form.Label>
        <Form.Control
          name="studentId"
          type="email"
          placeholder="42312023"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="johndoe@ashesi.edu.gh"
          onChange={handleChange}
        />
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

      <Button variant="primary" type="submit" onClick={handleSubmit}>
        {loading ? <Spinner /> : "Submit"}
      </Button>
    </Form>
  );
}

export default RegisterForm;
