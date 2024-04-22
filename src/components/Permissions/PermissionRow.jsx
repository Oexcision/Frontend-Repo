import React from 'react';
import { Button } from 'react-bootstrap';

const PermissionRow = ({ permission, onView, onEdit, onDelete, onRecover, permissionsOfUser }) => {
  return (
    <tr>
      <td>{permission.id}</td>
      <td>{permission.name}</td>
      <td>{permission.description}</td>
      <td>
        <Button variant="primary" onClick={onView}>View</Button>{' '}

        {permissionsOfUser && permissionsOfUser.some(p => p.name === 'permission_edit') && 
        <Button variant="warning" onClick={onEdit}>Edit</Button>}{' '}

        {!permission.deleted_at && 
        permissionsOfUser && permissionsOfUser.some(p => p.name === 'permission_delete') &&
         <Button variant="danger" onClick={onDelete}>Delete</Button>}

        {permission.deleted_at && 
        permissionsOfUser && permissionsOfUser.some(p => p.name === 'permission_recover') && 
        <Button variant="success" onClick={onRecover}>Recover</Button>}
        

      </td>
    </tr>
  );
};

export default PermissionRow;