import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';

function UserDetailModal({ show, handleClose, userDetails }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Details User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {userDetails && (
                    <Form>
                        <Form.Group className="mb-3" controlId="Username">
                            <Form.Label> Name
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Username" 
                            name="username"
                            value={userDetails.username || ""}
                            readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label> Password 
                                {" "}<Badge bg="danger"> * </Badge>
                            </Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Enter Password" 
                            name="password"
                            value={userDetails.hashed_password || ""} 
                            readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter Name" 
                            name="name"
                            value={userDetails.name || ""}
                            readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                            type="email" 
                            placeholder="Enter Email" 
                            name="email"
                            value={userDetails.email || ""} 
                            readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createdAt">
                            <Form.Label>Created at</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter createdAt" 
                            name="createdAt"
                            value={userDetails.created_at || ""} 
                            readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="updatedAt">
                            <Form.Label>Updated at</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter updatedAt" 
                            name="updatedAt"
                            value={userDetails.updated_at || ""} 
                            readOnly/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="deletedAt">
                            <Form.Label>Deleted at</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Enter deletedAt" 
                            name="deletedAt"
                            value={userDetails.deleted_at || ""} 
                            readOnly/>
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UserDetailModal;