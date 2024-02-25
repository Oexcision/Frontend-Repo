import Button from 'react-bootstrap/Button';
import UserTable from '../components/UserTable';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UserIndex = () => {



    return (
      <>
        <h1>Index Users</h1>
        
        <Row className="mb-3">
          <Col xs={8}>
            <h2>List Users</h2>
          </Col>
          <Col xs={4} className="text-end">
            <Link to="/users/create">
              <Button variant="primary">
                Create User
              </Button>
            </Link>
          </Col>
        </Row>
        
        <UserTable/>


      </>

    )
      

  };
  
  export default UserIndex;