function UserRow({ name, password, id }){
    return(
        <tr key = {id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{password}</td>
            <td>
                <button id={id}>Edit</button>
                <button id={id}>Delete</button>
            </td>
        </tr>
    )
}
export default UserRow