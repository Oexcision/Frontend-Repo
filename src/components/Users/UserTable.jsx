import UserRow from './UserRow'
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import Paginate from '../Paginate';

function UserTable(){
    const [users, setUsers] = useState([]);

    const apiUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_REACT_APP_API_URL_PROD
    : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    useEffect(() => {
      fetch(apiUrl+'/users')
        .then(res => res.json())
        .then(res => setUsers(res))
        .catch(error => {
          console.error('Fetch error:', error);
        });
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

    return(
        <>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Password</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Disabled</th>
                        <th>Actions</th>
                    </tr>   
                </thead>
                <tbody>
                    {
                        currentItems.map(user=>(
                        <UserRow username = {user.username} 
                            hashed_password={user.hashed_password} 
                            id={user.id} 
                            name={user.name}
                            email={user.email}
                            disabled={user.disabled}
                            key={user.id}/>
                        ))
                    }
                </tbody>
            </Table>
            <Paginate currentPage={currentPage} pageNumbers={pageNumbers} handleClick={handleClick} />

        </>

    )
}
export default UserTable;