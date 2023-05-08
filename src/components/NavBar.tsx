import {
  Container,
  Image,
  Nav,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";

export default function NavBar(this: any) {
  const navigate = useNavigate();

  const profile = JSON.parse(localStorage.getItem("profile") || "{}");
  if (
    (Object.keys(profile).length === 0 && location.pathname !== "/login") ||
    location.pathname !== "/register"
  ) {
    //navigate("/login");
  }
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      sticky={"top"}
    >
      <Container>
        <Navbar.Brand href="#home">
          <Image
            fluid
            src="https://www.ashesi.edu.gh/images/logo-mobile_colored.png"
            width="230"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <h6>Student Portal</h6>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/hostels">
              <Nav.Link>Hostels</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/bookings">
              <Nav.Link href="/booking">My Bookings</Nav.Link>
            </LinkContainer>
          </Nav>
          {Object.keys(profile).length !== 0 ? (
            <Nav>
              <NavDropdown title="Profile" id="navbarScrollingDropdown">
                <Avatar
                  size="50"
                  style={{ margin: "1rem" }}
                  round={true}
                  name={profile["fullName"]}
                />
                <LinkContainer to="/account">
                  <NavDropdown.Item href="#action4">Account</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSignOut}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
