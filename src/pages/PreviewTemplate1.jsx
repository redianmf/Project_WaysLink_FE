import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Image, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { API } from "../config/api";

import WaysFood from "../assets/icons/WaysFood.png";

function PreviewTemplate1() {
  const { id } = useParams();
  const [brand, setBrand] = useState();

  const getBrand = async () => {
    try {
      const response = await API.get("/brand/" + id);
      setBrand(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  const handleClick = (idLink, url) => {
    // console.log(idLink);
    addCount(idLink);
    window.open(`http://${url}`, "_blank");
  };

  const addCount = async (idLink) => {
    try {
      const response = await API.patch("/add-click/" + idLink);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-hidden">
      <Row>
        <Col md={3}></Col>
        <Col className="text-center" md={6}>
          <div>
            <Image
              className="brand-image mt-5"
              src={brand?.brand?.brandImage}
            />
          </div>
          <div className="brand-name mt-3">{brand?.brand?.brandName}</div>
          <div className="brand-detail mt-3">{brand?.brand?.description}</div>
          <div className="container-socmed">
            {brand?.myLinks.map((data, index) => (
              <Row>
                <Col sm={1}>
                  <Image className="link-image-icon" src={data.linkImageUrl} />
                </Col>
                <Col sm={10}>
                  <div
                    onClick={() => handleClick(data.id, data.titleUrl)}
                    key={index}
                    className="socmed-item cursor-link ms-1"
                  >
                    {data.titleLink}
                  </div>
                </Col>
                <Col sm={1}></Col>
              </Row>
            ))}
          </div>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}

export default PreviewTemplate1;
