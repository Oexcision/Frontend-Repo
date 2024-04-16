import React, { useState, useEffect } from 'react';
import { Modal, 
        Button, 
        Form, 
        Badge,
        Container,
        Row,
        Col } from 'react-bootstrap';
        
import { toast } from 'react-toastify';

const RoleModal = ({ show, role, action, fetchRoles, onHide }) => {
    const [roleDetails, setRoleDetails] = useState(role);
    const [permissions, setPermissions] = useState([]);
    const [activePermissions, setActivePermissions] = useState([]);

    const apiUrl =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_REACT_APP_API_URL_PROD
        : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    useEffect(() => {
        setRoleDetails(role);
    }, [role]);

    const fetchPermissions = () => {
        fetch(apiUrl + '/permissions')
            .then((res) => res.json())
            .then((res) => setPermissions(res))
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    };

    useEffect(() => {
        if (permissions.length === 0) {
            fetchPermissions();
        }
    }, []);
    
    
    useEffect(() => {
        if (role && role.permissions) { // Verificar si role y role.permissions no son nulos
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
            setActivePermissions(prevPermissions => [...prevPermissions, parseInt(id)]); // Agregar el id del permiso activo
        } else {
            setActivePermissions(prevPermissions => prevPermissions.filter(permissionId => permissionId !== parseInt(id))); // Eliminar el id del permiso activo
        }
    };
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(roleDetails.id, roleDetails.name, roleDetails.description, roleDetails.permissions, activePermissions);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: roleDetails.id,
                name: roleDetails.name,
                description: roleDetails.description,
                permissions: activePermissions
            }),
        };

        fetch(apiUrl + `/roles/${role.id}`, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to save changes');
                }
                onHide();
                toast.success('Role edit successfully');
                fetchRoles();
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error('Failed to edit role');
            });
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
                                                    checked={activePermissions.includes(permission.id)} // Verifica si algÃºn permiso seleccionado coincide con el ID del permiso actual
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
                                                    checked={activePermissions.includes(permission.id)} // Verifica si algÃºn permiso seleccionado coincide con el ID del permiso actual
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