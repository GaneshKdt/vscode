import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import '../IssuanceOfMarksheet/IssuanceOfMarksheet.css';
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
import { Table } from 'react-bootstrap';
import ModalForPreviewMarks from './ModalForPreviewMarks';
import PreviewIcon from '@material-ui/icons/ViewModule';
import DeleteIcon from '@material-ui/icons/Delete';
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
import Alert from 'react-bootstrap/Alert'


const urls = new ConfigUrls().urls;

class IssuanceOfMarksheet extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        student : this.props.student,
        sapId : this.props.student.sapid,
        serviceRequestType : 'Issuance of Gradesheet',
        back : false,
        forward : false,
        shippingAddress : this.props.student.address,
        amount : 0,
        pgrmStructure : this.props.student.prgmStructApplicable,
        addConfirmation : false,
        wantAtAddress : '',
        isCertificate : false,
        examMode : 'Online',

        // address
        houseNoName : this.props.student.houseNoName,
        street :this.props.student.street,
        locality : this.props.student.locality,
        //landMark: this.props.student.landMark,
        pin: this.props.student.pin,
        city:this.props.student.city,
        state:this.props.student.state,
        country:this.props.student.country,

        // exam attributes
        examYearList : ["2019","2020","2021","2022", "2023"],
        examMonList : ["Oct","Jan", "Apr", "Jul"],
        semList : ["1","2","3", "4", "5", "6", "7", "8"],
        
        // Exam UI selections
        examYear : [""],
        examMon : [""],
        sem : [""],
        selectedYes : "",
        
        //ID is to track number of requests'
        id: [1],

        // Show is to show/hide preview modal
        show : null,

        //to check duplicate requests
        marksheetDetailRecord :[""] ,
        duplicateReq : false,

        // to check if selects are selected
        selectsSelected : [""],
        checkboxSelected: false,

        responseData : [],
        studentData : this.props.student,
        previewData : null,
        showLoader : false,
        errors : {},
        status : true,
        fieldsToValidate : null,
        error:null,
        clearedSems:[],
        previewId : 1,
        abcId: this.props.student.abcId,
    }

    handleAddrConfirmation = (evt) => {
        // console.log("inside addr con---"+evt.target.checked);
        if(evt.target.checked === true){
            // console.log("inside if---- addConfirmation--")
            this.setState({
                wantAtAddress : 'Yes',
                addConfirmation : true,
                amount : 100,
                checkboxSelected: true,
            })
            if(this.state.isCertificate){
                this.setState({
                    amount : 100 + 100 * 0.18,
                })
            }
        }
        else if(evt.target.checked === false){
            // console.log("inside else-----addConfirmation--")
            this.setState({
                wantAtAddress : '',
                addConfirmation : false,
                amount: 0,
                shippingAddress : "",
                checkboxSelected: false,
            })
           
        }
    }
    handleTextChange = (evt) => {
        // console.log("inside text change-------------", evt.target.name, "---",evt.target.value);
        this.populateCityStateCountry(evt);
        
        this.setState({
            [evt.target.name] : evt.target.value,
        });
        let field = {"name" : [evt.target.name], "value" : this.state.wantAtAddress, "type" : "checkAddress", "shippingAddress" : evt.target.value};
            // console.log("val------",evt.target.name,'---',this.state[evt.target.name])
        handleValidation(this,field);
        
        
    }
    componentDidMount = () =>{
        // console.log("inside mount--***********"+JSON.stringify(this.props.student));
        this.setState({
            error : null,
        });
        this.getFeeAmount();
        
        // get cleared sems
        this.getClearedSemForStudent();

        // dont display remove button for 1st marksheet record
        this.removeReqRef1.style.display = "none";

    }
    getClearedSemForStudent = () =>{
        this.setState({
            showLoader : true,
        })
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(urls.apiUrl_exam + "/getClearedSemForStudent",
        {
            "sapid" : this.state.sapId,
        }
        ).then(response =>{
            // console.log("$%$%$%$%$%$%$%$%"+JSON.stringify(response));
            this.setState({
                clearedSems : response.data,
                id : [],
            },()=>{
                    // console.log("inside succ of ajax--11222",this.state.id);
                    for(var i = 0; i < this.state.clearedSems.length; i++){
                        var clearedSems = this.state.clearedSems;
                        var tempExamYear = this.state.examYear;
                        var tempExamMonth = this.state.examMon;
                        var tempSem = this.state.sem;
                        var tempId = this.state.id;
                        tempExamYear[i+1] = clearedSems[i].examYear;
                        tempExamMonth[i+1] = clearedSems[i].examMonth;
                        tempSem[i+1] = clearedSems[i].sem;
                        tempId[i] = i+1;
                        this.setState({
                            examYear : tempExamYear,
                            examMon : tempExamMonth,
                            sem : tempSem,
                            id: tempId,
                            showLoader : false,
                        },() => {
                            console.log("inside succ of ajax--",this.state.id);
                             // dont display remove button for 1st marksheet record
                            this.removeReqRef1.style.display = "none";
                        })
                        
                    }
                
                
                
            })
            
        }).catch(error =>{
            console.log(error);
            this.setState({
                error : "Error in getting cleared sems.",
                showLoader : false,
            })
        })
    }
    populateCityStateCountry = (evt) => {
        if(evt.target.name === "pin" && (evt.target.value.length) === 6){
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
                    error : "Error in Populate City/State/Country",
                })
            })
        }
    }

    // concatinated postal address for shipping
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
    
    backToSR = () => {
        // console.log("back--");
        this.setState({
            back : true,
        })
    }
    updateShippingAddressVisbility = (obj) =>{

        // console.log("here check");
        // console.log(obj)
        //this.state.wantAtAddress

    }
    checkMarksheetHistory = () => {
        //check if any duplicate requests or any selections missing
        if(this.checkDuplicateRequests() === "duplicate" || this.checkSelectsSelected() === false || this.checkboxSelectedFlag() === false){
            return false;
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
                let marksRec1="";
                let marksRec2="";
                let marksRec3="";
                let marksRec4="";
                let marksRec5="";
                let marksRec6="";
                let marksRec7="";
                let marksRec8="";
                if(this.state.marksheetDetailRecord[1]){
                    marksRec1 = this.state.marksheetDetailRecord[1];
                }
                if(this.state.marksheetDetailRecord[2]){
                    marksRec2 = this.state.marksheetDetailRecord[2];
                }
                if(this.state.marksheetDetailRecord[3]){
                    marksRec3 = this.state.marksheetDetailRecord[3];
                }
                if(this.state.marksheetDetailRecord[4]){
                    marksRec4 = this.state.marksheetDetailRecord[4];
                }
                if(this.state.marksheetDetailRecord[5]){
                    marksRec5 = this.state.marksheetDetailRecord[5];
                }
                if(this.state.marksheetDetailRecord[6]){
                    marksRec6 = this.state.marksheetDetailRecord[6];
                }
                if(this.state.marksheetDetailRecord[7]){
                    marksRec7 = this.state.marksheetDetailRecord[7];
                }
                if(this.state.marksheetDetailRecord[8]){
                    marksRec8 = this.state.marksheetDetailRecord[8];
                }

                if(Object.entries(this.state.errors).length === 0){
                    this.getPostalAddress();
                    this.setState({
                        status : true,
                        showLoader : true,
                    })
                    confirmAlert({
                        title: 'Confirm to submit',
                        message: 'Are you sure you want to proceed?',
                        buttons: [
                        {
                            label: 'Yes',
                            onClick: () => {
                                axios.defaults.headers.post['Content-Type'] = false;
                                axios.post(urls.apiUrl_studentPortals + "/checkMarksheetHistoryForMBAWX",
                                {
                                    // actual data
                                    sapId : this.state.sapId,
                                    serviceRequestType : this.state.serviceRequestType,
                                    wantAtAddress :this.state.wantAtAddress,
                                    houseNoName : this.state.houseNoName,
                                    street :this.state.street,
                                    locality : this.state.locality,
                                    //landMark: this.state.landMark,
                                    pin: this.state.pin,
                                    city:this.state.city,
                                    state:this.state.state,
                                    postalAddress : this.state.shippingAddress,
                                    country:this.state.country,
                                    marksheetDetailRecord1:marksRec1,
                                    marksheetDetailRecord2:marksRec2,
                                    marksheetDetailRecord3:marksRec3,
                                    marksheetDetailRecord4:marksRec4,
                                    marksheetDetailRecord5:marksRec5,
                                    marksheetDetailRecord6:marksRec6,
                                    marksheetDetailRecord7:marksRec7,
                                    marksheetDetailRecord8:marksRec8,
                                    amount:this.state.amount
                                    

                                    // demo data
                                    // "sapId" : 77118634372,
                                    // "serviceRequestType" : "Issuance of Marksheet",
                                    // "wantAtAddress" :this.state.wantAtAddress,
                                    // "postalAddress" : "testPostalAdd",
                                    // "houseNoName" : "test add1",
                                    // "street" :"test add2",
                                    // "locality" : "test add2",
                                    // "landMark": "test add3",
                                    // "pin": "test add4",
                                    // "city":"test add5",
                                    // "state":"test add6",
                                    // "country":"test add7",
                                    // "marksheetDetailRecord1":"2018|Dec|1",
                                    // "marksheetDetailRecord2":"",
                                    // "marksheetDetailRecord3":"",
                                    // "marksheetDetailRecord4":""
                                    
                                    

                                }   
                                ).then(response =>{
                                    // console.clear()
                                    // console.log("Amount-->")

                                    // console.log(response)
                                    //if(response.data.marksheetDetailAndAmountToBePaidList[0].amount > 0 ){
                                        // confirmAlert({
                                        //     // title: 'Can not raise Duplicate Marksheet SR',
                                        //     message: 'Issuance of Gradesheet SR already raised.',
                                        //     buttons: [
                                        //     {
                                        //         label: 'OK',
                                        //         onClick: () => {
                                        //             this.setState({
                                        //                 back : true,
                                        //             })
                                        //         }
                                        //     }
                                        //     ]
                                        // });
                                   // }
                                    //else{
                                        this.setState({
                                            showLoader:false,
                                            responseData : response.data,
                                            forward : true,
                                        })
                                    //}
                                   
                                }).catch(error =>{
                                    console.log(error);
                                    this.setState({
                                        error : "Error in getting marks history.",
                                        showLoader : false
                                    })
                                })
                            }
                        },
                        {
                            label: 'No',
                            onClick: () => {
                                //do nothing
                                this.setState({
                                    showLoader : false
                                })
                            }
                        }
                        ]
                    });
                }
            });
        }

        
                
    }
    addMarksheetRequest = () =>{
        let tempId = parseInt(this.state.id.slice(this.state.id.length -1,this.state.id.length));
        // console.log("inside click of add request-----------",tempId);
        
        let tempArr = this.state.id;
        if(tempArr.length <4){
            if(isNaN(tempId) || tempId === null){
                tempArr.push(1);
            }
            else{
                tempArr.push(tempId + 1);
            }
        } else{
            alert("More than 4 marksheets can not be issued.");
        }
        this.setState({
            id: tempArr
        })
        // console.log("inside click of add request-------1111----",this.state.id);
        
        
    }
    removeMarksheetRequest = (evt) =>{
        var id = parseInt(evt.target.id.toString().split("-")[1]);
        // console.log("inside click of remove request-----------",id);
        let tempArr = this.state.id;
        // console.log("inside click of remove request------111-----",tempArr);
        // console.log("inside click of remove request-----2222-----",tempArr.indexOf(id));
        let tempExamYear = this.state.examYear;
        let tempExamMon =  this.state.examMon;
        let tempSem = this.state.sem;
        let tempMarksRec = this.state.marksheetDetailRecord;
        let tempChecks = this.state.selectsSelected;

        // console.log("inside click of remove request-----3333-----",tempExamYear,"====",tempExamMon,"---",tempSem);
        if(tempArr.length >1){
            tempArr.splice(tempArr.indexOf(id),1);
        }
        if(id > 0){
            tempExamYear[id]="";
            // console.log("tempExamYear--",tempExamYear);
            tempExamMon[id]="";
            // console.log("tempExamMon--",tempExamMon);
            tempSem[id]="";
            // console.log("tempSem--",tempSem);
            tempMarksRec[id]="";
            // console.log("tempSem--",tempMarksRec);
            tempChecks[id]="";
            // console.log("tempSem--",tempChecks);
        }
        this.setState({
            id: tempArr,
            examYear : tempExamYear,
            examMon : tempExamMon,
            sem : tempSem,
            marksheetDetailRecord : tempMarksRec,
            selectsSelected : tempChecks,
        },()=>{
            // console.log("inside click of add request-------444444----",this.state);
        })
        
    }

    handleDropdownChange = (evt) => {
        // console.log("handler--");
        var id = evt.target.id.toString().split("-")[1];
        // console.log("id---",id);
        let tempArr = this.state[evt.target.name];
        tempArr[id] = evt.target.value;
        // console.log("tempArr----",tempArr);
        this.setState({
            [evt.target.name] : tempArr
        })
    }

    handlePreviewMarks = (evt) =>{
        this.setState( {
            showLoader : true
        })
        // console.log("handler-------"+evt.target.id);
        var id = evt.target.id.toString().split("-")[1];
        let tempMarksRec = this.state.marksheetDetailRecord[id];
        // console.log("id---",id,"-----",tempMarksRec);
        
        var program = this.state.student.program;
        var examYear = tempMarksRec.split("|")[0];
        var examMonth = tempMarksRec.split("|")[1];
        var sem = tempMarksRec.split("|")[2];
        var sapid = this.state.sapId;
        var examMode = this.state.examMode;
        var programStructure = this.state.programStructure;
        
        // console.log("&^&^&^&^&^&^&&^&^&",this.state.marksheetDetailRecord);
        // demo data
        // var body =  {
        //         'sem' : "1",
        //         'program' : "DHRM",
        //         'examYear' : "2018",
        //         'examMonth' : "Dec",
        //         'sapid' : "77118634372",
        //         'examMode' : examMode,
        //         'prgmStructApplicable':"Jul2014"
        //     };
        // actual data
        var body =  {
            'sapid' : sapid,
            'sem' : sem,
            'program' : program,
            'year' : examYear,
            'month' : examMonth,
        };
        // console.log("body--",body);
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(urls.apiUrl_exam + "/generateMarksheetPreviewFromSR_MBAWX",
        body,
        ).then(response =>{
            // console.log(JSON.stringify(response));
            this.setState({
                previewData : response.data,
                show : true,
                showLoader : false,
                previewId: id
            })
            
        }).catch(error =>{
            console.log(error);
            this.setState({
                error : "Error in getting Preview Data.",
                show : false,
                showLoader : false
            })
        })

    }

    handleCheck = (evt) =>{

        let value = evt.target.checked;
        let id =  parseInt(evt.target.value);
        // console.log("this[`previewRef${id}`]---" ,this[`previewRef${id}`]);
        // console.log("this[`check${id}`]---",this[`check${id}`]);
        let tempDetailArr = this.state.marksheetDetailRecord;

        // inserting piped details in marksheetDetailRecord to send to history api
        // console.log("tempDetailArr---",this.state.examYear[id]  + "|" + this.state.examMon[id] + "|" + this.state.sem[id]);
        tempDetailArr[id] = this.state.examYear[id]  + "|" + this.state.examMon[id] + "|" + this.state.sem[id];
        this.setState({
            marksheetDetailRecord : tempDetailArr,
        })
        // updating tempCheckArr selects array to validate later
        let tempCheckArr = this.state.selectsSelected;
        
        // console.log("marksheetDetailRecord---",this.state.marksheetDetailRecord);
        // checking if exam year,month or sem is null, validate
        if(!this.state.examYear[id] || !this.state.examMon[id]  || !this.state.sem[id] ){
            alert("Please select Exam year, Exam Month and Sem");
            this[`check${id}`].checked = false
        }
        else{
            if(value === true){
                // on checked true
                // console.log("1---");
                tempCheckArr[id] = "Yes";
                this[`previewRef${id}`].style.display = "block";
                // display remove button 2nd entry onwards
                if(id>1){
                    this[`removeReqRef${id}`].style.display = "block";
                }
                // disable dropdowns
                this[`examYearRef${id}`].disabled = true;
                this[`examMonRef${id}`].disabled = true;
                this[`semRef${id}`].disabled = true;
                this.handlePreviewMarks(evt)


            }
            if(value === false){
                // on check false
                tempCheckArr[id] = "No";
                // console.log(" 2--------");
                this[`previewRef${id}`].style.display = "none";
                // display remove button 2nd entry onwards
                if(id>1){
                    this[`removeReqRef${id}`].style.display = "block";
                }
                // disable dropdowns
                this[`examYearRef${id}`].disabled = false;
                this[`examMonRef${id}`].disabled = false;
                this[`semRef${id}`].disabled = false;
                
            }
        }
        // console.log("tempCheckArr---",tempCheckArr);
        
    }
    handleModalOpen = () =>{
        this.setState({ 
            show: true,
        });
    }
    handleModalClose =() => {
    // console.log(" inside close--------")
       this.setState({
           show : false
       }, ()=>{
        // console.log(" ******************")
    })
    }

    renderLayout() {
        // console.log("**********",this.state)
        if(this.state.show === true && this.state.previewData !== null){
            // console.log("inside if------------")
            let tempMarksRec = this.state.marksheetDetailRecord[this.state.previewId];         
            var sem = tempMarksRec.split("|")[2];
            return(
                <ModalForPreviewMarks show={this.state.show} sem={sem} studentData={this.state.studentData} previewData={this.state.previewData} handleModalClose={this.handleModalClose} />
            )
        }
    }
    // this method checks if user has input 2 same requests
    checkDuplicateRequests() {
        let tempExamDetails = this.state.marksheetDetailRecord;
        // console.log("inside duplicate----111-----",tempExamDetails);
        for(var i =0; i<tempExamDetails.length; i++){
            // console.debug('i->', tempExamDetails[i])
            if(tempExamDetails[i]) {
                for(var j = i + 1; j < tempExamDetails.length; j++) {
                    // console.debug('j->', tempExamDetails[j])
                    if(tempExamDetails[i] == tempExamDetails[j]){
                        // console.debug('i=j->', tempExamDetails[j], tempExamDetails[i])
                        alert("Kindly verify the current selection for Marksheet Request.Possible duplicate values");
                        return "duplicate";                   
                    }
                }
            }
        }
        return "noDuplicate";
    }
    
    // this method verifies that all attributes(exam year,month and sem) are selected
    checkSelectsSelected = () => {
        let flag= false;
        let exLenth = parseInt(this.state.examYear.length);
        let mLength = parseInt(this.state.examMon.length);
        let sLength = parseInt(this.state.sem.length);
        let selectedLength = parseInt(this.state.selectsSelected.length);
        if(exLenth >1 && mLength >1 && sLength >1 && selectedLength >1) {
            if(exLenth === mLength && mLength === sLength  && sLength === selectedLength && exLenth === selectedLength){
                // console.log(" inside if------------")
                flag = true
            }
            else{
                flag=false;
            }
        }
        else{
            if(this.state.examYear[0] === "" || this.state.examMon[0] === "" || this.state.sem[0] === "")
            flag=false;
        }
        if(flag === false){
            alert("Check all Selects and make sure all selections are correct.");
        }
        return flag;
    }
    getFeeAmount = () => {
        // console.log("inside getamt---");
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(urls.apiUrl_studentPortals + "/ServiceRequestFee",
        {
            sapId : this.state.sapId,
            serviceRequestType : this.state.serviceRequestType,
            productType: "MBAWX"
        }
        ).then(response =>{
            // console.log(JSON.stringify(response));
            this.setState({
                amount : response.data.amount,
                isCertificate : response.data.isCertificate,
            });

        }).catch(error =>{
            console.log(error);
            this.setState({
                error : "Error in getting base amount.",
            })
        })
    }
    getDisabledValue=(id) =>{
        let value = false;
        if(id == 1 || id == 2){
            value = true;
       }
        return value
    }
    
    checkboxSelectedFlag = () => {
        if(this.state.checkboxSelected){
            return true;
        }
        else{
            alert("Please select shipping option")
            return false;
        }
    }

    render(){
        return(

            <Card style={{maxWidth : "80%"}}>
                    <Card.Body>
                        <div className="cardHeader">Dear Student, You have chosen below Service Request.Please fill in required information below before proceeding for Payment.</div><br/>
                    {this.state.error ?
                        <Row>
                            <Col>
                                <Alert variant="danger">
                                    {this.state.error}
                                </Alert>
                            </Col>
                            
                        </Row>
                    :null}
                    
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
                                    Academic Bank of Credits Id  :   
                                    </Form.Label>
                                    <Form.Label column sm="7">
                                        {this.state.abcId}
                                    </Form.Label>
                                </Form.Group>
                                
                                {(this.state.abcId === "" || this.state.abcId === null)?
                                <Form.Group as={Row}>
                                <div className='Container' >                          
                                    <Row>
                                        <Col sm={12}>
                                            <Form.Group as={Row} controlId="abcInfoId">                                            
                                                <Col sm={{ span: 7, offset: 4 }} className="pl-sm-3">
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
                                                            <p>
                                                            <br/><br/>
                                                                To update your Academic Bank of Credits Id, please click on 
                                                                <a href="publicProfile" rel="noopener noreferrer"> this link. </a> </p>                                                               
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </div>                
                                </Form.Group>:''}

                                <Form.Group as={Row}>
                                    <Form.Label column sm="4">
                                        Charges:
                                    </Form.Label>
                                    <Form.Label column sm="7" className="charges">
                                        {this.state.amount}
                                    </Form.Label>
                                </Form.Group>
                                <Button variant="primary" id="addMarkssheetReq" onClick={this.addMarksheetRequest}>Add Gradesheet Request</Button>
                                <Form.Label style={{color:"red",marginTop: "18px"}}>Please check the checkbox under "Select" to enable Preview and to Proceed</Form.Label>
                                <br/><br/>
                                {this.state.showLoader === true ?
                                    <LoadingSpinner />
                                : null}
                                <Table striped hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Exam Year</th>
                                            <th>Exam Month</th>
                                            <th>Sem</th>
                                            <th>Select</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>                                        
                                        {this.state.id.map(id => 
                                            <RowForMarksheet  disabledValue={this.getDisabledValue(id)} id = {id} obj={this} />
                                        )}
                                    </tbody>
                                </Table>
                                 <Form.Group as={Row} controlId="wantAtAddress">
                                        <Form.Check type="checkbox" label="I want Gradesheet at my address (Shipping Charges INR. 100/-)" onChange={this.handleAddrConfirmation} />
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
                                            <Form.Control type="textarea" name="houseNoName" maxLength="30" value={this.state.houseNoName} onChange={this.handleTextChange}/>
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
                                            <Form.Control type="textarea" name="street" maxLength="35" value={this.state.street} onChange={this.handleTextChange}/>
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
                                            <Form.Control type="textarea" name="locality" maxLength="35" value={this.state.locality} onChange={this.handleTextChange}/>
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
                                            <Form.Control type="textarea" name="city"  value={this.state.city}   disabled={true}/>
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
                                            <Form.Control type="textarea" name="state"  value={this.state.state} disabled={true}/>
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
                                            <Form.Control type="textarea" name="country"  value={this.state.country}  disabled={true}/>
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
                                <Button variant="primary" id="submit" onClick={this.checkMarksheetHistory}>Proceed</Button>
                                <Button variant="secondary" id="backToSR" onClick={this.backToSR}>Back to New Service Request</Button>
                            </div>
                        </Form.Group>
                        {this.renderLayout()}
                        {this.state.back === true?
                            <Redirect  to='/timeline/selectSR' />
                        : null }
                        {this.state.forward === true?
                            <Redirect to={{pathname:'/timeline/marksheetSummary' ,state:{responseData : this.state.responseData}}}  />
                        : null }
                    </Card.Footer>
                </Card>
         
        )
    }
}
const RowForMarksheet = ({ disabledValue,id,obj }) => (    
    <>    
    <tr >
      <td>
        <Form.Control disabled={disabledValue} as="select" id={`examYear-${id}`}  name="examYear" value={obj.state.examYear[id]} onChange={obj.handleDropdownChange}  
            ref={input => {
                    obj[`examYearRef${id}`] = input;
                }} 
        >
        <option value="" key="select">Select</option>
         {obj.state.examYearList.map(year => 
            <option value={year} key={year}>{year}</option>
          )}
        </Form.Control>
      </td>
      <td>
        <Form.Control disabled={disabledValue} as="select" id={`examMon-${id}`}  name="examMon" value={obj.state.examMon[id]} onChange={obj.handleDropdownChange} 
            ref={input => {
                obj[`examMonRef${id}`] = input;
            }} >
        
        <option value="" key="select">Select</option>
         {obj.state.examMonList.map(mon => 
            <option value={mon} key={mon}>{mon}</option>
          )}
        </Form.Control>
      </td>
      <td>
        <Form.Control disabled={disabledValue} as="select" id={`sem-${id}`}  name="sem" value={obj.state.sem[id]} onChange={obj.handleDropdownChange} 
            ref={input => {
                obj[`semRef${id}`] = input;
            }} >
        
        <option value="" key="select">Select</option>
         {obj.state.semList.map(sem => 
            <option value={sem} key={sem}>{sem}</option>
          )}
        </Form.Control>
      </td>
      <td>
        <Form.Check className="marksheetCheck" type="checkbox" id={`check-${id}`} 
            ref={input => {
                obj[`check${id}`] = input;
            }} 
        value={id} onChange={obj.handleCheck.bind(obj)} />
      </td>
      <td>
        <Button variant="secondary" size="sm" id={`preview-${id}`}  
            ref={input => {
                    obj[`previewRef${id}`] = input;
                }} 
            style={{display: "none"}}  onClick={obj.handlePreviewMarks.bind(obj)}>
               Preview
        </Button>
        
      </td>
      <td>
        <Button variant="danger" size="sm" id={`removeReq-${id}`} 
        ref={input => {
            obj[`removeReqRef${id}`] = input;
        }} 
        style={{display:"block"}}
        onClick={obj.removeMarksheetRequest.bind(obj)}>Remove</Button>
      </td>
      
    </tr>
    </>
  );

const mapStateToProps = state => {
	return {
        student: state,
        imageUrl : state.imageUrl
	}
}

export default connect(mapStateToProps)(analyticsManager(IssuanceOfMarksheet))
