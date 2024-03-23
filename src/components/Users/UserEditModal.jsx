import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

function UserEditModal({ show, handleClose, userDetails, setUserDetails }) {
    
    const [password,setPassword] = useState("");

    const apiUrl =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_REACT_APP_API_URL_PROD
      : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    const handleChangePassword = (e) =>{
        setPassword(e.target.value)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    function handleSubmit(e){
        e.preventDefault();

          handleClose();
    }


    return (
        <>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label> Name
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Username" 
                            name="username"
                            onChange={handleChange}
                            value={ userDetails.username || ""}
                            readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label> Password 
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Password" 
                            name="hashed_password"
                            onChange={handleChangePassword}
                            value={ password || ""} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Name" 
                            name="name"
                            onChange={handleChange}
                            value={ userDetails.name  || ""}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Enter Email" 
                            name="email"
                            onChange={handleChange}
                            value={ userDetails.email || "" } 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createdAt">
                            <Form.Label>Created at</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter createdAt" 
                            name="createdAt"
                            onChange={handleChange}
                            value={ userDetails.created_at || "" } 
                            readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="updatedAt">
                            <Form.Label>Updated at</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter updatedAt" 
                            name="updatedAt"
                            onChange={handleChange}
                            value={ userDetails.updated_at || "" } 
                            readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="deletedAt">
                            <Form.Label>Deleted at</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter deletedAt" 
                            name="deletedAt"
                            onChange={handleChange}
                            value={ userDetails.deleted_at || "" } 
                            readOnly/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UserEditModal;