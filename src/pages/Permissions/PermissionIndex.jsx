import React, { useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PermissionTable from '../../components/Permissions/PermissionTable';
import PermissionCreateModal from '../../components/Permissions/PermissionCreateModal';

const PermissionIndex = () => {

    const [permissions, setPermissions] = useState([]); 

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreateModalClose = () => setShowCreateModal(false);
    const handleCreateModalShow = () => setShowCreateModal(true);

    // Función para actualizar los datos de la tabla
    
    const fetchPermissions = () => {
        const apiUrl =
            import.meta.env.MODE === 'production'
                ? import.meta.env.VITE_REACT_APP_API_URL_PROD
                : import.meta.env.VITE_REACT_APP_API_URL_DEV;

        fetch(apiUrl + '/permissions')
            .then((res) => res.json())
            .then((res) => setPermissions(res))
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