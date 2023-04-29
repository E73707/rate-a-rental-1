import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../styles/login.css";

import Auth from "../utils/auth";

import { ADD_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const SignupForm = () => {
  const [addUser, { error }] = useMutation(ADD_USER);
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validated] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({ variables: { ...userFormData } });
      if (!data) {
        throw new Error("something went wrong!");
      }
      const { token, user } = data.addUser;
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const emailInUse = error?.message.includes("email");
  const usernameInUse = error?.message.includes("username");

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>

      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Form.Group className="mb-3 input-field">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
        </Form.Group>
        {showAlert && usernameInUse && (
          <Alert className="error-alert" variant="danger">
            Username already in use, please try again
          </Alert>
        )}

        <Form.Group className="mb-3 input-field">
          <Form.Control
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </Form.Group>
        {showAlert && emailInUse && (
          <Alert className="error-alert" variant="danger">
            Email already in use, please try again
          </Alert>
        )}

        <Form.Group className="mb-3 input-field">
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </Form.Group>
        <Button
          className="submit-btn"
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
