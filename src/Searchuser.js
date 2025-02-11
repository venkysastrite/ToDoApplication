import React, { useState } from "react";
import { Button, Container, Form, Card, ListGroup, Badge, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Deleteuser = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    
    const onSubmit = (data) => {
        fetch(`http://127.0.0.1:3001/api/check1/${data.userID}`, { method: "GET" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No user with such ID exists");
                }
                return response.json();
            })
            .then((value) => {
                setUserData(value.items);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const handleDelete = () => {
        fetch(`http://127.0.0.1:3001/delete/${userData.userID}`, {method: "DELETE"})
            .then((response) => {
                if(!response.ok) {
                    throw new Error("There is no such user with that ID");
                }
                return response.json();
            })
            .then((data) => {
                setShowModal(false);
                console.log(data);
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
                console.log(err);
            });
    };

    return (
        <Container className="mt-5">
            <Form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                <Form.Group className="mb-3">
                    <Form.Label>UserID</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter User ID"
                        {...register("userID", {
                            required: "UserID is required",
                            minLength: {
                                value: 6,
                                message: "User ID must contain at least 6 characters"
                            }
                        })}
                        isInvalid={!!errors.userID}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.userID?.message}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">Search</Button>
            </Form>

            {userData && (
                <Card className="shadow">
                    <Card.Header className="bg-primary text-white">
                        <h4 className="mb-0">User Information</h4>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="mb-3">
                            User ID: <Badge bg="secondary">{userData.userID}</Badge>
                        </Card.Title>
                        <Card.Subtitle className="mb-3 text-muted">
                            To-Do Activities
                        </Card.Subtitle>
                        <ListGroup variant="flush">
                            {userData.map((todo,index) => (
                                <ListGroup.Item 
                                    key={todo._id}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <span>{todo.item}</span>
                                    <Badge bg="primary" pill>
                                        {index + 1}
                                    </Badge>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                    <Card.Footer className="text-end">
                        <Button 
                            variant="danger" 
                            onClick={() => setShowModal(true)}
                        >
                            Delete User
                        </Button>
                    </Card.Footer>
                </Card>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user and all their activities? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete User
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Deleteuser;