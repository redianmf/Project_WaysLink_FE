import React, { useContext, useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import cssModules from "./ModalVisit.module.css";

function ModalVisit(props) {
  const { linksData } = props;
  return (
    <Modal
      {...props}
      dialogClassName={cssModules["modal-visit"]}
      aria-labelledby="modal-visit"
      className="modal-edit"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr className="header">
              <th>No.</th>
              <th>Title</th>
              <th>Link URL</th>
              <th>Click Count</th>
            </tr>
          </thead>
          <tbody>
            {linksData?.map((data, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.titleLink}</td>
                <td>{data.titleUrl}</td>
                <td>{data.clickCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
}

export default ModalVisit;
