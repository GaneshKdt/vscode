import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Card, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "material-design-icons/iconfont/material-icons.css";
import { AssignmentAttachment } from "../AssignmentAttachment/AssignmentAttachment";

export class PdfLink extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let questionFileType = this.props.attempt.url.split(".").pop();
    let answerFileType = ''
    
    if(this.props.attempt.studentQuestionResponse.answer){ 
      answerFileType =  this.props.attempt.studentQuestionResponse.answer.split(".").pop();
    }

    return (
      <>
        <Col xs={12} 
        className="IAResultDetails_Text"
        style={{ width: "100%"}}>
          {this.props.attempt.url && (
          <AssignmentAttachment attachmentType={"question"} fileType={questionFileType} source={this.props.publicUrl + this.props.attempt.url}/> 
           )}                
        </Col>
        <span className="IAResultDetails_optionFont">Your answer:</span>

        <Col
          xs={12}
          className="IAResultDetails_Text"
          style={{ width: "100%", paddingBottom: 10 }}
        >
          {this.props.attempt.studentQuestionResponse.answer ? (          
            <AssignmentAttachment attachmentType={"answer"} fileType={answerFileType} source={this.props.attempt.studentQuestionResponse.answer}/>
           ) : (
            <>Not Attempted</>
          )}
        </Col>

        <span
          style={{ width: "100%", lineHeight: 1 }}
          className="IAResultDetails_optionFont"
        >
          Marks : {this.props.bodApplied ? this.props.attempt.marks: this.props.attempt.marksObtained} /{" "}
          {this.props.attempt.marks}
          
          {this.props.bodApplied && 
            <Badge pill variant="success" className="bod-badge">
              Benefit of Doubt applied
            </Badge>}
        </span>

        <span
          style={{ width: "100%", lineHeight: 1.5 }}
          className="IAResultDetails_optionFont"
        >
          Faculty Remark:
        </span>

        <Col className="IAResultDetails_Text" xs={12} style={{ width: "100%" }}>
          {this.props.attempt.remarks ? this.props.attempt.remarks : null}
        </Col>
      </>
    );
  }
}
