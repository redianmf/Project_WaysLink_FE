import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Image, Form } from "react-bootstrap";
import { useParams } from "react-router";
import { API } from "../config/api";

import WaysFood from "../assets/icons/WaysFood.png";

function PreviewTemplate2() {
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
    addCount(idLink);
    window.open(`http://${url}`, "_blank");
  };

  const addCount = async (idLink) => {
    try {
      const response = await API.patch("/add-click/" + idLink);
      //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-hidden template2-body">
      <Row>
        <Col md={3}></Col>
        <Col className="text-center container-template2 mt-5" md={6}>
          <div>
            <Image
              className="brand-image2 mt-5"
              src={brand?.brand?.brandImage}
            />
          </div>
          <div className="brand-name2 mt-3">{brand?.brand?.brandName}</div>
          <div className="brand-detail2 mt-3">{brand?.brand?.description}</div>
          <div className="container-socmed">
            {brand?.myLinks.map((data, index) => (
              <div
                onClick={() => handleClick(data.id, data.titleUrl)}
                key={index}
                className="socmed-item2 cursor-link"
              >
                {data.titleLink}
              </div>
            ))}
          </div>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}

export default PreviewTemplate2;
