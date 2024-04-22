import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserTable from '../../components/Users/UserTable';
import UserCreateModal from '../../components/Users/UserCreateModal';
import HeaderIndex from '../../components/HeaderIndex';

import { useAuthentication } from '../../contexts/AuthContext';

const UserIndex = () => {

    const { permissionsOfUser } = useAuthentication();

    const [users, setUsers] = useState([]); 
    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleCreateModalClose = () => setShowCreateModal(false);
    const handleCreateModalShow = () => setShowCreateModal(true);

    useEffect(() => {
        fetchUsers();
    }, []); // Fetch users when the component mounts

    const fetchUsers = () => {
        const apiUrl =
            import.meta.env.MODE === 'production'
                ? import.meta.env.VITE_REACT_APP_API_URL_PROD
                : import.meta.env.VITE_REACT_APP_API_URL_DEV;

        axios.get(apiUrl + '/users')
            .then((res) => setUsers(res.data))
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    };

    return (
        <>  
            <HeaderIndex 
                nameIndex={"Users"} 
                nameButton={"User"} 
                handleCreateModalShow={handleCreateModalShow} 
                permissionCreate={permissionsOfUser && permissionsOfUser.some(p => p.name === 'user_create')?true:false}/>

            {permissionsOfUser && permissionsOfUser.some(p => p.name === 'user_view') && (
            <UserTable 
                users={users} 
                fetchUsers={fetchUsers} 
                permissionsOfUser={permissionsOfUser}/>
            )}

            <UserCreateModal 
                show={showCreateModal} 
                handleClose={handleCreateModalClose} 
                fetchUsers={fetchUsers} />
        </>
    );
};

export default UserIndex;