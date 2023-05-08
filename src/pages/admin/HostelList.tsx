import React, { SyntheticEvent, useEffect, useState } from "react";
import { Col, Container, FormGroup, Modal, Row } from "react-bootstrap";

import ApiService, { IHostel } from "../../api/ApiService";
import { Hostel } from "./Hostel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import AddRoomModal from "./AddRoomModal";

interface AddHostelProps {
  shouldShow: boolean;
  onClose: () => void;
}

function AddHostelModal({ shouldShow, onClose }: AddHostelProps) {
  const [pictures, setPictures] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
  });

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("location", form.location);
    formData.append("description", form.description);
    // @ts-ignore
    formData.append("pictures", pictures);

    setIsLoading(true);
    ApiService.createHostel(formData)
      .then((res) => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Modal show={shouldShow} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Hostel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Hostel Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Dufie Courts"
                required={true}
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
                required={true}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Upload pictures of the hostel</Form.Label>
              <Form.Control
                type="file"
                name="pictures"
                multiple
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  // @ts-ignore
                  setPictures(target?.files[0]);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isLoading ? <Spinner /> : " Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
function HostelList() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hostels, setHostels] = useState<Array<any>>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    ApiService.getStudentHostels()
      .then((res) => {
        const hostels = res.data as IHostel[];
        setHostels(hostels);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>My Hostels</h3>
        </Col>
        <Col>
          <Button variant={"primary"} onClick={() => setShowModal(true)}>
            Add New Hostel
          </Button>
        </Col>
        <Col>
          <Button onClick={() => setShowAddRoomModal(true)}>
            Add Room to Hostel
          </Button>
        </Col>
      </Row>
      <AddHostelModal
        shouldShow={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <AddRoomModal
        hostels={hostels}
        shouldShow={showAddRoomModal}
        onClose={() => setShowAddRoomModal(false)}
      />

      {isLoading ? <Spinner /> : ""}
      <Row xl={3}>
        {hostels.map((hostel: IHostel) => (
          <Col key={hostel.id}>
            <Hostel
              id={hostel.id}
              price={Math.min(...hostel.rooms.map((room) => room.price))}
              name={hostel.name}
              imageUrl={hostel.pictures[0]}
              onClick={() => navigate(hostel.id.toString())}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HostelList;
