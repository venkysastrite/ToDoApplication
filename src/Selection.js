import React from "react";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";

const Selection = () => {
    const { userID } = useParams();
    console.log(userID);
    const navigate = useNavigate();

    return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
            <Card className="shadow" style={{ width: '100%', maxWidth: '600px' }}>
                <Card.Header className="bg-primary text-white text-center py-3">
                    <h3 className="mb-0">Welcome to Your Todo Manager</h3>
                </Card.Header>
                <Card.Body className="p-4">
                    <Row className="g-4">
                        <Col xs={12} className="text-center">
                            <Button 
                                variant="primary" 
                                size="lg" 
                                className="w-100 mb-3"
                                onClick={() => { navigate(`/login/select/todolist/${userID}`) }}
                            >
                                Add To Do Activities
                            </Button>
                        </Col>
                        <Col xs={12} className="text-center">
                            <Button 
                                variant="outline-primary" 
                                size="lg" 
                                className="w-100"
                                onClick={() => { navigate(`/login/select/viewtodolist/${userID}`) }}
                            >
                                View Your Activities
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Selection;