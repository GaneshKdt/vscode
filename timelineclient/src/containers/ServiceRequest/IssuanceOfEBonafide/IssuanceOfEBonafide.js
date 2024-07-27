import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfigUrls from '../../../shared/config'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import '../SelectSR/SelectSR.css';
import handleValidation from "../Validations";
import Alert from 'react-bootstrap/Alert';


const urls = new ConfigUrls().urls;

class IssuanceOfEBonafide extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        sapId : this.props.student.sapid,
        serviceRequestType : 'Issuance of Bonafide',
        back : false,
        forward : false,
        pgrmStructure : this.props.student.prgmStructApplicable,
        responseData : [],
        studentData : this.props.student,
        purpose : '',
        errors : {},
        fieldsToValidate : null,
        error : null,
        productType : this.props.location.state.productType,
        otherPurpose : false,
        additionalInfo1 : '',
    }

    backToSR = () => {
        this.setState({
            back : true,
        })
    }
    
    saveBonafideRequest = () => {
        
            // validating Bonafide dropdown field
            let fieldsToValidateHash = {
                purpose: {"name" : "purpose", "value" : this.state.purpose, "type" : "mandatoryText"},
            }

            // validating Other reason field
            if(this.state.otherPurpose === true)
            {
                fieldsToValidateHash["additionalInfo1"] = {"name" : "additionalInfo1", "value" : this.state.additionalInfo1, "type" : "mandatoryText"};
            }
            else
            {
               delete this.state.errors["additionalInfo1"];
            }
            
            this.setState({
                fieldsToValidate : fieldsToValidateHash,
            },
            () => {
                handleValidation(this);

                if(Object.entries(this.state.errors).length === 0)
                {
                    
                    var postURL = urls.apiUrl_servicerequest + "saveBonafideRequest";
                    
                    confirmAlert({
                        title: 'Confirm to submit',
                        message: 'Are you sure you want to submit this Service Request?',
                        buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                axios.defaults.headers.post['Content-Type'] = false;
                                axios.post(postURL,
                                {
                                    sapId : this.state.sapId,
                                    serviceRequestType : this.state.serviceRequestType,
                                    purpose : this.state.purpose,
                                    additionalInfo1 : this.state.additionalInfo1,
                                    productType : this.state.productType,
                                }
                                ).then(response =>{
                                    if(response.data.error != null)
                                    {
                                        this.setState({
                                            error : response.data.errorMessage,
                                            forward : false,
                                        })
                                    }
                                    else
                                    {
                                        this.setState({
                                            responseData : response.data,
                                            error : null,
                                            forward : true,
                                        })
                                    }
                                }).catch(error =>{
                                    this.setState({
                                        error : "Something went wrong, please try later!",
                                        forward : false,
                                    })
                                })
                            }
                        },
                        {
                            label: 'No',
                            onClick: () => {
                                
                            }
                        }
                        ]
                    });

                }
            
        });
    }

    handleDropdownChange = (evt) => {
        console.log("inside ddl change------------" +evt.target.name)
            this.setState({
                [evt.target.name] : evt.target.value,
            })

            if(evt.target.value === "Other")
            {
                this.setState({
                    otherPurpose : true,
                })
            }
            else
            {
                this.setState({
                    otherPurpose : false,
                })
                delete this.state.errors["additionalInfo1"];
            }

            // field level validation
            let field = {"name" : [evt.target.name], "value" : evt.target.value, "type" : "mandatoryText"};
                
            handleValidation(this,field);
    }
    
    handleTextChange = (evt) => {
        // set values on text change and validate
        console.log("inside text change------------" +evt.target.value+" ==="+evt.target.value)
        
        this.setState({
            [evt.target.name] : evt.target.value
        })
        
        let field = {"name" : [evt.target.name], "value" : evt.target.value, "type" : "mandatoryText"};
            
        handleValidation(this,field);
    }
    
    render(){
        return(

            <Card style={{maxWidth : "80%"}}>
                    <Card.Body>
                    <Card.Header className="cardHeader">Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Header>
                    {this.state.error? 
                        <Row>
                            <Col>
                                <Alert variant="danger">
                                    {this.state.error}
                                </Alert>
                            </Col>
                        </Row>
                    : null}
                    <Row>
                        <Col>
                            <Form className="forFormInSR"> 
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Service Request Type  :   
                                    </Form.Label>
                                    <Form.Label column sm="7">
                                        {this.state.serviceRequestType}
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row} controlId="purpose">
                                    <Form.Label column sm="4">
                                        Reason for Bonafide:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control as="select" name="purpose" onChange={this.handleDropdownChange} >
                                                <option value="">Select a Reason</option>
                                                <option value="Record Purpose">Record Purpose</option>
                                                <option value="Official Purpose">Official Purpose</option>
                                                <option value="Scholarship Purpose">Scholarship Purpose</option>
                                                <option value="Loan Purpose">Loan Purpose</option>
                                                <option value="VISA Purpose">VISA Purpose</option>
                                                <option value="Other">Other</option>
                                        </Form.Control>
                                        {this.state.errors["purpose"] !== "" ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["purpose"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                                {this.state.otherPurpose === true ?
                                <>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Reason for Bonafide:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="textarea" name="additionalInfo1"  value={this.state.additionalInfo1} onChange={this.handleTextChange} />
                                        {this.state.errors["additionalInfo1"] !== "" ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["additionalInfo1"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                                </>
                                : null}
                            </Form>
                        </Col>
                    </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Form.Group>
                            <div className="forButtons">
                                <Button variant="primary" id="submit" onClick={this.saveBonafideRequest}>Save Service Request</Button>
                                <Button variant="secondary" id="backToSR" onClick={this.backToSR}>Back to New Service Request</Button>
                            </div>
                        </Form.Group>
                        

                        {this.state.back === true?
                            <Redirect  to='/timeline/selectSR' />
                        : null }
                        {this.state.forward === true?
                            <Redirect to={{pathname:'/timeline/srCreated' ,state:{id: this.state.responseData.id, reqType : this.state.responseData.serviceRequestType,
                            description: this.state.responseData.description, sapId : this.state.responseData.sapId}}}  />
                            
                        : null }
                    </Card.Footer>
                </Card>
          
        )
    }
}
const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}

export default connect(mapStateToProps)(IssuanceOfEBonafide)