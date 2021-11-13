import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Image,
} from "react-bootstrap";

import Logo from "../assets/image/DumblinkLogo.png";
import ModalSignIn from "../components/modals/ModalSignIn";
import ModalRegister from "../components/modals/ModalRegister";

function LandingPage() {
  const [modalShowLogin, setModalShowLogin] = useState(false);
  const [modalShowRegister, setModalShowRegister] = useState(false);

  return (
    <div className="container-landing">
      <Navbar bg="light" variant="light">
        <Container fluid>
          <Navbar.Brand className="ms-5">
            <Image src={Logo} />
          </Navbar.Brand>
          <Nav className="me-0">
            <Button
              onClick={() => setModalShowLogin(true)}
              variant="light"
              className="btn-login me-2"
            >
              Login
            </Button>
            <Button
              onClick={() => setModalShowRegister(true)}
              className="btn-register me-5"
            >
              Register
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <div>
        <Container>
          <Row>
            <Col className="pe-5">
              <div className="landing-title mt-5">The Only Link</div>
              <div className="landing-title">You’ll Ever Need</div>
              <div className="landing-tagline mt-4">
                Add a link for your Social Bio and optimize your social media
                traffic.
              </div>
              <div className="landing-tagline mt-3 mb-5">
                safe, fast and easy to use
              </div>
              <Button
                onClick={() => setModalShowRegister(true)}
                className="btn-start"
              >
                Get Started For Free
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
      <ModalSignIn
        show={modalShowLogin}
        setModalShowLogin={setModalShowLogin}
        setModalShowRegister={setModalShowRegister}
        onHide={() => setModalShowLogin(false)}
      />
      <ModalRegister
        show={modalShowRegister}
        setModalShowLogin={setModalShowLogin}
        setModalShowRegister={setModalShowRegister}
        onHide={() => setModalShowRegister(false)}
      />
    </div>
  );
}

export default LandingPage;
