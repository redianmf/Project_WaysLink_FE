import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Form,
  Alert,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router";

import { API } from "../config/api";

import PanelLeft from "../components/PanelLeft";

import PhoneTemplate1 from "../assets/image/template1.png";
import PhoneTemplate2 from "../assets/image/template2.png";
import PlaceholderImage from "../assets/image/placeholder-image.png";
import { UserContext } from "../context/userContext";

function EditLink() {
  const { id } = useParams();

  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [linkImage, setLinkImage] = useState([]);
  const [message, setMessage] = useState(null);
  const [brandData, setBrandData] = useState();
  const [links, setLinks] = useState([
    {
      titleLink: "",
      titleUrl: "",
      linkImage: "",
    },
  ]);
  const [formBrand, setFormBrand] = useState({
    brandImage: "",
    brandName: "",
    description: "",
  });

  useEffect(() => {
    getBrand();
  }, []);

  const getBrand = async () => {
    try {
      const response = await API.get("/brand/" + id);
      setBrandData(response?.data?.data);
      setFormBrand({
        brandImage: response?.data?.data?.brand?.brandImage,
        brandName: response?.data?.data?.brand?.brandName,
        description: response?.data?.data?.brand?.description,
      });
      setLinks(response?.data?.data?.myLinks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeBrand = (e) => {
    setFormBrand({
      ...formBrand,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.name === "brandImage") {
      setPreview(e.target.files);
    }
  };

  const handleChangeLinks = (e, index) => {
    const linksItem = [...links];
    const linkPreview = [...linkImage];
    if (e.target.name == "titleLink") {
      linksItem[index].titleLink = e.target.value;
    }
    if (e.target.name == "titleUrl") {
      linksItem[index].titleUrl = e.target.value;
    }
    if (e.target.name == "linkImage") {
      linksItem[index].linkImage = e.target.value;
      linkPreview[index] = brandData?.brand?.hostUrl + e.target.value;
    }
    setLinkImage(linkPreview);
    setLinks(linksItem);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (preview) {
        formData.set("brandImage", preview[0], preview[0]?.name);
      }
      formData.set("brandName", formBrand.brandName);
      formData.set("description", formBrand.description);
      formData.set("brandUrl", brandData?.brand?.brandUrl);
      formData.set("formLinks", JSON.stringify(links));

      // Insert brand and links data
      const response = await API.patch("/edit-brand/" + id, formData, config);
      // console.log(response);

      if (response.data.status == "success") {
        history.push("/my-links");
      }
    } catch (error) {
      const alert = <Alert variant="danger">Failed</Alert>;
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <div className="container-grey">
      <Container fluid>
        <Row>
          <PanelLeft />
          <Col sm={9} className="ps-0 pe-0">
            <div className="page-title">
              <p className="text-middle">Template</p>
            </div>
            <div className="mt-4 me-3">
              <Row>
                <Col className="page-title-font ms-4" sm={9}>
                  Edit Link
                </Col>
                <Col sm={2}>
                  <Button
                    onClick={handleSubmit}
                    className="landing-tagline btn-publish"
                  >
                    Publish Link
                  </Button>
                </Col>
                {message && message}
              </Row>
              <Row className="mt-3">
                <Col sm={7}>
                  <div className="container-create">
                    <Row>
                      <div className="mt-3 ps-5 pe-5">
                        <Form>
                          <Row className="mb-3">
                            <Col>
                              <div>
                                {preview ? (
                                  <Image
                                    className="image-placeholder mt-4 "
                                    src={URL.createObjectURL(preview[0])}
                                  />
                                ) : (
                                  <Image
                                    className="image-placeholder mt-4 "
                                    src={formBrand.brandImage}
                                  />
                                )}
                              </div>
                            </Col>
                            <Col>
                              <Form.Group className="mb-3" controlId="title">
                                <Form.Label className="btn-upload mt-4">
                                  Upload
                                </Form.Label>
                                <Form.Control
                                  name="brandImage"
                                  onChange={handleChangeBrand}
                                  className="input-field"
                                  type="file"
                                  placeholder="ex. Your Title"
                                  hidden
                                />
                              </Form.Group>
                            </Col>
                          </Row>
                          <Form.Label>Title</Form.Label>
                          <Form.Group className="mb-3" controlId="title">
                            <Form.Control
                              name="brandName"
                              value={formBrand?.brandName}
                              onChange={handleChangeBrand}
                              className="input-field"
                              type="text"
                              placeholder="ex. Your Title"
                            />
                          </Form.Group>

                          <Form.Label>Description</Form.Label>
                          <Form.Group className="mb-3" controlId="description">
                            <Form.Control
                              name="description"
                              value={formBrand?.description}
                              onChange={handleChangeBrand}
                              className="input-field"
                              type="text"
                              placeholder="ex. Description Here"
                            />
                          </Form.Group>
                        </Form>
                      </div>
                    </Row>
                    <Row>
                      <div className="mt-3 ps-5 pe-5">
                        {links?.map((data, index) => (
                          <div key={index} className="container-link">
                            <Form>
                              <Row>
                                <Col sm={4}>
                                  <div>
                                    <Image
                                      className="image-placeholder mt-4 ms-4"
                                      src={
                                        !linkImage[index]
                                          ? data.linkImageUrl
                                          : linkImage[index]
                                      }
                                    />
                                  </div>
                                  <Form.Select
                                    name="linkImage"
                                    value={data.linkImage}
                                    onChange={(e) => {
                                      handleChangeLinks(e, index);
                                    }}
                                    className="mt-2 ms-4"
                                    aria-label="Default select example"
                                  >
                                    <option value="placeholder-image.png">
                                      Select image
                                    </option>
                                    <option value="facebook.png">
                                      Facebook
                                    </option>
                                    <option value="instagram.png">
                                      Instagram
                                    </option>
                                    <option value="twitter.png">Twitter</option>
                                    <option value="tiktok.png">TikTok</option>
                                    <option value="snapchat.png">
                                      Snapchat
                                    </option>
                                    <option value="youtube.png">Youtube</option>
                                    <option value="whatsapp.png">
                                      WhatsApp
                                    </option>
                                    <option value="linkedin.png">
                                      LinkedIn
                                    </option>
                                    <option value="pinterest.png">
                                      Pinterest
                                    </option>
                                    <option value="dribble.png">Dribble</option>
                                  </Form.Select>
                                </Col>
                                <Col className="ps-4 mt-4" sm={7}>
                                  <Form.Label>Title Link</Form.Label>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="titleLink"
                                  >
                                    <Form.Control
                                      name="titleLink"
                                      value={data.titleLink}
                                      onChange={(e) => {
                                        handleChangeLinks(e, index);
                                      }}
                                      className="input-field-grey ps-0"
                                      type="text"
                                    />
                                  </Form.Group>

                                  <Form.Label>Link</Form.Label>
                                  <Form.Group
                                    className="mb-3"
                                    controlId="linkSocmed"
                                  >
                                    <Form.Control
                                      name="titleUrl"
                                      value={data.titleUrl}
                                      onChange={(e) => {
                                        handleChangeLinks(e, index);
                                      }}
                                      className="input-field-grey ps-0"
                                      type="text"
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        ))}

                        {/* {links.length >= 5 ? (
                          <Button
                            onClick={() => setLinks(links + 1)}
                            className="btn-addLink mt-3 mb-5"
                            disabled
                          >
                            Add New Link
                          </Button>
                        ) : (
                          <Button
                            onClick={() => setLinks(links + 1)}
                            className="btn-addLink mt-3 mb-5"
                          >
                            Add New Link
                          </Button>
                        )} */}
                      </div>
                    </Row>
                  </div>
                </Col>
                <Col>
                  {brandData?.brand?.brandUrl == "preview-template-1" && (
                    <Image src={PhoneTemplate1} />
                  )}
                  {brandData?.brand?.brandUrl == "preview-template-2" && (
                    <Image src={PhoneTemplate2} />
                  )}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EditLink;
