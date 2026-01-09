import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState } from "react";

export default function AppNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const doLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const closeMenu = () => setExpanded(false);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      expanded={expanded}
      className="px-3"
    >
      <Container fluid>
        {/* LEFT aligned brand */}
        <Navbar.Brand as={NavLink} to="/" onClick={closeMenu}>
          Finance
        </Navbar.Brand>

        <Navbar.Toggle onClick={() => setExpanded(!expanded)} />

        <Navbar.Collapse>
          {/* LEFT aligned menu (PC) */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" onClick={closeMenu}>
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/income" onClick={closeMenu}>
              Add Income
            </Nav.Link>
            <Nav.Link as={NavLink} to="/expense" onClick={closeMenu}>
              Add Expense
            </Nav.Link>
            <Nav.Link as={NavLink} to="/history" onClick={closeMenu}>
              History
            </Nav.Link>
            <Nav.Link as={NavLink} to="/reports" onClick={closeMenu}>
              Reports
            </Nav.Link>
            <Nav.Link as={NavLink} to="/others/categories" onClick={closeMenu}>
              Categories
            </Nav.Link>
            <Nav.Link as={NavLink} to="/others/banks" onClick={closeMenu}>
              Banks
            </Nav.Link>
          </Nav>

          {/* RIGHT aligned logout */}
          <Nav>
            <Nav.Link onClick={doLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
