import React from "react";
import { Button,Container,Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert } from "bootstrap";

const Deleteuser = ()=>{
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState :{errors}
    } = useForm();

    const onSubmit = async (data)=> {
        try{
            const checkResponse = await fetch(`http://127.0.0.1:3001/api/check/${data.userID}`,{
                method : "GET",
            });
            if(checkResponse.ok)
            {
                const deleteResponse = await fetch(`http://127.0.0.1:3001/api/delete/${data.userID}`,{method:"DELETE"});
                if(deleteResponse.ok)
                {
                    navigate("/")
                }
                else{
                    throw new Error("Deletion Failed");
                }
            }
            else
            {
                throw new Error("No such User ID exists");
            }
        }
        catch (err)
        {
            new Alert(err.message);
        }
    };
    return (<Container className="mt-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Label>UserID</Form.Label>
               <Form.Control
               type="text" placeholder="Enter User ID"
               {...register("userID",{
                required : "UserID is required",
                minLength : {
                    value : 6,
                    message : "User ID contains atleast 6 characters"
                }
               })}
               isInvalid = {!!errors.userID}
               />
               <Form.Control.Feedback type="invalid">
                    {errors.userID?.message}
                 </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">Delete</Button>
        </Form>
    </Container>);
}

export default Deleteuser;