import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const apiUrl =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_REACT_APP_API_URL_PROD
      : import.meta.env.VITE_REACT_APP_API_URL_DEV;

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.promise(
      fetch(apiUrl + `/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          hashed_password: password,
        }),
      }).then((response) => {

        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      }).then((data) => {
        console.log(data.id, data.username, data.hashed_password); // Aquí puedes acceder a los datos del servidor
        sessionStorage.setItem('isNameUser',data.id)
        //return data; // Devuelve los datos para que puedan ser utilizados en el siguiente .then() o capturados en el catch
      }).catch((error) => {
        setLoginError(true); // Aquí estableces el loginError en true en caso de error
        return Promise.reject(error);
      }),
      {
        pending: 'Enviando solicitud...',
        success: () => '¡Inicio de sesión exitoso!',
        error: () => 'Hubo un error al iniciar sesión.',
      }
    ).then(() => {
      localStorage.setItem('isLoggedIn', 'b326b5062b2f0e69046810717534cb09');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });
  };

  return (
    <>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {loginError && <p>Incorrect username or password.</p>}

        <Button variant="primary" type="submit">
          Submit
        </Button>

        
      </Form>
    </>
  );
};

export default Login;
