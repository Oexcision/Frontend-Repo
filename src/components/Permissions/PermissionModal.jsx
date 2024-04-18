import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const PermissionModal = ({ show, permission, action, fetchPermissions, onHide }) => {

    const [permissionDetails, setPermissionDetails] = useState(permission);

    useEffect(() => {
        setPermissionDetails(permission);
    }, [permission]);


    const apiUrl =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_REACT_APP_API_URL_PROD
      : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPermissionDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(permission.id, permissionDetails.name, permissionDetails.description)
        axios.put(`${apiUrl}/permissions/${permission.id}`, {
            id: permissionDetails.id,
            name: permissionDetails.name,
            description: permissionDetails.description,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                onHide();
                toast.success('Permission edited successfully');
                fetchPermissions();
            } else {
                throw new Error('Failed to save changes');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Failed to edit permission');
        });
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{action === 'edit' ? 'Edit Permission' : 'Permission Details'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Form to edit user or display user details */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            name="name"
                            onChange={handleChange}
                            value={permissionDetails?.name || ""}
                            disabled={action !== 'edit'}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            name="description"
                            onChange={handleChange}
                            value={permissionDetails?.description || ""}
                            disabled={action !== 'edit'}
                        />
                    </Form.Group>
                    {action !== 'edit' && (
                        <>
                            <Form.Group className="mb-3" controlId="createdAt">
                                <Form.Label>Created at</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter createdAt"
                                    name="createdAt"
                                    value={permission?.created_at || ""}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="updatedAt">
                                <Form.Label>Updated at</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter updatedAt"
                                    name="updatedAt"
                                    value={permission?.updated_at || ""}
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="deletedAt">
                                <Form.Label>Deleted at</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter deletedAt"
                                    name="deletedAt"
                                    value={permission?.deleted_at || ""}
                                    disabled
                                />
                            </Form.Group>
                        </>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                {action === 'edit' && <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>}
            </Modal.Footer>
        </Modal>
    );
};

export default PermissionModal;
