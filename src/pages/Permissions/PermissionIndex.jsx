import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import PermissionTable from '../../components/Permissions/PermissionTable';
import PermissionCreateModal from '../../components/Permissions/PermissionCreateModal';

const PermissionIndex = () => {
    const [permissions, setPermissions] = useState([]); 
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreateModalClose = () => setShowCreateModal(false);
    const handleCreateModalShow = () => setShowCreateModal(true);

    useEffect(() => {
        fetchPermissions();
    }, []); // Fetch Permissions when the component mounts

    const fetchPermissions = () => {
        const apiUrl =
            import.meta.env.MODE === 'production'
                ? import.meta.env.VITE_REACT_APP_API_URL_PROD
                : import.meta.env.VITE_REACT_APP_API_URL_DEV;

        axios.get(apiUrl + '/permissions')
            .then((res) => setPermissions(res.data))
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    };

    return (
        <>
            <h1>Index Permissions</h1>

            <Row className="mb-3">
                <Col xs={8}>
                    <h2>List Permissions</h2>
                </Col>
                <Col xs={4} className="text-end">
                    <Button variant="primary" onClick={handleCreateModalShow}>
                        Create Permission
                    </Button>
                </Col>
            </Row>

            <PermissionTable permissions={permissions} fetchPermissions={fetchPermissions}/>

            <PermissionCreateModal show={showCreateModal} handleClose={handleCreateModalClose} fetchPermissions={fetchPermissions} />

        </>
    );
};

export default PermissionIndex;