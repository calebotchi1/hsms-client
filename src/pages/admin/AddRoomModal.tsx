import Button from "react-bootstrap/Button";
import { FormGroup, Modal } from "react-bootstrap";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import ApiService, { IHostel } from "../../api/ApiService";
import { useNavigate } from "react-router-dom";

interface Props {
  shouldShow: boolean;
  onClose: () => void;
  hostels: Array<IHostel>;
}

export default function AddRoomModal({ shouldShow, onClose, hostels }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hostelId, setHostelId] = useState<number>(0);

  const [roomId, setRoomId] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [numBathrooms, setNumBathrooms] = useState<number>(0);
  const [roomType, setRoomType] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setIsLoading(true);
    ApiService.addRoom(hostelId, roomId, price, numBathrooms, roomType)
      .then((res) => {
        navigate("/admin/hostels", { replace: true });
        onClose();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Modal show={shouldShow} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Room to Hostel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup className={"mb-3"}>
              <Form.Label>Choose Hostel</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setHostelId(parseFloat(e.target.value));
                }}
              >
                <option>Choose a hostel</option>
                {hostels.map((hostel) => (
                  <option key={hostel.id} value={hostel.id}>
                    {hostel.name}
                  </option>
                ))}
              </Form.Select>
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Room Name</Form.Label>
              <Form.Control
                name="roomId"
                type="text"
                onChange={(e) => setRoomId(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Label>Room Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option>Choose room type</option>
                <option>ONE_IN_A_ROOM</option>
                <option>TWO_IN_A_ROOM</option>
                <option>THREE_IN_A_ROOM</option>
                <option>FOUR_IN_A_ROOM</option>
              </Form.Select>
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Room Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                aria-label="Default select example"
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </FormGroup>

            <FormGroup className="mb-3">
              <Form.Label>Number of Bathroom</Form.Label>
              <Form.Control
                type="number"
                aria-label="Default select example"
                onChange={(e) => setNumBathrooms(parseFloat(e.target.value))}
              />
            </FormGroup>
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
