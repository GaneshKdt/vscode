import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './PublicProfile.css'
import ConfigUrls from '../../../shared/config'
import AddIcon from '@material-ui/icons/Add';
import QueryIcon from '@material-ui/icons/QueryBuilder';
import { Redirect } from "react-router-dom";

import {connect} from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import handleValidation from "../../ServiceRequest/Validations";
const urls = new ConfigUrls().urls;

class ProfilePage extends Component{ 
    constructor(props) {
        super(props);
        this.firstNameRef = React.createRef();
        this.lastNameRef = React.createRef();
    }
    state={
        studentData : this.props.studentData,
        sapId : this.props.studentData.sapid,
        personalOpen : true,
        contactOpen : false,
        educationOpen : false,
        personalEdit : true,
        contactEdit : true,
        educationEdit : true,

        // personal details
        firstName : this.props.studentData.firstName,
        middleName : this.props.studentData.middleName,
        lastName : this.props.studentData.lastName,
        motherName : this.props.studentData.motherName,
        fatherName : this.props.studentData.fatherName,
        spouseName : this.props.studentData.husbandName,
        dob : this.props.studentData.dob,
        age : this.props.studentData.age,
        gender :this.props.studentData.gender,

        // contact details
        emailId : this.props.studentData.emailId,
        mobile : this.props.studentData.mobile,
        altPhone : this.props.studentData.altPhone,

        //shipping add
        houseNoName : this.props.studentData.houseNoName,
        street : this.props.studentData.street,
        locality : this.props.studentData.locality,
        //landMark : this.props.studentData.landMark,
        pin : this.props.studentData.pin,
        city : this.props.studentData.city,
        state : this.props.studentData.state,
        country : this.props.studentData.country,

        //education and work details
        highestQualification : this.props.studentData.highestQualification,
        designation : this.props.studentData.designation,
        industry : this.props.studentData.industry,
        program : this.props.studentData.program,


        //data from sfdc
        designationFromSFDC : null,
        industryFromSFDC : null,
        industryList : [],
        designationList : [],

        //validation
        errors : {},
        status : true,
        responseData : null,

        //for SR redirect in case of change in name and DOB
        srType : null,
        editToolTip : "Click here to start editing!",
        abcId: this.props.studentData.abcId,
    }

    

    getIndustryDesignation = () =>{
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.get(
            urls.apiUrl_studentPortals + "getIndustryDesignation",
        ).then(response => {
            this.setState({
                industryList: response.data.industryList,
                designationList : response.data.designationList
            })
        }).catch(function(error){
            console.debug(error);
        })
    }

    componentDidMount(){
       
        // //get designation and industry from SFDC
        // axios.defaults.headers.post['Content-Type'] = 'application/json';
        // axios.post("https://sandbox-ngasce.cs5.force.com/resource/1559039754000/IndustryJsonv2"
        // ).then(response =>{
        //     // console.log("industry-------"+JSON.stringify(response));
        //     this.setState({
        //         industryFromSFDC : response.data
        //     })
        // }).catch(function(error){
        //     console.debug(error);
        // })
        // axios.post("https://sandbox-ngasce.cs5.force.com/resource/1559112078000/Designation"
        // ).then(response =>{
        //     // console.log("designation---------"+JSON.stringify(response));
        //     this.setState({
        //         designationFromSFDC : response.data
        //     })
        // }).catch(function(error){
        //     console.log(error);
        // })

        this.getIndustryDesignation()
        
    }
    handleEdit = (evt) => {
        // console.log("inside edit------------------((()()()()(" + evt.target.id);
        let fieldsToValidateHash ={};
        
        var id = evt.target.id; 
        if(id==="personalEdit"){
            // console.log("inside if personalEdit****************************")
            this.setState({
                personalEdit : false,
            })
            fieldsToValidateHash = {
                motherName : {"name" : "motherName", "value" : this.state.motherName, "type" : "name"},
                fatherName : {"name" : "fatherName", "value" : this.state.fatherName, "type" : "name"},
            }
        }
        else if(id==="contactEdit"){
            // console.log("inside else if contactEdit****************************")
            this.setState({
                contactEdit : false,
            })
            fieldsToValidateHash = {
                emailId : {"name" : "emailId", "value" : this.state.emailId, "type" : "email"},
                mobile : {"name" : "mobile", "value" : this.state.mobile, "type" : "mobile"},
                houseNoName : {"name" : "houseNoName", "value" : this.state.houseNoName, "type" : "mandatoryText"},
                street : {"name" : "street", "value" : this.state.street, "type" : "mandatoryText"},
                locality : {"name" : "locality", "value" : this.state.locality, "type" : "mandatoryText"},
                //landMark : {"name" : "landMark", "value" : this.state.landMark, "type" : "mandatoryText"},
                pin : {"name" : "pin", "value" : this.state.pin, "type" : "mandatoryText"},
            }
        }
        else if(id==="educationEdit"){
            // console.log("inside else if 2 educationEdit****************************")
            this.setState({
                educationEdit : false
            })
            fieldsToValidateHash = {
                designation : {"name" : "designation", "value" : this.state.designation, "type" : "mandatoryText"},
            }
        }
        this.setState({
            fieldsToValidate : fieldsToValidateHash,
        },
        () => {
            handleValidation(this);
        })
    }

    handleTextChange = (evt) => {
       
        let field= {};
            this.setState({
                [evt.target.name] : evt.target.value
            })
            if(evt.target.name === "pin" && (evt.target.value.length) === 6){
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
                }).catch(function(error){
                    console.log(error);
                })
            }
            if(evt.target.name == "firstName" || evt.target.name === "middleName" || evt.target.name === "lastName" || evt.target.name === "spouseName" || evt.target.name === "motherName" || evt.target.name === "fatherName"){
                field = {"name" : evt.target.name, "value" : evt.target.value, "type" : "name"};
            }
            if(evt.target.name === "dob" || evt.target.name === "age"){
                field = {"name" : evt.target.name, "value" : evt.target.value, "type" : "date"};
            }
            if(evt.target.name === "emailId"){
                field = {"name" : evt.target.name, "value" : evt.target.value, "type" : "email"};
            }
            if(evt.target.name === "mobile"){
                field = {"name" : evt.target.name, "value" : evt.target.value, "type" : "mobile"};
            }
            if(evt.target.name === "designation"){
                field = {"name" : evt.target.name, "value" : evt.target.value, "type" : "mandatoryText"};
            }
            if(evt.target.name === "houseNoName" || evt.target.name === "street" || evt.target.name === "locality" || evt.target.name === "pin"){
                field = {"name" : evt.target.name, "value" : evt.target.value, "type" : "mandatoryText"};   
            }
            if(evt.target.name === "abcId"){
                field = {"name" : evt.target.name, "value" : evt.target.value, "type" : "abcId"};   
            }

        handleValidation(this,field);        
    }

    handleDropdownChange = (evt) => {
        this.setState({
            [evt.target.name] : evt.target.value
        })
    }
    
    handleUpdate = (evt) => {
        // console.log("inside save-----------")
        //fields hash for validation
        
        let fieldsToValidateHash = {
            motherName : {"name" : "motherName", "value" : this.state.motherName, "type" : "name"},
            fatherName : {"name" : "fatherName", "value" : this.state.fatherName, "type" : "name"},
            emailId : {"name" : "emailId", "value" : this.state.emailId, "type" : "email"},
            mobile : {"name" : "mobile", "value" : this.state.mobile, "type" : "mobile"},
            houseNoName : {"name" : "houseNoName", "value" : this.state.houseNoName, "type" : "mandatoryText"},
            street : {"name" : "street", "value" : this.state.street, "type" : "mandatoryText"},
            locality : {"name" : "locality", "value" : this.state.locality, "type" : "mandatoryText"},
            //landMark : {"name" : "landMark", "value" : this.state.landMark, "type" : "mandatoryText"},
            pin : {"name" : "pin", "value" : this.state.pin, "type" : "mandatoryText"},
            designation : {"name" : "designation", "value" : this.state.designation, "type" : "mandatoryText"},
            abcId: {"name" : "abcId", "value" : this.state.abcId, "type" : "abcId"},
        }

        this.setState({
            fieldsToValidate : fieldsToValidateHash,
        },
        () => {
            handleValidation(this);
            if(Object.entries(this.state.errors).length === 0){  
                this.setState({
                    personalEdit : true,
                    contactEdit : true,
                    educationEdit : true,
                })
                var formData = {
                    sapid : this.state.sapId,
                    motherName : this.state.motherName,
                    fatherName : this.state.fatherName,
                    emailId : this.state.emailId,
                    mobile : this.state.mobile,
                    altPhone : this.state.altPhone,
                    designation : this.state.designation,
                    industry : this.state.industry,
                    //Shipping Address Details
                    houseNoName : this.state.houseNoName,
                    street : this.state.street,
                    locality : this.state.locality,
                    //landMark : this.state.landMark,
                    pin : this.state.pin,
                    city : this.state.city,
                    state : this.state.state,
                    country : this.state.country,
                    abcId: this.state.abcId,
                }
                var postURL = urls.apiUrl_studentPortals + "/saveProfileForSFDCAndPortal";
                            // + "?&shippingHouseName=" + this.state.houseNoName
                            // + "&shippingStreet="+ this.state.street 
                            // + "&shippingLocalityName=" + this.state.locality 
                            // + "&shippingNearestLandmark="+ this.state.landMark
                            // + "&shippingPostalCode=" + this.state.pin 
                            // + "&shippingCity="+ this.state.city 
                            // + "&shippingState=" + this.state.state 
                            // + "&shippingCountry="+ this.state.country;

                // console.log("URL************"+postURL);

                confirmAlert({
                    title: 'Confirm to submit',
                    message: 'Are you sure you want to save this information ?',
                    buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            axios.defaults.headers.post['Content-Type'] = false;
                            axios.post(postURL,formData
                            ).then(response =>{
                                // console.log(JSON.stringify(response));
                                this.setState({
                                    responseData : response.data,
                                    personalOpen : true,
                                })
                                if(response.data.status === 'success'){
                                    // Update new values in redis
                                    this.props.dispatch({
                                        type:'REFRESH_STUDENT_DETAILS',
                                        data:{
                                            data: response.data
                                        }
                                    });
                                    alert('Profile updated successfully.')
                                }else{
                                    alert('Error in updating. Please try after some time.')
                                }
                            }).catch(function(error){
                                console.log(error);
                            })
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {
                            this.setState({
                                personalOpen : true,
                                contactOpen : false,
                                educationOpen : false
                            })
                        }
                    }
                    ]
                });
            }
            else{
                if("motherName" in this.state.errors || "fatherName" in this.state.errors){
                    this.setState({
                        personalOpen : true,
                        personalEdit : false,
                    })
                }
                if("emailId" in this.state.errors || "mobile" in this.state.errors || "houseNoName" in this.state.errors || "street" in this.state.errors || "locality" in this.state.errors || "pin" in this.state.errors){
                    this.setState({
                        contactOpen : true,
                        contactEdit : false,
                    })
                }
            }
        })
    }
    handleCancel = (event) => {
        //reset all fields
        this.setState({
            firstName : this.props.studentData.firstName,
            middleName : this.props.studentData.middleName,
            lastName : this.props.studentData.lastName,
            motherName : this.props.studentData.motherName,
            fatherName : this.props.studentData.fatherName,
            spouseName : this.props.studentData.husbandName,
            dob : this.props.studentData.dob,
            age : this.props.studentData.age,
            gender :this.props.studentData.gender,

            //contact details
            emailId : this.props.studentData.emailId,
            mobile : this.props.studentData.mobile,
            altPhone : this.props.studentData.altPhone,

            //shipping add
            houseNoName : this.props.studentData.houseNoName,
            street : this.props.studentData.street,
            locality : this.props.studentData.locality,
            //landMark : this.props.studentData.landMark,
            pin : this.props.studentData.pin,
            city : this.props.studentData.city,
            state : this.props.studentData.state,
            country : this.props.studentData.country,

            //education and work details
            highestQualification : this.props.studentData.highestQualification,
            designation : this.props.studentData.designation,
            industry : this.props.studentData.industry,
            program : this.props.studentData.program,
        });
        event.preventDefault();
        window.location.href = ('publicProfile');
    }
    handleAddSR = (evt) => {
        var id = evt.target.id; 
        if(id){
                this.setState({srType : id}, () => {                
            })
        }
    }
    
    render(){
        return(
            <div>
            
            {/* personal info */}
            <Card className="forCard">
            <a 
                className="btn btn-outline-secondary card-link "
                onClick={() => this.setState({ personalOpen: !this.state.personalOpen, contactOpen: false, educationOpen: false })}
                aria-controls="example-collapse-text"
                aria-expanded={this.state.personalOpen}
            >
                <span className="collapsed" >
                    Personal Information
                </span>
                <span className="expanded">
                    Personal Information
                </span>
            </a>
                <Collapse in={this.state.personalOpen}>
                    <Form className="forForm">
                                
                        <OverlayTrigger
                            placement="auto"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip >
                                {this.state.editToolTip}
                            </Tooltip>}
                        >
                            {/* <div style={{textAlign: 'end', width: 'fit-content', marginLeft: 'auto'}} onClick={this.handleEdit}>
                                <IconButton htmlFor="icon-button-file" aria-label="Edit" component="span" >
                                    <label>Edit</label>
                                        <EditIcon id="personalEdit" />
                                </IconButton> */}
                                {/* <div responsive="true" style={{textAlign: 'end',zIndex:"1", margin:'1%'}}>
                                            <Button variant="secondary" onClick={this.handleEdit}>Edit</Button>
                                </div> */}
                            {/* </div> */}

                            <div style={{ textAlign: 'end', width: 'fit-content', marginLeft: 'auto' }}>
                                <Button id="personalEdit" variant="secondary" aria-label="Edit" onClick={this.handleEdit}>
                                    Edit <EditIcon id="personalEdit" onClick={this.handleEdit} style={{ marginLeft: '5px' }}/>
                                </Button>
                            </div>

                        </OverlayTrigger>
                                
                        <Form.Group as={Row} controlId="firstName">
                            <Form.Label column sm="3">
                                First Name:
                            </Form.Label>
                            
                            <Col sm="8">
                                {/* <input type="text" name="firstName" ref={this.firstNameRef} value={this.state.fName} readOnly={this.state.personalEdit}/> */}
                                <Form.Control type="text" name="firstName" readOnly value={this.state.firstName} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="middleName">
                            <Form.Label column sm="3">
                                Middle Name:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="middleName" readOnly value={this.state.middleName} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="lastName">
                            <Form.Label column sm="3">
                                Last Name:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="lastName" readOnly value={this.state.lastName} />
                            </Col>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip >
                                    To Edit Name, click here to raise SR
                                </Tooltip>}
                            >
                                <div style={{textAlign: 'end'}} onClick={this.handleAddSR}>
                                    <IconButton htmlFor="icon-button-file" aria-label="Add" component="span">
                                            <QueryIcon id="changeInName" />
                                    </IconButton>
                            
                                {/* <Button>Raise SR to Edit</Button> */}
                                </div>
                            </OverlayTrigger>
                        </Form.Group>

                        <Form.Group as={Row} controlId="motherName">
                            <Form.Label column sm="3">
                                Mother name
                                <Form.Label className="mandatory">&nbsp;(*)</Form.Label>
                                <Form.Text className="text-muted">first name</Form.Text>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="motherName" readOnly={this.state.personalEdit} value={this.state.motherName} onChange={this.handleTextChange} isValid={this.state.motherName && !this.state.errors['motherName'] && !this.state.personalEdit} isInvalid={this.state.errors['motherName'] && !this.state.personalEdit}/>
                                {this.state.errors["motherName"] ? 
                                    <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["motherName"]}</span></Form.Text>
                                :null}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="fatherName">
                            <Form.Label column sm="3">
                                Father Name
                                <Form.Label className="mandatory">&nbsp;(*)</Form.Label>
                                <Form.Text className="text-muted">first name</Form.Text>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="fatherName" readOnly={this.state.personalEdit} value={this.state.fatherName} onChange={this.handleTextChange} isValid={this.state.fatherName && !this.state.errors['fatherName'] && !this.state.personalEdit} isInvalid={this.state.errors['fatherName'] && !this.state.personalEdit}/>
                                {this.state.errors["fatherName"] ? 
                                    <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["fatherName"]}</span></Form.Text>
                                : null}
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="spouseName">
                            <Form.Label column sm="3">
                                Spouse Name:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="spouseName" readOnly value={this.state.spouseName} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="dob">
                            <Form.Label column sm="3">
                                Date of Birth:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="dob" readOnly value={this.state.dob}/>
                            </Col>
                            <OverlayTrigger
                                placement="auto"
                                delay={{ show: 250, hide: 400 }}
                                overlay={<Tooltip >
                                    To Edit DOB, click here to raise SR
                                </Tooltip>}
                            >
                                <div style={{textAlign: 'end'}} onClick={this.handleAddSR}>
                                <IconButton htmlFor="icon-button-file" aria-label="Add" component="span">
                                        <QueryIcon id="changeInDOB" />
                                </IconButton>
                                {/* <Button>Raise SR to Edit</Button> */}
                                    </div>
                            </OverlayTrigger>
                        </Form.Group>

                        <Form.Group as={Row} controlId="age">
                            <Form.Label column sm="3">
                                Age:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="age" readOnly value={this.state.age} isValid={this.state.age && !this.state.errors['age'] && !this.state.personalEdit} isInvalid={this.state.errors['age'] && !this.state.personalEdit}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="gender">
                            <Form.Label column sm="3">
                                Gender
                                <Form.Label className="mandatory">&nbsp;(*)</Form.Label>
                            </Form.Label>
                            <Col sm="8">
                                {/* <Form.Control plaintext name="gender" readOnly={this.state.personalEdit} value={this.state.gender} onChange={this.handleTextChange} /> */}
                                <Form.Control as="select" disabled={this.state.personalEdit} name="gender" value={this.state.gender} onChange={this.handleDropdownChange} >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <div className='Container' >
                            <Row>
                                <Col sm={12}>
                                    <Form.Group as={Row} controlId="abcId">
                                        <Form.Label column sm="3">Academic Bank of Credits Id:</Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" name="abcId" readOnly={this.state.personalEdit} value={this.state.abcId} onChange={this.handleTextChange} />
                                            {this.state.errors["abcId"] ? 
                                                <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["abcId"]}</span></Form.Text>
                                            : null}
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                            
                            {(this.state.abcId === "" || this.state.abcId === null)?
                            <Row>
                                <Col sm={12}>
                                    <Form.Group as={Row} controlId="abcInfoId">                                
                                        <Col sm={{ span: 8, offset: 3 }} className="pl-sm-3">
                                            <Card className="p-0">
                                                <Card.Header className="p-2">
                                                    <strong>Update your Academic Bank of Credits Identification number</strong>
                                                </Card.Header>
                                                <Card.Body>
                                                    As per the UGC guidelines, it is recommended to create your unique Academic Bank of Credits identification number.
                                                    <a
                                                        href="https://d3q78eohsdsot3.cloudfront.net/resources_2015/How_to_Create_ABC_ID.pdf"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    > Click here </a>
                                                    to know how to generate your ABC ID.
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>:''}
                        </div>

                    </Form>
                </Collapse>
            </Card>
            {/* contact info */}
            <Card className="forCard">
            <a 
                className="btn btn-outline-secondary card-link "
                onClick={() => this.setState({ contactOpen: !this.state.contactOpen, personalOpen: false, educationOpen: false })}
                aria-controls="example-collapse-text"
                aria-expanded={this.state.contactOpen}
            >
                <span className="collapsed">
                    Contact Information
                </span>
                <span className="expanded">
                    Contact Information
                </span>
            </a>
                <Collapse in={this.state.contactOpen}>
                    <Form className="forForm">
                        <OverlayTrigger
                            placement="auto"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip >
                                {this.state.editToolTip}
                            </Tooltip>}
                        >
                            <div style={{textAlign: 'end', width: 'fit-content', marginLeft: 'auto'}} onClick={this.handleEdit}>
                                <IconButton htmlFor="icon-button-file" aria-label="Edit" component="span">
                                        <EditIcon  id="contactEdit" />
                                </IconButton>
                            </div>
                        </OverlayTrigger>

                        <Form.Group as={Row} controlId="emailId">
                            <Form.Label column sm="3">
                                Email Id
                                <Form.Label className="mandatory">&nbsp;(*)</Form.Label>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="emailId" readOnly={this.state.contactEdit} value={this.state.emailId} onChange={this.handleTextChange} isValid={this.state.emailId && !this.state.errors['emailId'] && !this.state.contactEdit} isInvalid={this.state.errors['emailId'] && !this.state.contactEdit}/>
                                {this.state.errors["emailId"] ? 
                                    <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["emailId"]}</span></Form.Text>
                                : null}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="mobile">
                            <Form.Label column sm="3">
                                Mobile No.
                                <Form.Label className="mandatory">&nbsp;(*)</Form.Label>
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="mobile" readOnly={this.state.contactEdit} value={this.state.mobile} onChange={this.handleTextChange} isValid={this.state.mobile && !this.state.errors['mobile'] && !this.state.contactEdit} isInvalid={this.state.errors['mobile'] && !this.state.contactEdit}/>
                                {this.state.errors["mobile"] ? 
                                    <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["mobile"]}</span></Form.Text>
                                : null}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="altPhone">
                            <Form.Label column sm="3">
                                Alternate Contact No.
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="altPhone" readOnly={this.state.contactEdit} value={this.state.altPhone} onChange={this.handleTextChange} />
                            </Col>
                        </Form.Group>
                        <label className="mandatory">Shipping Address (*) (All fields are mandatory)</label>
                        <Card className="forPanel">
                            {/* <Form className="forForm"> */}
                                <Form.Group as={Row} controlId="houseNoName">
                                    <Form.Label column sm="3">
                                        House Details :
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="houseNoName" maxLength ="30" readOnly={this.state.contactEdit} value={this.state.houseNoName} onChange={this.handleTextChange} isValid={this.state.houseNoName && !this.state.errors['houseNoName'] && !this.state.contactEdit} isInvalid={this.state.errors['houseNoName'] && !this.state.contactEdit}/>
                                        {this.state.houseNoName && this.state.houseNoName.length > 0 ?
                                            <p>{ `${this.state.houseNoName.length} out of 30 characters.` }</p>
                                        : null}
                                        {this.state.errors["houseNoName"]    ?
                                             <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["houseNoName"]}</span></Form.Text>
                                        : null}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="street">
                                    <Form.Label column sm="3">
                                        Street :
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="street" maxLength ="35" readOnly={this.state.contactEdit} value={this.state.street} onChange={this.handleTextChange} isValid={this.state.street && !this.state.errors['street'] && !this.state.contactEdit} isInvalid={this.state.errors['street'] && !this.state.contactEdit}/>
                                        {this.state.street && this.state.street.length > 0 ?
                                            <p>{ `${this.state.street.length} out of 35 characters.` }</p>
                                        : null}    
                                        {this.state.errors["street"]    ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["street"]}</span></Form.Text>
                                        : null}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="locality">
                                    <Form.Label column sm="3">
                                        Locality :
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="locality" maxLength ="35" readOnly={this.state.contactEdit} value={this.state.locality} onChange={this.handleTextChange} isValid={this.state.locality && !this.state.errors['locality'] && !this.state.contactEdit} isInvalid={this.state.errors['locality'] && !this.state.contactEdit}/>
                                        {this.state.locality && this.state.locality.length > 0 ?
                                            <p>{ `${this.state.locality.length} out of 35 characters.` }</p>
                                        : null}
                                        {this.state.errors["locality"]    ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["locality"]}</span></Form.Text>
                                        : null}
                                    </Col>
                                </Form.Group>
                                {/*<Form.Group as={Row} controlId="landMark">
                                    <Form.Label column sm="3">
                                        Landmark :
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="landMark" readOnly={this.state.contactEdit} value={this.state.landMark} onChange={this.handleTextChange} isValid={this.state.landMark && !this.state.errors['landMark'] && !this.state.contactEdit} isInvalid={this.state.errors['landMark'] && !this.state.contactEdit}/>
                                        {this.state.errors["landMark"]    ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["landMark"]}</span></Form.Text>
                                        : null}
                                    </Col>
                                    </Form.Group>*/}
                                <Form.Group as={Row} controlId="pin">
                                    <Form.Label column sm="3">
                                        Postal code :
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="pin" readOnly={this.state.contactEdit} value={this.state.pin} onChange={this.handleTextChange} isValid={this.state.pin && !this.state.errors['pin'] && !this.state.contactEdit} isInvalid={this.state.errors['pin'] && !this.state.contactEdit}/>
                                        {this.state.errors["pin"]    ?
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["pin"]}</span></Form.Text>
                                        : null}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="city">
                                    <Form.Label column sm="3">
                                        Shipping city :
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="city" readOnly value={this.state.city} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="state">
                                    <Form.Label column sm="3">
                                        Shipping state :
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="state" readOnly value={this.state.state} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="country">
                                    <Form.Label column sm="3">
                                        Shipping country :
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control type="text" name="country" readOnly value={this.state.country} />
                                    </Col>
                                </Form.Group>
                            {/* </Form> */}
                        </Card>
                        
                        
                    </Form>
                </Collapse>
               
            </Card>
            {/* education and work info */}
            <Card className="forCard">
            <a 
                className="btn btn-outline-secondary card-link "
                onClick={() => this.setState({ educationOpen: !this.state.educationOpen, contactOpen: false, personalOpen: false })}
                aria-controls="example-collapse-text"
                aria-expanded={this.state.educationOpen}
            >
                <span className="collapsed">
                    Education/Work Information
                </span>
                <span className="expanded">
                    Education/Work Information
                </span>
            </a>
                <Collapse in={this.state.educationOpen}>
                    <Form className="forForm">
                        <OverlayTrigger
                            placement="auto"
                            delay={{ show: 250, hide: 400 }}
                            overlay={<Tooltip >
                                {this.state.editToolTip}
                            </Tooltip>}
                        >
                            <div style={{textAlign: 'end', width: 'fit-content', marginLeft: 'auto'}} onClick={this.handleEdit}>
                                <IconButton htmlFor="icon-button-file" aria-label="Edit" component="span">
                                        <EditIcon  id="educationEdit" />
                                </IconButton>
                            </div>
                        </OverlayTrigger>

                        <Form.Group as={Row} controlId="highestQual">
                            <Form.Label column sm="3">
                                Highest Qualification :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" name="highestQualification" readOnly value={this.state.highestQualification} onChange={this.handleTextChange}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="designation">
                            <Form.Label column sm="3">
                                Designation:
                            </Form.Label>

                            <Col sm="8">
                                <Form.Control type="text" disabled={this.state.educationEdit} name="designation" value={this.state.designation} onChange={this.handleTextChange} isValid={this.state.designation && !this.state.errors['designation'] && !this.state.educationEdit} isInvalid={this.state.errors['designation'] && !this.state.educationEdit}/>
                                {this.state.errors["designation"]    ?
                                    <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["designation"]}</span></Form.Text>
                                : null}
                            </Col>
                            
                            {/* <Col sm="8">
                                <Form.Control as="select" disabled={this.state.educationEdit} name="designation" value={this.state.designation} onChange={this.handleDropdownChange}>
                                    <option value="">Please select designation</option>
                                    {this.state.designationList ? 
                                        this.state.designationList.map(
                                            (item) => 
                                            // <option key={item["name"]} value={item["name"]}>{item["name"]}</option>
                                        <option>{item}</option>
                                        )
                                    : null}
                                </Form.Control>
                            </Col> */}
                        </Form.Group>
                        <Form.Group as={Row} controlId="industry">
                            <Form.Label column sm="3">
                                Industry:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="select" disabled={this.state.educationEdit} name="industry" value={this.state.industry} onChange={this.handleDropdownChange}>
                                <option value="">Please select industry</option>
                                {this.state.industryList ? 
                                    this.state.industryList.map(
                                        (item) => //<option key={item["name"]} value={item["name"]}>{item["name"]}</option>
                                        <option>{item}</option>
                                    )
                                : null}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    </Form>
                </Collapse>
            </Card>
            {this.state.srType ? 
                <Redirect  to={{pathname: '/timeline/'+ this.state.srType}} />  
            : null  }
            {this.state.personalEdit === false || this.state.contactEdit === false || this.state.educationEdit === false?
                <div className="forButtons">
                    <Button variant="primary" id="btnUpdate" onClick={this.handleUpdate}>Update</Button><span style={{margin:'4%'}}></span>
                    <Button variant="secondary" id="btnCancel" onClick={this.handleCancel}>Cancel</Button>
                </div>
            : null
            }
            </div>
            
        )
    }
}

const mapStateToProps = state => {
	return {
		sapId: state.sapid,
	}
}

export default connect(mapStateToProps)(ProfilePage);  