import { useEffect, useState } from 'react';

import Table from 'react-bootstrap/Table'

import Paginate from '../Paginate';
import UserRow from './UserRow'
import UserModal from './UserModal';

import { toast } from 'react-toastify';

function UserTable({ users, fetchUsers }){

    const apiUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_REACT_APP_API_URL_PROD
    : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    useEffect(() => {
        fetchUsers();
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // número de elementos por página
  
    // Calcular índices de los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  
    // Calcular números de página
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    const handleClick = (number) => {
      setCurrentPage(number);
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');

    const handleView = (user) => {
        setSelectedUser(user);
        setAction('view');
        setShowModal(true);
      };
    
      const handleEdit = (user) => {
        setSelectedUser(user);
        setAction('edit');
        setShowModal(true);
      };
    
      const handleDelete = (userId) => {
        fetch(apiUrl + `/users/${userId}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to delete user');
          }
          toast.success('User deleted successfully');
          fetchUsers();
          // Puedes añadir lógica adicional aquí, como recargar la lista de usuarios
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error('Failed to delete user');
        });
      };

      const handleRecover = (userId) => {
        fetch(apiUrl + `/users/${userId}`, { method: 'POST' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to recover user');
          }
          toast.success('User recover successfully');
          fetchUsers();
          // Puedes añadir lógica adicional aquí, como recargar la lista de usuarios
        })
        .catch(error => {
          console.error('Error:', error);
          toast.error('Failed to recover user');
        });
      };

    return(
        <>  
            
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>   
                </thead>
                <tbody>
                    {   
                        currentItems.map(user=>(
                        <UserRow 
                            key={user.id}
                            user={user}
                            onView={() => handleView(user)}
                            onEdit={() => handleEdit(user)}
                            onDelete={() => handleDelete(user.id)}
                            onRecover={() => handleRecover(user.id)}
                        />
                        ))
                    }
                </tbody>
            </Table>
            <UserModal
                show={showModal}
                user={selectedUser}
                action={action}
                fetchUsers={fetchUsers}
                onHide={() => setShowModal(false)}
            />
            <Paginate currentPage={currentPage} pageNumbers={pageNumbers} handleClick={handleClick} />

        </>

    )
}
export default UserTable;