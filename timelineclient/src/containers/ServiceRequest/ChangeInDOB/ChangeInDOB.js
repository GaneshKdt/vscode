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
import '../SelectSR/SelectSR.css'
import {analyticsManager} from '../../../shared/Analytics'
import { Container } from 'react-bootstrap';
import handleValidation from "../Validations";
import CommonUtilities from '../CommonUtilities';

const commonUtilities = new CommonUtilities();

const urls = new ConfigUrls().urls;
class ChangeInDOB extends Component {

    constructor(props) {
        super(props);
        this.dobRef = React.createRef();
        
    }
    state = {
        back : false,
        forward : false,
        sapId : this.props.student.sapid,
        serviceRequestType : 'Change in DOB',
        sscMarksheet : null,
        dob : this.props.student.dob,
        responseData : [],
        studentData : this.props.student,
        errors : {},
        status : true,
        today : new Date().getDate(),
        month : new Date().getMonth() + 1,
        year : new Date().getFullYear(),
        fullDate : null,
        fieldsToValidate : null,
        error : null,
       
    }
    

    saveCorrectDOB = () => {
        // console.log("%O",this.state.studentData);
        //fields hash for validation
        let fieldsToValidateHash = {
            dob : {"name" : "dob", "value" : this.state.dob, "type" : "date"},
            sscMarksheet : {"name" : "sscMarksheet", "value" : this.state.sscMarksheet, "type" : "file"},
        }
        this.setState({
                fieldsToValidate : fieldsToValidateHash,
            },
            () => {
                handleValidation(this);
                console.log("inside update----errors--*******"+JSON.stringify(this.state.errors));
                if(Object.entries(this.state.errors).length === 0){
                    this.setState({
                        status : true,
                    })
                    confirmAlert({
                        title: 'Confirm to submit',
                        message: 'Are you sure you want to submit this Service Request?',
                        buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                console.log("inside yes---"+this.state.dob);
                                console.log("dob---"+this.state.dob);
                                const formData = new FormData();
                                formData.append('sscMarksheet', this.state.sscMarksheet);
                                formData.append('sapId', this.state.sapId);
                                formData.append('serviceRequestType', this.state.serviceRequestType);
                                formData.append('dob', this.state.dob);
                                // axios.defaults.headers.post['Content-Type'] = false;
                                // axios.post(urls.apiUrl_studentPortals + "/saveCorrectDOB",formData
                                // ).then(response => {
                                //     console.log(JSON.stringify(response));
                                //     this.setState({
                                //         responseData : response.data,
                                //         forward : true,
                                //     });
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
    handleDOBTextChange = (evt) => {
        console.log("inside file select---------"+this.dobRef.current.value)
        if(this.dobRef.current.value != undefined && this.dobRef.current.value != null){
            console.log("inside if--------------")
            this.setState({
                dob : this.dobRef.current.value,
            })
        }
        
    }
    handleFileOnchange = (evt) => {
        console.log("inside file onchange");
        this.setState({
            sscMarksheet : evt.target.files[0],
            // dob : this.dobRef.current.value,
        })
    }

    componentDidMount= () =>{
        var mon,day;
        console.log("inside mount00000000000---"+this.state.fullDate);
        if(this.state.month.length > 1){
            console.log("1----")
            mon = this.state.month;
        }else{
            console.log("2----")
            mon = "0" + this.state.month;
        }

        if(this.state.today.length > 1){
            console.log("3----")
            day = this.state.today;
        }else{
            console.log("4----")
            day = "0" + this.state.today;
        }
        this.setState({
            fullDate : this.state.year + "-" + mon + "-" + day,
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
        // console.log("inside render of dob");
        return(
            <Container><Row><Col>

                {/* <Card style={{maxWidth : "80%"}}> */}
                <Card>

                    {/* <Card.Header className="cardHeader">Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Header> */}
                    {/* <Card.Text className="cardHeader">Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Text> */}
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
                                <Form.Group as={Row} controlId="dob">
                                    <Form.Label column sm="4">
                                        Correct Date of Birth:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="date" name="dob" value={this.state.dob} ref={this.dobRef} onChange={this.handleDOBTextChange} max={this.state.fullDate}/>
                                        {this.state.errors["dob"] ? 
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["dob"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="sscMarksheet">
                                    <Form.Label column sm="4">
                                        Please Upload SSC Marksheet:
                                        <Form.Text className="text-muted">(as Proof of Date of Birth)</Form.Text>
                                    </Form.Label>
                                    <Col sm="7" className="fileInput">
                                        <Form.Control type="file" name="sscMarksheet" onChange={this.handleFileOnchange} />
                                        {this.state.errors["sscMarksheet"] ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["sscMarksheet"]}</span></Form.Text>
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
                                <Button variant="primary" id="submit" onClick={this.saveCorrectDOB}>Save Service Request</Button>
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

export default connect(mapStateToProps)(analyticsManager(ChangeInDOB))
