import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function ConfirmEmailModal ({ show, confirmEmail, handleChange }) {
        return (
            <Modal
              show={show}
              backdrop="static"
              keyboard={false}>
            <Form onSubmit={confirmEmail}>
        <Modal.Header>
          <Modal.Title>Check Your Email</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">

            <Form.Group controlId="formBasicEmail">
              <Form.Control className="step-input" name="code" type="text" placeholder="Enter code" onChange={handleChange} />

  </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="submit">
            Confirm Email
          </Button>
        </Modal.Footer>
            </Form>
      </Modal>
        )
}

export default ConfirmEmailModal;
