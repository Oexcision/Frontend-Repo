import Button from "react-bootstrap/Button";

function DataRow({ columns, item }){
    return(
        <tr>
            {columns.map(column => (
                <td key={column.id}>{item[column.name]}</td>
            ))}
                <td>
                    <Button variant="primary">View</Button>{' '}
                    <Button variant="warning">Edit</Button>{' '}
                    {!item.deleted_at && 
                    <Button variant="danger">Delete</Button>
                    }
                    {item.deleted_at && 
                    <Button variant="success">Recover</Button>
                    }
                </td>
        </tr>
    );

}
export default DataRow;