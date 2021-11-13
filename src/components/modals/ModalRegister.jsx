import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import cssModules from "./ModalRegister.module.css";

import { API } from "../../config/api";

function ModalRegister(props) {
  const { setModalShowLogin, setModalShowRegister } = props;

  const switchLogin = (event) => {
    setModalShowRegister(false);
    setModalShowLogin(true);
  };

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { fullName, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);

      if (response.data.status == "success") {
        const alert = <Alert variant="success">Register success</Alert>;
        setMessage(alert);
        setForm({
          fullName: "",
          email: "",
          password: "",
        });
        setTimeout(function () {
          setMessage(null);
        }, 1500);
      } else {
        const alert = (
          <Alert variant="danger">Failed! {response.data.message}</Alert>
        );
        setMessage(alert);
        setForm({
          fullName: "",
          email: "",
          password: "",
        });
        setTimeout(function () {
          setMessage(null);
        }, 2000);
      }
    } catch (error) {
      const alert = <Alert variant="danger">Failed</Alert>;
      setMessage(alert);
      setForm({
        fullName: "",
        email: "",
        password: "",
      });
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      className={cssModules["modal-content"]}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body className={cssModules["modal-body"]}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className={cssModules["modal-title"]}>
            Register
          </Form.Group>
          {message && message}
          <Form.Group className="mb-3" controlId="email">
            <Form.Control
              name="email"
              value={email}
              onChange={handleChange}
              className={cssModules["input-field"]}
              type="email"
              placeholder="Email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              name="password"
              value={password}
              onChange={handleChange}
              className={cssModules["input-field"]}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="fullName">
            <Form.Control
              name="fullName"
              value={fullName}
              onChange={handleChange}
              className={cssModules["input-field"]}
              type="text"
              placeholder="Full Name"
            />
          </Form.Group>

          <Button className={cssModules["btn-modal"]} type="submit">
            Register
          </Button>

          <Form.Group className="text-center mb-1">
            Already have an account? Click{" "}
            <span onClick={switchLogin} className="cursor-link">
              <strong>Here</strong>
            </span>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalRegister;
