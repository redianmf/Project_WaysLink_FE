import React, { useContext } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import cssModules from "./ModalDeleteLink.module.css";

import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

function ModalDeleteUser(props) {
  const [state, dispatch] = useContext(UserContext);
  const { setShowModal } = props;

  const id = state.user.id;

  const deleteUser = async (e) => {
    try {
      e.preventDefault();

      const response = await API.delete("/user/" + id);
      // console.log(response);

      if (response.data.status == "success") {
        dispatch({
          type: "LOGOUT",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      className={cssModules["modal-content"]}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body className={cssModules["modal-body"]}>
        Are you sure want to delete your account?
        <Row>
          <Col>
            <div className="mt-3 text-end">
              <Button onClick={deleteUser} className="btn-yes">
                Yes
              </Button>
              <Button
                onClick={() => setShowModal(false)}
                className="btn-no ms-3"
              >
                No
              </Button>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDeleteUser;
