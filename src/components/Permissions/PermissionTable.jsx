import { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table'

import Paginate from '../Paginate';
import PermissionRow from './PermissionRow'
import PermissionModal from './PermissionModal';

import { toast } from 'react-toastify';

function PermissionTable({ permissions, fetchPermissions }){

    const apiUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_REACT_APP_API_URL_PROD
    : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    useEffect(() => {
        fetchPermissions();
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // número de elementos por página
  
    // Calcular índices de los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = permissions.slice(indexOfFirstItem, indexOfLastItem);
  
    // Calcular números de página
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
        fetch(apiUrl + `/permissions/${permissionId}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete permission');
          }
          toast.success('Permission deleted successfully');
          fetchPermissions();
          // Puedes añadir lógica adicional aquí, como recargar la lista de usuarios
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error('Failed to delete permission');
        });
      };

      const handleRecover = (permissionId) => {
        fetch(apiUrl + `/permissions/${permissionId}`, { method: 'POST' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to recover permission');
          }
          toast.success('Permission recover successfully');
          fetchPermissions();
          // Puedes añadir lógica adicional aquí, como recargar la lista de usuarios
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error('Failed to recover permission');
        });
      };

    return(
        <>  
            
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Acciones</th>
                    </tr>   
                </thead>
                <tbody>
                    {   
                        currentItems.map(permission=>(
                        <PermissionRow 
                            key={permission.id}
                            permission={permission}
                            onView={() => handleView(permission)}
                            onEdit={() => handleEdit(permission)}
                            onDelete={() => handleDelete(permission.id)}
                            onRecover={() => handleRecover(permission.id)}
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

    )
}
export default PermissionTable;