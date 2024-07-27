import React, { Component } from 'react';
import axios from 'axios';
import ConfigUrls from '../../shared/config';
import './SessionFeedbackForm.css';
import handleValidation from "../ServiceRequest/Validations";
import Alert from 'react-bootstrap/Alert';
import $ from "jquery";
import "jquery-ui-bundle";
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog';
import { SessionAttendace } from './SessionAttendance/SessionAttendance';
import { Header } from './Header/Header';
import { RatingSlider } from './RatingSlider/RatingSlider';
import { WorkedOptions } from './WorkedOptions/WorkedOptions';
import { NotWorkedOptions } from './NotWorkedOptions/NotWorkedOptions';
import { RatingSliderForNotWorked } from './RatingSliderForNotWorked/RaingSliderForNotWorked';
import { Card, Button, Modal } from 'react-bootstrap';
import AllFeedbacks from './AllFeedbacks';
import { NavLink, Link } from 'react-router-dom'
const api = new ConfigUrls().api;


class SessionFeedbackForm extends Component{ 


    state ={
        showConfirmDialog : false,
        ratingArray:['1','2','3','4','5','6','7'],
        questions:{'q1Response':"The subject matter covered in this session helped you to understand and learn effectively?",
        'q2Response':"The course material used was helpful towards today's session?",
        'q3Response':"Audio quality was upto the mark?",
        'q4Response':"Video quality was upto the mark?",
        'q5Response':"The Faculty was organized and well prepared for the class?",
        'q6Response':"The Faculty was effective in communicating the concept in the class (in terms of clarity and presenting the concepts in understandable manner)?",
        'q7Response':"The Faculty was responsive to student's learning difficulties and dealt with questions appropriately.",
        'q8Response':"The learning process adopted (e.g. case studies, relevant examples and presentation work etc.) were helpful towards learning from the session?"
        },
        options:{"Learning Effectiveness":'q1Response', "Content Shared":'q2Response', "Audio Quality":'q3Response', "VideoQuality":'q4Response', "Faculty Readiness":'q5Response', "Concept Presentation":'q6Response', "Query Responses":'q7Response', "Relevant Examples/Case Studies":'q8Response'},
        responses:{'studentConfirmationForAttendance' : "", 'reasonForNotAttending' : "", 'rateExp': "", 'q1Response' : "",'q2Response': "",'q3Response':"", 'q4Response': "", 'q5Response': "", 'q6Response': "", 'q7Response':"", 'othersWorked': "", 'othersNotWorked': "", /*'attended': "",*/ 'rateExpNotWorked': ""},
        remarks : {'otherReasonForNotAttending' : "", 'feedbackRemarks': "", 'q1Remarks': "", 'q2Remarks': "", 'q3Remarks': "", 'q4Remarks': "", 'q5Remarks': "", 'q6Remarks': "", 'q7Remarks': "", 'q8Remarks': ""},
        pendingFeedbackData :{},
        pendingFeedbacks:[],
        displayOthers :{'q1ResponseRemarks' : 'none', 'q2ResponseRemarks' : 'none', 'q3ResponseRemarks' : 'none',
        'q4ResponseRemarks' : 'none', 'q5ResponseRemarks' : 'none', 'q6ResponseRemarks' : 'none',
        'q7ResponseRemarks' : 'none', 'q8ResponseRemarks' : 'none', 'studentConfirmationForAttendanceRemarks' : 'none',
        'rateExpForm': "none", 'othersWorkedInput': "none", 'othersNotWorkedInput': "none", 
        'notAttendedNotWorkedInput': "none", 'rateExpNotWorkedForm': "none", 'reasonForNotAttendingRemarks' : 'none', 
        'hideAllOtherForms' : 'none'              
        },
        fieldsToValidate :{},
        errors:{},
        studentData:[],
        status:'',
        skipAll : false,
        reasonArray :["Unable to login to Student Portal", "Unable to join the session as the session reached full capacity",
                      "Unable to install Zoom Plug-Ins and connect to session", "Unable to join the session as it requested for a meeting number", 
                      "Unable to join the session as the meeting number was invalid", "Unable to join the session as the meeting was not in progress", "Others" ],
        // workedArr: [],
        // notWorkedArr: [],
        show:false
       
    }

    handleDialogClose = () => {
      this.setState({
          showConfirmDialog : false,
          dialogProps : {}
      })
    }  
    
    resetAll = () => {
        let tempResponses = this.state.responses;
        let tempRemarks = this.state.remarks; 
        Object.keys(this.state.responses).forEach(function(key) {
                tempResponses[key] = ""
        })
        Object.keys(this.state.remarks).forEach(function(key) {
            tempRemarks[key] = ""
        })

        $(".slider").each(function () {
            $(this).slider({
              value: 1,
            });
            $(this).find(".text strong").html("-");
          });
      
          $("#worked button").each(function () {
            if ($(this).data("if") == "selected") {
              $(this).click();
              if ($("#othersWorkedInput textarea").html() != "") {
                $("#othersWorkedInput textarea").html("");
              }
            }
          });
      
          $("#notWorked button").each(function () {
            if ($(this).data("if") == "selected") {
              $(this).click();
              if ($("#othersNotWorkedInput textarea").html() != "") {
                $("#othersNotWorkedInput textarea").html("");
              }              
            }
          });
      
          if ($("#rateExpYes").data("if") == "selected") {
            $("#rateExpYes").data("if", "notSelected");
            $("#rateExpYes").removeClass("btn-primary");
            $("#rateExpYes").addClass("btn-outline-primary");
            $("#rateExpNotWorkedFormHtml").html("");
          }
      
          if ($("#rateExpNo").data("if") == "selected") {
            $("#rateExpNo").data("if", "notSelected");
            $("#rateExpNo").removeClass("btn-primary");
            $("#rateExpNo").addClass("btn-outline-primary");
          }

        this.setState({
            responses: tempResponses,
            remarks : tempRemarks,
            displayOthers :{'q1ResponseRemarks' : 'none', 'q2ResponseRemarks' : 'none', 'q3ResponseRemarks' : 'none',
            'q4ResponseRemarks' : 'none', 'q5ResponseRemarks' : 'none', 'q6ResponseRemarks' : 'none',
            'q7ResponseRemarks' : 'none', 'q8ResponseRemarks' : 'none', 'studentConfirmationForAttendanceRemarks' : 'none',
            'rateExpForm': "none", 'othersWorkedInput': "none", 'othersNotWorkedInput': "none", 
            'notAttendedNotWorkedInput': "none", 'rateExpNotWorkedForm': "none", 'reasonForNotAttendingRemarks' : 'none', 
            'hideAllOtherForms' : 'none'
            },
            fieldsToValidate :{},
            errors:{},
        },()=>{
          console.log("state data after reset",this.state);
        })
    }    

      handleSessionAttendance = (data) => {
        console.log("handleSessionAttendance",data);
        this.setState({
          responses:data.responses,
          remarks:data.remarks,
          displayOthers:data.displayOthers,
          fieldsToValidate:data.fieldsToValidate,
          errors:data.errors,
        })        
      }

      handleRatingSlider = (data) => {
        console.log("handleRatingSlider",data);
        this.setState({
          responses:data.responses,          
          displayOthers:data.displayOthers,          
        })        
      }

      handleWorkedOptions = (data) => {
        console.log("handleWorkedOptions",data);
        this.setState({
          responses:data.responses,          
          displayOthers:data.displayOthers,     
          errors:data.errors,     
        })
      }

      handleNotWorkedOptions = (data) => {
        console.log("handleNotWorkedOptions",data);
        this.setState({
          responses:data.responses,          
          displayOthers:data.displayOthers,     
          errors:data.errors,     
        })
      }

      handleRateExpNotWorkedOptions = (data) => {
        console.log("handleRateExpNotWorkedOptions",data);
        this.setState({
          responses:data.responses, 
          remarks:data.remarks,         
          displayOthers:data.displayOthers,  
          dialogProps:data.dialogProps,
          showConfirmDialog:data.showConfirmDialog,               
        })
      }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log('In feedback getDerivedStateFromProps()...');
        console.log("Got nextProps, prevState : ")
        console.log(nextProps)
        console.log(prevState)
        if(prevState.pendingFeedbackData && nextProps.pendingFeedbackData.id!==prevState.pendingFeedbackData.id){
            if(nextProps.responses) {
                Object.keys(nextProps.responses).forEach(function(key) {
                    nextProps.responses[key] = ""
                })
            }
            if(nextProps.remarks) {
                Object.keys(nextProps.remarks).forEach(function(key) {
                    nextProps.remarks[key] = ""
                })
            }
          let returnNewValuesObj = {
            pendingFeedbackData : nextProps.pendingFeedbackData,
            studentData : nextProps.studentData,
            fieldsToValidate :{},
            errors:{},
          }
          
          console.log("returnNewValuesObj : ");
          console.log(returnNewValuesObj);
         return returnNewValuesObj;
        }
        else { 
          console.log("returning prevState : ");
          return prevState;
        }
      }
    handleSkipFeedback = (event) =>{
        let status = 'skip';
        return this.props.onComplete(status,this.state.pendingFeedbackData.sapId, this.props.currentIndex, this.state.pendingFeedbackData);
    }
    handleSaveFeedback = (event) => {

        //---->set fieldsToValidateHash variable for fieldsToValidate validatng all fields on save
        let fieldsToValidateHash = this.state.fieldsToValidate;
        let errorHash ={};
        var alerts = "";
        this.setState({
            errors : errorHash
        })
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^"+JSON.stringify(this.state.fieldsToValidate));                
                    
        if(this.state.responses['studentConfirmationForAttendance'] === ''){
          fieldsToValidateHash['studentConfirmationForAttendance'] =  {"name" : "studentConfirmationForAttendance", "value" : this.state.responses['studentConfirmationForAttendance'], "type" : "mandatoryText"};
        }
        
        if(this.state.responses['studentConfirmationForAttendance'] === 'N'){
            if(fieldsToValidateHash["studentConfirmationForAttendance"]){
                delete fieldsToValidateHash["studentConfirmationForAttendance"];
            }
            fieldsToValidateHash['reasonForNotAttending'] = {"name" : "reasonForNotAttending", "value" : this.state.responses['reasonForNotAttending'], "type" : "mandatoryText"};
            if(this.state.responses['reasonForNotAttending'] !== ""){
                console.log("this.state.reasonForNotAttending----",this.state.responses['reasonForNotAttending'])
                if(this.state.responses['reasonForNotAttending'] === "Others"){
                    console.log("inside if*&*&*&*&**&*&*&*&*&*&")
                    fieldsToValidateHash['otherReasonForNotAttending'] = {"name" : "otherReasonForNotAttending", "value" : this.state.remarks['otherReasonForNotAttending'], "type" : "mandatoryText"};
                }
                else{
                    console.log("inside else*&*&*&*&**&*&*&*&*&*&")
                    if(fieldsToValidateHash["otherReasonForNotAttending"]) 
                        console.log("inside else---if---*&*&*&*&*&*&*&*&*&*")
                        delete fieldsToValidateHash["otherReasonForNotAttending"]
                      
                }
            }
        }
        //---->if attendance is Y,
        if(this.state.responses['studentConfirmationForAttendance'] === 'Y'){
            fieldsToValidateHash ={};
            if(fieldsToValidateHash["studentConfirmationForAttendance"]){
                delete fieldsToValidateHash["studentConfirmationForAttendance"];
            }          

             //---->validate all responses
            //  var tempResponses = this.state.responses;
            //  var tempRemarks = this.state.remarks;
            //  Object.keys(this.state.responses).forEach(function(key) {
            //    console.log("keys--!!!!!!!!---"+key);
            //    if(key != 'studentConfirmationForAttendance' && key !='reasonForNotAttending' && key != 'othersWorked' && key!= 'othersNotWorked')
            //        fieldsToValidateHash[key] = {"name" : key, "value" : tempResponses[key], "type" : "mandatoryText"};
            //  });
             
             /////////////////////////////
             //---->if responses are < 5 validate remark fields
 
             // Object.keys(this.state.responses).forEach(function(key) {
             //     // console.log("keys--###############---"+tempRemarks.key.slice(0,2) + "Remarks");
             //     if(key !== 'otherReasonForNotAttending' && key !== 'feedbackRemarks'){
             //         if(tempResponses[key] && parseInt(tempResponses[key]) <5 ){
             //             fieldsToValidateHash[key.slice(0,2) + "Remarks"] = {"name" : key.slice(0,2) + "Remarks", "value" : tempRemarks[key.slice(0,2) + "Remarks"], "type" : "mandatoryText"};
             //         }
             //     }
                 
             // });
 

              if (this.state.responses["rateExp"] == "") {
                this.setState({
                  showConfirmDialog : true,
                  dialogProps : {
                      title: 'Field is Required!',
                      message: 'Please rate your experience!',
                  }
                })
                alerts += "Please rate your experience! \n";
              } else {     
                
                if($("#othersWorked").data("if")=="selected" && $("#othersWorkedInput textarea").html().trim()==""){
                  this.setState({
                    showConfirmDialog : true,
                    dialogProps : {
                        title: 'Field is Required!',
                        message: "Please leave a comment for other worked option!",
                    }
                  })
                  alerts +=
                    "Please leave a comment for other worked option!";
                } 
                else if($("#othersNotWorked").data("if")=="selected" && $("#othersNotWorkedInput textarea").html().trim()==""){
                  this.setState({
                    showConfirmDialog : true,
                    dialogProps : {
                        title: 'Field is Required!',
                        message: "Please leave a comment for other not worked option!",
                    }
                  })
                  alerts +=
                    "Please leave a comment for other not worked option!";
                } 
                else{
                  if (this.state.responses["rateExpNotWorked"] == "") {
                    this.setState({
                      showConfirmDialog : true,
                      dialogProps : {
                          title: 'Field is Required!',
                          message: "Please choose yes or no to rate your experience for options which didn't work for you!",
                      }
                    })
                    alerts +=
                      "Please choose yes or no to rate your experience for options which didn't work for you!";
                  }
                  else{
                    if (this.state.responses["rateExpNotWorked"] == "Y") {
                      var c = 0;
                      $("#rateExpNotWorkedFormHtml .slider .text strong").each(function () {
                        if ($(this).html().trim() == "-") {
                          c++;
                        }                    
                      });
                      if (c != 0) {
                        this.setState({
                          showConfirmDialog : true,
                          dialogProps : {
                              title: 'Field is Required!',
                              message: "Please rate your experience for options which didn't work for you!",
                          }
                        })
                        alerts +=
                          "Please rate your experience for options which didn't work for you!";
                      }
                    }
                    
                    if(this.state.responses["rateExpNotWorked"] == "Y"){
                      var c=0;
                      $("#rateExpNotWorkedFormHtml .slider .text strong").each(function () {                      
                        if (parseInt($(this).html().trim())<5) {
                          if($("#"+$(this).data("val").slice(0,2)+"Remarks textarea").val().trim()==""){
                            c++;
                          }
                        }
                      });                    
                      if(c!=0){
                        this.setState({
                          showConfirmDialog : true,
                          dialogProps : {
                              title: 'Field is Required!',
                              message: "Please add a remark for the options which has below 5 rating!",
                          }
                        })
                        alerts+="Please add a remark for the options which has below 5 rating!";
                      }
                  }
                }
              }
            }
        }        
      if (alerts == "") {
        console.log("^^^^^^^^^^^^^^^^^^^^^^^^111111111111"+JSON.stringify(fieldsToValidateHash));

        this.setState({
            fieldsToValidate : fieldsToValidateHash
        }, () => {
            //---->validate entire form
            handleValidation(this);
            console.log("inside update----fieldsToValidate--*******"+JSON.stringify(this.state.fieldsToValidate))
            console.log("inside update----errors--*******"+JSON.stringify(this.state.errors));
            if(Object.entries(this.state.errors).length === 0){  
                console.log("inside-11111---errors--"+JSON.stringify(this.state.errors));
                let formData = {
                    sapId : this.state.pendingFeedbackData.sapId,
                    sessionId : this.state.pendingFeedbackData.sessionId,   
                    studentConfirmationForAttendance : this.state.responses['studentConfirmationForAttendance'],                 
                    q1Response : this.state.responses['q1Response'],
                    q1Remark: this.state.remarks['q1Remarks'],
                    q2Response : this.state.responses['q2Response'],
                    q2Remark: this.state.remarks['q2Remarks'],
                    q3Response : this.state.responses['q3Response'],
                    q3Remark: this.state.remarks['q3Remarks'],
                    q4Response : this.state.responses['q4Response'],
                    q4Remark : this.state.remarks['q4Remarks'],
                    q5Response : this.state.responses['q5Response'],
                    q5Remark: this.state.remarks['q5Remarks'],
                    q6Response : this.state.responses['q6Response'],
                    q6Remark: this.state.remarks['q6Remarks'],
                    q7Response : this.state.responses['q7Response'],
                    q7Remark: this.state.remarks['q7Remarks'],
                    q8Response : this.state.responses['q8Response'],
                    q8Remark: this.state.remarks['q8Remarks'],                   
                    feedbackRemarks: this.state.responses["othersWorked"] + "~|~" + this.state.responses["othersNotWorked"],                    
                    //attended: this.state.responses["attended"],
                    // rateExpNotWorked: this.state.responses["rateExpNotWorked"],
                    reasonForNotAttending: this.state.responses["reasonForNotAttending"],
                    otherReasonForNotAttending : this.state.remarks['otherReasonForNotAttending'],
                }
              
                console.log("formdata----------"+JSON.stringify(formData))
                axios.defaults.headers.post['Content-Type'] = 'application/json';
                formData=JSON.stringify(formData);
                axios.post(api.saveSessionFeedback , formData
                // axios.post("http://localhost:8080/studentportal/m/FeedbackSave" , formData
                ).then(response => {
                    console.log("response of feedbacksave--"+JSON.stringify(response))
                    this.resetAll();
                    if(Object.entries(response.data).length !== 0){
                        console.log("inside session feedback-----if-----")
                        //---->if api response is success,
                        if(response.data.success == "true" || response.data.success == true){
                            let status = "success";
                            let displayOthersTemp = this.state.displayOthers;
                            //---->hide form
                            displayOthersTemp['hideAllOtherForms'] = "none";
                            // displayOthersTemp['rateExpForm'] = "none";
                            // displayOthersTemp['othersWorkedInput'] = "none";
                            // displayOthersTemp['othersNotWorkedInput'] = "none";
                            //displayOthersTemp['notAttendedNotWorkedInput'] = "none";
                            //displayOthersTemp['rateExpNotWorkedForm'] = "none";                   
                            this.setState({
                                status : 'success',
                                displayOthers : displayOthersTemp,
                            })
                            if(this.props.show==true)
                            {
                            
                              this.setState({
                                status : 'success',
                                displayOthers : displayOthersTemp,
                            })
                            }
                            else{
                              status='skip'
                              this.setState({
                                status : 'skip',
                                displayOthers : displayOthersTemp,
                            })
                          }

                            //------> return status and id to router
                            return this.props.onComplete(status,this.state.pendingFeedbackData.sapId, this.props.currentIndex, this.state.pendingFeedbackData);
                            
                        }else{
                            let status = "error"
                            console.log("inside session feedback-----else-----");
                            let displayOthersTemp = this.state.displayOthers;
                            //---->hide form     
                            displayOthersTemp['hideAllOtherForms'] = "none";
                            // displayOthersTemp['rateExpForm'] = "none";
                            // displayOthersTemp['othersWorkedInput'] = "none";
                            // displayOthersTemp['othersNotWorkedInput'] = "none";
                            // displayOthersTemp['notAttendedNotWorkedInput'] = "none";
                            // displayOthersTemp['rateExpNotWorkedForm'] = "none";                        
                            this.setState({
                                status : 'error',
                                displayOthers : displayOthersTemp,
                            })
                            return this.props.onComplete(status,this.state.pendingFeedbackData.sapId, this.props.currentIndex, this.state.pendingFeedbackData);
                        }
                    }
                    else{
                        //---->in no data in api,
                        let status = "error"
                        console.log("inside session feedback-----else-----");
                        let displayOthersTemp = this.state.displayOthers;
                        //---->hide form 
                        displayOthersTemp['hideAllOtherForms'] = "none";       
                        // displayOthersTemp['rateExpForm'] = "none";
                        // displayOthersTemp['othersWorkedInput'] = "none";
                        // displayOthersTemp['othersNotWorkedInput'] = "none";
                        // displayOthersTemp['notAttendedNotWorkedInput'] = "none";
                        // displayOthersTemp['rateExpNotWorkedForm'] = "none";                
                        this.setState({
                            status : 'error',
                            displayOthers : displayOthersTemp,
                        })
                        return this.props.onComplete(status,this.state.pendingFeedbackData.sapId, this.props.currentIndex, this.state.pendingFeedbackData);
                    }
                }).catch(error => {
                    //---->in case of error api,
                    console.log("response of feedback--error------------!!!!!!"+JSON.stringify(error))
                    return this.props.onComplete('error',this.state.pendingFeedbackData.sapId,  this.props.currentIndex, this.state.pendingFeedbackData);
                })
            }
        })                
      }      
  }  

    componentDidMount()
    {
      if(this.props.show===true)
      {
          document.getElementById("viewAllFeedbacksButton").style.display="none"
          document.getElementById("backButton").style.display="inline"
      }
      else
      {
        document.getElementById("viewAllFeedbacksButton").style.display="inline"
        document.getElementById("backButton").style.display="none"
      }
    }
    render(){
        let options = this.state.options;
        let self = this;
        // render form--
        return(
            <Card style={{marginLeft:'20%'}}>
                    {this.state.status && this.state.status === 'success' ? 
                        <><Alert variant="success">
                            Feedback saved successfully!
                        </Alert></>
                    : null
                    }
                    {this.state.status && this.state.status === 'error' ? 
                        <><Alert variant="danger">
                            Error in saving Feedback.
                        </Alert></>
                    : null
                    }
                <Card.Body>
                    {/* session feedback header---- */}                    
                    <Header pendingFeedbackData={this.state.pendingFeedbackData} /> 

                    {/* section 1 Session Attendance--------------- */} 
                    <SessionAttendace stateData={this.state} onChange={this.handleSessionAttendance} />             

                    {/* Rate Exp --------------- */}
                    <RatingSlider stateData={this.state} onChange={this.handleRatingSlider} /> 

                    {/* Worked options --------------- */}
                    <WorkedOptions stateData={this.state} onChange={this.handleWorkedOptions} />

                    {/* Not Worked options --------------- */}
                    <NotWorkedOptions stateData={this.state} onChange={this.handleNotWorkedOptions} />

                    {/* option to rate Not Worked options*/}
                    <RatingSliderForNotWorked stateData={this.state} onChange={this.handleRateExpNotWorkedOptions} />

                    <hr/>
                        <div className="forButtons">
                            <Button variant="primary" id="btnUpdate" onClick={this.handleSaveFeedback}>Save Feedback</Button><span style={{margin:'4%'}}></span>
                            {/* <Button variant="primary" id="btnSkip" onClick={this.handleSkipFeedback}>I will do this later</Button><span style={{margin:'4%'}}></span> */}
                            {/* <Button variant="primary" id="btnUpdate" onClick={this.handleViewAllFeedbacks}>View All {this.props.pendingFeedbacks.length} Pending Feedbacks</Button><span style={{margin:'4%'}}></span> */}
                            <Button id="viewAllFeedbacksButton" variant="primary"><Link className="viewAllFeedbacksLink" id="viewAllFeedbacksLink" to={{pathname:"/timeline/viewAllFeedbacks", state:{pendingFeedbacks:this.props.pendingFeedbacks}}}>View All Pending Feedbacks</Link></Button>
                            <Button id="backButton" variant="danger"><Link className="viewAllFeedbacksLink" id="viewAllFeedbacksLink" to={{pathname:"/timeline/viewAllFeedbacks", state:{pendingFeedbacks:this.props.pendingFeedbacks}}}>Back</Link></Button>
                            {/* <Link to={{pathname:"/", state: {fromDashboard: true }}} */}
                        </div>
                    {/* <Row> */}
                        {/* <div className="forButtons">
                            <Button variant="primary" id="btnUpdate" onClick={this.handleSaveFeedback}>Save Feedback</Button><span style={{margin:'4%'}}></span>
                        </div> */}
                    {/* </Row> */}
                    <ConfirmDialog
                        open = {this.state.showConfirmDialog}
                        handleClose = {this.handleDialogClose}
                        {...this.state.dialogProps}
                    />
                </Card.Body>
            </Card>
        )
    }
}

export default SessionFeedbackForm