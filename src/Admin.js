import React from "react";
import { useState } from "react";
import { Row,Col,Card,Container,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Admin = ()=>{
    const navigate = useNavigate();
    return(
          <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="shadow-lg">
                        <Card.Header as="h2" className="text-center bg-primary text-white">
                            Welcome
                        </Card.Header>
                        <Card.Body className="text-center">
                            <Card.Title className="mb-4">
                                Choose Your Action
                            </Card.Title>
                            <div className="d-grid gap-3">
                                <Button 
                                    variant="outline-primary" 
                                    size="lg" 
                                    onClick={() => navigate('/admin/deluser')}
                                >
                                    Delete User
                                </Button>
                                <Button 
                                    variant="outline-primary" 
                                    size="lg" 
                                    onClick={() => navigate('/admin/searchuser')}
                                >
                                    Search User
                                </Button>
                                <Button 
                                    variant="outline-primary" 
                                    size="lg" 
                                    onClick={() => navigate('/admin/view')}
                                >
                                    View User
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>  
    );
}
export default Admin;