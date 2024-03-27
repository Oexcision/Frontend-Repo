import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import UserTable from '../../components/Users/UserTable';
import UserCreateModal from '../../components/Users/UserCreateModal';

const UserIndex = () => {

    const [users, setUsers] = useState([]); 

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreateModalClose = () => setShowCreateModal(false);
    const handleCreateModalShow = () => setShowCreateModal(true);

    // Función para actualizar los datos de la tabla
    
    const fetchUsers = () => {
        const apiUrl =
            import.meta.env.MODE === 'production'
                ? import.meta.env.VITE_REACT_APP_API_URL_PROD
                : import.meta.env.VITE_REACT_APP_API_URL_DEV;

        fetch(apiUrl + '/users')
            .then((res) => res.json())
            .then((res) => setUsers(res))
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    };
    


    return (
        <>
            <h1>Index Users</h1>

            <Row className="mb-3">
                <Col xs={8}>
                    <h2>List Users</h2>
                </Col>
                <Col xs={4} className="text-end">
                    <Button variant="primary" onClick={handleCreateModalShow}>
                        Create User
                    </Button>
                </Col>
            </Row>

            <UserTable users={users} fetchUsers={fetchUsers}/>

            <UserCreateModal show={showCreateModal} handleClose={handleCreateModalClose} fetchUsers={fetchUsers} />

        </>
    );
};

export default UserIndex;