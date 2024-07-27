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
import '../SelectSR/SelectSR.css';
import handleValidation from "../Validations";
import Alert from 'react-bootstrap/Alert';
import GoToGatewayForm from '../GoToGatewayForm/GotToGatewayForm';
import PaymentOptions from '../GoToGatewayForm/PaymentOptions';
import Container from 'react-bootstrap/Container'

const urls = new ConfigUrls().urls;

const CHECKIFSTUDENTAPPLICABLEFORWITHDRAWAL = new ConfigUrls().api.checkIfStudentApplicableForWithdrawal;
const SAVEPROGRAMWITHDRAWAL = new ConfigUrls().api.saveProgramWithdrawal;

class programWithdrawal extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        sapId : this.props.student.sapid,
        serviceRequestType : 'Program Withdrawal',
        back : false,
        forward : false,
        studentData : this.props.student,
        description : ["Shifting Abroad","Not Interested","No time to study","Other"],
        error : false,
        errorMessage : "",
        productType : this.props.location.state.productType,
        reason : false,
        additionalInfo1 : "0",
        success : false,
        message : "",
        errorResponse : false,
        reasonType: "",
    }

    handleConfirmation = (evt) => {
    
        this.setState({
            reason :true
        })
    }

    
    componentDidMount = () =>{
        this.checkIfStudentApplicableForWithdrawal()

    }

    backToSR = () => {

        this.setState({
            back : true,
        })
    }
   
    checkIfStudentApplicableForWithdrawal = () => {
  
        axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
	
		axios.post(CHECKIFSTUDENTAPPLICABLEFORWITHDRAWAL,
			JSON.stringify({ 
				sapid : this.state.sapId,
                enrollmentYear : this.props.student.enrollmentYear,
                enrollmentMonth : this.props.student.enrollmentMonth,
                sem : this.props.student.sem
			})
		).then(response => {
        
            if(response.data.length > 0)
            {
			this.setState({
                errorMessage : response.data,
                error : true
			},
			() => {
			});
        }
		}).catch(error =>{
            
        })
    }

    saveWithdrawalRequest = () => {
        
        let data;
      
        if(this.state.additionalInfo1 == "Other" && this.state.reasonType.length == 0)
        {
        confirmAlert({
                
                message: 'Please check the Reason. ',
                buttons:[{
                    label: 'Ok',
                    onClick: () => {
                     return false;
                    }
                }]
            });   
        }else if(this.state.reason == false)
        {
            confirmAlert({
                
                message: 'Please check the Checkbox. ',
                buttons:[{
                    label: 'Ok',
                    onClick: () => {
                        return false;
                    }
                }]
            });   
        }else if(this.state.additionalInfo1 !== "0" && this.state.reason == true)
        {
           if(this.state.additionalInfo1 == "Other")
               data = this.state.reasonType
           else
               data = this.state.additionalInfo1

            axios.defaults.headers.post['Content-Type'] = 'application/json';
		    axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
	
		    axios.post(SAVEPROGRAMWITHDRAWAL,
			    JSON.stringify({ 
				    sapId : this.state.sapId,
                    additionalInfo1 : data
			    })
		    ).then(response => {
                
                if(response.data.error == "true"){
			          this.setState({
                        message : response.data.errorMessage,
                        errorResponse : true
                      })
                }else{
                    confirmAlert({
                
                        message: 'Success!! Service request raised. ',
                        buttons:[{
                            label: 'Ok',
                            onClick: () => {
                            //do nothing
                            this.setState({
                                responseData : response.data,
                                error : null,
                                forward : true,
                            })
                            }
                        }]
                    });  
                    
                }
		    }).catch(error =>{
            
            })
        } 

     
        
       
    }

    handleDropdownChange = (evt) => {
        this.setState({
            additionalInfo1 : evt.target.value,
        })
            
    }

    handleTextChange = (evt) => {
        this.setState({
            reasonType : evt.target.value
        })
      
    }
    render(){

        return(
            <Container fluid='true'>
            {this.state.error == true ?  <Alert variant="danger">
                       {this.state.errorMessage}
                    </Alert> :
            <Card style={{maxWidth : "80%"}}>
                    {this.state.errorResponse == true ?  <Alert variant="danger">
                       {this.state.message}
                    </Alert> : null}
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
                                    <Form.Label column sm="7">
                                       No Charges
                                    </Form.Label>
                                
                                    <Form.Label column sm="4">
                                        Student No:
                                    </Form.Label>
                                    <Form.Label column sm="7">
                                       {this.state.sapId}
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Student Name:
                                    </Form.Label>
                                    <Form.Label column sm="7" >
                                       {this.state.studentData.firstName} &nbsp;&nbsp; {this.state.studentData.lastName}
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                     Enrollment Year:
                                    </Form.Label>
                                    <Form.Label column sm="7" >
                                       {this.state.studentData.enrollmentYear}
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                         Program Name:
                                    </Form.Label>
                                    <Form.Label column sm="7">
                                       {this.props.student.program}
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Validity Month:
                                    </Form.Label>
                                    <Form.Label column sm="7">
                                       {this.state.studentData.validityEndMonth}
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Validity Year:
                                    </Form.Label>
                                    <Form.Label column sm="7">
                                       {this.state.studentData.validityEndYear }
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Reason for Withdrawal:
                                    </Form.Label>
                                    <Form.Group as={Row}>
                                    <Col sm="100">
                                        <Form.Control as="select" onChange={this.handleDropdownChange} >
                                                <option value="0">Select Reason</option>
                                                {this.state.description.map(number => {
                                                        return(
                                                            <option value={number} key={number}>{number}</option>
                                                        )
                                                    })
                                                }
                                        </Form.Control>
                                    </Col>
                                </Form.Group>
                                </Form.Group>
                                {this.state.additionalInfo1 == "Other"?
                                 <Form.Group as={Row}>
                                 <Form.Label column sm="4">
                                         Reason :
                                     </Form.Label>
                                
                                     <Col sm="7">
                                         <Form.Control type="textarea" name="reasonType" value={this.state.reasonType}  onChange={this.handleTextChange} />
                                        
                                     </Col>
                                    
                                  </Form.Group>
                                 :null}
                                <Form.Group as={Row}>
                                        <Form.Check type="checkbox" label=" I hereby agree and accept to completely withdraw from my program of study offered by SVKM's NMIMS - NMIMS Global Access - School for Continuing Education. I also agree that in case of any dispute or differences about this withdrawal, the decision of the SVKM's NMIMS - NMIMS Global Access - School for Continuing Education will be final and binding on me. I am aware that No fees pending or otherwise will be refunded."  onChange={this.handleConfirmation.bind(this)} />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Form.Group>
                            <div className="forButtons">
                                <Button variant="primary" id="submit" onClick={this.saveWithdrawalRequest}>Save Service Request</Button>
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
        }
          </Container>
        )
    }
}
const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}

export default connect(mapStateToProps)(programWithdrawal)