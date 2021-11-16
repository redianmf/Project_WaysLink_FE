import React, { useContext, useState, useEffect } from "react";
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
import { useMutation } from "react-query";

import { API2 } from "../config/api2";
import { API } from "../config/api";

import PanelLeft from "../components/PanelLeft";

import PhoneTemplate1 from "../assets/image/template1.png";
import PhoneTemplate2 from "../assets/image/template2.png";
import CloseButton from "../assets/icons/multiply.png";
import PlaceholderImage from "../assets/image/placeholder-image.png";
import { UserContext } from "../context/userContext";

function CreateLink() {
  // Using params to create brand link
  const { id } = useParams();
  const previewTemplate = "preview-template-" + id;
  let api2 = API2();

  // Declare states
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [host, setHost] = useState(null);
  const [links, setLinks] = useState([
    {
      titleLink: "",
      titleUrl: "",
      linkImage: "",
    },
  ]);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [linkImage, setLinkImage] = useState([]);
  const [formBrand, setFormBrand] = useState({
    brandImage: "",
    brandName: "",
    description: "",
  });

  const idUser = state.user.id;

  useEffect(() => {
    getHost();
  }, []);

  // Get Hostname
  const getHost = async () => {
    try {
      const response = await API.get("/host");
      setHost(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle input brand form
  const handleChangeBrand = (e) => {
    setFormBrand({
      ...formBrand,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.name === "brandImage") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  // Handle input links form
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
      linkPreview[index] = host + e.target.value;
    }
    setLinkImage(linkPreview);
    setLinks(linksItem);
  };

  const handleAddLinks = () => {
    const _links = [
      ...links,
      {
        titleLink: "",
        titleUrl: "",
        linkImage: "",
      },
    ];
    setLinks(_links);
  };

  const handleClose = (e, index) => {
    const _links = links.filter((item, idx) => index !== idx);
    setLinks(_links);
    setLinkImage(linkImage.filter((item, idx) => index !== idx));
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      formData.set(
        "brandImage",
        formBrand?.brandImage[0],
        formBrand?.brandImage[0]?.name
      );
      formData.set("brandName", formBrand.brandName);
      formData.set("description", formBrand.description);
      formData.set("brandUrl", previewTemplate);
      formData.set("formLinks", JSON.stringify(links));

      // Add config
      const config = {
        method: "POST",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
        body: formData,
      };

      // Insert brand and links data
      const response = await api2.post("/publish/" + idUser, config);
      console.log(response);

      if (response.status == "success") {
        history.push("/my-links");
      }
    } catch (error) {
      const alert = <Alert variant="danger">Failed</Alert>;
      setMessage(alert);
      console.log(error);
    }
  });

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
                  Create Link
                </Col>
                <Col sm={2}>
                  <Button
                    onClick={(e) => handleSubmit.mutate(e)}
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
                                    src={preview}
                                  />
                                ) : (
                                  <Image
                                    className="image-placeholder mt-4 "
                                    src={PlaceholderImage}
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
                              value={formBrand.brandName}
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
                              value={formBrand.description}
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
                              <div className="text-end pe-2 pt-2">
                                <Image
                                  src={CloseButton}
                                  onClick={(e) => handleClose(e, index)}
                                  className="close-btn"
                                />
                              </div>
                              <Row>
                                <Col sm={4}>
                                  <div>
                                    <Image
                                      className="image-placeholder mt-4 ms-4"
                                      src={
                                        !linkImage[index]
                                          ? PlaceholderImage
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

                        {links >= 5 ? (
                          <Button
                            onClick={handleAddLinks}
                            className="btn-addLink mt-3 mb-5"
                            disabled
                          >
                            Add New Link
                          </Button>
                        ) : (
                          <Button
                            onClick={handleAddLinks}
                            className="btn-addLink mt-3 mb-5"
                          >
                            Add New Link
                          </Button>
                        )}
                      </div>
                    </Row>
                  </div>
                </Col>
                <Col>
                  {id == 1 && <Image src={PhoneTemplate1} />}
                  {id == 2 && <Image src={PhoneTemplate2} />}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateLink;
