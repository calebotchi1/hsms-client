import React, { useEffect, useState } from "react";
import ApiService, { IHostel } from "../../api/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

function EditHostelPage() {
  const params = useParams();
  const navigate = useNavigate();
  const hostelId = parseInt(params.id || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hostel, setHostel] = useState<IHostel>({
    id: -1,
    description: "",
    pictures: [],
    createdAt: "",
    location: "",
    name: "",
    updatedAt: "",
    rooms: [],
  });
  useEffect(() => {
    ApiService.getStudentHostelDetail(hostelId)
      .then((res) => {
        const hostel = res.data as IHostel;
        console.log(hostel);
        setHostel(hostel);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    const { name, description, location } = hostel;
    ApiService.updateHostel(hostelId, {
      name: name,
      description: description,
      location: location,
    })
      .then((res) => {
        navigate("/admin/hostels");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };
  const handleChange = (e: any) => {
    setHostel({ ...hostel, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Hostel Name</Form.Label>
            <Form.Control
              name="name"
              type="text"
              placeholder="Dufie Courts"
              required={true}
              value={hostel.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              type="text"
              placeholder="1 University Av."
              required={true}
              value={hostel.location}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              type="text"
              placeholder=""
              value={hostel.description}
              required={true}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit}>
            {isLoading ? <Spinner /> : " Save Changes"}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default EditHostelPage;
