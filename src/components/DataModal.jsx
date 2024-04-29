import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';

function DataModal({ show, item, action, fetchData, onHide }){
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{action === 'edit' ? 'Edit User' : 'User Details'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {action === 'edit' ? (
                    <h1>Edit</h1>
                ) : (
                    <h1>Show</h1>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                {action === 'edit' && <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>}
            </Modal.Footer>
        </Modal>
    );
}

export default DataModal;