import { useState } from 'react';

import { Row, Col, Form, Image, Button } from 'react-bootstrap'

import axios from 'axios';

import { toast } from 'react-toastify';

import { useAuthentication } from '../../contexts/AuthContext';

function MeIndex(){

    const { user } = useAuthentication();

    const [ userDetails, setUserDetails ] = useState(user);
    const [ inputsPassword, setInputsPassword ] = useState();

    const [ selectedFile, setSelectedFile ] = useState(null);
    
    const [ previewImageUrl, setPreviewImageUrl ] = useState(null); // Nuevo estado para la URL temporal de la imagen seleccionada

    const apiUrl =
    import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_REACT_APP_API_URL_PROD
        : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChangePasswords = (e) => {
        const { name, value } = e.target;
        setInputsPassword(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);

        const temporaryImageUrl = URL.createObjectURL(event.target.files[0]);
        setPreviewImageUrl(temporaryImageUrl);
      };
    
      const uploadImage = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);
      
        try {
          const response = await axios.post(`${apiUrl}/upload-image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `${localStorage.getItem('token_type')} ${localStorage.getItem('access_token')}`,
            },
          });
      
          if (response.status === 200) {
            return response.data.imageUrl;
          } else {
            throw new Error('Failed to upload image');
          }
        } catch (error) {
          console.error('Error:', error);
          toast.error('Failed to upload image');
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( inputsPassword &&
            inputsPassword.password &&
            inputsPassword.confirmPassword &&
            inputsPassword.password === inputsPassword.confirmPassword){

            console.log(inputsPassword.password, userDetails);

            const imageUrl = await uploadImage();
            //console.log(imageUrl)
    
            const requestOptions = {
                method: 'PUT',
                headers: {  'Content-Type': 'application/json', 
                            'Authorization': localStorage.getItem("token_type") + " " + localStorage.getItem("access_token") },
                body: JSON.stringify({
                    id: userDetails.id,
                    username: userDetails.username,
                    hashed_password: inputsPassword.password,
                    name: userDetails.name,
                    email: userDetails.email,
                    birthday: userDetails.birthday,
                    image_url: imageUrl,
                    roles: [user.roles[0].id]
    
                })
            };


            axios.put(apiUrl + `/users/${user.id}`, requestOptions.body, { headers: requestOptions.headers })
            .then(response => {
                if (response.status === 200) {
                    toast.success('User edit successfully');
                } else {
                    throw new Error('Failed to save changes');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to edit user');
            });
        }
        else{
            toast.error('Las contraseñas no coinciden.');
        }
    }

    return(
        <>
            <h1 className='mb-3 mt-3 text-4xl'>User Details</h1>

            <Row className="mb-3">
                <Col xs={8}>
                    <h2 className='text-2xl'>{user.name}'s Details</h2>
                </Col>
                <Col xs={4} className="text-end">

                </Col>
            </Row>

            
            <Form>
                <Row className='mb-3'>
                    <Col md="8">
                        <Row className="mb-3">
                            <Form.Group controlId="validationCustom01" as={Col} md="6">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Username"
                                    name='username'
                                    value={userDetails?.username || ""}
                                    onChange={handleChange}
                                    disabled/>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="validationCustom02" as={Col} md="6">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={userDetails?.name || ""}
                                    onChange={handleChange}/>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">

                            <Form.Group controlId="validationCustom03" as={Col} md="6">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    value={userDetails?.email || ""}
                                    onChange={handleChange}
                                    disabled/>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group  controlId="validationCustom04" as={Col} md="6">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    required
                                    type="date"
                                    name="birthday"
                                    value={userDetails?.birthday || ""}
                                    onChange={handleChange}
                                    />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group  controlId="validationCustom05" as={Col} md="6">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={inputsPassword?.password || ""}
                                    onChange={handleChangePasswords}/>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group  controlId="validationCustom06" as={Col} md="6">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={inputsPassword?.confirmPassword || ""}
                                    onChange={handleChangePasswords}/>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                    
                    </Col>

                    <Col md="4">
                        <Row  className="mb-3">
                            <Col md="3"/>
                            <Col md="5">
                                {previewImageUrl ? (
                                    <Image src={previewImageUrl} roundedCircle />
                                ) : (
                                    <Image src={userDetails.image_url || "https://via.placeholder.com/200"} roundedCircle />
                                )}
                            </Col>
                            <Col md="3"/>
                        </Row>
                        <Row  className="mb-3">
                            <Form.Group controlId="formFile" >
                                <Form.Label>Select an image</Form.Label>
                                <Form.Control type="file" onChange={handleFileChange}/>
                            </Form.Group>
                        </Row>
                    </Col>
                </Row>
            </Form>

            <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>

        </>
    );

}

export default MeIndex;