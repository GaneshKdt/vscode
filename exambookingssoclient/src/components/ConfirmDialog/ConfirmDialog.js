import React from 'react';
import Button from '@material-ui/core/Button';
import { Modal } from 'react-bootstrap';

const ConfirmDialog = (props) => {
    return (
        <Modal
            show={props.open}
            onHide={props.handleClose}
            size="lg"
            centered
        >
            <Modal.Body>
                <h4>{props.title}</h4>
                <p>{props.message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleClose} color="primary" autoFocus>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmDialog