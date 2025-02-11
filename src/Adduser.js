import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Adduser = () => {
    const navigate = useNavigate();
    const { 
        register, 
        handleSubmit, 
        watch, 
        formState: { errors } 
    } = useForm();

    const onSubmit = (data) => {
        console.log("FORM SUBMITTED",data);
         fetch(`http://127.0.0.1:3001/api/check/${data.userID}`, { method: 'GET' })
         .then((response)=>{
            if(!response.ok)
            {
                console.log("INSIDE RESPONSE");
                fetch('http://127.0.0.1:3001/api/adduser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID: data.userID,
                        password: data.password
                    }),
                })
                .then((response)=>{
                    if(response.ok)
                    {
                        navigate("/");
                    }
                    else{
                        throw new Error("User Registration failed");
                    }
                })
            }
            else
            {
                throw new Error("User Already exists");
            }
         })
         .catch((error)=>{
            alert(error.message);
         });
    };

    return (
        <Container className="mt-5">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter User ID"
                        {...register("userID", { 
                            required: "User ID is required",
                            minLength: {
                                value: 6,
                                message: "User ID must be at least 6 characters"
                            }
                        })}
                        isInvalid={!!errors.userID}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.userID?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter Password"
                        {...register("password", { 
                            required: "Password is required",
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "Password must contain at least one uppercase, one lowercase, one number, and one special character"
                            }
                        })}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm Password"
                        {...register("confirmPassword", { 
                            required: "Please confirm your password",
                            validate: (val) => {
                                if (watch("password") !== val) {
                                    return "Passwords do not match";
                                }
                            }
                        })}
                        isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    );
};

export default Adduser;