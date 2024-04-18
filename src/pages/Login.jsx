import { useState } from "react";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import { ToastContainer, toast } from "react-toastify";

import '../styles/login.css'

import { useAuthentication } from "../contexts/AuthContext";    

function Login (){
    const { login } = useAuthentication();
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

    const handleSuccess = () => {
        toast.success("Login successful!");
    };

    const handleError = () => {
        toast.error("Error: Invalid username or password");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(inputs.username,inputs.password, handleSuccess, handleError)
    }

    return(
        <>
            <ToastContainer/>
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

                        {
                        //loginError && <p>Incorrect username or password.</p>
                        }

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
}

export default Login;