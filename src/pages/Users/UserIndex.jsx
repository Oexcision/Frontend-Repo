import { Link } from 'react-router-dom';
import { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import UserTable from '../../components/Users/UserTable';
import UserForm from '../../components/Users/UserForm';


const UserIndex = () => {

  const [show, setShow] = useState(false);

  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);



    return (
      <>
        <h1>Index Users</h1>
        
        <Row className="mb-3">
          <Col xs={8}>
            <h2>List Users</h2>
          </Col>
          <Col xs={4} className="text-end">
            <Button variant="primary" onClick={handleModalShow}>
              Create User
            </Button>
          </Col>
        </Row>
        
        <UserTable/>

        <Modal show={show} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserForm/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            {
              /*
              <Button variant="primary" onClick={handleModalClose}>
                Save Changes
              </Button>
              */
            }
          </Modal.Footer>
      </Modal>


      </>

    )
      

  };
  
  export default UserIndex;