import { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function UserForm(){
    const [ textName, setTextName] =  useState('')
    const [ textPassword, setTextPassword] =  useState('')
    
    const apiUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_REACT_APP_API_URL_PROD
    : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    function handleTextName(e){
        setTextName(e.target.value)
    }
    function handleTextPassword(e){
        setTextPassword(e.target.value)
    }
    function handleClickForm(e){
        e.preventDefault()
        console.log(textName,textPassword)
        fetch(apiUrl+'/users', {
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name:textName,
                password:textPassword
            })
        }).then(() =>{
            setTextName('')
            setTextPassword('')
        })

    }
    /*
    const [myCar, setMyCar] = useState("Volvo");

    const handleChange = (event) => {
      setMyCar(event.target.value)
    }
    */

    return(
            <>
            {
                /*
                <form onSubmit={handleClickForm}>
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" onChange={handleTextName} value={textName}/>
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" onChange={handleTextPassword} value={textPassword}/>
                    <input type="submit" value="Create User"/>
                </form> 
                */
            }


                <Form onSubmit={handleClickForm}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name: </Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={handleTextName} value={textName}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={handleTextPassword} value={textPassword} />
                    </Form.Group>
                    {
                    /*
                    <select value={myCar} onChange={handleChange}>
                        <option value="Ford">Ford</option>
                        <option value="Volvo">Volvo</option>
                        <option value="Fiat">Fiat</option>
                    </select>
                    */
                    }

                    {     
                    /*               
                    <Form.Group className="mb-3">
                        <Form.Control type="submit" value="Create User"></Form.Control>
                    </Form.Group>
                    */
                    }
                    <Button variant="primary" type="submit">
                        Create User
                    </Button>
                </Form>
            </>
        
    )
}
export default UserForm;