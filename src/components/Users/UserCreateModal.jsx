import { useState, useEffect } from "react";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

import axios from 'axios';

import { toast } from 'react-toastify';

function UserCreateModal({ show, handleClose, fetchUsers }) {

    const [inputs, setInputs] = useState({});
    const [roles, setRoles] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    const apiUrl =
        import.meta.env.MODE === 'production'
            ? import.meta.env.VITE_REACT_APP_API_URL_PROD
            : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    useEffect(() => {
        if (roles.length === 0) {
            fetchRoles();
        }
    }, []);

    const fetchRoles = () => {
        axios.get(apiUrl + '/roles')
            .then((res) => setRoles(res.data))
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleChangeSelect = (event) => {
        setSelectedValue(event.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        console.log(inputs.birthday)
        axios.post(apiUrl + '/users', {
            username: inputs.username,
            hashed_password: inputs.password,
            name: inputs.name,
            email: inputs.email,
            birthday: inputs.birthday,
            roles: [parseInt(selectedValue)]
        },{
            headers: {
              Authorization: localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
            }
           })
            .then((response) => {
                if (response.status === 200) {
                    handleClose();
                    toast.success('User Create successfully');
                    fetchUsers();
                    return response.data;
                } else {
                    throw new Error('Network response was not ok')
                }
            }).then((data) => {
                console.log(data.id, data.username, data.hashed_password, data.name, data.username);
            }).catch((error) => {
                toast.error('Failed to create user');
                return Promise.reject(error);
            })
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label> Username
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                name="username"
                                onChange={handleChange}
                                value={inputs.username || ""} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label> Password
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                onChange={handleChange}
                                value={inputs.password || ""} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="role">
                            <Form.Label> Role
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control as="select" name="role" value={selectedValue} onChange={handleChangeSelect}>
                                <option value="" disabled>Seleccione el Rol</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>{role.description}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                onChange={handleChange}
                                value={inputs.name || ""} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                onChange={handleChange}
                                value={inputs.email || ""} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="birthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                name="birthday"
                                onChange={handleChange}
                                value={inputs.birthday || ""} />
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

export default UserCreateModal;
