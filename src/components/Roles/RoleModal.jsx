import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const RoleModal = ({ show, role, action, fetchRoles, onHide }) => {
    const [roleDetails, setRoleDetails] = useState(role);
    const [permissions, setPermissions] = useState([]);
    const [activePermissions, setActivePermissions] = useState([]);

    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_REACT_APP_API_URL_PROD
        : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    useEffect(() => {
        setRoleDetails(role);
    }, [role]);

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await axios.get(`${apiUrl}/permissions`);
                setPermissions(response.data);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        if (permissions.length === 0) {
            fetchPermissions();
        }
    }, []);

    useEffect(() => {
        if (role && role.permissions) {
            setActivePermissions(role.permissions.map(permission => permission.id));
        }
    }, [role]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoleDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangeChecks = (e) => {
        const { id, checked } = e.target;
        if (checked) {
            setActivePermissions(prevPermissions => [...prevPermissions, parseInt(id)]);
        } else {
            setActivePermissions(prevPermissions => prevPermissions.filter(permissionId => permissionId !== parseInt(id)));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${apiUrl}/roles/${role.id}`, {
                id: roleDetails.id,
                name: roleDetails.name,
                description: roleDetails.description,
                permissions: activePermissions
            });
            if (response.status === 200) {
                onHide();
                toast.success('Role edited successfully');
                fetchRoles();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to edit role');
        }
    };

    const groupPermissionsByPrefix = () => {
        const groupedPermissions = {};

        permissions.forEach((permission) => {
            const prefix = permission.name.split('_')[0];
            if (!groupedPermissions[prefix]) {
                groupedPermissions[prefix] = [];
            }
            groupedPermissions[prefix].push(permission);
        });

        return groupedPermissions;
    };

    const dividePermissionsIntoRows = () => {
        const permissionsArray = Object.entries(groupPermissionsByPrefix());
        return permissionsArray.reduce((rows, _, index) => {
            if (index % 3 === 0) {
                rows.push(permissionsArray.slice(index, index + 3));
            }
            return rows;
        }, []);
    };

    return (
        <Modal show={show} onHide={onHide} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>{action === 'edit' ? 'Edit Role' : 'Role Details'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {action === 'edit' ? (
                    <Container>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3' controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Name'
                                            name='name'
                                            onChange={handleChange}
                                            value={roleDetails?.name || ''}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className='mb-3' controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Description'
                                            name='description'
                                            onChange={handleChange}
                                            value={roleDetails?.description || ''}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {dividePermissionsIntoRows().map((row, rowIndex) => (
                                <Row key={rowIndex}>
                                    {row.map(([prefix, permissions]) => (
                                        <Col key={prefix}>
                                            <h4>{prefix}</h4>
                                            {permissions.map((permission) => (
                                                <Form.Check
                                                    key={permission.id}
                                                    type='checkbox'
                                                    label={permission.description}
                                                    id={permission.id.toString()}
                                                    onChange={handleChangeChecks}
                                                    checked={activePermissions.includes(permission.id)}
                                                />
                                            ))}
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </Form>
                    </Container>
                ) : (
                    <Container>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3' controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Name'
                                            name='name'
                                            onChange={handleChange}
                                            value={roleDetails?.name || ''}
                                            disabled
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className='mb-3' controlId='description'>
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type='text'
                                            placeholder='Enter Description'
                                            name='description'
                                            onChange={handleChange}
                                            value={roleDetails?.description || ''}
                                            disabled
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            {dividePermissionsIntoRows().map((row, rowIndex) => (
                                <Row key={rowIndex}>
                                    {row.map(([prefix, permissions]) => (
                                        <Col key={prefix}>
                                            <h4>{prefix}</h4>
                                            {permissions.map((permission) => (
                                                <Form.Check
                                                    key={permission.id}
                                                    type='checkbox'
                                                    label={permission.description}
                                                    id={permission.id.toString()}
                                                    onChange={handleChangeChecks}
                                                    checked={activePermissions.includes(permission.id)}
                                                    disabled
                                                />
                                            ))}
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </Form>
                    </Container>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onHide}>
                    Close
                </Button>
                {action === 'edit' && (
                    <Button variant='primary' onClick={handleSubmit}>
                        Save Changes
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default RoleModal;
