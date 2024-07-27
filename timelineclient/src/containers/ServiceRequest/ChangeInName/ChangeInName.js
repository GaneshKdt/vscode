import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import SelectSR_CSS from '../SelectSR/SelectSR.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import ConfigUrls from '../../../shared/config'
import {connect} from 'react-redux';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {analyticsManager} from '../../../shared/Analytics'
import { Container } from 'react-bootstrap';
import handleValidation from "../Validations";
import CommonUtilities from '../CommonUtilities';
const ReactDOM = require('react-dom')

const commonUtilities = new CommonUtilities();

const urls = new ConfigUrls().urls;
class ChangeInName extends Component {
    constructor(props) {
        super(props);
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
    }
    state = {
        sapId : this.props.student.sapid,
        serviceRequestType : 'Change in Name',
        back : false,
        forward : false,
        firstName : "",
        lastName : "",
        fileToUpload : null,
        responseData : [],
        studentData : this.props.student,
        errors : {},
        status : true,
        fieldsToValidate : null,
        focused: {},
        error : null,
    }
    handleFNTextChange = (evt) => {
        console.log("inside fname--")
        let field = {"name" : "firstName", "value" : evt.target.value, "type" : "name"};
        this.setState({
            [evt.target.name] : evt.target.value
        })
        

        // handleValidation(this,"firstName");
        handleValidation(this,field);
    }
    handleLNTextChange = (evt) => {
        console.log("inside lname--")
        let field = {"name" : "lastName", "value" : evt.target.value, "type" : "lastName"};
        this.setState({
            [evt.target.name] : evt.target.value
        })
        // handleValidation(this,"lastName");
        handleValidation(this,field);
    }
    handleFileOnchange = (evt) => {
        console.log("inside file onchange");
        this.setState({
            fileToUpload : evt.target.files[0]
        })
    }
    saveChangeInName = (evt) => {
        //axios--
        //fields hash for validation
        let fieldsToValidateHash = {
            firstName : {"name" : "firstName", "value" : this.state.firstName, "type" : "name"},
            lastName : {"name" : "lastName", "value" : this.state.lastName, "type" : "lastName"},
            changeInNameDoc : {"name" : "changeInNameDoc", "value" : this.state.fileToUpload, "type" : "file"},
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
                formData.append('changeInNameDoc', this.state.fileToUpload);
                formData.append('sapId', this.state.sapId);
                formData.append('serviceRequestType', this.state.serviceRequestType);
                formData.append('firstName', this.state.firstName);
                formData.append('lastName', this.state.lastName);
                confirmAlert({
                    title: 'Confirm to submit',
                    message: 'Are you sure you want to submit this Service Request?',
                    buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            // axios.defaults.headers.post['Content-Type'] = false;
                            // axios.post(urls.apiUrl_studentPortals + "/saveChangeInName",formData
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
    backToSR = () => {
        console.log("back--");
        this.setState({
            back : true,
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
    render(){
        return(
            <Container><Row><Col>
                    {/* <Card style={{maxWidth : "80%"}}> */}

                    <Card>
                        <Card.Body>
                        <Card.Header className="cardHeader">Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Header>
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
                                            <Form.Label column sm="7">
                                                No Charges
                                            </Form.Label>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="firstName">
                                            <Form.Label column sm="4">
                                                First Name:
                                            </Form.Label>
                                            <Col sm="7">
                                                <Form.Control type="text" name="firstName" ref={this.firstNameRef} onChange={this.handleFNTextChange} isValid={this.state.firstName && !this.state.errors["firstName"]} isInvalid={this.state.errors["firstName"]} />
                                                {/* <input type="text" ref={this.firstNameRef} name="firstName" required="required" className="form-control" placeholder="First Name" required="required" onChange={this.handleFNTextChange}/> */}
                                                {this.state.errors["firstName"] ?
                                                    <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["firstName"]}</span></Form.Text>
                                                :null}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="lastName">
                                            <Form.Label column sm="4">
                                                Last Name:
                                            </Form.Label>
                                            <Col sm="7">
                                                <Form.Control type="text" name="lastName"  ref={this.lastNameRef} onChange={this.handleLNTextChange} isValid={this.state.lastName && !this.state.errors["lastName"]} isInvalid={this.state.errors["lastName"]}/>
                                                {this.state.errors["lastName"] !== "" ?
                                                    <Form.Text className="text-muted"><span>{this.state.errors["lastName"]}</span></Form.Text>
                                                :null}
                                            </Col>
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="changeInNameDoc">
                                            <Form.Label column sm="4">
                                                Please Upload Photo Identity OR Marriage Certificate OR Affidavit:
                                            </Form.Label>
                                            <Col sm="7" className="fileInput">
                                                <Form.Control type="file" name="changeInNameDoc" onChange={this.handleFileOnchange} />
                                                {this.state.errors["changeInNameDoc"] !== "" ?
                                                    <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["changeInNameDoc"]}</span></Form.Text>
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
                                    <Button variant="primary" id="submit" onClick={this.saveChangeInName.bind(this)}>Save Service Request</Button>
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
                </Col></Row></Container>
                    
                        
                
                   
                        
                    
              
        );
    }
}
const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}



export default connect(mapStateToProps)(analyticsManager(ChangeInName))


