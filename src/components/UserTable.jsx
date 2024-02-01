import UserRow from './UserRow'
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'

function UserTable(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch('https://backend-repo-iota.vercel.app/api/users/')
        .then(res => res.json())
        .then(res => setUsers(res))
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }, []);

    return(
        <>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>   
                </thead>
                <tbody>
                    {
                        users.map(user=>(
                        <UserRow name = {user.name} password={user.password} id={user.id} key={user.id}/>
                        ))
                    }
                </tbody>

            </Table>

        </>

    )
}
export default UserTable;