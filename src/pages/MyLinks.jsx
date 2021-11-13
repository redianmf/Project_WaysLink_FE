// Import Library & Components
import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  Form,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router";
import { API } from "../config/api";

import PanelLeft from "../components/PanelLeft";
import ModalVisit from "../components/modals/ModalVisit";

import NoData from "../assets/image/noData.png";
import ViewIcon from "../assets/icons/View.png";
import EditIcon from "../assets/icons/Edit.png";
import DeleteIcon from "../assets/icons/Delete.png";
import ModalDeleteLink from "../components/modals/ModalDeleteLink";
import { UserContext } from "../context/userContext";

function MyLinks() {
  // Declare state
  const [state, dispatch] = useContext(UserContext);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalVisit, setShowModalVisit] = useState(false);
  const handleClose = () => setShowModalDelete(false);
  const handleShow = () => setShowModalDelete(true);

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [brandId, setBrandId] = useState(null);
  const [linksData, setLinksData] = useState();
  const [brands, setBrands] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [newBrands, setNewBrands] = useState();
  let history = useHistory();

  // Get user id
  const id = state.user.id;

  // Fetch brands data
  const getBrands = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/brands/" + id);
      setBrands(response.data.data);
      setNewBrands(response.data.data.brands);

      if (response?.data?.status == "success") {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  // Search function
  const handleChangeSearch = (e) => {
    let searchString = e.target.value;

    if (!searchString) {
      setNewBrands(brands?.brands);
    } else {
      setNewBrands(
        brands?.brands?.filter((e) => {
          return e.brandName.toLowerCase().includes(searchString.toLowerCase());
        })
      );
    }
  };

  // Function to delete brand
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = async (id) => {
    try {
      const response = await API.delete(`/brand/${id}`);
      getBrands();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  // Handle modal visit
  const handleVisit = (id) => {
    setBrandId(id);
    setShowModalVisit(true);
  };

  const getLinks = async () => {
    try {
      const response = await API.get("/links/" + brandId);
      setLinksData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLinks();
  }, [brandId]);

  return (
    <div className="container-grey">
      <Container fluid>
        <Row>
          <PanelLeft />
          <Col sm={9} className="ps-0 pe-0">
            <div className="page-title">
              {isLoading ? (
                <p className="text-middle">
                  My Links
                  <Spinner
                    className="ms-2"
                    animation="border"
                    variant="warning"
                  />
                </p>
              ) : (
                <p className="text-middle">My Links</p>
              )}
            </div>
            <div className="mt-5 me-3">
              <Row>
                <Col className="adaptive-col" sm={3}>
                  <div
                    className="page-title-font ms-4 adaptive-col pt-1"
                    sm={9}
                  >
                    All Links{" "}
                    <span className="links-count ms-1">
                      {brands?.brands?.length}
                    </span>
                  </div>
                </Col>
                <Col sm={7}>
                  <div>
                    <Form>
                      <Form.Group className="mb-3" controlId="search">
                        <Form.Control
                          name="search"
                          onChange={handleChangeSearch}
                          className="input-field-search"
                          type="text"
                          placeholder="Find Your Link"
                        />
                      </Form.Group>
                    </Form>
                  </div>
                </Col>
                <Col sm={2}>
                  <Button className="btn-search">Search</Button>
                </Col>
              </Row>
              {brands?.brands?.length >= 1 ? (
                <div className="mt-4 container-brands">
                  {newBrands?.map((data, index) => (
                    <Row className="mb-4" key={index}>
                      <Col sm={2}>
                        <Image
                          className="link-image ms-4"
                          src={data.brandImage}
                        />
                      </Col>
                      <Col sm={4}>
                        <div className="page-title-font mt-1">
                          {data?.brandName}
                        </div>
                        <div className="web-link">{data.brandUrl}</div>
                      </Col>
                      <Col sm={1}>
                        <div className="page-title-font mt-1 text-center">
                          {data?.myLinks}
                        </div>
                        <Button
                          onClick={() => handleVisit(data.id)}
                          className="btn-visit"
                        >
                          <span className="text-center">Visit</span>
                        </Button>
                      </Col>
                      <Col sm={5}>
                        <div className="text-end me-5 mt-3">
                          <span
                            onClick={() =>
                              history.push(`/${data.params1}/${data.id}`)
                            }
                            className="me-2"
                          >
                            <Image className="cursor-link" src={ViewIcon} />
                          </span>
                          <span
                            onClick={() =>
                              history.push(`/edit-link/${data.id}`)
                            }
                            className="me-2"
                          >
                            <Image className="cursor-link" src={EditIcon} />
                          </span>
                          <span
                            className="cursor-link"
                            onClick={() => handleDelete(data.id)}
                          >
                            <Image src={DeleteIcon} />
                          </span>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </div>
              ) : (
                <div className="mt-4 text-center">
                  <Image className="image-nodata" src={NoData} />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <ModalVisit
        show={showModalVisit}
        linksData={linksData}
        onHide={() => setShowModalVisit(false)}
      />
      <ModalDeleteLink
        show={showModalDelete}
        setConfirmDelete={setConfirmDelete}
        handleClose={handleClose}
        onHide={() => setShowModalDelete(false)}
      />
    </div>
  );
}

export default MyLinks;
