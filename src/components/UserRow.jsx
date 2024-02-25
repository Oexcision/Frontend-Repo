import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';


function UserRow({ name, password, id }){
   
    return(
        <tr key = {id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{password}</td>
            <td>
                <Link to={`/users/view/${id}`}>
                    <Button variant="success" size="sm" id={id}>View</Button>
                </Link>{' '}
                <Link to={`/users/edit/${id}`}>
                    <Button variant="warning" size="sm" id={id}>Edit</Button>
                </Link>{' '}
                <Link to={`/users/delete/${id}`}>
                    <Button variant="danger" size="sm" id={id}>Delete</Button>
                </Link>{' '}
            </td>
        </tr>
    )
}
export default UserRow