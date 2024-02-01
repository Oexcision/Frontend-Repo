import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserRow from './UserRow'

function UserDetail(){
    const [user, setUser] = useState([]);

    const { id } = useParams();

    useEffect(() => {
      // Realiza la solicitud GET a la API de FastAPI
      fetch('http://127.0.0.1:8000/api/users/'+id)
        .then(res => res.json())
        .then(res => setUser(res))
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }, []);

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserName</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>   
                </thead>
                <tbody>
                          
                    <UserRow name = {user.name} password={user.password} id={user.id} key={user.id}/>
                    
                </tbody>

            </table>

        </>

    )
}
export default UserDetail;