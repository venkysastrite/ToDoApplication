import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';

const TodoList = () => {
    const { userID } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // First, verify user existence
        fetch(`http://127.0.0.1:3001/api/check/${userID}`, {
            method: "GET"
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("User does not exist");
            }
            return response.json();
        })
        .then(() => {
            // User exists, proceed to add todo
            return fetch('http://127.0.0.1:3001/api/addtolist', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userID, item }),
            });
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Item can't be added");
            }
            return response.json();
        })
        .then(() => {
            setSuccess("Todo item added successfully!");
            setItem("");
        })
        .catch((err) => {
            setError(err.message);
        });
    }

    return (
        <Container className='mt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Enter your TO DO Items</Form.Label>  
                    <Form.Control 
                        type="text" 
                        placeholder="Type your To Do Item here" 
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />
                    <Button 
                        type="submit" 
                        variant="primary" 
                        className="mt-2"
                        disabled={!item}
                    >
                        Add to List
                    </Button>
                </Form.Group>
            </Form>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
        </Container>
    );
}

export default TodoList;