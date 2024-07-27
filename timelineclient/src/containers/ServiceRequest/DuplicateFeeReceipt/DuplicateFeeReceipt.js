import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import SelectSR_CSS from '../SelectSR/SelectSR.css'
// import {backToSR} from '../SelectSR/SelectSR' 
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
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

class DuplicateFeeReceipt extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        // dummy sapid
        // sapId : 77118634372,

        sapId : this.props.student.sapid,
        serviceRequestType : 'Duplicate Fee Receipt',
        back : false,
        forward : false,
        sem : null,
        responseData : [],
        // isCertificate : false,
        isCertificate : this.props.location.state.isCertificate,
        // amount : 100,
        amount : this.props.location.state.amount,
        studentData : this.props.student,
        errors : {},
status : true,

semList : ["1","2","3","4"],

        fieldsToValidate : null,
        // error:null,
        error : this.props.location.state.error,
    }
    saveDuplicateFeeReceipt = (evt) => {
        //axios--
        let fieldsToValidateHash = {
            sem : {"name" : "sem", "value" : this.state.sem, "type" : "mandatoryText"},
        }
        console.log("inside save-----------")

        this.setState({
            fieldsToValidate : fieldsToValidateHash,
        },
        () => {
            console.log("inside save-----------")
            handleValidation(this);
            this.setState({
                status : true,
            })
            if(Object.entries(this.state.errors).length === 0){
                console.log("inside save-----------"+ JSON.stringify(this.state.studentData))
                if(this.state.sem !== ""){
                    confirmAlert({
                        title: 'Confirm to submit',
                        message: 'Are you sure you want to submit this Service Request?',
                        buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                // axios.defaults.headers.post['Content-Type'] = false;
                                // axios.post(urls.apiUrl_studentPortals + "/saveDuplicateFeeReceipt",
                                // {
                                //     sem : this.state.sem,
                                //     sapId : this.state.sapId,
                                //     serviceRequestType : this.state.serviceRequestType,
                                //     amount : this.state.amount
                                // }
                                // ).then(response =>{
                                //     console.log(JSON.stringify(response));
                                //     this.setState({
                                //         responseData : response.data,
                                //         error : null,
                                //         forward : true,
                                //     })
                                // }).catch(error =>{
                                //     console.log(error);
                                //     this.setState({
                                //         error : "Error in Saving SR.",
                                //     })
                                // })
                                commonUtilities.saveServiceRequest(this.state, this.apiSuccessCallBack, this.apiErrorCallBack);
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
            }
        });
    }
    backToSR = () => {
        console.log("back--");
        this.setState({
            back : true,
        })
    }
    handleSemChange = (evt) => {
        console.log("inside sem--");
        this.setState({
            [evt.target.name] : evt.target.value,
        });
        let field = {"name" : evt.target.name, "value" : evt.target.value, "type" : "mandatoryText"};
        handleValidation(this,field);

    }
    
    componentDidMount = () =>{
       
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
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Charges:
                                    </Form.Label>
                                    <Form.Label column sm="7" className="charges">
                                        {this.state.amount}
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row} controlId="semester">
                                    <Col sm="10">
                                        <Form.Control as="select" name="sem" onChange={this.handleSemChange} >
                                                <option value="">Select Semester for Fee Receipt</option>
                                                { this.state.semList.map((item) => 
                                                    <option key={item} value={item} >{item}</option>
                                                    )
                                                }
                                        </Form.Control>
                                        {this.state.errors["sem"] ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["sem"]}</span></Form.Text>
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
                                <Button variant="primary" id="submit" onClick={this.saveDuplicateFeeReceipt.bind(this)}>Save & Proceed to Payment</Button>
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
export default connect(mapStateToProps)(analyticsManager(DuplicateFeeReceipt))
