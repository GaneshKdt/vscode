import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfigUrls from '../../shared/config'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import handleValidation from "../Validations";
import Alert from 'react-bootstrap/Alert';
import GoToGatewayForm from '../GoToGatewayForm/GotToGatewayForm'
import PaymentOptions from '../GoToGatewayForm/PaymentOptions'


const urls = new ConfigUrls().urls;

class IssuanceOfBonafide extends Component {
    constructor(props) {
        super(props);
        this.addrRef = React.createRef();
        this.checkAddrRef = React.createRef();
    }
    state = {
        sapId : this.props.student.sapid,
        serviceRequestType : 'Issuance of Bonafide',
        back : false,
        forward : false,
        shippingAddress : this.props.student.address,
        amount : 0,
        pgrmStructure : this.props.student.prgmStructApplicable,
        addConfirmation : false,
        wantAtAddress : '',
        isCertificate : false,
        responseData : [],
        studentData : this.props.student,
        numOfCopiesIssued : 0,
        numOfCopiesSelected : 0,
        copiesArray : ["1","2","3","4","5","6","7","8"],
        purpose : '',
        houseNoName : this.props.student.houseNoName,
        street :this.props.student.street,
        locality : this.props.student.locality,
        landMark: this.props.student.landMark,
        pin: this.props.student.pin,
        city:this.props.student.city,
        state:this.props.student.state,
        country:this.props.student.country,
        errors : {},
        fieldsToValidate : null,
        error : null,
       
    }

    handleAddrConfirmation = (evt) => {
        console.log("inside addr con---"+evt.target.checked);
        var totalCost = this.setTotalCostBasedOnCopiesIssued(this.state.numOfCopiesIssued,this.state.numOfCopiesSelected);
        this.setAmount(evt.target.checked, totalCost)
    }

    populateCityStateCountry = (evt) => {
        if(evt.target.name === "pin" && (evt.target.value.length) === 6){
            console.log("pin text changed---------" + evt.target.value);
            axios.defaults.headers.post['Content-Type'] = false;
            axios.post(urls.apiUrl_web_studentPortal + "/getAddressDetailsFromPinCode",
            {
                'pin' : evt.target.value,
            }
            ).then(response =>{
                console.log(JSON.stringify(response.data.city + " --- " + response.data.state + "-----" + response.data.country));
                this.setState({
                    city : response.data.city,
                    state : response.data.state,
                    country : response.data.country,
                    error : null,
                })
                
            }).catch(error =>{
                console.log(error);
                this.setState({
                    error : "Error in getting Base Amount."
                })
            })
        }
    }
    
    componentDidMount = () =>{
       this.getAlreadyIssuedCopies();

    }
    getAlreadyIssuedCopies = () => {
        console.log("*(*((*(*(*(*(*(*(*(**"+this.state.sapId)
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(urls.apiUrl_studentPortals + "issuanceOfBonafideCertificateForm",
        {
            sapId : this.state.sapId,
        }
        ).then(response =>{
            console.log("********************************"+JSON.stringify(response));
            this.setState({
                amount : response.data.charges,
                numOfCopiesIssued : response.data.noOfCopies,
                shippingAddress : response.data.postalAddress,
                error : null,
            })
        }).catch(error =>{
            console.log(error);
            this.setState({
                error : "Error in getting Already Issued Copies."
            })
        })
    }
    // following function sets the amount based on selection of address confirmation true/false
    setAmount = (addressConfirmation,totalCost) => {
        console.log("inside setamt---")
        if(addressConfirmation === true){
            console.log("inside if---- addConfirmation--")
            this.setState({
                wantAtAddress : 'Yes',
                addConfirmation : true,
            });
            totalCost = totalCost +100;
            if(this.state.isCertificate === true){
                totalCost = totalCost + parseFloat(0.18 * totalCost);
            }
			
        }
        else if(addressConfirmation === false){
            console.log("inside else-----addConfirmation--")
            this.setState({
                wantAtAddress : '',
                addConfirmation : false,
                shippingAddress : null,
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
        console.log("back--");
        this.setState({
            back : true,
        })
    }
    // concatinated postal address for shipping
    getPostalAddress = () => {
       
        console.log("inside postal address---");
       
        let postalAddress = this.state.houseNoName + "~" + this.state.street + "~" +
        this.state.locality + "~" + this.state.landMark + "~" +
        this.state.pin + "~" + this.state.city + "~" +
        this.state.state + "~" + this.state.country 
       
        this.setState({
            shippingAddress : postalAddress,
        })
        
    }

    saveBonafideRequest = () => {
        
        // validating all fields
            let fieldsToValidateHash = {
                purpose: {"name" : "purpose", "value" : this.state.purpose, "type" : "mandatoryText"},
                houseNoName : {"name" : "houseNoName", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.houseNoName},
                street : {"name" : "street", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.street},
                locality : {"name" : "locality", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.locality},
                landMark : {"name" : "landMark", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.landMark},
                pin : {"name" : "pin", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.pin},
                city : {"name" : "city", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.city},
                state : {"name" : "state", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.state},
                country : {"name" : "country", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.country},
            }
            // validating number of copies selected
            if(parseInt(this.state.numOfCopiesSelected) === 0){
                fieldsToValidateHash["numOfCopiesSelected"] = {"name" : "numOfCopiesSelected", "value" : "", "type" : "mandatoryText"};
            }
            else{
                fieldsToValidateHash["numOfCopiesSelected"] = {"name" : "numOfCopiesSelected", "value" : this.state.numOfCopiesSelected, "type" : "mandatoryText"};
            }
            this.setState({
                fieldsToValidate : fieldsToValidateHash,
            },
            () => {
            handleValidation(this);
            if(Object.entries(this.state.errors).length === 0){
                // if no errors
                // get postal address if address confirmation is true
                if(this.state.addConfirmation === true){
                    this.getPostalAddress();
                }
                console.log("inside save-----------"+JSON.stringify(this.state.studentData))
                // depending on charges decide api
                var postURL ="";
                if(this.state.amount === 0){
                    console.log("inside save if----------" )
                    postURL = urls.apiUrl_studentPortals + "saveBonafideRequest";
                }
                else{
                    console.log("inside save else----------" )
                    postURL = urls.apiUrl_studentPortals + "saveBonafideRequestAndProceedToPay";
                }
                // api call
                if(this.state.numOfCopiesSelected !== 0 && this.state.purpose !== ''){
                    
                    confirmAlert({
                        title: 'Confirm to submit',
                        message: 'Are you sure you want to submit this Service Request?',
                        buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                axios.defaults.headers.post['Content-Type'] = false;
                                axios.post(postURL,
                                {
                                    sapId : this.state.sapId,
                                    serviceRequestType : this.state.serviceRequestType,
                                    purpose : this.state.purpose,
                                    wantAtAddress :this.state.wantAtAddress,
                                    amount : this.state.amount,
                                    noOfCopies : this.state.numOfCopiesSelected,
                                    postalAddress : this.state.shippingAddress,
                                    houseNoName : this.state.houseNoName,
                                    street :this.state.street,
                                    locality : this.state.locality,
                                    landMark: this.state.landMark,
                                    pin: this.state.pin,
                                    city:this.state.city,
                                    state:this.state.state,
                                    country:this.state.country,
                                    paymentOption:this.state.paymentOptionName,
                                    productType: "MBAX"

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
                                }).catch(error =>{
                                    console.log(error);
                                    this.setState({
                                        error : "Error in Saving SR."
                                    })
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
            
        });
    }

    submitPaymentForm() {
        window.$("#submit-payment").submit()           
      }

    selectPaymentOption = () => {
        
        if(this.state.numOfCopiesSelected != 0 && this.state.purpose != ''){
        confirmAlert({
            message: 'Are you sure you want to Proceed ?',
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
    }else{
       
            confirmAlert({
                
                message: (this.state.purpose === '') ? 'Please check Reason for Bonafide is empty. ': 'Please select Additional copies.',
                buttons:[{
                    label: 'Ok',
                    onClick: () => {
                    //do nothing
                    }
                }]
            }); 

        }

        
        
    }
    saveBonafideRequestWithPayment = (selectedPaymentProvider) => {
        
        this.setState({
            show_payment_options: false,

            selectedPaymentProvider : selectedPaymentProvider,
            submitPayment : true,
            paymentOptionName: selectedPaymentProvider.name

        },()=>{
            
               this.saveBonafideRequest()
        })
    }
    handleDropdownChange = (evt) => {
        console.log("inside ddl change------------" +evt.target.name)
            this.setState({
                [evt.target.name] : evt.target.value,
            })
            // on num of copy change calculate amount based on copies and set it in state
            var totalCost = this.setTotalCostBasedOnCopiesIssued(this.state.numOfCopiesIssued,evt.target.value);
            this.setAmount(this.state.addConfirmation, totalCost);

            // field level validation
            let field = {"name" : [evt.target.name], "value" : evt.target.value, "type" : "mandatoryText"};
                
            handleValidation(this,field);

        
    }
    
    // following method calculates cost based on number of copies, it is same as used in original portal
    setTotalCostBasedOnCopiesIssued = (numberOfCopiesAlreadyIssued,numberOfCopiesSelected) =>{
		var totalCostToBeReturned = 0;
		var sumOfIssuedCopiesAndExistingSelection = parseInt(numberOfCopiesAlreadyIssued) + parseInt(numberOfCopiesSelected);
		//alert("numberOfCopiesAlreadyIssued-->"+numberOfCopiesAlreadyIssued+"<--numberOfCopiesSelected->"+numberOfCopiesSelected);
		if(numberOfCopiesAlreadyIssued === 0 && parseInt(numberOfCopiesSelected) >5){
			totalCostToBeReturned = 100*(numberOfCopiesSelected-5);
		}else if(numberOfCopiesAlreadyIssued > 5){
			totalCostToBeReturned = 100 * numberOfCopiesSelected;
		}else if(numberOfCopiesAlreadyIssued !== 0 && sumOfIssuedCopiesAndExistingSelection > 5){
			totalCostToBeReturned = 100 * (sumOfIssuedCopiesAndExistingSelection - 5);
		}
		//alert("totalCostToBeReturned-->"+totalCostToBeReturned);
		return totalCostToBeReturned;
	}
    handleTextChange = (evt) => {
        // set values on text change and validate
        console.log("inside text change------------" +evt.target.value+" ==="+evt.target.value)
        
        this.setState({
            [evt.target.name] : evt.target.value
        })
        let field = {};
        if(evt.target.name === "purpose")
            field = {"name" : [evt.target.name], "value" : evt.target.value, "type" : "mandatoryText"};  
        else
            field = {"name" : [evt.target.name], "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : evt.target.value};
            
        handleValidation(this,field);
    }
    getFeeAmount = () => {
        console.log("inside getamt---");
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(urls.apiUrl_studentPortals + "/ServiceRequestFee",
        {
            sapId : this.state.sapId,
            serviceRequestType : this.state.serviceRequestType,
        }
        ).then(response =>{
            console.log(JSON.stringify(response));
            this.setState({
                amount : response.data.amount,
                isCertificate : response.data.isCertificate,
                error : null,
            }, ()=>{
                var totalCost = this.setTotalCostBasedOnCopiesIssued(this.state.numOfCopiesIssued,this.state.numOfCopiesSelected);
                this.setAmount(this.state.addConfirmation, totalCost);
            });

        }).catch(error =>{
            console.log(error);
            this.setState({
                error : "Error in getting Base Amount."
            })
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
                                        {this.state.amount} &nbsp;&nbsp;
                                        (for the first 5 copies the amount is 0. Additional
														copies will be charged 100/- per copy)
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row} controlId="numOfCopiesSelected">
                                    <Col sm="10">
                                        <Form.Control as="select" name="numOfCopiesSelected" onChange={this.handleDropdownChange} >
                                                <option value="0">Select additional copies</option>
                                                {this.state.copiesArray.map(number => {
                                                        return(
                                                            <option value={number} key={number}>{number}</option>
                                                        )
                                                    })
                                                }
                                        </Form.Control>
                                        {this.state.errors["numOfCopiesSelected"] !== "" ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["numOfCopiesSelected"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Reason for Bonafide:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="textarea" name="purpose"  value={this.state.purpose} onChange={this.handleTextChange} />
                                        {this.state.errors["purpose"] !== "" ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["purpose"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="wantAtAddress">
                                        <Form.Check type="checkbox" label="I want Certificate at my address (Shipping Charges INR. 100/-)" onChange={this.handleAddrConfirmation.bind(this)} />
                                </Form.Group>
                                {this.state.addConfirmation === true ?
                                <>
                                    <Form.Group as={Row} controlId="shippingAddress">
                                        <Form.Label column sm="4">
                                            Confirm/Edit Address:
                                        </Form.Label>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="houseNoName">
                                        <Form.Label column sm="4">
                                            (*) Address Line 1 : House Details
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="textarea" name="houseNoName"  value={this.state.houseNoName} onChange={this.handleTextChange}/>
                                            {this.state.errors["houseNoName"] !== "" ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["houseNoName"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="street">
                                        <Form.Label column sm="4">
                                        (*) Address Line 2 : Street Name:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="textarea" name="street"  value={this.state.street} onChange={this.handleTextChange}/>
                                            {this.state.errors["street"] !== "" ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["street"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="locality">
                                        <Form.Label column sm="4">
                                        (*) Address Line 3 : Locality Name:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="textarea" name="locality"  value={this.state.locality} onChange={this.handleTextChange}/>
                                            {this.state.errors["locality"] !== "" ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["locality"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="landMark">
                                        <Form.Label column sm="4">
                                        (*) Address Line 4 : Nearest LandMark:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="textarea" name="landMark"  value={this.state.landMark} onChange={this.handleTextChange}/>
                                            {this.state.errors["landMark"] !== "" ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["landMark"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="pin">
                                        <Form.Label column sm="4">
                                        (*) Postal Code:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="textarea" name="pin"  value={this.state.pin} onChange={this.handleTextChange}/>
                                            {this.state.errors["pin"] !== "" ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["pin"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="city">
                                        <Form.Label column sm="4">
                                        (*) Shipping City:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="textarea" name="city"  value={this.state.city} value={this.state.city}  disabled={true}/>
                                            {this.state.errors["city"] !== "" ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["city"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="state">
                                        <Form.Label column sm="4">
                                        (*) Shipping State:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="textarea" name="state"  value={this.state.state} value={this.state.state} disabled={true}/>
                                            {this.state.errors["state"] !== "" ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["state"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="country">
                                        <Form.Label column sm="4">
                                        (*) Country For Shipping:
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="textarea" name="country"  value={this.state.country} value={this.state.country} disabled={true}/>
                                            {this.state.errors["country"] !== "" ?
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["country"]}</span></Form.Text>
                                            :null}
                                        </Col>
                                    </Form.Group>
                                </>
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
                                {this.state.amount == 0 ? 
                                    <Button variant="primary" id="submit" onClick={this.saveBonafideRequest}>Save Service Request</Button>
                                : <Button variant="primary" id="submit" onClick={this.selectPaymentOption}>Save & Proceed to Payment</Button>}
                                <Button variant="secondary" id="backToSR" onClick={this.backToSR}>Back to New Service Request</Button>
                            </div>
                        </Form.Group>
                        {this.state.show_payment_options  === true  ?
<PaymentOptions

setPaymentProvider = {this.saveBonafideRequestWithPayment}

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
                            <Redirect  to='/ssoservices/mbax/ServiceRequest' />
                        : null }
                        {this.state.forward === true?
                            <Redirect to={{pathname:'/ssoservices/mbax/srCreated' ,state:{id: this.state.responseData.id, reqType : this.state.responseData.serviceRequestType,
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

export default connect(mapStateToProps)(IssuanceOfBonafide)