import React, { Component } from "react";
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfigUrls from '../../../shared/config'
import {analyticsManager} from '../../../shared/Analytics'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import '../SelectSR/SelectSR.css';
import handleValidation from "../Validations";
import Alert from 'react-bootstrap/Alert';
import CommonUtilities from '../CommonUtilities';

const commonUtilities = new CommonUtilities();

const urls = new ConfigUrls().urls;
class ChangeInID extends Component{
    constructor(props) {
        super(props);
        this.firstNameRef = React.createRef();
        this.middleNameRef = React.createRef();
        this.lastNameRef = React.createRef();
    }
    state = {
        sapId : this.props.student.sapid,
        serviceRequestType : 'Change in I-Card',
        back : false,
        forward : false,
        firstName : "",
        middleName : "",
        lastName : "",
        // amount : 200,
        amount : this.props.location.state.amount,
        fileToUpload : null,
        responseData : [],
        studentData : this.props.student,
        errors : {},
        status : true,
        fieldsToValidate : null,
        error : this.props.location.state.error,
    }
    saveChangeInICard = (evt) => {

        //axios--
        //fields hash for validation
        let fieldsToValidateHash = {
            firstName : {"name" : "firstName", "value" : this.state.firstName, "type" : "name"},
            middleName : {"name" : "middleName", "value" : this.state.middleName, "type" : "name"},
            lastName : {"name" : "lastName", "value" : this.state.lastName, "type" : "name"},
            changeInIDDoc : {"name" : "changeInIDDoc", "value" : this.state.fileToUpload, "type" : "file"},
        }

        this.setState({
            fieldsToValidate : fieldsToValidateHash,
        },
        () => {
            console.log("inside save-----------")
            handleValidation(this);
            console.log("inside save-----------"+JSON.stringify(this.state.errors))
            if(Object.entries(this.state.errors).length === 0){
                this.setState({
                    status : true,
                })
                const formData = new FormData();
                formData.append('changeInIDDoc', this.state.fileToUpload);
                formData.append('sapId', this.state.sapId);
                formData.append('serviceRequestType', this.state.serviceRequestType);
                formData.append('firstName', this.state.firstName);
                formData.append('middleName', this.state.middleName);
                formData.append('lastName', this.state.lastName);
                formData.append('amount', this.state.amount);
                confirmAlert({
                    title: 'Confirm to submit',
                    message: 'Are you sure you want to submit this Service Request?',
                    buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            console.log("inside yes---"+this.state.firstName);
                            console.log("lastName---"+this.state.lastName);
                            // axios.defaults.headers.post['Content-Type'] = false;
                            // axios.post(urls.apiUrl_studentPortals + "/saveChangeInICard",formData
                            // ).then(response =>{
                            //     console.log(JSON.stringify(response));
                            //     this.setState({
                            //         responseData : response.data,
                            //         forward : true,
                            //     })
                            // }).catch(function(error){
                            //     console.log(error);
                            // })
                            commonUtilities.saveServiceRequest(formData, this.apiSuccessCallBack, this.apiErrorCallBack);
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {
                            //do nothing
                        }
                    }
                    ]
                });
            }
        })
        
    }
    apiSuccessCallBack = (response) =>{
        console.log(JSON.stringify(response));
        this.setState({
            responseData : response.data,
            error : null,
            forward : true,
        })
    }

    apiErrorCallBack = (error, errorMessage) =>{
        console.log(error);
        this.setState({
            error : errorMessage,
        })
    }
    backToSR = () => {
        console.log("back--");
        this.setState({
            back : true,
        })
        
    }
    handleFileOnchange = (evt) => {
        console.log("inside file onchange");
        this.setState({
            fileToUpload : evt.target.files[0]
        })
    }
    // handleFNTextChange = (evt) => {
    //     let field = {"name" : "firstName", "value" : evt.target.value, "type" : "name"};
    //     this.setState({
    //         firstName : this.firstNameRef.current.value,
    //     })
    //     handleValidation(this,field);
    // }
    // handleMNTextChange = (evt) => {
    //     let field = {"name" : "middleName", "value" : evt.target.value, "type" : "name"};
    //     this.setState({
    //         middleName : this.middleNameRef.current.value,
    //     })
    //     handleValidation(this,field);
    // }
    // handleLNTextChange = (evt) => {
    //     let field = {"name" : "lastName", "value" : evt.target.value, "type" : "name"};
    //     this.setState({
    //         lastName : this.lastNameRef.current.value,
    //     })
    //     handleValidation(this,field);
    // }
    handleTextChange = (evt) => {
        console.log("inside text change-------------");
        // this.populateCityStateCountry(evt);
        let field = {"name" : evt.target.name, "value" : evt.target.value, "type" : "name"};
        this.setState({
            [evt.target.name] : evt.target.value,
        })
        handleValidation(this,field);
    }
    render(){
        return(

            <Card style={{maxWidth : "80%"}}>
                    <Card.Body>
                    <Card.Header className="cardHeader">Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. 
                        You won't be able to submit Service Request for next 48hrs . For details refer to "Messages" Tab</Card.Header>
                        {/* <div className="cardHeader">Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </div> */}
                        {/* <div className="cardHeader">You won't be able to submit Service Request for next 48hrs . For details refer to "Messages" Tab </div> */}
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
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Charges:
                                    </Form.Label>
                                    <Form.Label column sm="7" className="charges">
                                        200
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row} controlId="firstName">
                                    <Form.Label column sm="4">
                                        First Name:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="text" name="firstName" ref={this.firstNameRef} onChange={this.handleTextChange} />
                                        {this.state.errors["firstName"] !== "" ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["firstName"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="middleName">
                                    <Form.Label column sm="4">
                                        Middle Name:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="text" name="middleName" ref={this.middleNameRef} onChange={this.handleTextChange} />
                                        {this.state.errors["middleName"] !== "" ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["middleName"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="lastName">
                                    <Form.Label column sm="4">
                                        Last Name:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="text" name="lastName" ref={this.lastNameRef} onChange={this.handleTextChange} />
                                        {this.state.errors["lastName"] !== "" ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["lastName"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="changeInIDDoc">
                                    <Form.Label column sm="4">
                                        Please Upload Photo Identity OR Marriage Certificate OR Affidavit:
                                    </Form.Label>
                                    <Col sm="7" className="fileInput">
                                        <Form.Control type="file" name="changeInIDDoc" onChange={this.handleFileOnchange} />
                                        {this.state.errors["changeInIDDoc"] !== "" ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["changeInIDDoc"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Form.Group>
                            <div className="forButtons">
                                <Button variant="primary" id="submit" onClick={this.saveChangeInICard.bind(this)}>Save & Proceed to Payment</Button>
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
         
        );
    }
}
const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}

export default connect(mapStateToProps)(analyticsManager(ChangeInID))
