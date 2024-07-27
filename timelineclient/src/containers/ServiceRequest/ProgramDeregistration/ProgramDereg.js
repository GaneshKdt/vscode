import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
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
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
import { Alert } from 'react-bootstrap';
import handleValidation from "../Validations";
import AxiosHandler from "../../../shared/AxiosHandler/AxiosHandler";
const CHECK_SEM_DEREG_ELIGIBILITY = new ConfigUrls().api.checkDeRegSemEligibility
const SR_SEM_DEREG = "Term De-Registration"


const urls = new ConfigUrls().urls;

class ProgramDereg extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        sapId : this.props.student.sapid,
        serviceRequestType : 'Term De-Registration',
        back : false,
        forward : false,
        pgrmStructure : this.props.student.prgmStructApplicable,
        isCertificate : false,
        responseData : [],
        studentData : this.props.student,
        studentRegDetails : [],
        error : null,
        loadSpinner : false,
        reasonForDereg : "",
        errors : {},
        fieldsToValidate : null,
        data: null,
        sRSuccess:false,
        
    }

    handleTextChange = (evt) => {
        console.log("inside text change-------------",evt.target.name,'--',evt.target.value)
        let field = {"name" : "reasonForDereg", "value" : evt.target.value, "type" : "mandatoryText"};
        this.setState({
            [evt.target.name] : evt.target.value,
        },()=>{
            handleValidation(this,field);
        })
        
    }

    getRegistrationDetails =() =>{
        this.setState({
            loadSpinner : true,
        })
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(urls.apiUrl_studentPortals + "/ServiceRequestFee",
        {
            sapId : this.state.sapId,
            serviceRequestType : this.state.serviceRequestType,
            productType: "MBAWX"
        }
        ).then(response =>{
            // console.log(JSON.stringify(response));
            // this.setState({
            //     studentRegDetails : response.data.studentRegistrationList,
            //     loadSpinner : false,
            //     error : response.data.error,
            //     data : response.data,
            // } , () =>{
            //     if(this.state.studentRegDetails === undefined &&  this.state.error === null){
            //         // alert("Can not de-register as no registration found.")
            //         this.setState({
            //             error : "Error in getting registration details.",
            //         })
            //     }
                
            // })
            
            
        }).catch(error =>{
            console.log(error);
            this.setState({
                error : "Error in getting registration details.",
                loadSpinner : false,
            })
           
            
        })
    }

    checkDeregSemEligibility = ()=>{
        AxiosHandler.AxiosPostHandler({
            url: CHECK_SEM_DEREG_ELIGIBILITY,
            data: {
                sapId: this.state.sapId,
                serviceRequestType: SR_SEM_DEREG,
                productType: "MBAWX"
            },
            successCallBack: (success) => {
                if (!success.data.error) {
                    //console.log("--->Can Raise Final Certificate SR")
                    //console.log(success)

                    let response = success

                    console.log(JSON.stringify(response));
                    console.log(response.data.studentRegistrationList)
                    this.setState({
                        studentRegDetails : response.data.studentRegistrationList[0],
                        loadSpinner : false,
                        error : response.data.error,
                        data : response.data,
                    } , () =>{
                        if(this.state.studentRegDetails === undefined &&  this.state.error === null){
                            // alert("Can not de-register as no registration found.")
                            this.setState({
                                error : "Error in getting registration details.",
                            })
                        }
                        
                    }, ()=>{
                        this.getRegistrationDetails();

                    })
                    

                } else {
                    this.setState({
                        error: success.data.error

                    })

                }
            },
            failureCallBack: (failure) => {
                ////console.log(failure)

                this.setState({

                    error: "Please try again after some time!"

                })

            },
        })


    }
 
    componentDidMount = () =>{
        this.checkDeregSemEligibility();
    }
    
    backToSR = () => {
        console.log("back--");
        this.setState({
            back : true,
        })
    }

    saveProgramDereg = () => {
        //axios--
         //fields hash for validation
         let fieldsToValidateHash = {
            reasonForDereg : {"name" : "reasonForDereg", "value" : this.state.reasonForDereg, "type" : "mandatoryText"},
        }
            this.setState({
                fieldsToValidate : fieldsToValidateHash,
            },
            () => {
                handleValidation(this);
                if(Object.entries(this.state.errors).length === 0){
                    console.log("inside save-----------"+JSON.stringify(this.state.studentRegDetails))
                    if((this.state.error === null || this.state.error==="")){
                        var registrationDetails = this.state.studentRegDetails;
                        var message = (
                                    <>
                                    Are you sure you want to de-register for Below Mentioned Term? <br/>
                                    Details- <br/>
                                    Program:  {registrationDetails.program}, <br/>
                                    Term: {registrationDetails.sem}, <br/>
                                    Month / Year: {registrationDetails.month}  / {registrationDetails.year}
                                    </>
                                    );
                        console.log("message--",message);

                        confirmAlert({
                            title: 'Confirm to submit',
                            message: message,
                            buttons: [
                            {
                                label: 'Yes',
                                onClick: () => {
                                    this.setState({
                                        loadSpinner : true,
                                    })
                                    axios.defaults.headers.post['Content-Type'] = false;
                                    axios.post(urls.apiUrl_studentPortals + "/saveProgramDeRegistration",
                                    {
                                        sapId : this.state.sapId,
                                        serviceRequestType : this.state.serviceRequestType,
                                        program : this.state.studentRegDetails.program,
                                        month : this.state.studentRegDetails.month,
                                        year : this.state.studentRegDetails.year,
                                        sem : this.state.studentRegDetails.sem,
                                        additionalInfo1 : this.state.reasonForDereg,

                                    }
                                    ).then(response =>{
                                        console.log(JSON.stringify(response));
                                        this.setState({
                                            loadSpinner : false,
                                            error : null,
                                            responseData : response.data,
                                            forward : true,
                                            sRSuccess : true,
                                        })
                                    }).catch(error =>{
                                        console.log("error---",error);
                                        this.setState({
                                            error : "Error in saving service request.",
                                            loadSpinner : false,
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
            })
           
    }

    render(){
        return(

            <Card style={{maxWidth : "80%"}}>
                    <Card.Header className="cardHeader">Dear Student, You have chosen below Service Request. </Card.Header>
                    <Card.Body>
                        {this.state.error ?
                            <Alert variant="danger">
                                {this.state.error}
                            </Alert>
                        :
                            this.state.sRSuccess ?
                            <Alert variant="success">
                                Service Request Saved Successfully.
                            </Alert>
                            :null
                        }
                        
                        {this.state.data ?
                        
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
                                        Free
                                    </Form.Label>
                                </Form.Group>

                                
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        De-Reg Term: 
                                    </Form.Label>
                                    <Form.Label column sm="7">
                                        {this.state.studentRegDetails.sem ? this.state.studentRegDetails.sem : "NA"}
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        De-Reg Month-Year: 
                                    </Form.Label>
                                    <Form.Label column sm="7">
                                        {this.state.studentRegDetails.month ? this.state.studentRegDetails.month : "NA"} -
                                        {this.state.studentRegDetails.year ? this.state.studentRegDetails.year : "NA"}
                                    </Form.Label>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Reason: 
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="textarea" name="reasonForDereg"  value={this.state.reasonForDereg} onChange={this.handleTextChange}/>
                                        {this.state.errors["reasonForDereg"] !== "" ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["reasonForDereg"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                              
                                
                            </Form>
                        </Col>
                    </Row>
                    :<LoadingSpinner/>}
                        
                    </Card.Body>
                           {this.state.data ?
                    <Card.Footer>
                     
                        <Form.Group>
                            <div className="forButtons">
                                <Button 
                                    variant="primary" 
                                    id="submit" 
                                    onClick={this.saveProgramDereg}
                                    disabled={(this.state.error ? true : false)}
                                    
                                >Save</Button>
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
                        {this.state.loadSpinner ?
                            <LoadingSpinner />
                        : null}



                    </Card.Footer>
                     : null}

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

export default connect(mapStateToProps)(analyticsManager(ProgramDereg))
