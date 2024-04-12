import React from 'react';
import { Button } from 'react-bootstrap';

const RoleRow = ({ role, onView, onEdit, onDelete, onRecover }) => {
  return (
    <tr>
      <td>{role.id}</td>
      <td>{role.name}</td>
      <td>{role.description}</td>
      <td>
        <Button variant="primary" onClick={onView}>View</Button>{' '}
        <Button variant="warning" onClick={onEdit}>Edit</Button>{' '}
        {!role.deleted_at &&<Button variant="danger" onClick={onDelete}>Delete</Button>}
        {role.deleted_at && <Button variant="success" onClick={onRecover}>Recover</Button>}
        

      </td>
    </tr>
  );
};

export default RoleRow;