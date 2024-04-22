import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Paginate from '../Paginate';
import PermissionRow from './PermissionRow';
import PermissionModal from './PermissionModal';
import axios from 'axios';
import { toast } from 'react-toastify';

function PermissionTable({ permissions, fetchPermissions, permissionsOfUser }){

    const apiUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_REACT_APP_API_URL_PROD
    : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    useEffect(() => {
        fetchPermissions();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = permissions.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(permissions.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }

    const handleClick = (number) => {
      setCurrentPage(number);
    };

    const [selectedPermission, setSelectedPermission] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');

    const handleView = (permission) => {
        setSelectedPermission(permission);
        setAction('view');
        setShowModal(true);
      };
    
    const handleEdit = (permission) => {
        setSelectedPermission(permission);
        setAction('edit');
        setShowModal(true);
    };
    
    const handleDelete = (permissionId) => {
        axios.delete(`${apiUrl}/permissions/${permissionId}`)
        .then(response => {
            if (response.status === 200) {
                toast.success('Permission deleted successfully');
                fetchPermissions();
            } else {
                throw new Error('Failed to delete permission');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Failed to delete permission');
        });
    };

    const handleRecover = (permissionId) => {
        axios.post(`${apiUrl}/permissions/${permissionId}`)
        .then(response => {
            if (response.status === 200) {
                toast.success('Permission recovered successfully');
                fetchPermissions();
            } else {
                throw new Error('Failed to recover permission');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toast.error('Failed to recover permission');
        });
    };

    return (
        <>  
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>   
                </thead>
                <tbody>
                    {   
                        currentItems.map(permission => (
                            <PermissionRow 
                                key={permission.id}
                                permission={permission}
                                onView={() => handleView(permission)}
                                onEdit={() => handleEdit(permission)}
                                onDelete={() => handleDelete(permission.id)}
                                onRecover={() => handleRecover(permission.id)}
                                permissionsOfUser={permissionsOfUser}
                                
                            />
                        ))
                    }
                </tbody>
            </Table>
            <PermissionModal
                show={showModal}
                permission={selectedPermission}
                action={action}
                fetchPermissions={fetchPermissions}
                onHide={() => setShowModal(false)}
            />
            <Paginate currentPage={currentPage} pageNumbers={pageNumbers} handleClick={handleClick} />
        </>
    );
}

export default PermissionTable;
