import Button from "react-bootstrap/Button";
import { FormGroup, Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import ApiService, {
  IAllocationData,
  IHostel,
  IRoom,
  Student,
} from "../../api/ApiService";
import { useNavigate } from "react-router-dom";

interface Props {
  shouldShow: boolean;
  onClose: () => void;
}

export default function RoomAllocationModal({ shouldShow, onClose }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [currentHostelSelected, setCurrentHostelSelected] = useState<
    Partial<IHostel>
  >({
    id: 0,
    name: "",
  });
  const [currentStudentSelected, setCurrentStudentSelected] = useState<
    Partial<Student>
  >({
    id: "",
  });
  const [roomId, setRoomId] = useState("");

  const [students, setStudents] = useState<Array<Student>>([]);
  const [hostels, setHostels] = useState<Array<IHostel>>([]);

  useEffect(() => {
    ApiService.getRoomAllocationData()
      .then((res) => {
        const data = res.data as IAllocationData;
        console.log(res.data);
        setStudents(data.students);
        setHostels(data.hostels);
      })
      .catch((err) => {});
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    ApiService.makeManualStudentReservation(
      roomId,
      currentStudentSelected.id || ""
    )
      .then((res) => {
        navigate("/admin/bookings", { replace: true });
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
          <Modal.Title>Manual Room Allocation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup className="mb-3">
              <Form.Label>Choose Student</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  const index = students.findIndex(
                    (s) => s.id.toString() === e.target.value
                  );
                  setCurrentStudentSelected(students[index]);
                }}
              >
                {students?.map((student) => (
                  <option
                    onClick={() => setCurrentStudentSelected(student)}
                    key={student.id}
                    value={student.id}
                  >
                    {student.firstName + " " + student.lastName}
                  </option>
                ))}
              </Form.Select>
            </FormGroup>
            <FormGroup className={"mb-3"}>
              <Form.Label>Choose Hostel</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  const index = hostels.findIndex(
                    (h) => h.id.toString() === e.target.value
                  );
                  setCurrentHostelSelected(hostels[index]);
                }}
              >
                {hostels?.map((hostel) => (
                  <option value={hostel.id} key={hostel.id}>
                    {hostel.name}
                  </option>
                ))}
              </Form.Select>
            </FormGroup>

            <FormGroup>
              <Form.Label>Assign Room</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setRoomId(e.target.value)}
              >
                <option>Choose a room</option>
                {currentHostelSelected.rooms?.map((room) => (
                  <option key={room.id}>{room.id}</option>
                ))}
              </Form.Select>
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
