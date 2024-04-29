import  React, 
        {useEffect } from 'react';

import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ToastContainer, toast } from 'react-toastify';

import { useAuthentication } from '../contexts/AuthContext';

const Layout = () => {

  const { user, permissionsOfUser, logout, refreshPermissions } = useAuthentication();

  useEffect(() => {
    refreshPermissions(); // Se ejecuta cada vez que se monta el componente Layout
  }, []); // Se pasa un array vacío como segundo argumento para que se ejecute solo una vez al montar el componente


  const handleLogout = () => {
    toast.success('¡Has cerrado sesión exitosamente!');
    setTimeout(() => {
      logout();
    }, 3000);
    
  };



  return (
    <>
      
        <Navbar expand="lg" className="bg-orange-300 pl-24 pr-24 rounded-b-3xl ">
            <Navbar.Brand as={Link} to="/">SHOP</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" >
                {permissionsOfUser && permissionsOfUser.some(p => p.name === 'user_view') && (
                <NavDropdown title="Users" id="basic-nav-dropdown" className='hover:font-bold'>
                  <NavDropdown.Item as={Link} to="/users/list" className='hover:font-bold'>List Users</NavDropdown.Item>
                </NavDropdown>
                )}
                {permissionsOfUser && permissionsOfUser.some(p => p.name === 'role_view') && (
                <NavDropdown title="Roles" id="basic-nav-dropdown" className='hover:font-bold' >
                  <NavDropdown.Item as={Link} to="/roles/list" className='hover:font-bold'>List Roles</NavDropdown.Item>
                </NavDropdown>
                )}
                {permissionsOfUser && permissionsOfUser.some(p => p.name === 'permission_view') && (
                <NavDropdown title="Permissions" id="basic-nav-dropdown"  className='hover:font-bold'>
                  <NavDropdown.Item as={Link} to="/permissions/list" className='hover:font-bold'>List Permissions</NavDropdown.Item>
                </NavDropdown>
                )}
                <Nav.Link as={Link} to="/contact" className='hover:font-bold'>Contact</Nav.Link>
              </Nav>
              <NavDropdown title="Settings" id="basic-nav-dropdown" className='hover:font-bold'>
                <NavDropdown.Item as={Link} to="/users/me" className='hover:font-bold'>{user.username} Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout} className='hover:font-bold'>Logout</NavDropdown.Item>
              </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
      
      <Container>
        <Outlet className='bg-blue-200'/>
      </Container >
      <ToastContainer /> {/* Asegúrate de incluir el ToastContainer aquí */}
    </>
  );
};

export default Layout;