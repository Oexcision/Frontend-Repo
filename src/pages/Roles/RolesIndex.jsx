import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RoleCreateModal from '../../components/Roles/RoleCreateModal';
import RoleTable from '../../components/Roles/RoleTable';
import HeaderIndex from '../../components/HeaderIndex';

import { useAuthentication } from '../../contexts/AuthContext';

function RolesIndex(){

    const { permissionsOfUser } = useAuthentication();

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
            <HeaderIndex 
                nameIndex={"Roles"} 
                nameButton={"Role"} 
                handleCreateModalShow={handleCreateModalShow}
                permissionCreate={permissionsOfUser && permissionsOfUser.some(p => p.name === 'role_create')?true:false}/>

            <RoleTable 
                roles={roles} 
                fetchRoles={fetchRoles}
                permissionsOfUser={permissionsOfUser}/>

            <RoleCreateModal 
                show={showCreateModal} 
                handleClose={handleCreateModalClose} 
                fetchRoles={fetchRoles} />
        </>
    );
};

export default RolesIndex;