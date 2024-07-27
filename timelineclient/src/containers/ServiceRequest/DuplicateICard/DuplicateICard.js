import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import SelectSR_CSS from '../SelectSR/SelectSR.css'
// import {backToSR} from '../SelectSR/SelectSR' 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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

class DuplicateICard extends Component {
    constructor(props) {
        super(props);
        this.addrRef = React.createRef();
        this.checkAddrRef = React.createRef();
    }
    state = {
        // dummy sapid
        // sapId : 77118634372,
        sapId : this.props.student.sapid,
        serviceRequestType : 'Duplicate I-Card',
        back : false,
        forward : false,
        shippingAddress : this.props.student.address,
        // amount : 200,
        amount : this.props.location.state.amount,
        baseAmount : this.props.location.state.amount,
        pgrmStructure : this.props.student.prgmStructApplicable,
        addConfirmation : false,
        wantAtAddress : '',
        // isCertificate : false,
        isCertificate : this.props.location.state.isCertificate,
        responseData : [],
        studentData : this.props.student,
        errors : {},
        status : true,
        fieldsToValidate : null,
        houseNoName : this.props.student.houseNoName,
        street :this.props.student.street,
        locality : this.props.student.locality,
        //landMark: this.props.student.landMark,
        pin: this.props.student.pin,
        city:this.props.student.city,
        state:this.props.student.state,
        country:this.props.student.country,
        // error:null,
        error : this.props.location.state.error,
    }

    handleAddrConfirmation = (evt) => {
        console.log("inside addr con---"+evt.target.checked);
        var amount = this.state.baseAmount;
        if(evt.target.checked === true){
            console.log("inside if---- addConfirmation--")
            this.setState({
                wantAtAddress : 'Yes',
                addConfirmation : true,
                amount : parseInt(amount) + 100,
                // shippingAddress : this.props.student.address,
            })
        }
        else if(evt.target.checked === false){
            console.log("inside else-----addConfirmation--")
            this.setState({
                wantAtAddress : '',
                addConfirmation : false,
                amount: amount,
                shippingAddress : "",
            })
        }
    }
    handleTextChange = (evt) => {
        console.log("inside text change-------------");
        // this.populateCityStateCountry(evt);
        var promisePin = new Promise(function(resolve, reject) {
            commonUtilities.populateCityStateCountry(evt.target.name, evt.target.value, resolve, reject);
        })
        promisePin.then(response =>{
            console.log("inside----promise then---",JSON.stringify(response));
            this.setState({
                city : response.data.city,
                state : response.data.state,
                country : response.data.country,
                error : null,
            })
        }).catch(error =>{
            console.log("promise error---1111111222222");
            this.setState({
                error : error.errorMessage
            })
        })
        let field = {"name" : evt.target.name, "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : evt.target.value};
        this.setState({
            [evt.target.name] : evt.target.value,
        })
        handleValidation(this,field);
    }
    componentDidMount = () =>{
        // this.getFeeAmount();
        console.log("this.props.location.state--",this.props.location.state);
    }
   
    backToSR = () => {
        console.log("back--");
        this.setState({
            back : true,
        })
    }
    
    
    saveDuplicateICard = () => {
        //axios--
        console.log("inside save-----------"+JSON.stringify(this.state.studentData))
        //fields hash for validation
        let fieldsToValidateHash = {
            // wantAtAddress : {"name" : "wantAtAddress", "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : this.state.shippingAddress},
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
            if(Object.entries(this.state.errors).length === 0){
                this.setState({
                    status : true,
                })
                if(this.state.addConfirmation === true){
                    // this.getPostalAddress();
                    var obj = this.state;
                    var promiseAddress = new Promise(function(resolve, reject) {
                        commonUtilities.getPostalAddress(obj,resolve);
                    })
                    promiseAddress.then(response =>{
                        console.log("inside----promise then--11111111-",JSON.stringify(response));
                        this.setState({
                            shippingAddress : response.data,
                        },() => {
                            console.log("postalAddress---",this.state.shippingAddress);
                        })
                    })
                }
                confirmAlert({
                    title: 'Confirm to submit',
                    message: 'Are you sure you want to submit this Service Request?',
                    buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
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
        });
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
                                <Form.Group as={Row} controlId="wantAtAddress">
                                        <Form.Check type="checkbox" label="I want Duplicate ICard at my address (Shipping Charges INR. 100/-)" onChange={this.handleAddrConfirmation} />
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
                                                <Form.Control type="textarea" name="houseNoName"  maxLength = "30" value={this.state.houseNoName} onChange={this.handleTextChange}/>
                                                {this.state.houseNoName && this.state.houseNoName.length > 0 ?
                                                    <p>{ `${this.state.houseNoName.length} out of 30 characters.` }</p>
                                                : null}
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
                                                <Form.Control type="textarea" name="street"  maxLength ="35" value={this.state.street} onChange={this.handleTextChange}/>
                                                {this.state.street && this.state.street.length > 0 ?
                                                    <p>{ `${this.state.street.length} out of 35 characters.` }</p>
                                                : null}
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
                                                <Form.Control type="textarea" name="locality"  maxLength ="35" value={this.state.locality} onChange={this.handleTextChange}/>
                                                {this.state.locality && this.state.locality.length > 0 ?
                                                    <p>{ `${this.state.locality.length} out of 35 characters.` }</p>
                                                : null}
                                                {this.state.errors["locality"] !== "" ?
                                                    <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["locality"]}</span></Form.Text>
                                                :null}
                                            </Col>
                                        </Form.Group>
                                        {/*<Form.Group as={Row} controlId="landMark">
                                            <Form.Label column sm="4">
                                            (*) Address Line 4 : Nearest LandMark:
                                            </Form.Label>
                                            <Col sm="7">
                                                <Form.Control type="textarea" name="landMark"  value={this.state.landMark} onChange={this.handleTextChange}/>
                                                {this.state.errors["landMark"] !== "" ?
                                                    <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["landMark"]}</span></Form.Text>
                                                :null}
                                            </Col>
                                        </Form.Group>*/}
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
                                {this.state.pgrmStructure === "Jul2009" ?
                                    <Form.Group as={Row} controlId="photoGraph" >
                                        <Form.Label column sm="4">
                                            Please Upload Passport Size Photograph:
                                        </Form.Label>
                                        <Col sm="7" className="fileInput">
                                            <Form.Control type="file" name="photoGraph"  onChange />
                                        </Col>
                                    </Form.Group>
                                : null }
                            </Form>
                        </Col>
                    </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Form.Group>
                            <div className="forButtons">
                                <Button variant="primary" id="submit" onClick={this.saveDuplicateICard}>Save & Proceed to Payment</Button>
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

export default connect(mapStateToProps)(analyticsManager(DuplicateICard))
