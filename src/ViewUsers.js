import React from "react";
import { useState, useEffect } from "react";
import { Container, Card, Button, Alert, Modal } from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = () => {
        fetch('http://127.0.0.1:3001/api/users', { method: "GET" })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = (userId) => {
        setSelectedUser(userId);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        fetch(`http://127.0.0.1:3001/api/delete/${selectedUser}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete user");
                }
                setUsers(users.filter(user => user._id !== selectedUser));
                setShowDeleteModal(false);
                setSelectedUser(null);
            })
            .catch((err) => {
                setError(err.message);
                setShowDeleteModal(false);
            });
    };

    if (loading) {
        return (
            <Container className="mt-5">
                <Alert variant="info">Loading users...</Alert>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4">User List</h2>
            {users.length === 0 ? (
                <Alert variant="info">No users found</Alert>
            ) : (
                users.map((user) => (
                    <Card key={user._id} className="mb-3">
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div>
                                <strong>User ID: </strong>{user.userID}
                            </div>
                            <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => handleDelete(user._id)}
                            >
                                Delete User
                            </Button>
                        </Card.Body>
                    </Card>
                ))
            )}

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this user? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete User
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default UserList;