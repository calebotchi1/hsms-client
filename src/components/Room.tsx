import Card from "react-bootstrap/Card";

export interface RoomProps {
  id: string;
  name: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}
export function Room({ id, name, isSelected = false, onClick }: RoomProps) {
  const colorVariant = isSelected ? "primary" : "dark";
  return (
    <Card border={colorVariant} text={colorVariant} onClick={() => onClick(id)}>
      <Card.Body>{name}</Card.Body>
    </Card>
  );
}
