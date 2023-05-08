import React, { useEffect, useState } from "react";
import {
  Alert,
  Card,
  Carousel,
  Col,
  Container,
  Row,
  Stack,
} from "react-bootstrap";
import { PaystackButton } from "react-paystack";
import ApiService, { IHostel } from "../api/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import { Room } from "../components/Room";

function HostelDetail() {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const hostelId = parseInt(params.id || "");
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

  const findRoomById = (id: string) => {
    return hostel.rooms.find((room) => room.id === id);
  };

  const [selectedRoom, setSelectedRoom] = useState<string>("");

  const handlePaymentSuccess = (reference: any) => {
    ApiService.makeStudentReservation(
      reference?.reference,
      findRoomById(selectedRoom)?.id || "",
      findRoomById(selectedRoom)?.price || 0
    )
      .then((res) => {
        navigate("/bookings", { replace: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Stack direction="vertical">
              <Carousel slide={false}>
                {hostel.pictures.map((imgUrl) => (
                  <Carousel.Item>
                    <img
                      className="d-block w-300"
                      height={600}
                      width={800}
                      src={imgUrl}
                      style={{
                        objectFit: "cover",
                      }}
                      alt="Second slide"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <br />
              <Card>
                <Card.Body>
                  <Card.Title>{hostel.name} Hostels</Card.Title>
                  <Card.Text>{hostel.description}</Card.Text>
                </Card.Body>
              </Card>
            </Stack>
          </Col>

          <Col>
            <Card style={{ marginTop: "1rem" }}>
              <Card.Header>Details</Card.Header>
              <Card.Body>
                <p>
                  <strong>Price: </strong> GHS
                  {findRoomById(selectedRoom)?.price || "-"} per semester
                </p>
                <p>
                  <strong>Bathrooms:</strong>
                  {findRoomById(selectedRoom)?.numBathrooms}
                </p>

                <p>
                  <strong>Number In Room: </strong>{" "}
                  {findRoomById(selectedRoom)?.maxNumberOfStudents || " -"}
                </p>

                <p>
                  <strong>Available beds:</strong>{" "}
                  {findRoomById(selectedRoom)?.availableBeds || " -"}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        {hostel.rooms.length < 1 ? (
          <Alert variant={"danger"}>
            No rooms available try again at a later time
          </Alert>
        ) : (
          <>
            <Container>
              <h5>Choose a room type</h5>
              <Row xl={5}>
                {hostel.rooms.map((room) => (
                  <Col key={room.id}>
                    <Room
                      id={room.id}
                      name={room.type.replaceAll("_", " ")}
                      isSelected={selectedRoom === room.id}
                      onClick={(id) => setSelectedRoom(id)}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
            <br />
            {(findRoomById(selectedRoom)?.availableBeds || 0) < 1 ? (
              <Alert variant={"info"}>
                Sorry but there are no available beds in this room, try again
                later
              </Alert>
            ) : (
              <PaystackButton
                className="btn btn-primary"
                amount={(findRoomById(selectedRoom)?.price || 0) * 100}
                email="mail@example.com"
                publicKey={publicKey}
                currency="GHS"
                text="Make a reservation"
                onSuccess={(reference) => handlePaymentSuccess(reference)}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default HostelDetail;
