import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import cssModules from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <Container className={cssModules["page_404"]}>
      <Row>
        <Col sm={12}>
          <div className={cssModules["center-content"]}>
            <Col sm={10} className="col-sm-offset-1 text-center">
              <div className={cssModules["four_zero_four_bg"]}>
                <h1 className="text-center">404</h1>
              </div>

              <div className={cssModules["contant_box_404"]}>
                <h3 className={cssModules["h2"]}>Please check your url</h3>
                <p>the page you are looking for not avaible!</p>

                <Link to="/">
                  <Button variant="dark">Back to Website</Button>
                </Link>
              </div>
            </Col>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
