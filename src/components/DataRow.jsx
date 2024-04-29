import Button from "react-bootstrap/Button";

function DataRow({ columns, item, permissionsOfUser, entity, onView, onEdit,  onDelete, onRecover }){
    return(
        <tr>
            {columns.map(column => (
                <td key={column.id}>{item[column.name]}</td>
            ))}
                <td>
                    <Button variant="primary" onClick={onView}>View</Button>{' '}
                    {permissionsOfUser && permissionsOfUser.some(p => p.name === entity.single.toLowerCase() +'_edit') && 
                    <Button variant="warning" onClick={onEdit}>Edit</Button>}
                    {' '}
                    {!item.deleted_at && 
                     permissionsOfUser && permissionsOfUser.some(p => p.name === entity.single.toLowerCase() +'_delete') && 
                    <Button variant="danger" onClick={onDelete}>Delete</Button>
                    }
                    {item.deleted_at && 
                     permissionsOfUser && permissionsOfUser.some(p => p.name === entity.single.toLowerCase() +'_recover') && 
                    <Button variant="success" onClick={onRecover}>Recover</Button>
                    }
                </td>
        </tr>
    );

}
export default DataRow;