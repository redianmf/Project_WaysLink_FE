import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Form,
  Alert,
} from "react-bootstrap";

import { API } from "../config/api";
import { UserContext } from "../context/userContext";

import PanelLeft from "../components/PanelLeft";
import ModalDeleteUser from "../components/modals/ModalDeleteUser";

function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
  });

  const id = state.user.id;

  const getUserData = async () => {
    try {
      const response = await API.get("/user/" + id);
      // console.log(response);
      setForm({
        fullName: response?.data?.data?.fullName,
        email: response?.data?.data?.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.patch("/user/" + id, body, config);

      if (response.data.status == "success") {
        const alert = <Alert variant="success">Update data success</Alert>;
        setMessage(alert);
        setForm({
          fullName: "",
          email: "",
        });
        getUserData();
        setTimeout(function () {
          setMessage(null);
        }, 2500);
      } else {
        const alert = (
          <Alert variant="danger">Failed! {response.data.message}</Alert>
        );
        setMessage(alert);
        setForm({
          fullName: "",
          email: "",
        });
        getUserData();
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
      });
      getUserData();
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [state]);

  return (
    <div className="container-grey">
      <Container fluid>
        <Row>
          <PanelLeft />
          <Col sm={9} className="ps-0 pe-0">
            <div className="page-title">
              <p className="text-middle">My Account</p>
            </div>
            <div className="mt-5 me-3">
              <div className="page-title-font ms-4" sm={9}>
                My Information
              </div>

              <div className="container-profile">
                {message && message}
                <Form>
                  <Form.Label>Name</Form.Label>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Control
                      name="fullName"
                      className="input-field ps-0 mt-1"
                      type="text"
                      onChange={handleChange}
                      value={form.fullName}
                    />
                  </Form.Group>

                  <Form.Label className="mt-4">Email</Form.Label>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Control
                      name="email"
                      className="input-field ps-0 mt-1"
                      type="text"
                      onChange={handleChange}
                      value={form.email}
                    />
                  </Form.Group>
                </Form>
              </div>
              <div className="mt-4 text-end pe-2">
                <Button onClick={updateUser} className="btn-save-acc">
                  Save Account
                </Button>
                <Button
                  onClick={() => setShowModal(true)}
                  className="ms-4 btn-delete-acc"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ModalDeleteUser
        show={showModal}
        setShowModal={setShowModal}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
}

export default Profile;
