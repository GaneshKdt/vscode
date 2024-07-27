import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import SelectSR_CSS from '../SelectSR/SelectSR.css'
// import {backToSR} from '../SelectSR/SelectSR' 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfigUrls from '../../../shared/config'
import {connect} from 'react-redux';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {analyticsManager} from '../../../shared/Analytics';
import handleValidation from "../Validations";
import { Container } from 'react-bootstrap';
import CommonUtilities from '../CommonUtilities';

const commonUtilities = new CommonUtilities();

const urls = new ConfigUrls().urls;

class ChangeInPhotograph extends Component {
    state = {
        sapId : this.props.student.sapid,
        serviceRequestType : 'Change in Photograph',
        back : false,
        forward : false,
        fileToUpload : null,
        proofOfDoc : null,
        responseData : [],
        studentData : this.props.student,
        errors : {},
        status : true,
        fieldsToValidate : null,
        error : null,
    }
    handleFileOnchange = (evt) => {
        console.log("inside file onchange");
        this.setState({
            fileToUpload : evt.target.files[0]
        })
    }
    handleProofOnchange = (evt) => {
        console.log("inside proof onchange");
        this.setState({
            proofOfDoc : evt.target.files[0]
        })
    }
    backToSR = () => {
        console.log("back--");
        this.setState({
            back : true,
        })
    }
    saveChangeInPhotograph = (evt) => {
        //axios--
        //fields hash for validation
        let fieldsToValidateHash = {
            changeInPhotographDoc : {"name" : "changeInPhotographDoc", "value" : this.state.fileToUpload, "type" : "file"},
            changeInPhotographProofDoc : {"name" : "changeInPhotographProofDoc", "value" : this.state.proofOfDoc, "type" : "file"},
        }
        console.log("inside save-----------")

        this.setState({
            fieldsToValidate : fieldsToValidateHash,
        },
        () => {
            console.log("inside save-----------")
            handleValidation(this);
            if(Object.entries(this.state.errors).length === 0){
                this.setState({
                    status : true,
                })
                const formData = new FormData();
                formData.append('sapId', this.state.sapId);
                formData.append('changeInPhotographDoc', this.state.fileToUpload);
                formData.append('changeInPhotographProofDoc', this.state.proofOfDoc);
                formData.append('serviceRequestType', this.state.serviceRequestType);
                confirmAlert({
                    title: 'Confirm to submit',
                    message: 'Are you sure you want to submit this Service Request?',
                    buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            // axios.defaults.headers.post['Content-Type'] = false;
                            // axios.post(urls.apiUrl_studentPortals + "/saveChangeInPhotograph",formData
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
                                    <Form.Group as={Row} controlId="changeInPhotographDoc">
                                        <Form.Label column sm="4">
                                            Please Upload Photo:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="file" name="changeInPhotographDoc" onChange={this.handleFileOnchange} />
                                            {this.state.errors["changeInPhotographDoc"] ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["changeInPhotographDoc"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="changeInPhotographProofDoc">
                                        <Form.Label column sm="4">
                                            Please Upload Photo ID for verification:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="file" name="changeInPhotographProofDoc"  onChange={this.handleProofOnchange} />
                                            {this.state.errors["changeInPhotographProofDoc"] ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["changeInPhotographProofDoc"]}</span></Form.Text>
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
                                <Button variant="primary" id="submit" onClick={this.saveChangeInPhotograph.bind(this)}>Save Service Request</Button>
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



               
        )
    }


}


const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}

export default connect(mapStateToProps)(analyticsManager(ChangeInPhotograph))
