import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';

const Login = () => {
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check for admin login
        if (isAdmin) {
            if (userID === "012301230123" && password === "admin") {
                navigate('/admin');
                return;
            } else {
                setError("Invalid admin credentials");
                return;
            }
        }

        // Regular user login
        const parameters = { userID, password };
        fetch('http://127.0.0.1:3001/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("The entered username or password is wrong");
            }
            console.log("Printing");
            return response.json(); // there should be some json message if you give like this return response.json
        })
        .then((data) => {
            setError("");
            navigate(`/login/select/${userID}`);
        })
        .catch((err) => {
            setError(err.message);
        });
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card className="shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <Card.Header className="bg-primary text-white text-center py-3">
                    <h3 className="mb-0">Login</h3>
                </Card.Header>
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control 
                                type='text' 
                                placeholder='Enter Your User ID' 
                                value={userID}
                                onChange={(e) => setUserID(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type='password' 
                                placeholder='Enter Your Password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check 
                                type="checkbox"
                                label="Login as Admin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            {isAdmin ? 'Login as Admin' : 'Login'}
                        </Button>

                        {error && (
                            <Alert variant="danger" className="mt-3">
                                {error}
                            </Alert>
                        )}
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;