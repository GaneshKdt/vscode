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
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { connect } from 'react-redux';
import '../SelectSR/SelectSR.css'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import handleValidation from "../Validations";
import AxiosHandler from "../../../shared/AxiosHandler/AxiosHandler";
import PaymentMethodSelection from '../../ExamBooking/Common/PaymentFlow/PaymentMethodSelection/PaymentMethodSelection';
import Container from 'react-bootstrap/Container'
import IssuanceOfFinalCertificateForm from './IssuanceOfFinalCertificateForm'
import AddressForm from './AddressForm'
import DuplicateForm from './DuplicateForm'
import HusbandNameForm from './HusbandsNameForm'
import GoToGatewayForm from '../GoToGatewayForm/GotToGatewayForm'
import PaymentOptions from '../GoToGatewayForm/PaymentOptions'
import AddToProfileLinkedIn from './AddToProfileLinkedIn';
import SharePostLinkedIn from './SharePostLinkedIn';
import Alert from 'react-bootstrap/Alert'

require("react-bootstrap/ModalHeader");

const CHECK_FINAL_CERTIFICATE_ELIGIBILITY = new ConfigUrls().api.checkFinalCertificateEligibility
const SERVICE_REQUEST_FEE = new ConfigUrls().api.getServiceRequestFee
const SAVE_FINAL_CERTIFICATE = new ConfigUrls().api.saveFinalCertificateRequest
const SAVE_FINAL_CERTIFICATE_PAYMENT = new ConfigUrls().api.saveFinalCertificatePayment
const SAVE_FINAL_CERTIFICATE_PAYMENT_WITH_FILE = new ConfigUrls().api.saveFinalCertificatePaymentWithFile
const SR_ISSUANCE_OF_FINAL_CERTIFICATE = "Issuance of Final Certificate"
const urls = new ConfigUrls().urls;



class IssuanceOfFinalCertificate extends Component {
    constructor(props) {
        super(props);
        this.inHusbandName = React.createRef();
    }
    state = {
        sapId: this.props.student.sapid,
        serviceRequestType: 'Issuance of Final Certificate',
        back: false,
        forward: false,
        shippingAddress: this.props.student.address,
        amount: 0,
        pgrmStructure: this.props.student.prgmStructApplicable,
        addConfirmation: false,
        wantAtAddress: '',
        isCertificate: false,
        responseData: [],
        studentData: this.props.student,
        charges: 0,
        duplicateDiploma: null,
        firCopy: null,
        indemnityBond: null,
        nameOnCertificate: "Parent", //spouse or parent
        affidavit: null,
        gender: this.props.student.gender,
        salutation: null,
        salutationArray: ["(Son of Shri." + this.props.student.fatherName + " and Smt." + this.props.student.motherName + ")", "(Daughter of Shri." + this.props.student.fatherName + " and Smt." + this.props.student.motherName + ")", "(Wife of Shri." + this.props.student.husbandName + ")"],
        inHusbandName: false,
        show: false,
        finalName: this.props.student.firstName + " " + this.props.student.lastName,
        error: null,
        errors: {},
        fieldsToValidate: null,

        // address fields
        houseNoName: this.props.student.houseNoName,
        street: this.props.student.street,
        locality: this.props.student.locality,
        //landMark: this.props.student.landMark,
        pin: this.props.student.pin,
        city: this.props.student.city,
        state: this.props.student.state,
        country: this.props.student.country,
        productType : this.props.location.state.productType,
        abcId: this.props.student.abcId,
    }

    componentDidMount = () => {
        this.checkCertificateApplicable();
    }


    renderModal() {
        return (
            <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                <Modal.Body><div align="center">This is how your name would reflect on the certificate, in case of changes kindly email us at ngasce@nmims.edu</div><br />
                    <h4 align="center">Certified that</h4>
                    <br /><br />
                    <h1 align="center"><b>{this.state.finalName}</b></h1><br />
                    <h4 align="center">{this.state.salutation}</h4>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    checkAndApplyForSR = () => {
        
        let apiToCall ="";
        //console.log(" 117 "+this.state.charge);
        if(parseInt(this.state.charges) === 0){
            
            apiToCall = `${urls.apiUrl_web_studentPortal}/CheckServiceRequestCount?sapId=${this.state.sapId}&requestType=${SR_ISSUANCE_OF_FINAL_CERTIFICATE}&isFreeRequest=${parseInt(this.state.charges) === 0 ? "true" : "false"}`;
        }
        else if (parseInt(this.state.amount) > 100){
            
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
        }else {
                //proceed with only courier charges
        }
        if(this.state.nameOnCertificate === "Spouse"){
            if(this.state.affidavit === null || this.state.affidavit === undefined){
                this.state.errors["affidavit"] = "Document is mandatory";
            }else{
                delete this.state.errors["affidavit"];
            }
        } 
         apiToCall = `${urls.apiUrl_web_studentPortal}/CheckServiceRequestCount?sapId=${this.state.sapId}&requestType=${SR_ISSUANCE_OF_FINAL_CERTIFICATE}&isFreeRequest=${parseInt(this.state.charges) === 0 ? "true" : "false"}`;
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(apiToCall).then(response =>{
            this.setState({
                responseDataForRequestCount : response.data,
            })
            //console.log("144 "+this.state.amount);
            if(this.state.responseDataForRequestCount.status === "200" && this.state.responseDataForRequestCount.result === "Applicable for service request"){
                if(this.state.amount == 0) {
                    //console.log("146 if ");
                    this.saveFinalCertificateRequest()
                } else {
                    this.saveFinalCertificateRequestWithPayment()
                }
            }else{
                this.setState({
                    error : this.state.responseDataForRequestCount.result,
                })  
            }
        }).catch(function(error){
            ////console.log(error);
        })
    }

    render() {
        const {
            error,
            success
        } = this.state
        return (
            <Container fluid='true'>
                {error &&
                    <Alert variant="danger">
                         {error}
                    </Alert>
                }
                {success &&

                    <Form>

<AddToProfileLinkedIn sapId={this.state.sapId} productType={this.state.productType}/>
<SharePostLinkedIn sapId={this.state.sapId} productType={this.state.productType}/>  

<Form.Group as={Row} controlId="formPlaintextEmail">
    <Form.Label >
    Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment.
    </Form.Label>
  </Form.Group>


                            {this.state.show_payment_options === true ?
<PaymentOptions

setPaymentProvider = {this.saveFinalCertificate}

/>
        : null}



                        <GoToGatewayForm 
                        sapId = {this.state.sapId}
                        paymentOptionName = {this.state.paymentOptionName}
                        serviceRequestId = {this.state.serviceRequestId}
                        payment_url = {this.state.payment_url}
                        productType = {this.state.productType}

                        />
                        <IssuanceOfFinalCertificateForm renderPreviewCertificate={this.renderPreviewCertificate}
                            serviceRequestType={this.state.serviceRequestType}
                            amount={this.state.amount}
                            abcId={this.state.abcId}
                        />
                        {this.state.addConfirmation === true ?


                            <AddressForm
                                houseNoName={this.state.houseNoName}
                                handleTextChange={this.handleTextChange}
                                street={this.state.street}
                                locality={this.state.locality}
                                //landMark={this.state.landMark}
                                pin={this.state.pin}
                                city={this.state.city}
                                country={this.state.country}
                                state={this.state.state}
                                errors={this.state.errors}
                                 />
                            : null}

                        {[true, "true"].includes(this.state.duplicateDiploma) ?

                            <>
                            <Form.Group as={Row} controlId="firCopy" >
                                <Form.Label column sm="5">
                                     Please Upload Copy of FIR:
                                </Form.Label>
                                <Col sm="7" className="fileInput">
                                <Form.Control type="file" name="firCopy" onChange={this.handleFileChange} />
                                     {this.state.errors["firCopy"] ?
                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["firCopy"]}</span></Form.Text>
                                    :null}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                 <Form.Label column sm="5">
                                    Please Upload Copy of Indemnity Bond as per format shown here: 
                                 </Form.Label>
                                 <Col sm="7" className="fileInput">
                                 <Form.Control type="file" name="indemnityBond"  onChange={this.handleFileChange} />
                                     {this.state.errors["indemnityBond"] ?
                                 <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["indemnityBond"]}</span></Form.Text>
                                    :null}
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <a href="/studentportal/resources_2015/notices/Proforma_of_Indemnity_Bond.docx" target="_blank"  >
                                    Download Proforma of Indemnity Bond 
                                 </a>
                            </Form.Group>
                            </>
                            : null}


                        {this.state.gender === "Female" ?
                        <HusbandNameForm  errors={this.state.errors}  handleHusbandName = {this.handleHusbandName}   nameOnCertificate={this.state.nameOnCertificate} handleFileChange={this.handleFileChange} />
                            : null}

                        <Form.Group controlId="wantAtAddress">
                            <Form.Check type="checkbox" checked={true}  disabled={true} label="I want Certificate at my address (Shipping Charges INR. 100/-)" onChange={this.handleAddrConfirmation.bind(this)} />
                        </Form.Group>
                        <>
                            <Form.Group>
                                <div className="forButtons">
                                    {/* <Button variant="success" id="previewCert" onClick={this.renderPreviewCertificate.bind(this)}>Preview Final Certificate</Button> */}
                                    {this.state.show === true ?
                                        this.renderModal()
                                        : null}
                                    {this.state.amount == 0 ?
                                        <Button variant="primary" id="submit" onClick={this.checkAndApplyForSR}>Save Service Request </Button>
                                        : <Button variant="primary" id="submit" onClick={this.checkAndApplyForSR}>Save & Proceed to Payment</Button>
                                    }
                                    <Button variant="secondary" id="backToSR" onClick={this.backToSR}>Back to New Service Request</Button>
                                </div>
                            </Form.Group>
                            {this.state.back === true ?
                                <Redirect to='/timeline/selectSR' />
                                : null}
                            {this.state.forward === true ?
                                <Redirect to={{
                                    pathname: '/timeline/srCreated', state: {
                                        id: this.state.responseData.id, reqType: this.state.responseData.serviceRequestType,
                                        description: this.state.responseData.description, sapId: this.state.responseData.sapId
                                    }
                                }} />

                                : null}
                        </>
                    </Form>
                }
            </Container>
        )
    }








    backToSR = () => {
        ////console.log("back--");
        this.setState({
            back: true,
        })
    }

    

     handleTextChange = (evt) => {
        ////console.log("inside text change-------------", evt.target.name, "---", evt.target.value);
        this.populateCityStateCountry(evt);
     
        this.setState({
            [evt.target.name]: evt.target.value,
        });


        let field = { "name": [evt.target.name], "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": evt.target.value };
        handleValidation(this, field);
    
    }
    populateCityStateCountry = (evt) => {
        if(evt.target.name === "pin" && (evt.target.value.length) === 6){
            ////console.log("pin text changed---------" + evt.target.value);
            axios.defaults.headers.post['Content-Type'] = false;
            axios.post(urls.apiUrl_web_studentPortal + "/getAddressDetailsFromPinCode",
            {
                'pin' : evt.target.value,
            }
            ).then(response =>{
                //console.log(JSON.stringify(response.data.city + " --- " + response.data.state + "-----" + response.data.country));
                this.setState({
                    city : response.data.city,
                    state : response.data.state,
                    country : response.data.country,
                })
                
            }).catch(error =>{
               // //console.log(error);
                this.setState({
                    error : "Error in Populate City/State/Country",
                })
            })
        }
    }
    handleFileChange = (evt) => {
      
        this.setState({
            [evt.target.name]: evt.target.files[0],
        })
        
    }

    renderPreviewCertificate = () => {
        this.setState({
            show: true,
        })
    }

    handleAddrConfirmation = (evt) => {
        ////console.log("inside addr con---" + evt.target.checked);
        this.setAmount(evt.target.checked, parseInt(this.state.charges))
    }
    handleHusbandName = (evt, checkedVal = null) => {
        var check = evt.target.checked;
        this.setSalutation(check);
    }


   



    setSalutation = (check) => {
        if (check === true) {
            this.setState({
                salutation: this.state.salutationArray[2],
                nameOnCertificate: 'Spouse',
                inHusbandName: true,
            }, () => { })
        }
        else {
            if (this.state.gender === "Male") {
                this.setState({
                    salutation: this.state.salutationArray[0],
                    nameOnCertificate: 'Parent',
                    inHusbandName: false,
                }, () => { })
            }
            else {
                this.setState({
                    salutation: this.state.salutationArray[1],
                    nameOnCertificate: 'Parent',
                    inHusbandName: false,
                }, () => { })
            }
        }
    }
    handleClose = () => {
        this.setState({ show: false });
    }



    checkCertificateApplicable = () => {
    //console.log("----->Check Final Certificate Applicable " +CHECK_FINAL_CERTIFICATE_ELIGIBILITY);
        AxiosHandler.AxiosPostHandler({
            url: CHECK_FINAL_CERTIFICATE_ELIGIBILITY,
            data: {
                sapId: this.state.sapId,
                serviceRequestType: SR_ISSUANCE_OF_FINAL_CERTIFICATE,
                productType: this.state.productType,
                consumerProgramStructureId:this.state.studentData.consumerProgramStructureId
            },
            successCallBack: (success) => {

                if (!success.data.error) {
                    ////console.log("--->Can Raise Final Certificate SR")
                    ////console.log(success)
                    this.getFeeAmount()
                } else {
                    this.setState({
                        error: success.data.error

                    })

                }
            },
            failureCallBack: (failure) => {
                //////console.log(failure)

                this.setState({

                    error: "Please try again after some time!"

                })

            },
        })


    }


    getFeeAmount = () => {
        AxiosHandler.AxiosPostHandler({
            url: SERVICE_REQUEST_FEE,
            data: {
                sapId: this.state.sapId,
                serviceRequestType: SR_ISSUANCE_OF_FINAL_CERTIFICATE,
                productType: this.state.productType
            },
            successCallBack: (success) => {
                // console.log("Set Amount")

                // console.log(JSON.stringify(success))
                
                this.setState({
                    success: true,
                    charges: success.data.amount,
                    isCertificate: success.data.isCertificate,
                    duplicateDiploma: success.data.duplicateDiploma,
                }, () => {
                    this.setSalutation(false);
                    this.setAmount(this.state.addConfirmation, this.state.charges);
                }
                )
            },
            failureCallBack: (failure) => {
                ////console.log(failure)
            }
        }
        )
    }

    setAmount = (addressConfirmation, charges) => {
        var totalCost = 0;
        ////console.log("inside setamt---")
        //make courier charges complusary
       // if (addressConfirmation === true) {
            ////console.log("inside if---- addConfirmation--")
            this.setState({
                wantAtAddress: 'Yes',
                addConfirmation: true,
            })
            totalCost = parseInt(charges) + 100;
            if (this.state.isCertificate === true) {
                totalCost = totalCost + parseFloat(0.18 * totalCost);
            }

        //}
        
        /*else if (addressConfirmation === false) {
            ////console.log("inside else-----addConfirmation--")
            this.setState({
                wantAtAddress: '',
                addConfirmation: false,
                shippingAddress: "",
            })
            totalCost = charges
            if (this.state.isCertificate === true) {
                totalCost = totalCost + parseFloat(0.18 * totalCost);
            }
        }*/
        this.setState({
            amount: totalCost,
        })
    }
    saveFinalCertificateRequestWithPaymentandFile = (selectedPaymentProvider) => {
        //console.log("===>here saveFinalCertificateRequestWithPaymentandFile")
        //console.log(this.state.paymentOptionName)
        //var url_payment = SAVE_FINAL_CERTIFICATE_PAYMENT;
        
        var mutlipart_value=false;
        this.setState({
            //show_payment_options: false,

            //selectedPaymentProvider : selectedPaymentProvider,
            //submitPayment : true,
            //paymentOptionName: selectedPaymentProvider.name

        },()=>{
            // //console.log("===>here saveFinalCertificateRequestWithPaymentandFile")
            // //console.log(this.state.paymentOptionName)
            var formDataHash = {
                sapId: this.state.sapId,
                serviceRequestType: this.state.serviceRequestType,
                wantAtAddress: this.state.wantAtAddress,
                postalAddress: this.state.shippingAddress,
                amount: this.state.amount,
                houseNoName: this.state.houseNoName,
                street: this.state.street,
                locality: this.state.locality,
                //landMark: this.state.landMark,
                pin: this.state.pin,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                productType: this.state.productType,
                paymentOption: this.state.paymentOptionName,
                indemnityBond :this.state.indemnityBond,
                firCopy :this.state.firCopy,
                affidavit :this.state.affidavit,
            }

            var formData = new FormData();
            formData.append('sapId', this.state.sapId);
            formData.append('serviceRequestType', this.state.serviceRequestType);
            formData.append('wantAtAddress', this.state.wantAtAddress);
            formData.append('postalAddress', this.state.shippingAddress);
            formData.append('amount', this.state.amount);
            formData.append('houseNoName', this.state.houseNoName);
            formData.append('street', this.state.street);
            formData.append('locality', this.state.locality);
            //formData.append('landMark', this.state.landMark);
            formData.append('pin', this.state.pin);
            formData.append('city', this.state.city);
            formData.append('state', this.state.state);
            formData.append('country', this.state.country);
            formData.append('productType', this.state.productType)
            formData.append("paymentOption",this.state.paymentOptionName);
            if ([true, "true"].includes(this.state.duplicateDiploma)) {
            //var url_payment = SAVE_FINAL_CERTIFICATE_PAYMENT_WITH_FILE;
            mutlipart_value=true;
            formData.append('indemnityBond', this.state.indemnityBond);
            formData.append('firCopy', this.state.firCopy);
            }
            if(this.state.nameOnCertificate === "Spouse"){
                //console.log("inside spouse name loop")
                formData.append('affidavit', this.state.affidavit);
            }
            // setting json by default data to send
            var datatoSend = formData;
            //console.log(" data 568 "+url_payment);
            //axios.defaults.headers.post['Content-Type'] = 'application/json';
            AxiosHandler.AxiosPostHandler({
                multipart : mutlipart_value,
                url:SAVE_FINAL_CERTIFICATE_PAYMENT_WITH_FILE,
                data:datatoSend,
                successCallBack: (success)=>{
                    this.setState({
                        proceed_to_payment: true,
                        serviceRequestId: success.data.id,
                        payment_url: urls.apiUrl_web_studentPortal + 'm/' + success.data.paymentUrl,
                    }, () => {
                        // this.state.show_payment_options
                        this.setState({
                            responseData: success.data
                        }, ()=>{
                            this.submitPaymentForm()

                        })
                
                    })
                },
                failureCallBack:()=>{
                
                }
                })
                                                           
                      

        })
    }


    saveFinalCertificateRequestWithPayment = (selectedPaymentProvider) => {
                    // if no errors
                    if (Object.entries(this.state.errors).length === 0) {
                            confirmAlert({
                                title: 'Confirm to submit',
                                message: 'Are you sure you want to raise Final Certificate Request?',
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

    saveFinalCertificateRequestWithPaymenOnly = (selectedPaymentProvider) => {
        //console.log("===>here saveFinalCertificateRequestWithPaymentandFile")
        //console.log(this.state.paymentOptionName)
        
        var mutlipart_value;
        this.setState({
            //show_payment_options: false,

            //selectedPaymentProvider : selectedPaymentProvider,
            //submitPayment : true,
            //paymentOptionName: selectedPaymentProvider.name

        },()=>{
            // //console.log("===>here saveFinalCertificateRequestWithPaymentandFile")
            // //console.log(this.state.paymentOptionName)
           
            if ([true, "true"].includes(this.state.duplicateDiploma)) {
            mutlipart_value=true;
            }else {
                mutlipart_value=false;
            }
            // setting json by default data to send
           
            //console.log(" data 568 "+url_payment);
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            AxiosHandler.AxiosPostHandler({
                multipart : mutlipart_value,
                url:SAVE_FINAL_CERTIFICATE_PAYMENT,
                data: {
                    sapId: this.state.sapId,
                    serviceRequestType: this.state.serviceRequestType,
                    wantAtAddress: this.state.wantAtAddress,
                    postalAddress: this.state.shippingAddress,
                    amount: this.state.amount,
                    houseNoName: this.state.houseNoName,
                    street: this.state.street,
                    locality: this.state.locality,
                    //landMark: this.state.landMark,
                    pin: this.state.pin,
                    city: this.state.city,
                    state: this.state.state,
                    country: this.state.country,
                    productType: this.state.productType,
                    paymentOption: this.state.paymentOptionName,
                },
                successCallBack: (success)=>{
                    this.setState({
                        proceed_to_payment: true,
                        serviceRequestId: success.data.id,
                        payment_url: urls.apiUrl_web_studentPortal + 'm/' + success.data.paymentUrl,
                    }, () => {
                        // this.state.show_payment_options
                        this.setState({
                            responseData: success.data
                        }, ()=>{
                            this.submitPaymentForm()

                        })
                
                    })
                },
                failureCallBack:()=>{
                
                }
                })
                                                           
                      

        })
    

    }


    saveFinalCertificate = (selectedPaymentProvider)=> {
        this.setState({
            show_payment_options: false,
            selectedPaymentProvider : selectedPaymentProvider,
            submitPayment : true,
            paymentOptionName: selectedPaymentProvider.name
        })
        
        if (parseInt(this.state.amount) > 100 || this.state.nameOnCertificate === "Spouse"){
            this.saveFinalCertificateRequestWithPaymentandFile() //proceed with duplicate form
        }else{
            this.saveFinalCertificateRequestWithPaymenOnly() //proceed with courier charges only
        }
    }

    duplicateFinalCertificate = ()=>{

        this.setState({
           // selectedPaymentProvider: selectedPaymentProvider,
            submitPayment: true,
           // paymentOptionName: selectedPaymentProvider.name

        }, () => {

            //axios--
            var tempErrors = {};
            this.setState({
                errors: tempErrors
            })
            // validations
            let fieldsToValidateHash = {
                houseNoName: { "name": "houseNoName", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.houseNoName },
                street: { "name": "street", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.street },
                locality: { "name": "locality", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.locality },
                //landMark: { "name": "landMark", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.landMark },
                pin: { "name": "pin", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.pin },
                city: { "name": "city", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.city },
                state: { "name": "state", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.state },
                country: { "name": "country", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.country },
            }
            if (this.state.nameOnCertificate === "Spouse") {
                fieldsToValidateHash['affidavit'] = { "name": "affidavit", "value": this.state.affidavit, "type": "file" };
            }
            else {
                delete fieldsToValidateHash['affidavit'];
            }
            if ([true, "true"].includes(this.state.duplicateDiploma)) {
                fieldsToValidateHash['indemnityBond'] = { "name": "indemnityBond", "value": this.state.indemnityBond, "type": "file" };
                fieldsToValidateHash['firCopy'] = { "name": "firCopy", "value": this.state.firCopy, "type": "file" };
            }
            else {
                delete fieldsToValidateHash['indemnityBond'];
                delete fieldsToValidateHash['firCopy'];
            }
            this.setState({
                fieldsToValidate: fieldsToValidateHash,
            },
                () => {
                    handleValidation(this);
                    // if no errors
                    if (Object.entries(this.state.errors).length === 0) {
                        let addressPromise = new Promise((resolve, reject) => {
                            if (this.state.addConfirmation === true) {
                                this.getPostalAddress(resolve);
                            } else {
                                resolve();
                            }
                        })
                        addressPromise.then(() => {
                            ////console.log("inside save-----------", this.state.shippingAddress);
                            // we need two different types for data for different type of apis, formdata for api with docs and 
                            // formDataHash for json type
                            // setting default URL to axios as free request, i.e. address confirmation false
                            var postURL = urls.apiUrl_studentPortals + "saveFinalCertificateRequest";
                            var formDataHash = {
                                sapId: this.state.sapId,
                                serviceRequestType: this.state.serviceRequestType,
                                wantAtAddress: this.state.wantAtAddress,
                                postalAddress: this.state.shippingAddress,
                                amount: this.state.amount,
                                houseNoName: this.state.houseNoName,
                                street: this.state.street,
                                locality: this.state.locality,
                                //landMark: this.state.landMark,
                                pin: this.state.pin,
                                city: this.state.city,
                                state: this.state.state,
                                country: this.state.country,

                            }
                            var formData = new FormData();
                            formData.append('sapId', this.state.sapId);
                            formData.append('serviceRequestType', this.state.serviceRequestType);
                            formData.append('wantAtAddress', this.state.wantAtAddress);
                            formData.append('postalAddress', this.state.shippingAddress);
                            formData.append('amount', this.state.amount);
                            formData.append('houseNoName', this.state.houseNoName);
                            formData.append('street', this.state.street);
                            formData.append('locality', this.state.locality);
                            //formData.append('landMark', this.state.landMark);
                            formData.append('pin', this.state.pin);
                            formData.append('city', this.state.city);
                            formData.append('state', this.state.state);
                            formData.append('country', this.state.country);

                            // setting json by default data to send
                            var datatoSend = formDataHash;


                            ////console.log("(this.state.nameOnCertificate----", this.state.nameOnCertificate);
                            // if free request with certificate in spouse name
                            if (parseInt(this.state.amount) === 0 && this.state.nameOnCertificate === "Spouse") {
                                postURL = urls.apiUrl_studentPortals + "saveFinalCertificateRequestWithFile";
                                formData.append('nameOnCertificateDoc', this.state.affidavit);
                                ////console.log("inside save if---111-------", postURL, formData);
                                datatoSend = formData;
                            }
                            // if paid request,i.e. address confirmation true with certificate in spouse name
                            else if (parseInt(this.state.amount) > 0 && this.state.nameOnCertificate === "Spouse") {
                                // to be discussed
                                //  ////console.log("inside save if------1.1----" ,postURL, formDataHash);
                                datatoSend = formDataHash;
                            }
                            // if duplicate diploma
                            else if ([true, "true"].includes(this.state.duplicateDiploma)) {
                                //////console.log("inside save if------2222----" ,postURL, formData);
                                postURL = urls.apiUrl_studentPortals + "saveFinalCertificateAndPaymentWithfile";
                                formData.append('indemnityBond', this.state.indemnityBond);
                                formData.append('firCopy', this.state.firCopy);
                                ////console.log("inside save else if-------3333333333333---", postURL, formData)
                                datatoSend = formData;
                            }
                            // if paid request with no documents, i.e. address confirmation true
                            //to be clarified
                            else if (parseInt(this.state.amount) > 0) {





                                postURL = urls.apiUrl_studentPortals + "saveFinalCertificateAndPayment";
                                datatoSend = formDataHash;
                                // ////console.log("datatoSend---"+JSON.stringify(datatoSend));

                            }

                            // ////console.log("inside save if---55555-------" ,postURL, datatoSend);
                            confirmAlert({
                                title: 'Confirm to submit',
                                message: 'Are you sure you want to raise Final Certificate Request?',
                                buttons: [
                                    {
                                        label: 'Yes',
                                        onClick: () => {
                                            axios.defaults.headers.post['Content-Type'] = false;
                                            axios.post(postURL, datatoSend
                                            ).then(response => {
                                                ////console.log(JSON.stringify(response));
                                                this.setState({
                                                    responseData: response.data,
                                                    forward: true,
                                                })

                                                this.setState({
                                                    proceed_to_payment: true,
                                                    serviceRequestId: response.data.id,
                                                    payment_url: urls.apiUrl_web_studentPortal + 'm/' + response.data.paymentUrl,
                                                }, () => {
                                                    // this.state.show_payment_options

                                                    this.submitPaymentForm()
                                                }
                                                )


                                            }).catch(function (error) {
                                                ////console.log(error);
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
                        })


                    }
                })
        })

    }

    submitPaymentForm() {
        //  if(this.checkIfFieldsComplete() && this.state.trackId) {
      
              window.$("#submit-payment").submit()           
         //    }
      }
    saveFinalCertificateRequest = () => {
        //axios--
        var tempErrors = {};
        this.setState({
            errors: tempErrors
        })
        // validations
        let fieldsToValidateHash = {
            houseNoName: { "name": "houseNoName", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.houseNoName },
            street: { "name": "street", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.street },
            locality: { "name": "locality", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.locality },
            //landMark: { "name": "landMark", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.landMark },
            pin: { "name": "pin", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.pin },
            city: { "name": "city", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.city },
            state: { "name": "state", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.state },
            country: { "name": "country", "value": this.state.wantAtAddress, "type": "checkAddress", "shippingAddress": this.state.country },
        }
        if (this.state.nameOnCertificate === "Spouse") {
            fieldsToValidateHash['affidavit'] = { "name": "affidavit", "value": this.state.affidavit, "type": "file" };
        }
        else {
            delete fieldsToValidateHash['affidavit'];
        }
        
        this.setState({
            fieldsToValidate: fieldsToValidateHash,
        },
            () => {
                handleValidation(this);
                // if no errors
                if (Object.entries(this.state.errors).length === 0) {
                    let addressPromise = new Promise((resolve, reject) => {
                        if (this.state.addConfirmation === true) {
                            this.getPostalAddress(resolve);
                        } else {
                            resolve();
                        }
                    })
                    addressPromise.then(() => {})
                        
                        ////console.log("inside save-----------", this.state.shippingAddress);
                        // we need two different types for data for different type of apis, formdata for api with docs and 
                        // formDataHash for json type
                        // setting default URL to axios as free request, i.e. address confirmation false
                        var postURL = SAVE_FINAL_CERTIFICATE;
                        var formDataHash = {
                            sapId: this.state.sapId,
                            serviceRequestType: this.state.serviceRequestType,
                            amount: this.state.amount,
                            productType: this.state.productType
                        }
                        var formData = new FormData();
                        formData.append('sapId', this.state.sapId);
                        formData.append('serviceRequestType', this.state.serviceRequestType);
                        formData.append('amount', this.state.amount);
                        formData.append('productType', this.state.productType);
                        // setting json by default data to send
                        var datatoSend = formDataHash;


                       // ////console.log("(this.state.nameOnCertificate----", this.state.nameOnCertificate);
                        // if free request with certificate in spouse name
                        if (parseInt(this.state.amount) === 0 && this.state.nameOnCertificate === "Spouse") {
                            postURL = urls.apiUrl_studentPortals + "saveFinalCertificateRequestWithFile";
                            formData.append('nameOnCertificateDoc', this.state.affidavit);
                            ////console.log("inside save if---111-------", postURL, formData);
                            datatoSend = formData;
                        }
                        // if paid request,i.e. address confirmation true with certificate in spouse name
                        else if (parseInt(this.state.amount) > 0 && this.state.nameOnCertificate === "Spouse") {
                            // to be discussed
                            //  ////console.log("inside save if------1.1----" ,postURL, formDataHash);
                            datatoSend = formDataHash;
                        }
                        // if duplicate diploma
                        else if ([true, "true"].includes(this.state.duplicateDiploma)) {
                            //////console.log("inside save if------2222----" ,postURL, formData);
                            postURL = urls.apiUrl_studentPortals + "saveFinalCertificateAndPaymentWithfile";
                            formData.append('indemnityBond', this.state.indemnityBond);
                            formData.append('firCopy', this.state.firCopy);
                            ////console.log("inside save else if-------3333333333333---", postURL, formData)
                            datatoSend = formData;
                        }
                        // if paid request with no documents, i.e. address confirmation true
                        //to be clarified
                        else if (parseInt(this.state.amount) > 0) {
                            //////console.log("inside save else-------44444444444444444444---",postURL, formDataHash)
               
                            postURL = SAVE_FINAL_CERTIFICATE_PAYMENT;
                            datatoSend = formDataHash;
                            // ////console.log("datatoSend---"+JSON.stringify(datatoSend));

                        }

                        ////console.log("inside save if---55555-------" ,postURL, datatoSend);
                        confirmAlert({
                            title: 'Confirm to submit',
                            message: 'Are you sure you want to raise Final Certificate Request?',
                            buttons: [
                                {
                                    label: 'Yes',
                                    onClick: () => {
                                        axios.defaults.headers.post['Content-Type'] = false;
                                        axios.post(postURL, datatoSend
                                        ).then(response => {
                                            ////console.log(JSON.stringify(response));
                                            this.setState({
                                                responseData: response.data,
                                                forward: true,
                                            })
                                        }).catch(function (error) {
                                            ////console.log(error);
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
            })

    }



}
const mapStateToProps = state => {
    return {
        student: state,
        imageUrl: state.imageUrl
    }
}

export default connect(mapStateToProps)(IssuanceOfFinalCertificate)