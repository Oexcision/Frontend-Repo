import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function UserEdit(){

    const { id }  = useParams();
    const navigate = useNavigate();

    //const [ user,setUser ] = useState({ name: '', password: '' });

    const apiUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_REACT_APP_API_URL_PROD
    : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    const [ textName, setTextName] =  useState('')
    const [ textPassword, setTextPassword] =  useState('')
    
    useEffect(() => {
        // Realiza la solicitud GET a la API de FastAPI
        fetch(apiUrl+`/users/${id}`)
          .then(res => res.json())
          .then(res => {
            //setUser(res);
            setTextName(res.username);
            //setTextPassword(res.hashed_password);
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
      }, []);



    function handleTextName(e){
        setTextName(e.target.value)
    }
    function handleTextPassword(e){
        setTextPassword(e.target.value)
    }
    function handleClickForm(e){
        e.preventDefault()
        console.log(textName,textPassword)
        toast.promise(
            fetch(apiUrl + `/users/${id}`, {
              method: 'PUT',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({
                username: textName,
                hashed_password: textPassword,
              }),
            }).then(() => {
              // Puedes hacer algo después de que la solicitud PUT se complete, si es necesario
              // setTextName('');
              // setTextPassword('');
            }),
            {
              pending: 'Enviando solicitud...', // Mensaje mientras la promesa está pendiente
              success: ({ closeToast }) => (
                <>
                  ¡Actualización exitosa! <button onClick={closeToast}>Cerrar</button>
                </>
              ), // Mensaje si la promesa se resuelve correctamente
              error: 'Hubo un error al actualizar.', // Mensaje si la promesa se rechaza
            }
          ).then(() => {
            // Una vez que la notificación se ha mostrado, puedes navegar a la nueva página
            setTimeout(() => {
                navigate('/users/list');
              }, 2000);
          });

    }




    return(
        <>  
            <h1>Edit User</h1>
            <h2>Form User</h2>
            
            <Form onSubmit={handleClickForm}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name: </Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={handleTextName} value={textName} disabled/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handleTextPassword} value={textPassword} />
                        </Form.Group>
                    </Col>

                </Row>


                <Button variant="primary" type="submit">
                    Update User
                </Button>
                <ToastContainer/>

            </Form>
        </>
    )
}
export default UserEdit;