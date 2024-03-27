import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';


import { ToastContainer, toast } from 'react-toastify';

import '../styles/login.css'

const Login = () => {
  const [inputs, setInputs] = useState({});

  const [loginError, setLoginError] = useState(false);

  const apiUrl =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_REACT_APP_API_URL_PROD
      : import.meta.env.VITE_REACT_APP_API_URL_DEV;


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.promise(
      fetch(apiUrl + `/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          username: inputs.username,
          hashed_password: inputs.password,
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

      <div className="centered-container">

        <Row>
          <h2>Login</h2>
        </Row>

        <Row>
          <Image src="https://via.placeholder.com/200" roundedCircle />
        </Row>

        <Row>
          <h4>Login with admin:admin</h4>
        </Row>

        <Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name='username'
                value={inputs.username || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={inputs.password ||  ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Check
                  type="checkbox"
                  id="autoSizingCheck"
                  className="mb-2"
                  label="Remember me"
                />
            </Form.Group>

            {loginError && <p>Incorrect username or password.</p>}

            <Row>
              <Col>
              </Col>

              <Col>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Col>

              <Col>
              </Col>
            </Row>

          </Form>
        </Row>

      </div>
      

    </>
  );
};

export default Login;
