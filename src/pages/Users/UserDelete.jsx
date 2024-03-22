import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function UserDelete() {
    const apiUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_REACT_APP_API_URL_PROD
        : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(apiUrl + `/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        })
        .then(() => {
            alert("Hecho.");
            // Redirigir a la página anterior
            navigate('/users/list'); // Esto es equivalente a history.goBack()
        })
        .catch(error => {
            console.error('Error al borrar el usuario:', error);
            alert('Ocurrió un error al intentar borrar el usuario.');
        });
    }, [apiUrl, id, navigate]);

    return null; // O puedes retornar algún otro contenido si lo deseas
}

export default UserDelete;