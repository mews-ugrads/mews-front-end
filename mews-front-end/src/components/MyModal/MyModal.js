import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";


function MyModal(props) {
    console.log(this.props.post)
    const { image_url } = this.props;

    return (
        <Modal
            animation={false}
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <p>{image_url}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;