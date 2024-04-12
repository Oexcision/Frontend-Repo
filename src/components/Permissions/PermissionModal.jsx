import React, { useState, useEffect } from 'react';
import { Modal, 
        Button, 
        Form, 
        Badge } from 'react-bootstrap';
        
import { toast } from 'react-toastify';

const PermissionModal = ({ show, permission, action, fetchPermissions, onHide }) => {

    const[permissionDetails,setPermissionDetails]= useState(permission);

    useEffect(() => {
        setPermissionDetails(permission);
    }, [permission]);


    const apiUrl =
    import.meta.env.MODE === 'production'
      ? import.meta.env.VITE_REACT_APP_API_URL_PROD
      : import.meta.env.VITE_REACT_APP_API_URL_DEV;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPermissionDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log(permission.id,permissionDetails.name,permissionDetails.description)
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: permissionDetails.name,
                description: permissionDetails.description,

              })
        };

        fetch(apiUrl + `/permissions/${permission.id}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save changes');
                }
                // Aquí podrías realizar alguna acción adicional después de guardar los cambios, como cerrar el modal
                onHide();
                toast.success('Permission edit successfully');
                fetchPermissions();
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to edit permission');
            });

    }



  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{action === 'edit' ? 'Edit Permission' : 'Permission Details'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form to edit user or display user details */}
        {action === 'edit' ? (
          <Form >
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter Name" 
                name="name"
                onChange={handleChange}
                value={permissionDetails?.name || ""}
                 />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter Description" 
                name="description"
                onChange={handleChange}
                value={permissionDetails?.description || ""}
                 />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createdAt">
                <Form.Label>Created at</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter createdAt" 
                name="createdAt"
                onChange={handleChange}
                value={permissionDetails?.created_at || ""} 
                readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="updatedAt">
                <Form.Label>Updated at</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter updatedAt" 
                name="updatedAt"
                onChange={handleChange}
                value={permissionDetails?.updated_at || ""} 
                readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="deletedAt">
                <Form.Label>Deleted at</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter deletedAt" 
                name="deletedAt"
                onChange={handleChange}
                value={permissionDetails?.deleted_at || ""} 
                readOnly/>
            </Form.Group>
        </Form>
        
        ) : (
            
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter Name" 
                    name="name"
                    value={permission?.name || ""}
                    readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter Description" 
                    name="description"
                    value={permission?.description || ""}
                    readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="createdAt">
                    <Form.Label>Created at</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter createdAt" 
                    name="createdAt"
                    value={permission?.created_at || ""} 
                    readOnly/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="updatedAt">
                    <Form.Label>Updated at</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter updatedAt" 
                    name="updatedAt"
                    value={permission?.updated_at || ""} 
                    readOnly/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="deletedAt">
                    <Form.Label>Deleted at</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter deletedAt" 
                    name="deletedAt"
                    value={permission?.deleted_at || ""} 
                    readOnly/>
                </Form.Group>
            </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        {action === 'edit' &&                     <Button variant="primary" onClick={handleSubmit}>
                        Save Changes
                    </Button>}
      </Modal.Footer>
    </Modal>
  );
};

export default PermissionModal;