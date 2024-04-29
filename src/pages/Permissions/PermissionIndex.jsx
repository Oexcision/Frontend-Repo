import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PermissionCreateModal from '../../components/Permissions/PermissionCreateModal';
import HeaderIndex from '../../components/HeaderIndex';
import DataTable from '../../components/DataTable';

import { useAuthentication } from '../../contexts/AuthContext';

const PermissionIndex = () => {

    const { permissionsOfUser } = useAuthentication();

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

    const columnsOfTable = [{id:1, name:"id", description:"ID"},
                            {id:2, name:"name", description:"Name"},
                            {id:3, name:"description", description:"Description"}]

    return (
        <>
            <HeaderIndex 
                nameIndex={"Permissions"} 
                nameButton={"Permission"} 
                handleCreateModalShow={handleCreateModalShow}
                permissionCreate={permissionsOfUser && permissionsOfUser.some(p => p.name === 'permission_create')?true:false}/>


            <DataTable
                columns={columnsOfTable} 
                data={permissions} 
                entity={{single:"Permission",plural:"permissions"}} 
                fetchData={fetchPermissions}
                permissionsOfUser={permissionsOfUser}/>

            <PermissionCreateModal 
                show={showCreateModal} 
                handleClose={handleCreateModalClose} 
                fetchPermissions={fetchPermissions} />

        </>
    );
};

export default PermissionIndex;