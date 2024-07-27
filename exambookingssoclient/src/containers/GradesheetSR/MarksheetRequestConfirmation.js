import React, { Component } from 'react';
import axios from 'axios';
import '../GradesheetSR/GradesheetSR.css'
//import Dropdown from 'react-bootstrap/Dropdown'
//import ChangeInDOB from '../ChangeInDOB/ChangeInDOB'
import { Redirect } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import  Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container'
import PaymentMethodSelection from '../../components/PaymentFlow/ExamBooking/PaymentMethodSelection/PaymentMethodSelection'


//import {analyticsManager} from '../../../shared/Analytics';
import { confirmAlert } from 'react-confirm-alert';
import ConfigUrls from '../../shared/config'
import { Alert } from 'react-bootstrap';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner'
// import objectToFormData from 'object-to-formdata';

    const urls = new ConfigUrls().urls;

class MarksheetRequestConfirmation extends Component{
    state = {
        srData: this.props.location.state.responseData,
        firCopy : null,
        indemnityBond: null,
        charges : this.props.location.state.responseData.totalAmountToBePayed,
        responseDataForRequestCount: [],
        responseDataForSave:[],
        isRequestFree : true,
        error : "",
        forward : false,
        back: false,
        errors : {},
        fieldsToValidate : null,
        trackId : "",
        amount : 0,
        showLoader : false,
        payment_url: null,
        proceed_to_payment:false,
        paymentOptionName:null,
        serviceRequestId: null,
        show_payment_options: false,
        selectedPaymentProvider: null
    }
    handleClickOk = () => {
        this.setState({
            clickOK : true,
        });
    }

    submitPaymentForm() {
      //  if(this.checkIfFieldsComplete() && this.state.trackId) {
          console.log('here')
          console.log(this.state.payment_url)
          console.log(this.state.proceed_to_payment)
            window.$("#submit-payment").submit()           
       //    }
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
            [evt.target.name] : evt.target.files[0],
        })
    }
    componentDidMount = () =>{
        console.log("inside marksheet confirmation--***********"+JSON.stringify(this.props.location.state.responseData));
       
    }
    saveMarksheetRequest = () => {
        let apiToCall ="";
        if(parseInt(this.state.charges) === 0){
            console.log(" inside if-----111");
            apiToCall = urls.apiUrl_web_studentPortal + "/CheckServiceRequestCount?sapId="+this.state.srData.sapId+"&requestType=" + this.state.srData.serviceRequestType +"&isFreeRequest=true";
        }
        else{
            if(this.state.srData.duplicateMarksheet){
                
                if(this.state.indemnityBond === null || this.state.indemnityBond  === undefined){
                    this.state.errors["indemnityBond"] = "Document is mandatory";
                }else{
                    delete this.state.errors["indemnityBond"];
                }

                if(this.state.firCopy === null || this.state.firCopy === undefined){
                    this.state.errors["firCopy"] = "Document is mandatory";
                }else{
                    delete this.state.errors["firCopy"];
                }

            }
            apiToCall = urls.apiUrl_web_studentPortal + "/CheckServiceRequestCount?sapId="+this.state.srData.sapId+"&requestType=" + this.state.srData.serviceRequestType +"&isFreeRequest=false";
            this.setState({
                isRequestFree : false,
            })

        }
        if(Object.entries(this.state.errors).length === 0){
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to request for this Gradesheet? You can not make any changes after this step.',
            buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    axios.defaults.headers.post['Content-Type'] = false;
                    axios.post(apiToCall
                    ).then(response =>{
                        console.log(JSON.stringify(response));
                        this.setState({
                            responseDataForRequestCount : response.data,
                        })
                        if(this.state.responseDataForRequestCount.status === "200" && this.state.responseDataForRequestCount.result === "Applicable for service request"){
                            this.callSaveApi();
                        }else{
                            this.setState({
                                error : this.state.responseDataForRequestCount.result,
                            })  
                        }
                    }).catch(function(error){
                        console.log(error);
                    })
                }
            },
            {
                label: 'No',
                onClick: () => {
                    //do nothing
                    this.setState({
                        showLoader : false,
                    })
                }
            }
            ]
        });
        }
    }
    callSaveApi = () =>{
        if(this.state.isRequestFree){
            let dataToSend = this.state.srData
            console.log("dataToSend----------",dataToSend);
            axios.defaults.headers.post['Content-Type'] = "application/json";
            axios.post(urls.apiUrl_studentPortals + "/saveMarksheetRequest",dataToSend
            ).then(response =>{
                console.log(JSON.stringify(response));
                this.setState({
                    responseDataForSave : response.data,
                    forward : true,
                })
                
            }).catch(error =>{
                console.log(error);
                this.setState({
                    error : "Error in saving Service Request.",
                }) 
            })
        }else{

            this.setState({
                show_payment_options: true
            },()=>{
                
            })


        }
    }

    setPaymentProvider = (selectedPaymentProvider) => {
        this.setState({
            selectedPaymentProvider : selectedPaymentProvider,
            submitPayment : true,
            paymentOptionName: selectedPaymentProvider.name

        },()=>{
            console.log(this.state.selectedPaymentProvider)
                        // payment gateway to be added, temporarily commenting, NEEDED IN FUTURE
                        console.log("inside else---srData",this.state.srData);
                        // this.setState({
                        //     error : "Already raised Issuance of Marksheet SR.",
                        //     showLoader : false,
                        // })
            
                        
                // dataToSend is JSON data to send to payment api
                        var dataToSend = {
                            'sapId' : this.state.srData.sapId,
                            'totalAmountToBePayed' : this.state.srData.totalAmountToBePayed,
                            'marksheetDetailAndAmountToBePaidListAsString': JSON.stringify(this.state.srData.marksheetDetailAndAmountToBePaidList)
                        }
                // body is Multipart data to send to documents api
                        var body = new FormData();
                        body.append("marksheetDetailRecord1",this.state.srData.marksheetDetailRecord1);
                        body.append("marksheetDetailRecord2",this.state.srData.marksheetDetailRecord2);
                        body.append("marksheetDetailRecord3",this.state.srData.marksheetDetailRecord3);
                        body.append("marksheetDetailRecord4",this.state.srData.marksheetDetailRecord4);
                        body.append("marksheetDetailRecord5",this.state.srData.marksheetDetailRecord5);
                        body.append("courierAmount",this.state.srData.courierAmount);
                        body.append( "serviceRequestType" , this.state.srData.serviceRequestType);
                        body.append( "sapId" , this.state.srData.sapId);
                        body.append("marksheetDetailAndAmountToBePaidListAsString", JSON.stringify(this.state.srData.marksheetDetailAndAmountToBePaidList))
                        body.append("amount", this.state.srData.amount);
                        body.append("totalAmountToBePayed",this.state.srData.totalAmountToBePayed);
                        body.append("paymentOption",this.state.paymentOptionName);
                        if(this.state.srData.wantAtAddress === "Yes"){
                            body.append('postalAddress', this.state.srData.postalAddress);
                            body.append('landMark', this.state.srData.landMark);
                            body.append('houseNoName', this.state.srData.houseNoName);
                            body.append('street', this.state.srData.street);
                            body.append('locality', this.state.srData.locality);
                            body.append('city', this.state.srData.city);
                            body.append('state', this.state.srData.state);
                            body.append('country', this.state.srData.country);
                            body.append('pin', this.state.srData.pin);
            
                        }
                        this.state.srData.marksheetDetailAndAmountToBePaidList.map((sr,index) =>{
                            body.append("additionalInfo1" , sr.additionalInfo1);
                            body.append("trackId" , this.state.trackId);
                            body.append("year" , sr.year);
                            body.append("month" , sr.month);
                            body.append("sem" , sr.sem);
            
            
                            // documents to be sent only for 'duplicate' type request
                            if(this.state.indemnityBond && this.state.firCopy && sr.additionalInfo1 === "Duplicate"){
                                body.append('indemnityBond', this.state.indemnityBond);
                                body.append('firCopy', this.state.firCopy);
                            }
                           
                            //axios.defaults.headers.post['Content-Type'] = false;
                            // axios.post(urls.apiUrl_studentPortals + "saveMarksheetAndPaymentDocsForMBAWX?listSize="+this.state.srData.marksheetDetailAndAmountToBePaidList.length,body
                            // ).then(response =>{
                            //     console.log("saveMarksheetAndPaymentDocs---",JSON.stringify(response));
                            //     this.setState({
                            //         responseDataForSave : response.data,
                            //         showLoader : false,
                            //     })
                            //     // send to succcess page after the loop is over
                            //     if((index+1) === this.state.srData.marksheetDetailAndAmountToBePaidList.length){
                            //         console.log("inside ---12345",this.state.responseDataForSave);
                            //         this.setState({
                            //             forward : true,
                            //         })
                            //     }
                            // })
                            // .catch(error =>{
                            //     console.log(error);
                            //     this.setState({
                            //         error : "Error in saving Documents details.",
                            //         showLoader : false,
                            //     })  
                            // })
                        }
                        )
                        console.log("data to send--",JSON.stringify(dataToSend));
                        this.setState({
                            showLoader : true,
                        }) 
                        
                        axios.defaults.headers.post['Content-Type'] = "multipart/form-data";
                        axios.post(urls.apiUrl_studentPortals + "saveMarksheetAndPayment",body
                        ).then(response =>{
                            console.log('here2-->')
                            console.log(JSON.stringify(response));
                            this.setState({
                                trackId : response.data.trackId,
                                amount : response.data.amount,
                            },()=>{
                                // after payment data is saved successfully for service request,
                                //  save corresponding documents for each for the marksheet record
            
            
                                //this.history.pushState(null, body.paymentUrl);
                               // console.log(this.state.payment_url);
                              //  console.log(response.data.id);
                               // this.state.serviceRequestId = response.data.id
                                this.setState({
                                    proceed_to_payment : true,
                                    serviceRequestId : response.data.id,
                                    payment_url : urls.apiUrl_web_studentPortal + 'm/'+ response.data.paymentUrl,
                                },()=>{
                                   // this.state.show_payment_options
            
                                    this.submitPaymentForm()
                                }
                               )
                                
            
                            })
            
                          
                        }).catch(error=>{
                            console.log(error);
                            this.setState({
                                errors : "Error in saving Payment Details",
                                showLoader : false,
                            })
                        })
        })

    }
    render(){
        return(

            <Card style={{maxWidth : "80%"}}>
                    <Card.Header>
                        <Card.Text>Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Text>
                    </Card.Header>
                    
                    <Card.Body>
                    <form id="submit-payment" action={this.state.payment_url} method="GET">
                             <input 
                                type  = "hidden" 
                                name  = "sapId" 
                                id    = "sapid" 
                                value = { this.state.srData.sapId }
                            />
                            {/* <input 
                                type  = "hidden" 
                                name  = "source" 
                                id    = "source" 
                                value = { "WebApp" }
                            /> */}
                            <input 
                                type  = "hidden" 
                                name  = "paymentOptionName" 
                                id    = "paymentOptionName" 
                                value = { this.state.paymentOptionName }
                            />
                            <input 
                                type  = "hidden" 
                                name  = "serviceRequestId" 
                                id    = "serviceRequestId" 
                                value = { this.state.serviceRequestId }
                            />

                            
                            <input 
                                type  = "hidden" 
                                name  = "productType" 
                                id    = "productType" 
                                value = "MBAX"
                            />
                            {/* <input 
                                type  = "hidden" 
                                name  = "isWeb" 
                                id    = "isWeb" 
                                value = { true }
                            /> */}
                          
                          
                            </form>
                            {this.state.show_payment_options ?
                            <Modal 
                                                show = { true } 
                                                onHide={ this.previousTab } 
                                                size="xl"
                                            >
                                                <Modal.Header closeButton>
                                                    <Modal.Title id="contained-modal-title-vcenter">
                                                        Select Payment Provider
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Container>
                                                        <PaymentMethodSelection  
                                                            setPaymentProvider = { this.setPaymentProvider } 
                                                            bookingType = { this.props.bookingType }
                                                        />
                                                    </Container>
                                                </Modal.Body>
                                            </Modal>
    :null}
                        {this.state.error ?
                            <Alert variant="danger">
                                {this.state.error}
                            </Alert>
                        :null}
                    <Row>
                        <Col>
                            <Form className="forFormInSR"> 
                                <Form.Group as={Row}>
                                    <Form.Row>
                                        Service Request Type  : &nbsp;&nbsp;  { this.state.srData.serviceRequestType ?
                                                    <p>{this.state.srData.serviceRequestType} </p>
                                            : null
                                            }
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Row>
                                        Charges : &nbsp;&nbsp;INR. { this.state.srData.totalAmountToBePayed ?
                                            <p>{this.state.srData.totalAmountToBePayed}</p>
                                            : null
                                        }
                                    </Form.Row>
                                    <Form.Row as={Row}>
                                            <Form.Label><b>Note: First Gradesheet request for given Exam Year-Month-Term is free. Any subsequent requests for same Gradesheet will be considered as a duplicate request and  Service Request fees of INR. 500/- will be charged for the same</b></Form.Label>
											<Form.Label><b>Note: If you are issuing duplicate Gradesheet due to any other reason, please submit a copy of Indeminity bond and FIR for the same</b></Form.Label>
                                    </Form.Row>
                                </Form.Group>
                                {this.state.srData.duplicateMarksheet && this.state.srData.duplicateMarksheet === true ?
                                <>
                                    <Form.Group as={Row}>
                                         <Form.Label column sm="4">
                                            Please Upload Copy of FIR/Upload Application:
                                        </Form.Label>
                                        <Col sm="7" className="fileInput">
                                            <Form.Control type="file" name="firCopy" onChange={this.handleFileOnchange} />
                                            {this.state.errors["firCopy"] ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["firCopy"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">
                                            Please Upload Copy of Indemnity Bond as per format shown here:
                                        </Form.Label>
                                        <Col sm="7" className="fileInput">
                                            <Form.Control type="file" name="indemnityBond" onChange={this.handleFileOnchange} />
                                            {this.state.errors["indemnityBond"] ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["indemnityBond"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                        <a href="/studentportal/resources_2015/notices/Proforma_of_Indemnity_Bond.docx" target="_blank">Download Proforma of Indemnity Bond</a>
                                    </Form.Group>
                                </>
                                : null}
                                
                                
                            </Form>
                            
                        </Col>
                    </Row>
                    </Card.Body>
                    <Card.Footer>
                    {this.state.showLoader === true ?
                        <LoadingSpinner />
                    : null}
                        <Form.Group>
                            <div className="forButtons">
                                {this.state.srData.totalAmountToBePayed && parseInt(this.state.srData.totalAmountToBePayed) === 0 ?
                                    <Button variant="primary" id="submit" onClick={this.saveMarksheetRequest}>Request Gradesheet</Button>
                                :   <Button variant="primary" id="submit" onClick={this.saveMarksheetRequest}>Save & Proceed to Payment</Button>}
                                
                                <Button variant="secondary" id="backToSR" onClick={this.backToSR}>Back to New Service Request</Button>
                            </div>
                        </Form.Group>
                        {this.state.back === true?
                            <Redirect  to='/ssoservices/mbax/ServiceRequest' />
                        : null }
    
                        
                        {this.state.forward === true?
                            !this.state.responseDataForSave.error ?
                            <Redirect to={{pathname:'/ssoservices/mbax/srCreated' ,state:{id: this.state.responseDataForSave.id, reqType : this.state.responseDataForSave.serviceRequestType,
                            description: this.state.responseDataForSave.description, sapId : this.state.responseDataForSave.sapId}}}  />
                            : 
                            <Redirect to={{pathname:'/ssoservices/mbax/srCreated' ,state:{error: this.state.responseDataForSave.error, reqType : this.state.responseDataForSave.serviceRequestType,
                            }}}  />
                            
                        : null }
                    </Card.Footer>
                </Card>
           
        );
    }
}

export default (MarksheetRequestConfirmation)