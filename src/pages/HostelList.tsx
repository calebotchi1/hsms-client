import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import ApiService, { IHostel } from "../api/ApiService";
import { Hostel } from "../components/Hostel";

function HostelList() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hostels, setHostels] = useState<Array<any>>([]);

  useEffect(() => {
    ApiService.getStudentHostels()
      .then((res) => {
        const hostels = res.data as IHostel[];
        setHostels(hostels);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container fluid>
      <Row xl={3}>
        {hostels.map((hostel: IHostel) => (
          <Col key={hostel.id}>
            <Hostel
              id={hostel.id}
              price={Math.min(...hostel.rooms.map((room) => room.price))}
              name={hostel.name}
              imageUrl={hostel.pictures[0]}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HostelList;
