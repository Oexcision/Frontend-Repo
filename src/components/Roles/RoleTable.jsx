import { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table'

import Paginate from '../Paginate';
import RoleRow from './RoleRow'
import RoleModal from './RoleModal';

import { toast } from 'react-toastify';

function RoleTable({ roles, fetchRoles }){

    const apiUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_REACT_APP_API_URL_PROD
    : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    useEffect(() => {
        fetchRoles();
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // número de elementos por página
  
    // Calcular índices de los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = roles.slice(indexOfFirstItem, indexOfLastItem);
  
    // Calcular números de página
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(roles.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const handleClick = (number) => {
      setCurrentPage(number);
    };

    const [selectedRole, setSelectedRole] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');

    const handleView = (role) => {
        setSelectedRole(role);
        setAction('view');
        setShowModal(true);
      };
    
      const handleEdit = (role) => {
        setSelectedRole(role);
        setAction('edit');
        setShowModal(true);
      };
    
      const handleDelete = (roleId) => {
        fetch(apiUrl + `/roles/${roleId}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete role');
          }
          toast.success('Role deleted successfully');
          fetchRoles();
          // Puedes añadir lógica adicional aquí, como recargar la lista de usuarios
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error('Failed to delete role');
        });
      };

      const handleRecover = (roleId) => {
        fetch(apiUrl + `/roles/${roleId}`, { method: 'POST' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to recover role');
          }
          toast.success('role recover successfully');
          fetchRoles();
          // Puedes añadir lógica adicional aquí, como recargar la lista de usuarios
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error('Failed to recover role');
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
                        currentItems.map(role=>(
                        <RoleRow 
                            key={role.id}
                            role={role}
                            onView={() => handleView(role)}
                            onEdit={() => handleEdit(role)}
                            onDelete={() => handleDelete(role.id)}
                            onRecover={() => handleRecover(role.id)}
                        />
                        ))
                    }
                </tbody>
            </Table>

            <RoleModal
            show={showModal}
            role={selectedRole}
            action={action}
            fetchRoles={fetchRoles}
            onHide={() => setShowModal(false)}
            />
                
            <Paginate currentPage={currentPage} pageNumbers={pageNumbers} handleClick={handleClick} />

        </>

    )
}
export default RoleTable;