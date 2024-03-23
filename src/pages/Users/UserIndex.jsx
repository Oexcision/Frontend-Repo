import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import UserTable from '../../components/Users/UserTable';
import UserCreateModal from '../../components/Users/UserCreateModal';

const UserIndex = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreateModalClose = () => setShowCreateModal(false);
    const handleCreateModalShow = () => setShowCreateModal(true);


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

            <UserTable />

            <UserCreateModal show={showCreateModal} handleClose={handleCreateModalClose} />
        </>
    );
};

export default UserIndex;