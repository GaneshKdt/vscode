
import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import SelectSR_CSS from '../SelectSR/SelectSR.css'
// import {backToSR} from '../SelectSR/SelectSR' 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfigUrls from '../../../shared/config'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import '../SelectSR/SelectSR.css'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import handleValidation from "../Validations";
import AxiosHandler from "../../../shared/AxiosHandler/AxiosHandler";
import PaymentMethodSelection from '../../ExamBooking/Common/PaymentFlow/PaymentMethodSelection/PaymentMethodSelection';
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
    ABC ID  :   
</Form.Label>
<Form.Label column sm="7">
    {props.abcId}
</Form.Label>
</Form.Group>

{(props.abcId === "" || props.abcId === null) ?
<div className='Container' >
    <Row>
        <Col sm={12}>
            <Form.Group as={Row} controlId="abcInfoId">                    
                <Col sm={{ span: 8, offset: 4 }} className="pl-sm-3">
                    <Card className="p-0">
                        <Card.Header className="p-2">
                            <strong>Update your Academic Bank of Credits Identification number</strong>
                        </Card.Header>
                        <Card.Body>
                            As per the UGC guidelines, it is recommended to create your unique Academic Bank of Credits identification number.
                            <a
                                href="https://d3q78eohsdsot3.cloudfront.net/resources_2015/How_to_Create_ABC_ID.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            > Click here </a>
                            to know how to generate your ABC ID.                                            
                            <p>
                            <br/><br/>
                                To update your Academic Bank of Credits Id, please click on 
                                <a href="publicProfile" rel="noopener noreferrer"> this link. </a></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Form.Group>
        </Col>
    </Row>
</div>:''}


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