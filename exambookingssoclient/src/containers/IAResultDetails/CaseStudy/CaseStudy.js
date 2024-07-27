import React,{  Component } from "react";
import Col from 'react-bootstrap/Col';
import { Option } from '../Option/Option';
import { IAQuestion } from '../IAQuestion/IAQuestion';
import { CorrectAnswer } from '../CorrectAnswer/CorrectAnswer';


export class CaseStudy extends Component{
    constructor(props) {
        super(props);       
     
    }
    render(){
        return(
            <>
            <Col xs={12}>
              <div className="IAResultDetails_well IAResultDetails_Text">
                {this.props.testQuestion.description}
              </div>
            </Col>

            <span className="IAResultDetails_optionFont">
              Sub-Questions:
            </span>

            <Col xs={12} style={{ width: "100%" }}>
              <div className="IAResultDetails_well">
                {this.props.testQuestion.subQuestionsList.map(
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