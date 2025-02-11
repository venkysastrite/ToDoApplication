import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Alert } from "react-bootstrap";

const ViewTodolist = () => {
    const { userID } = useParams();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        fetch(`http://127.0.0.1:3001/api/check1/${userID}`, { method: "GET" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Can't fetch Users data");
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data.items);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const handleMarkCompleted = (todoId) => {
        fetch(`http://127.0.0.1:3001/api/todos/${todoId}/complete`, {
            method: "PUT",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update todo status");
                }
                // Refresh the todos list after updating
                fetchTodos();
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!users) {
        return (
            <Container className="mt-5">
                <Alert variant="info">Loading...</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">Todo List</h2>
            {users.length === 0 ? (
                <Alert variant="info">No todos found</Alert>
            ) : (
                <Row>
                    {users.map((todo) => (
                        <Col key={todo._id} xs={12} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <Card.Title
                                                style={{
                                                    textDecoration: todo.completed ? "line-through" : "none",
                                                }}
                                            >
                                                {todo.item}
                                            </Card.Title>
                                            <Card.Text
                                                style={{
                                                    textDecoration: todo.completed ? "line-through" : "none",
                                                }}
                                            >
                                                {todo.description}
                                            </Card.Text>
                                        </div>
                                        <div>
                                            <Button
                                                variant="success"
                                                className="me-2"
                                                onClick={() => handleMarkCompleted(todo._id)}
                                                disabled={todo.completed}
                                            >
                                                {todo.completed ? "Completed" : "Mark Complete"}
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default ViewTodolist;