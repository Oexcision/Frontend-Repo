import React from 'react';
import { Button } from 'react-bootstrap';

const PermissionRow = ({ permission, onView, onEdit, onDelete, onRecover }) => {
  return (
    <tr>
      <td>{permission.id}</td>
      <td>{permission.name}</td>
      <td>{permission.description}</td>
      <td>
        <Button variant="primary" onClick={onView}>View</Button>{' '}
        <Button variant="warning" onClick={onEdit}>Edit</Button>{' '}
        {!permission.deleted_at &&<Button variant="danger" onClick={onDelete}>Delete</Button>}
        {permission.deleted_at && <Button variant="success" onClick={onRecover}>Recover</Button>}
        

      </td>
    </tr>
  );
};

export default PermissionRow;