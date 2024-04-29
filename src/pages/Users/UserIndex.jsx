import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserCreateModal from '../../components/Users/UserCreateModal';
import HeaderIndex from '../../components/HeaderIndex';
import DataTable from '../../components/DataTable';

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

        axios.get(apiUrl + '/users',{
            headers: {
              Authorization: localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
            }
           })
            .then((res) => setUsers(res.data))
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    };

    const columnsOfTable = [{id:1, name:"id", description:"ID"},
                            {id:2, name:"username", description:"Username"},
                            {id:3, name:"name", description:"Name"},
                            {id:4, name:"email", description:"Email"},
                            {id:5, name:"birthday", description:"Birthday"}]

    return (
        <>  
            <HeaderIndex 
                nameIndex={"Users"} 
                nameButton={"User"} 
                handleCreateModalShow={handleCreateModalShow} 
                permissionCreate={permissionsOfUser && permissionsOfUser.some(p => p.name === 'user_create')?true:false}/>

            {permissionsOfUser && permissionsOfUser.some(p => p.name === 'user_view') && (
                <DataTable 
                    columns={columnsOfTable} 
                    data={users} 
                    entity={{single:"User",plural:"users"}} 
                    fetchData={fetchUsers}
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