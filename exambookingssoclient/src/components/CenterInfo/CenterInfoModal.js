import React, { useState } from "react";
import PlaceIcon from '@material-ui/icons/Place';
import CenterInfo from './CenterInfo';
import { Modal } from 'react-bootstrap';
import { Button } from '@material-ui/core';

export default function CenterInfoModal(props) {
    const [showModal, setShowModal] = useState(false);
    function showCenterModal() {
        setShowModal(true)
    }
    function hideCenterModal() {
        setShowModal(false)
    }
    return (
        <>
            <PlaceIcon
                className="mx-auto my-auto"
                style={{cursor : 'pointer'}}
                onClick={ showCenterModal }
            />
            <Modal
                show={ showModal }
                onHide={ hideCenterModal }
                size="lg"
                centered
                scrollable
            >
                <Modal.Body>
                    <h4>Center Info</h4>
                    <hr/>
                    <CenterInfo
                        center = { props.center }
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={ hideCenterModal } color="primary" autoFocus>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}