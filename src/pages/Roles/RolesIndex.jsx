import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

import RoleCreateModal from '../../components/Roles/RoleCreateModal';
import RoleTable from '../../components/Roles/RoleTable';

function RolesIndex(){
    const [roles, setRoles] = useState([]); 
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreateModalClose = () => setShowCreateModal(false);
    const handleCreateModalShow = () => setShowCreateModal(true);

    useEffect(() => {
        fetchRoles();
    }, []); // Fetch Roles when the component mounts

    const fetchRoles = () => {
        const apiUrl =
            import.meta.env.MODE === 'production'
                ? import.meta.env.VITE_REACT_APP_API_URL_PROD
                : import.meta.env.VITE_REACT_APP_API_URL_DEV;

        axios.get(apiUrl + '/roles')
            .then((res) => setRoles(res.data))
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    };

    return(
        <>
            <h1>Index Roles</h1>

            <Row className="mb-3">
                <Col xs={8}>
                    <h2>List Roles</h2>
                </Col>
                <Col xs={4} className="text-end">
                    <Button variant="primary" onClick={handleCreateModalShow}>
                        Create Role
                    </Button>
                </Col>
            </Row>

            <RoleTable roles={roles} fetchRoles={fetchRoles}/>

            <RoleCreateModal show={showCreateModal} handleClose={handleCreateModalClose} fetchRoles={fetchRoles} />
        </>
    );
};

export default RolesIndex;