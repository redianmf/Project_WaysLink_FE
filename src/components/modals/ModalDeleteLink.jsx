import React from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import cssModules from "./ModalDeleteLink.module.css";

function ModalDeleteLink(props) {
  const { show, handleClose, setConfirmDelete } = props;

  const handleDelete = () => {
    setConfirmDelete(true);
  };

  return (
    <Modal
      {...props}
      className={cssModules["modal-content"]}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body className={cssModules["modal-body"]}>
        Are you sure want to remove this link?
        <Row>
          <Col>
            <div className="mt-3 text-end">
              <Button onClick={handleDelete} className="btn-yes">
                Yes
              </Button>
              <Button onClick={handleClose} className="btn-no ms-3">
                No
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDeleteLink;
