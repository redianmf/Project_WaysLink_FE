import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import cssModules from "./ModalSignIn.module.css";

import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function ModalSignIn(props) {
  const { setModalShowLogin, setModalShowRegister } = props;

  const switchSignup = (event) => {
    setModalShowLogin(false);
    setModalShowRegister(true);
  };

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

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

      const response = await API.post("/login", body, config);

      if (response.data.status == "success") {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });
        history.push("/template");
      } else {
        const alert = <Alert variant="danger">Login failed!</Alert>;
        setMessage(alert);
      }
    } catch (error) {
      const alert = <Alert variant="danger">Failed</Alert>;
      setMessage(alert);
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(state);
  }, [state]);

  return (
    <Modal
      {...props}
      className={cssModules["modal-content"]}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body className={cssModules["modal-body"]}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className={cssModules["modal-title"]}>Login</Form.Group>
          {/* {message && message} */}
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

          <Button className={cssModules["btn-modal"]} type="submit">
            Login
          </Button>

          <Form.Group className="text-center mb-1">
            Don't have an account? Click{" "}
            <span onClick={switchSignup} className="cursor-link">
              <strong>Here</strong>
            </span>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalSignIn;
