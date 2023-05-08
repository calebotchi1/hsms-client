import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const navigate = useNavigate();

  const profile = JSON.parse(localStorage.getItem("profile") || "{}");

  //Check if profile already exists in local storage if not force user to login first
  if (Object.keys(profile).length === 0) {
    navigate("/?unauthorized=true");
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
          <h6>Admin Portal</h6>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="hostels">
              <Nav.Link>My Hostels</Nav.Link>
            </LinkContainer>
            <LinkContainer to="bookings">
              <Nav.Link>Bookings</Nav.Link>
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
