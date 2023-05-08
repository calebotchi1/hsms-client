import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";

import ApiService, { IBooking, IHostel } from "../api/ApiService";

function Bookings() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [bookings, setBookings] = useState<Array<any>>([]);

  useEffect(() => {
    ApiService.getStudentBooking()
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
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
