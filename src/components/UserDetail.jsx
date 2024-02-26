import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserRow from './UserRow'

function UserDetail(){
    const [user, setUser] = useState([]);

    const { id } = useParams();

    const apiUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_REACT_APP_API_URL_PROD
    : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    useEffect(() => {
      // Realiza la solicitud GET a la API de FastAPI
      fetch(apiUrl+'/users/'+id)
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