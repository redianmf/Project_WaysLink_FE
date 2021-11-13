import React from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router";

import PanelLeft from "../components/PanelLeft";

import PhoneTemplate1 from "../assets/image/template1.png";
import PhoneTemplate2 from "../assets/image/template2.png";

function Template() {
  let history = useHistory();

  return (
    <div className="container-grey">
      <Container fluid>
        <Row>
          <PanelLeft />
          <Col sm={9} className="ps-0 pe-0">
            <div className="page-title">
              <p className="text-middle">Template</p>
            </div>
            <div className="mt-5 me-3">
              <Container>
                <Row>
                  <Col sm={3}>
                    <Image
                      className="cursor-link"
                      onClick={() => history.push("/create-link/1")}
                      src={PhoneTemplate1}
                    />
                  </Col>
                  <Col sm={3}>
                    <Image
                      className="cursor-link"
                      onClick={() => history.push("/create-link/2")}
                      src={PhoneTemplate2}
                    />
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Template;
