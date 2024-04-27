import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserModal = ({ show, user, action, fetchUsers, onHide }) => {

    const [userDetails, setUserDetails] = useState(user);
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState([]);
    const [selectedValue, setSelectedValue] = useState('');

    const apiUrl =
        import.meta.env.MODE === 'production'
            ? import.meta.env.VITE_REACT_APP_API_URL_PROD
            : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    useEffect(() => {
        setUserDetails(user);
    }, [user]);

    useEffect(() => {
        if (roles.length === 0) {
            fetchRoles();
        }
    }, []);

    useEffect(() => {
        if (userDetails && userDetails.roles && userDetails.roles.length > 0) {
            setSelectedValue(userDetails.roles[0].id);
        }
    }, [userDetails]);


    const fetchRoles = () => {
        axios.get(apiUrl + '/roles')
            .then((res) => setRoles(res.data))
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeSelect = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user.id, userDetails.username, password,)
        const requestOptions = {
            method: 'PUT',
            headers: {  'Content-Type': 'application/json', 
                        'Authorization': localStorage.getItem("token_type") + " " + localStorage.getItem("access_token") },
            body: JSON.stringify({
                id: userDetails.id,
                username: userDetails.username,
                hashed_password: password,
                name: userDetails.name,
                email: userDetails.email,
                roles: [parseInt(selectedValue)]

            })
        };

        axios.put(apiUrl + `/users/${user.id}`, requestOptions.body, { headers: requestOptions.headers })
            .then(response => {
                if (response.status === 200) {
                    // Aquí podrías realizar alguna acción adicional después de guardar los cambios, como cerrar el modal
                    onHide();
                    toast.success('User edit successfully');
                    fetchUsers();
                } else {
                    throw new Error('Failed to save changes');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to edit user');
            });

    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{action === 'edit' ? 'Edit User' : 'User Details'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form to edit user or display user details */}
                {action === 'edit' ? (
                    <Form >
                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label> Name
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                name="username"
                                onChange={handleChange}
                                value={userDetails?.username || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label> Password
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                onChange={handleChangePassword}
                                value={password || ""} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="role">
                            <Form.Label> Role
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control as="select" name="role" value={selectedValue} onChange={handleChangeSelect}>
                                <option disabled>Seleccione el Rol</option>
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
                                value={userDetails?.name || ""} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                onChange={handleChange}
                                value={userDetails?.email || ""} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createdAt">
                            <Form.Label>Created at</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter createdAt"
                                name="createdAt"
                                onChange={handleChange}
                                value={userDetails?.created_at || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="updatedAt">
                            <Form.Label>Updated at</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter updatedAt"
                                name="updatedAt"
                                onChange={handleChange}
                                value={userDetails?.updated_at || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="deletedAt">
                            <Form.Label>Deleted at</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter deletedAt"
                                name="deletedAt"
                                onChange={handleChange}
                                value={userDetails?.deleted_at || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                    </Form>

                ) : (

                    <Form>
                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label> Name
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                name="username"
                                value={user?.username || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label> Password
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={user?.hashed_password || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="role">
                            <Form.Label> Role
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control as="select" name="role" value={selectedValue} onChange={handleChangeSelect} disabled>
                                <option disabled>Seleccione el Rol</option>
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
                                value={user?.name || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                value={user?.email || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createdAt">
                            <Form.Label>Created at</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter createdAt"
                                name="createdAt"
                                value={user?.created_at || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="updatedAt">
                            <Form.Label>Updated at</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter updatedAt"
                                name="updatedAt"
                                value={user?.updated_at || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="deletedAt">
                            <Form.Label>Deleted at</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter deletedAt"
                                name="deletedAt"
                                value={user?.deleted_at || ""}
                                readOnly
                                disabled />
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                {action === 'edit' && <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>}
            </Modal.Footer>
        </Modal>
    );
};

export default UserModal;
