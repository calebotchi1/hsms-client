import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Image } from "react-bootstrap";

export interface HostelProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}
export function Hostel({ id, name, imageUrl, price }: HostelProps) {
  return (
    <Card
      style={{
        width: "400px",
        marginTop: "1rem",
      }}
    >
      <Card.Img
        variant="top"
        src={imageUrl}
        height={450}
        style={{ objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {!isFinite(price) ? (
            <i>No rooms available</i>
          ) : (
            `from GHS ${price.toLocaleString("en-US")} per semester`
          )}
        </Card.Text>
        <Button href={`hostels/${id}`} variant="outline-primary">
          View Hostel
        </Button>
      </Card.Body>
    </Card>
  );
}
