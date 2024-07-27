import React,{  Component } from "react";
import Col from 'react-bootstrap/Col';
import { Option } from '../Option/Option';
import { IAQuestion } from '../IAQuestion/IAQuestion';
import { CorrectAnswer } from '../CorrectAnswer/CorrectAnswer';
import { Alert } from "react-bootstrap";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export class CaseStudy extends Component{
    constructor(props) {
        super(props);       
     
    }
    render(){
        return(
            <>
            <Col xs={12}>
              <div className="IAResultDetails_well IAResultDetails_Text">
                {this.props.attempt.description}
              </div>
            </Col>

            <span className="IAResultDetails_optionFont">
              Sub-Questions:
            </span>

            <Col xs={12} style={{ width: "100%" }}>
              <div className="IAResultDetails_well">
                {this.props.attempt.subQuestionsList.map(
                  (subQuestion, sqIndex) => (
                    <>
                      <IAQuestion
                        question={subQuestion}
                        index={sqIndex}
                      />

                      <span className="IAResultDetails_optionFont">
                        Options:
                      </span>

                      <Col xs={12} style={{ width: "100%" }}>
                        {subQuestion.optionsList.map(
                          (sbOption, sboIndex) => (
                            <Option
                              options={sbOption}
                              oIndex={sboIndex}
                            />
                          )
                        )}
                        <CorrectAnswer question={subQuestion} />
                        {this.props.bodApplied && 
                          <Alert variant="success">
                            <ErrorOutlineIcon/> Benefit of Doubt has been applied for this question.
                          </Alert>}
                      </Col>
                    </>
                  )
                )}
              </div>
            </Col>
          </>
        )
    }
}