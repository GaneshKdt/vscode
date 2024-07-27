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
import '../SelectSR/SelectSR.css'
import handleValidation from "../Validations";
import Alert from 'react-bootstrap/Alert'
import AddressForm from '../AddressForm'
import AxiosHandler from "../../../shared/AxiosHandler/AxiosHandler";
import IssuanceOfTranscriptForm from "./IssuanceOfTranscriptForm"

import GoToGatewayForm from '../GoToGatewayForm/GotToGatewayForm'
import PaymentOptions from '../GoToGatewayForm/PaymentOptions'

const urls = new ConfigUrls().urls;
const SERVICE_REQUEST_FEE = new ConfigUrls().api.getServiceRequestFee
const ISSUANCE_OF_TRANSCRIPT = "Issuance of Transcript"
const CHECK_ELIGIBILITY_TRANSCRIPT_REQUEST = new ConfigUrls().api.checkTranscriptEligibility
class IssuanceOfTranscript extends Component {
    constructor(props) {
        super(props);
        this.addrRef = React.createRef();
        this.checkAddrRef = React.createRef();
       
    }
    state = { 
        sapId : this.props.student.sapid,
        serviceRequestType : 'Issuance of Transcript',
        back : false,
        forward : false,
        shippingAddress : this.props.student.address,
        basicCost : 1000,
        amount : 1000,
        pgrmStructure : this.props.student.prgmStructApplicable,
        addConfirmation : false,
        wantAtAddress : '',
        isCertificate : false,
        responseData : [],
        studentData : this.props.student,
        numOfCopiesSelected : 0,
        charges : 300,
        houseNoName : this.props.student.houseNoName,
        street :this.props.student.street,
        locality : this.props.student.locality,
        //landMark: this.props.student.landMark,
        pin: this.props.student.pin,
        city:this.props.student.city,
        state:this.props.student.state,
        country:this.props.student.country,
        error : null,
        errors : {},
        fieldsToValidate : null,
        noOfTranscripts : ["1","2","3","4","5","6","7","8","9","10","11","12"],
        productType : this.props.location.state.productType,
        abcId: this.props.student.abcId,
    }

    handleAddrConfirmation = (evt) => {
        // console.log("inside addr con---"+evt.target.checked);
        // var totalCost = this.setTotalCostBasedOnCopiesIssued(this.state.numOfCopiesSelected,this.state.amount,this.state.charges);
        this.setAmount(evt.target.checked, this.state.numOfCopiesSelected)
    }
    
    componentDidMount = () =>{
    //    this.getAlreadyIssuedCopies();
  
   // console.log(" 76 "+this.state.productType);
    if(this.state.productType == "PDDM"){
    this.checkTranscriptEligibile();
    }
else{
    this.getFeeAmount();
}
    }
    


    checkTranscriptEligibile = () => {
        //console.log("----->Trancript " +CHECK_ELIGIBILITY_TRANSCRIPT_REQUEST);
            AxiosHandler.AxiosPostHandler({
                url:CHECK_ELIGIBILITY_TRANSCRIPT_REQUEST,
                
                data: {
                    sapId: this.state.sapId,
                    serviceRequestType: ISSUANCE_OF_TRANSCRIPT,
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

    setAmount = (addressConfirmation, numOfCopiesSelected) => {
        // console.log("inside setamt---")
        var totalCost = this.setTotalCostBasedOnCopiesIssued(numOfCopiesSelected,this.state.basicCost,this.state.charges);
        if(addressConfirmation === true){
            // console.log("inside if---- addConfirmation--")
            this.setState({
                wantAtAddress : 'Yes',
                addConfirmation : true,
            })
				totalCost = totalCost +100;
				if(this.state.isCertificate === true){
					totalCost = totalCost + parseFloat(0.18 * totalCost);
				}
			
        }
        else if(addressConfirmation === false){
            // console.log("inside else-----addConfirmation--")
            this.setState({
                wantAtAddress : '',
                addConfirmation : false,
                shippingAddress : "",
            })
            if(this.state.isCertificate === true){
                totalCost = totalCost + parseFloat(0.18 * totalCost);
            }
        }
        this.setState({
            amount : totalCost,
        })
    }
    backToSR = () => {
        // console.log("back--");
        this.setState({
            back : true,
        })
    }
    getFeeAmount = () => {
        AxiosHandler.AxiosPostHandler({
            url: SERVICE_REQUEST_FEE,
            data: {
                sapId: this.state.sapId,
                serviceRequestType: ISSUANCE_OF_TRANSCRIPT,
                productType: this.state.productType
            },
            successCallBack: (success) => {
                //console.log("Set Amount")

                //console.log(JSON.stringify(success))
                //console.log(success.data.amount)
                this.setState({
                    success: true,
                    basicCost: success.data.amount,
                    isCertificate: success.data.isCertificate,
                    duplicateDiploma: success.data.duplicateDiploma,
                }, () => {
                   // this.setSalutation(false);
                }, () => {
                   // this.setAmount(this.state.addConfirmation, this.state.charges);
                }
                )
            },
            failureCallBack: (failure) => {
            }
        }
        )
    }
    getPostalAddress = () => {
       
        // console.log("inside postal address---");
       
        let postalAddress = this.state.houseNoName + "~" + this.state.street + "~" +
        this.state.locality + "~" +
        this.state.pin + "~" + this.state.city + "~" +
        this.state.state + "~" + this.state.country 
       
        this.setState({
            shippingAddress : postalAddress,
        })
        
    }
    populateCityStateCountry = (evt) => {
        this.setState({
            error: "",
        })
        if(evt.target.name === "pin"  && /^[0-9]{6}$/.test(evt.target.value)){
            // console.log("pin text changed---------" + evt.target.value);
            axios.defaults.headers.post['Content-Type'] = false;
            axios.post(urls.apiUrl_web_studentPortal + "/getAddressDetailsFromPinCode",
            {
                'pin' : evt.target.value,
            }
            ).then(response =>{
                // console.log(JSON.stringify(response.data.city + " --- " + response.data.state + "-----" + response.data.country));
                this.setState({
                    city : response.data.city,
                    state : response.data.state,
                    country : response.data.country,
                })
                
            }).catch(error =>{
                console.log(error);
                this.setState({
                    error: "Error in getting city/state/country." + error.toString(),
                })
            })
        }else if(evt.target.name === "pin"  && !(/^[0-9]{6}$/.test(evt.target.value))){
            this.setState({
                error: "Please enter valid pin.",
            })
        }
    }

    checkIfApplicableToRaiseSR = () => {

        let apiToCall = `${urls.apiUrl_web_studentPortal}/CheckServiceRequestCount?sapId=${this.state.sapId}&requestType=${ISSUANCE_OF_TRANSCRIPT}&isFreeRequest=${parseInt(this.state.charges) === 0 ? "true" : "false"}`;
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(apiToCall).then(response =>{
            this.setState({
                responseDataForRequestCount : response.data,
            })
            if(this.state.responseDataForRequestCount.status === "200" && this.state.responseDataForRequestCount.result === "Applicable for service request"){
                this.raiseSR();
            }else{
                this.setState({
                    error : this.state.responseDataForRequestCount.result,
                })  
            }
        }).catch(function(error){
            console.log(error);
        })
    }
    saveTranscriptRequestWithPayment = (selectedPaymentProvider) => {

        
        this.setState({
            show_payment_options: false,

            selectedPaymentProvider : selectedPaymentProvider,
            submitPayment : true,
            paymentOptionName: selectedPaymentProvider.name

        },()=>{
            //axios--
            // console.log("inside save-----------"+JSON.stringify(this.state.studentData))
            //fields hash for validation
            let fieldsToValidateHash = {
                houseNoName : {"name" : "houseNoName", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.houseNoName},
                street : {"name" : "street", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.street},
                locality : {"name" : "locality", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.locality},
                //landMark : {"name" : "landMark", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.landMark},
                pin : {"name" : "pin", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.pin},
                city : {"name" : "city", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.city},
                state : {"name" : "state", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.state},
                country : {"name" : "country", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.country},
            }
                this.setState({
                    fieldsToValidate : fieldsToValidateHash,
                },
                () => {
                handleValidation(this);
                if(this.state.addConfirmation === true){
                    this.getPostalAddress();
                }
            
                if(Object.entries(this.state.errors).length === 0){
                    
                    confirmAlert({
                        title: 'Confirm to submit',
                        message: 'Are you sure you want to submit this Service Request?',
                        buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                this.checkIfApplicableToRaiseSR()
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
            });
        })
    }

    raiseSR = () => {
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(urls.apiUrl_studentPortals + "saveTranscriptRequest",
        {
            sapId : this.state.sapId,
            serviceRequestType : this.state.serviceRequestType,
            wantAtAddress :this.state.wantAtAddress,
            amount : this.state.amount,
            noOfCopies : this.state.numOfCopiesSelected,
            postalAddress : this.state.shippingAddress,
            houseNoName : this.state.houseNoName,
            street :this.state.street,
            locality : this.state.locality,
            //landMark: this.state.landMark,
            pin: this.state.pin,
            city:this.state.city,
            state:this.state.state,
            country:this.state.country,
            productType: this.state.productType,
            paymentOption:this.state.paymentOptionName
        }
        ).then(response =>{
            // console.log(JSON.stringify(response));
            this.setState({
            proceed_to_payment: true,
            serviceRequestId: response.data.id,
            payment_url: urls.apiUrl_web_studentPortal + 'm/' + response.data.paymentUrl,
            responseData: response.data,

            }, ()=>{
            this.submitPaymentForm()
            })


        }).catch(error =>{
            console.log(error);
            this.setState({
                error : error,
            })
        })
    }


    
        selectPaymentOption = () => {
        //axios--
        // console.log("inside save-----------"+JSON.stringify(this.state.studentData))
        if(this.state.wantAtAddress =='' && this.state.productType == "PDDM"){
            this.setState({
                error: "Transcript at my address is not selected",
            })
            }
        else{
         //fields hash for validation
         let fieldsToValidateHash = {
            houseNoName : {"name" : "houseNoName", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.houseNoName},
            street : {"name" : "street", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.street},
            locality : {"name" : "locality", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.locality},
            //landMark : {"name" : "landMark", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.landMark},
            pin : {"name" : "pin", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.pin},
            city : {"name" : "city", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.city},
            state : {"name" : "state", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.state},
            country : {"name" : "country", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.country},
        }
            this.setState({
                fieldsToValidate : fieldsToValidateHash,
            },
            () => {
            handleValidation(this);
            if(this.state.addConfirmation === true){
                this.getPostalAddress();
            }
          
            if(Object.entries(this.state.errors).length === 0){


                confirmAlert({
                    title: 'Confirm to submit',
                    message: 'Are you sure you want to raise Transcript Request?',
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
            
        });
        
        
       
    }
}
    handleDropdownChange = (evt) => {
        // console.log("inside ddl change------------" +evt.target.name)
            this.setState({
                [evt.target.name] : evt.target.value,
            })
            // var totalCost = this.setTotalCostBasedOnCopiesIssued(evt.target.value,this.state.amount,this.state.charges);
            this.setAmount(this.state.addConfirmation, evt.target.value)

        
    }
    

    submitPaymentForm() {
        //  if(this.checkIfFieldsComplete() && this.state.trackId) {
           // console.log('here')
            //console.log(this.state.payment_url)
            //console.log(this.state.proceed_to_payment)
              window.$("#submit-payment").submit()           
         //    }
      }

      setTotalCostBasedOnCopiesIssued = (numberOfCopiesSelected,amount,changes) =>{
        var totalCostToBeReturned = 0;
        // console.log(numberOfCopiesSelected + amount + changes)
        totalCostToBeReturned = parseInt(amount) + (numberOfCopiesSelected * changes)
        // console.log(totalCostToBeReturned)

		return totalCostToBeReturned;
	}
    handleTextChange = (evt) => {
        // console.log("inside text change------------" +evt.target.value)
        this.populateCityStateCountry(evt);
        this.setState({
            [evt.target.name] : evt.target.value
        })
        let field = {"name" : [evt.target.name], "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : evt.target.value};
        handleValidation(this,field);
    } 
    render(){
        return(
            <>
            {this.state.error &&
                <Alert variant="danger">
                    {this.state.error}
                </Alert>
            }
            {this.state.success &&

             <Card style={{maxWidth : "80%"}}>
                     {/* <Card.Header className="cardHeader">Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Header> */}
                    {/* <Card.Text className="cardHeader">Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Text> */}
                    <Card.Body>
                        <div className="cardHeader">Dear Student, You have chosen below Service Request.Please fill in required information below before proceeding for Payment.</div>
                    <Row>
                         <Col>
                        <br/>
                        {this.state.error ?
                            <Alert variant="danger">
                                                                
                                  {this.state.error}
                            </Alert>
                        : null}
                         {this.state.show_payment_options === true ?
<PaymentOptions

setPaymentProvider = {this.saveTranscriptRequestWithPayment}

/>
        : null}



                        <GoToGatewayForm 
                        sapId = {this.state.sapId}
                        paymentOptionName = {this.state.paymentOptionName}
                        serviceRequestId = {this.state.serviceRequestId}
                        payment_url = {this.state.payment_url}
                        productType = {this.state.productType}

                        />
                        
                            <Form className="forFormInSR"> 
                              <IssuanceOfTranscriptForm 
                                    serviceRequestType = {this.state.serviceRequestType}
                                    basicCost = {this.state.basicCost}
                                    handleDropdownChange = {this.handleDropdownChange}
                                    noOfTranscripts = {this.state.noOfTranscripts}
                                    abcId = {this.state.abcId}
                              />


<Form.Group as={Row} controlId="wantAtAddress">
    <Form.Check type="checkbox" label="I want Certificate at my address (Shipping Charges INR. 100/-)" onChange={this.handleAddrConfirmation.bind(this)} />
</Form.Group>


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


                                <Form.Group as={Row} controlId="showTotalValue">
                                    <Form.Label column sm="4">
                                        Total Cost:
                                    </Form.Label>
                                    <Form.Label column sm="7" className="charges">
                                        {this.state.amount}
                                    </Form.Label>
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
                            </>
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

export default connect(mapStateToProps)(IssuanceOfTranscript)