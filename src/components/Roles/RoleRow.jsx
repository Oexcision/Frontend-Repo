import React from 'react';
import { Button } from 'react-bootstrap';

const RoleRow = ({ role, onView, onEdit, onDelete, onRecover, permissionsOfUser }) => {
  return (
    <tr>
      <td>{role.id}</td>
      <td>{role.name}</td>
      <td>{role.description}</td>
      <td>
        <Button variant="primary" onClick={onView}>View</Button>{' '}

        {permissionsOfUser && permissionsOfUser.some(p => p.name === 'role_edit') && 
        <Button variant="warning" onClick={onEdit}>Edit</Button>}{' '}

        {!role.deleted_at && 
        permissionsOfUser && permissionsOfUser.some(p => p.name === 'role_delete') &&
         <Button variant="danger" onClick={onDelete}>Delete</Button>}

        {role.deleted_at && 
        permissionsOfUser && permissionsOfUser.some(p => p.name === 'role_recover') && 
        <Button variant="success" onClick={onRecover}>Recover</Button>}
        

      </td>
    </tr>
  );
};

export default RoleRow;