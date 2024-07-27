import React, { useState } from 'react';
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


function HusbandNameForm(props){

    return(
        
        <>
        <Form.Group as={Row} controlId="inHusbandName">
            <Form.Check type="checkbox" name="inHusbandName" label="Do you wish the certificate to be in Husbands name ?" onChange={props.handleHusbandName.bind(this)} />
        </Form.Group>
        {props.nameOnCertificate === "Spouse" ? 
            <Form.Group as={Row} controlId="affidavit" >
                <Form.Label column sm="4">
                    Please Upload Marriage Certificate OR Affidavit:
                </Form.Label>
                <Col sm="7" className="fileInput">
                    <Form.Control type="file" name="affidavit"  onChange={this.handleFileChange} />
                    {props.errors["affidavit"] !== "" ?
                        <Form.Text className="text-muted"><span className="mandatory">{props.errors["affidavit"]}</span></Form.Text>
                    :null}
                </Col>
            </Form.Group>
        : null}
        </>
    )
}

export default HusbandNameForm;