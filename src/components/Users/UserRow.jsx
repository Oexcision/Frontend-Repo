import { useState } from "react";
import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';

import UserDetailModal from "./UserDetailModal";
import UserEditModal from "./UserEditModal";

function UserRow({ username, hashed_password, id, name, email, created_at, updated_at,deleted_at }) {
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [userDetails, setUserDetails] = useState({
        id,
        username,
        hashed_password,
        name,
        email,
        created_at,
        updated_at,
        deleted_at
    });

    const apiUrl =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_REACT_APP_API_URL_PROD
      : import.meta.env.VITE_REACT_APP_API_URL_DEV;


    const handleDetailModalClose = () => setShowDetailModal(false);
    const handleDetailModalShow = () => {
        // Realiza la solicitud GET a la API de FastAPI
        fetch(apiUrl+'/users/'+id)
            .then(res => res.json())
            .then(res => setUserDetails(res))
            .catch(error => {
                console.error('Fetch error:', error);
            });
        setShowDetailModal(true);
    };

    const handleEditModalClose = () => setShowEditModal(false);
    const handleEditModalShow = () => setShowEditModal(true);


    return(
        <>
            <tr key={id}>
                <td>{id}</td>
                <td>{username}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                    <Button variant="success" size="sm" onClick={handleDetailModalShow}>View</Button>{' '} 
                    <Button variant="warning" size="sm" onClick={handleEditModalShow}>Edit</Button>{' '} 
                    <Link to={`/users/edit/${id}`}>
                        <Button variant="warning" size="sm">Edit</Button>
                    </Link>{' '}
                    <Link to={`/users/delete/${id}`}>
                        <Button variant="danger" size="sm">Delete</Button>
                    </Link>{' '}
                </td>
            </tr>
            <UserDetailModal 
                show={showDetailModal} 
                handleClose={handleDetailModalClose} 
                userDetails={userDetails} 
            />
            <UserEditModal
                show={showEditModal}
                handleClose={handleEditModalClose}
                userDetails={userDetails}
                setUserDetails={setUserDetails}
            />
        </>
    )
}

export default UserRow;