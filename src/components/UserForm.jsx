import { useState } from "react";

function UserForm(){
    const [ textName, setTextName] =  useState('')
    const [ textPassword, setTextPassword] =  useState('')

    function handleTextName(e){
        setTextName(e.target.value)
    }
    function handleTextPassword(e){
        setTextPassword(e.target.value)
    }
    function handleClickForm(e){
        e.preventDefault()
        console.log(textName,textPassword)
        fetch('http://127.0.0.1:8000/api/users', {
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

    return(
        <form>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" onChange={handleTextName} value={textName}/>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" onChange={handleTextPassword} value={textPassword}/>
            <input type="submit" value="Create User" onClick = {handleClickForm} />
        </form>
    )
}
export default UserForm;