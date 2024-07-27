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



function DuplicateForm(){
    return(


<>
    <Form.Group as={Row} controlId="firFile" >
        <Form.Label column sm="5">
            Please Upload Copy of FIR:
        </Form.Label>
        <Col sm="7" className="fileInput">
            <Form.Control type="file" name="firFile" onChange={this.handleFileChange} />
            {this.state.errors["firFile"] !== "" ?
                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["firFile"]}</span></Form.Text>
            :null}
        </Col>
    </Form.Group>
    <Form.Group as={Row} controlId="idemnityBond">
        <Form.Label column sm="5">
            Please Upload Copy of Indemnity Bond as per format shown here: 
        </Form.Label>
        <Col sm="7" className="fileInput">
            <Form.Control type="file" name="idemnityBond"  onChange={this.handleFileChange} />
            {this.state.errors["idemnityBond"] !== "" ?
                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["idemnityBond"]}</span></Form.Text>
            :null}
        </Col>
        
        
    </Form.Group>
    <Form.Group as={Row} controlId="idemnityBond">
            <a href="resources_2015/notices/Proforma_of_Indemnity_Bond.docx" target="_blank"  >
                Download Proforma of Indemnity Bond 
            </a>
    </Form.Group>
</>
        
        )
}
 export default DuplicateForm

