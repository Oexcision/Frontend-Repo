import React, { useState, useEffect } from 'react';
import axios from 'axios';

import RoleCreateModal from '../../components/Roles/RoleCreateModal';
import HeaderIndex from '../../components/HeaderIndex';
import DataTable from '../../components/DataTable';

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

    const columnsOfTable = [{id:1, name:"id", description:"ID"},
                            {id:2, name:"name", description:"Name"},
                            {id:3, name:"description", description:"Description"}]

    return(
        <>
            <HeaderIndex 
                nameIndex={"Roles"} 
                nameButton={"Role"} 
                handleCreateModalShow={handleCreateModalShow}
                permissionCreate={permissionsOfUser && permissionsOfUser.some(p => p.name === 'role_create')?true:false}/>

            <DataTable
                columns={columnsOfTable} 
                data={roles} 
                entity={{single:"Role",plural:"roles"}} 
                fetchData={fetchRoles}
                permissionsOfUser={permissionsOfUser}/>

            <RoleCreateModal 
                show={showCreateModal} 
                handleClose={handleCreateModalClose} 
                fetchRoles={fetchRoles} />
        </>
    );
};

export default RolesIndex;