import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
// import "material-design-icons/iconfont/material-icons.css";
import { AssignmentAttachment } from "../AssignmentAttachment/AssignmentAttachment";

export class PdfLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   let questionFileType = this.props.testQuestion.question.split(".").pop();
    let answerFileType = ''
    
    if(this.props.testQuestion.testQuestionsAnsDetails.studentAnswer){ 
      answerFileType =  this.props.testQuestion.testQuestionsAnsDetails.studentAnswer.split(".").pop();
    }

    return (
      <>
         <Col xs={12} 
        className="IAResultDetails_Text"
        style={{ width: "100%"}}>
          {this.props.testQuestion.question && (
          <AssignmentAttachment attachmentType={"question"} fileType={questionFileType} source={this.props.testQuestion.question}/> 
           )}                
        </Col> 
        <span className="IAResultDetails_optionFont">Your answer:</span>

        <Col
          xs={12}
          className="IAResultDetails_Text"
          style={{ width: "100%", paddingBottom: 10 }}
        >
          {this.props.testQuestion.testQuestionsAnsDetails.studentAnswer ? (          
            <AssignmentAttachment attachmentType={"answer"} fileType={answerFileType} source={this.props.testQuestion.testQuestionsAnsDetails.studentAnswer}/>
           ) : (
            <>Not Attempted</>
          )}
        </Col>

        <span
          style={{ width: "100%", lineHeight: 1 }}
          className="IAResultDetails_optionFont"
        >
          Marks : {this.props.testQuestion.testQuestionsAnsDetails.marksObtained} /{" "}
          {this.props.testQuestion.marks}
        </span>

        <span
          style={{ width: "100%", lineHeight: 1.5 }}
          className="IAResultDetails_optionFont"
        >
          Faculty Remark:
        </span>

        {/* <Col className="IAResultDetails_Text" xs={12} style={{ width: "100%" }}>
          {this.props.testQuestion.remarks ? this.props.testQuestion.remarks : null}
        </Col> */}
      </>
    );
  }
}
