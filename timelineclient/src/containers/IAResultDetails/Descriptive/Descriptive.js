import React,{  Component } from "react";
import Col from 'react-bootstrap/Col';
import { AssignmentAttachment } from "../AssignmentAttachment/AssignmentAttachment";
import { Badge } from "react-bootstrap";

export class Descriptive extends Component{
    constructor(props) {
        super(props); 
    }
    render(){
        return(
            <>
            <span className="IAResultDetails_optionFont">
              Your answer:
            </span>

            <Col
              xs={12}
              className="IAResultDetails_Text"
              style={{ width: "100%", paddingBottom: 10 }}
            >
              {this.props.attempt.studentQuestionResponse.answer ? 
                <>
                  {this.props.attempt.studentQuestionResponse.answer.startsWith("https://") ? (
                    <AssignmentAttachment attachmentType={"answer"} fileType={this.props.attempt.studentQuestionResponse.answer.split(".").pop()} 
                      source={this.props.attempt.studentQuestionResponse.answer}/>
                  ) : (
                    <p style={{ whiteSpace: "pre-wrap"}}>{this.props.attempt.studentQuestionResponse.answer}</p>
                  )}
                </>
              : (
                <>Not Attempted</>
              )}
            </Col>

            <span
              style={{ width: "100%" ,lineHeight: 1 }}
              className="IAResultDetails_optionFont" 
            >
              Marks : {this.props.bodApplied ? this.props.attempt.marks: this.props.attempt.marksObtained} / {this.props.attempt.marks}
              {this.props.bodApplied && 
                <Badge pill variant="success" className="bod-badge">
                  Benefit of Doubt applied
                </Badge>}
            </span>
            
            <span
              style={{ width: "100%" , lineHeight: 1.5}}
              className="IAResultDetails_optionFont"
            >
              Faculty Remark:
            </span>

            <Col
              className="IAResultDetails_Text"
              xs={12}
              style={{ width: "100%" }}
            >
              {this.props.attempt.remarks ? this.props.attempt.remarks : null}
            </Col>
          </>
        )
    }
}