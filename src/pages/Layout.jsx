import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer, toast } from 'react-toastify';

const Layout = () => {
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('isNameUser');
    toast.success('¡Has cerrado sesión exitosamente!');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand as={Link} to="/">SHOP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Users" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/users/list">List Users</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Permissions" id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/permissions/list">List Permissions</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </Nav>
              <NavDropdown title="Settings" id="basic-nav-dropdown" className="custom-dropdown">
                <NavDropdown.Item href="#action/3.1">User Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
      </Container>
      <Container>
        <Outlet />
      </Container>
      <ToastContainer /> {/* Asegúrate de incluir el ToastContainer aquí */}
    </>
  );
};

export default Layout;
