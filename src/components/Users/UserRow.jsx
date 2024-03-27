import React from 'react';
import { Button } from 'react-bootstrap';

const UserRow = ({ user, onView, onEdit, onDelete, onRecover }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Button variant="primary" onClick={onView}>View</Button>{' '}
        <Button variant="warning" onClick={onEdit}>Edit</Button>{' '}
        {!user.deleted_at &&<Button variant="danger" onClick={onDelete}>Delete</Button>}
        {user.deleted_at && <Button variant="success" onClick={onRecover}>Recover</Button>}
        

      </td>
    </tr>
  );
};

export default UserRow;