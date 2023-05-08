import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row, Table } from "react-bootstrap";

import ApiService, { IBooking, IHostel } from "../../api/ApiService";
import Button from "react-bootstrap/Button";
import RoomAllocationModal from "./RoomAllocationModal";

function Bookings() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Array<any>>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    ApiService.getHostelBooking()
      .then((res) => {
        const bookings = res.data as IBooking[];
        setBookings(bookings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>Hostel Bookings</h3>
        </Col>
        <Col>
          <RoomAllocationModal
            shouldShow={showModal}
            onClose={() => setShowModal(false)}
          />
          <Button onClick={() => setShowModal(true)} variant={"primary"}>
            Create Manual Room Allocation
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Booked By</th>
            <th>Hostel Name</th>
            <th>Room Number</th>

            <th>Amount paid</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking: IBooking, index) => (
            <tr key={booking.id}>
              <td>{index + 1}</td>
              <td>
                {booking.student.firstName + " " + booking.student.lastName}
              </td>
              <td>{booking.hostel.name}</td>
              <td>{booking.room.id}</td>

              <td>
                <strong>GHS {booking.amountPaid.toLocaleString()}</strong>
              </td>
              <td>
                {new Date(Date.parse(booking.createdAt)).toLocaleDateString(
                  "en-UK"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Bookings;
