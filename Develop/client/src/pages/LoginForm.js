import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../styles/login.css";
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const LoginForm = () => {
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
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
      const { data } = await loginUser({
        variables: {
          email: userFormData.email,
          password: userFormData.password,
        },
      });
      if (!data) {
        throw new Error("something went wrong!");
      }
      const { token, user } = data.login;
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3 input-field">
          <Form.Label htmlFor="email"></Form.Label>
          <Form.Control
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 input-field">
          <Form.Label htmlFor="password"></Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
        </Form.Group>
        {error && (
          <Alert className="error-alert" variant="danger">
            Incorrect username or password. Please try again.
          </Alert>
        )}
        <Button
          className="submit-btn"
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default LoginForm;
