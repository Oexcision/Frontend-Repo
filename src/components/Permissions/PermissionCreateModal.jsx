import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import { toast } from 'react-toastify';

function PermissionCreateModal({ show, handleClose, fetchPermissions }) {

    const [inputs, setInputs] = useState({});

    const apiUrl =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_REACT_APP_API_URL_PROD
      : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    };

    function handleSubmit(e){
        e.preventDefault();

        axios.post(`${apiUrl}/permissions`, {
            name: inputs.name,
            description: inputs.description,
        }, {
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response)=>{
            if(response.status === 200){
                handleClose();
                toast.success('Permission created successfully');
                fetchPermissions();
                return response.data;
            } else {
                throw new Error ('Network response was not ok');
            }
        }).then((data) =>{
            console.log(data.id, data.name, data.description);
        }).catch((error) => {
            console.error('Error:', error);
            toast.error('Failed to create permission');
        });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Permission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="Name">
                            <Form.Label> Name
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Name" 
                            name="name"
                            onChange={handleChange} 
                            value={inputs.name || ""}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Description">
                            <Form.Label> Description 
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Description" 
                            name="description"
                            onChange={handleChange} 
                            value={inputs.description || ""} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PermissionCreateModal;
