import { useState } from "react";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

import { ToastContainer, toast } from 'react-toastify';


function UserCreateModal({ show, handleClose }) {

    const [ inputs, setInputs] =  useState({})

    const apiUrl =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_REACT_APP_API_URL_PROD
      : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}))
    }


    function handleSubmit(e){
        e.preventDefault();

        toast.promise(
            fetch(apiUrl+`/users`, {
                method: 'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: inputs.username,
                    hashed_password: inputs.password,
                    name: inputs.name,
                    email:inputs.email,
                }),

            }).then((response)=>{
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error ('Network response was not ok')
                }
            }).then((data) =>{
                console.log(data.id,data.username,data.hashed_password,data.name,data.username);
            }).catch((error) => {
                return Promise.reject(error);
            }),
            {
                pending: 'Enviando solicitud...',
                success: () => '¡Inicio de sesión exitoso!',
                error: () => 'Hubo un error al iniciar sesión.',
            }
            
        ).then(() =>{
            handleClose();
            setTimeout(() => {
                window.location.reload();
              }, 3000);
        });
    }
    return (
        <>
            <ToastContainer />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label> Name
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Username" 
                            name="username"
                            onChange={handleChange} 
                            value={inputs.username || ""}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label> Password 
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Enter Password" 
                            name="password"
                            onChange={handleChange} 
                            value={inputs.password || ""} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Name" 
                            name="name"
                            onChange={handleChange} 
                            value={inputs.name || ""} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Enter Email" 
                            name="email"
                            onChange={handleChange} 
                            value={inputs.email || ""} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserCreateModal;