import React, { useState } from 'react';
import PaymentMethodSelection from '../../ExamBooking/Common/PaymentFlow/PaymentMethodSelection/PaymentMethodSelection';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container'


function PaymentOptions(props){
    console.log("==> Loaded PaymentOptions")
return(
        <Modal 
                                 show = { true }  
                            onHide={ props.previousTab } 
                            size="xl" 
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Select Payment Provider
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container>
                                    <PaymentMethodSelection  
                                        setPaymentProvider = { props.setPaymentProvider } 
                                        bookingType = { props.bookingType }
                                    />
                                </Container>
                            </Modal.Body>
                        </Modal>

)

    }

    export default PaymentOptions;

