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
import CommonUtilities from '../CommonUtilities';
import GoToGatewayForm from '../GoToGatewayForm/GotToGatewayForm';
import PaymentOptions from '../GoToGatewayForm/PaymentOptions';


const commonUtilities = new CommonUtilities();

const urls = new ConfigUrls().urls;

class SingleBook extends Component {
    constructor(props) { 
        super(props);
    }
    state = {
        sapId : this.props.student.sapid,
        serviceRequestType : 'Single Book',
        back : false,
        forward : false,
         //amount : 500,
        //amount : this.props.location.state.amount,
        amount : 0,
        pgrmStructure : this.props.student.prgmStructApplicable,
        isCertificate : false,
       // isCertificate : this.props.location.state.isCertificate,
        responseData : [],
        studentData : this.props.student,
        subject : null,
         subjectList : [],
        //subjectList : this.props.location.state.subjectList,
        errors : {},
        fieldsToValidate : null,
       // error : this.props.location.state.error,
       error : null,
       productType : this.props.location.state.productType,
       show_payment_options : false,
    }

    
    componentDidMount = () =>{
         this.getFeeAmountAndSubjects();
    }
    
     setAmount = () => {
         console.log("inside setamt---")
         var totalCost = this.state.amount;
       
         if(this.state.isCertificate === true){
             totalCost = totalCost + parseFloat(0.18 * totalCost);
         }
        
         this.setState({
             amount : totalCost,
         })
     }
    backToSR = () => {
        console.log("back--");
        this.setState({
            back : true,
        })
    }

    selectPaymentOption = () => {

        let text = null;

       if(this.state.subject == null || this.state.subject == '0') 
       {
            text = 'Please select subject from the dropdown ?'
            confirmAlert({
                message: text,
                buttons:[{
                    label: 'Ok',
                    onClick: () => {
                    //do nothing
                    }
                }]
            });
       }else{

            text = 'Are you sure you want to Proceed ? '
            confirmAlert({
                message: text,
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            this.setState({
                                show_payment_options: true
                            },()=>{
                                
                            })
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

    saveSingleBookRequest = () => {
        //axios--
        //fields hash for validation

       
        let fieldsToValidateHash = {
            subject : {"name" : "subject", "value" : this.state.subject, "type" : "mandatoryText"},
            
        }
            this.setState({
                fieldsToValidate : fieldsToValidateHash,
            },
            () => {
                handleValidation(this);
                if(Object.entries(this.state.errors).length === 0){
                    console.log("inside save-----------"+JSON.stringify(this.props))
                    if(this.state.subject !== null){
                        confirmAlert({
                            title: 'Confirm to submit',
                            message: 'Are you sure you want to submit this Service Request?',
                            buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {
                                     axios.defaults.headers.post['Content-Type'] = false;
                                     axios.post(urls.apiUrl_studentPortals + "saveSingleBook",
                                     {
                                         sapId : this.state.sapId,
                                         serviceRequestType : this.state.serviceRequestType,
                                         amount : this.state.amount,
                                         subject : this.state.subject,
                                         productType: this.state.productType,
                                         paymentOption:this.state.paymentOptionName,

                                     }
                                     ).then(response =>{
                                         console.log(JSON.stringify(response));

                                         if(this.state.amount != 0)
                                         {
                                             this.setState({
                                                 proceed_to_payment: true,
                                                 serviceRequestId: response.data.id,
                                                 payment_url: urls.apiUrl_web_studentPortal + 'm/' + response.data.paymentUrl,
                                                 responseData: response.data,
         
                                               }, ()=>{
                                                 this.submitPaymentForm()
                                               })
                                         }else{
                                             this.setState({
                                                 responseData : response.data,
                                                 error : null,
                                                 forward : true,
                                             })
                                         }
                                     }).catch(function(error){
                                         console.log(error);
                                 })
                                   // commonUtilities.saveServiceRequest(this.state, this.apiSuccessCallBack, this.apiErrorCallBack);
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
    handleDropdownChange = (evt) => {
        console.log("inside ddl change------------" +evt.target.name)
        this.setState({
            [evt.target.name] : evt.target.value,
        })
        let field = {"name" : [evt.target.name], "value" : evt.target.value, "type" : "mandatoryText"};
        handleValidation(this,field);
    }
     getFeeAmountAndSubjects = () => {
         console.log("inside getamt---");
         axios.defaults.headers.post['Content-Type'] = false;
         axios.post(urls.apiUrl_studentPortals + "/ServiceRequestFee",
         {
             sapId : this.state.sapId,
             serviceRequestType : this.state.serviceRequestType,
             productType : this.state.productType,
         }
         ).then(response =>{
             console.log(JSON.stringify(response));
             this.setState({
                amount : response.data.amount,
                 isCertificate : response.data.isCertificate,
                 subjectList : response.data.subjectList,
             }, ()=>{
                this.setAmount();
             });

         }).catch(function(error){
             console.log(error);
         })
     }
    
     saveSingleBookRequestWithPayment = (selectedPaymentProvider) => {
       
        this.setState({
            show_payment_options: false,

            selectedPaymentProvider : selectedPaymentProvider,
            submitPayment : true,
            paymentOptionName: selectedPaymentProvider.name

        },()=>{
            
               this.saveSingleBookRequest()
        })
    }
    submitPaymentForm() {
        window.$("#submit-payment").submit()           
      }
    render(){
        return(

            <Card style={{maxWidth : "80%"}}>
                    <Card.Header className="cardHeader">Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Header>
                    {/* <Card.Text className="cardHeader">Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Text> */}
                    {this.state.error? 
                        <Row>
                            <Col>
                                <Alert variant="danger">
                                    {this.state.error}
                                </Alert>
                            </Col>
                        </Row>
                    : null}
                    <Card.Body>
                        {/* <div className="cardHeader">Dear Student, You have chosen below Service Request.Please fill in required information below before proceeding for Payment.</div> */}
                        
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
                                <Form.Group as={Row} controlId="subject">
                                    <Col sm="10">
                                        <Form.Control as="select" name="subject" onChange={this.handleDropdownChange} >
                                                <option value="0">Select Subject for Book</option>
                                                {this.state.subjectList && this.state.subjectList.map(subject => 
                                                    <option value={subject} key={subject}>{subject}</option>
                                                )}
                                        </Form.Control>
                                        {this.state.errors["subject"] !== "" ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["subject"]}</span></Form.Text>
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
                                <Button variant="primary" id="submit" onClick={this.selectPaymentOption}>Save & Proceed to Payment</Button>
                                <Button variant="secondary" id="backToSR" onClick={this.backToSR}>Back to New Service Request</Button>
                            </div>
                        </Form.Group>
                        {this.state.show_payment_options  === true  ?
<PaymentOptions

setPaymentProvider = {this.saveSingleBookRequestWithPayment}

/>
        : null}

                        <GoToGatewayForm 
                        sapId = {this.state.sapId}
                        paymentOptionName = {this.state.paymentOptionName}
                        serviceRequestId = {this.state.serviceRequestId}
                        payment_url = {this.state.payment_url}
                        productType = {this.state.productType}

                        />
                        
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
// export default DuplicateICard
const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}

export default connect(mapStateToProps)(SingleBook)