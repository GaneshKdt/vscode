
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
// import {backToSR} from '../SelectSR/SelectSR' 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import handleValidation from "../Validations";
import AxiosHandler from "../../shared/AxiosHandler/AxiosHandler";
import PaymentMethodSelection from '../../components/PaymentFlow/ExamBooking/PaymentMethodSelection/PaymentMethodSelection'
import Container from 'react-bootstrap/Container'

function IssuanceOfFinalCertificateForm(props){
    return (
        <>
<Form.Group as={Row}>
    <Form.Label column sm="8">
        <b>Please view the preview of your Final year Certificate before issuing Service Request.</b>
    </Form.Label>
    <Col sm="4">
        <Button variant="success" id="previewCert" size="sm" onClick={props.renderPreviewCertificate.bind(this)}>Preview</Button>
    </Col>
</Form.Group>
<Form.Group as={Row}>
    <Form.Label column sm="4">
        Service Request Type  :   
    </Form.Label>
    <Form.Label column sm="7">
        {props.serviceRequestType}
    </Form.Label>
</Form.Group>
<Form.Group as={Row}>
    <Form.Label column sm="4">
        Charges:
    </Form.Label>
    <Form.Label column sm="7" className="charges">
        {props.amount}
    </Form.Label>
    <Form.Row column sm="7" className="charges">
    (Note: First Final Certificate request is free. Any subsequent requests for same certificate 
        will be considered as a duplicate request and  Service Request fees of INR. 1000/- will be charged for the same)
    
    </Form.Row>
</Form.Group>






<Form.Group as={Row} controlId="showTotalValue">
    <Form.Label column sm="4">
        Total Cost:
    </Form.Label>
    <Form.Label column sm="7" className="charges">
        {props.amount}
    </Form.Label>
</Form.Group>

</>
    )
}



export default IssuanceOfFinalCertificateForm 