import {    Col, 
            Row, 
            Button  } from 'react-bootstrap'

function HeaderIndex({ nameIndex, nameButton, handleCreateModalShow, permissionCreate}){

    return(
        <>
            <h1 className='mb-3 mt-3 text-4xl'>Index {nameIndex}</h1>

            <Row className="mb-3">
                <Col xs={8}>
                    <h2 className='text-2xl'>List {nameIndex}</h2>
                </Col>
                <Col xs={4} className="text-end">
                    {permissionCreate&&(
                        <Button variant="primary" onClick={handleCreateModalShow}>
                            Create {nameButton}
                        </Button>
                    )}
                </Col>
            </Row>
        </>
    );

}

export default HeaderIndex;