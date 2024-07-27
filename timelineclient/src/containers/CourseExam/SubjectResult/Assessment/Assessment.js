import React from 'react'
import { Col, Card, OverlayTrigger, Tooltip } from 'react-bootstrap'

import { Link } from 'react-router-dom'

import moment from 'moment'
import { Pages } from '../../../../shared/config';

function getAssessmentTitle(assessmentName){
    
    var title = "";
    if(assessmentName.length > 60){
        title = assessmentName.substring(0, 55) + "..." 
        // + assessmentName.substring(assessmentName.length - 3 , assessmentName.length)
    }else{
        title = assessmentName
    }
    return title;
}

function formatScore(score){
    if(score == undefined || score == null || score == 'NULL' || score == 'null'){
        return "NA"
    }else{
        return score
    }
}

function getAssessmentDate(assessmentDate){
    var assessmentDateToPrint;

    if(assessmentDate){
        assessmentDateToPrint = moment(assessmentDate).format('L')
    }else{
        assessmentDateToPrint = (
                <strong className="course-text-red">
                    NA
                </strong>
            )
    }

    return assessmentDateToPrint;
}

const Assessment = (props) => {
    
    let assessment = props.attemptedTest
    return (
        <div className="assessment-col my-2">
            <Card  
                className = { 
                    "subject-result " + 
                    (
                        assessment.isScoreSelectedForBestOf7 && assessment.isScoreSelectedForBestOf7 === true 
                            ? "counted" 
                            : "not-counted"
                    )
                }
            >                  
            <div className="card-header subject-result-assessment-name d-flex align-items-center">
                    <Link 
                        to = {{
                            pathname: Pages.viewTestResults,
                            state: {
                                
                                testId : props.attemptedTest.id,
                                // module : props.sessionPlanModule,
                                testName: props.attemptedTest.testName,
                                isAssessmentResult: true
                            }
                        }}
                    >
                        <OverlayTrigger
                        placement='bottom'
                        overlay={
                            <Tooltip id={`tooltip-${assessment.id}`}>
                                {assessment.testName}
                            </Tooltip>
                        }
                        >
                            <strong>
                                {
                                    getAssessmentTitle(
                                        assessment.testName
                                    )
                                }
                            </strong>
                        </OverlayTrigger>
                    </Link>
                </div>
                <div className="p-1 px-3">
                    <div className="subject-result-marks d-flex align-items-center">
                        <div className="mx-auto">
                            <span className="subject-score">
                                { formatScore(assessment.score) }
                            </span>
                            <span className="subject-score-seperator">
                                /
                            </span>
                            <span className="subject-score">
                                { formatScore(assessment.maxScore) }
                            </span>
                        </div>
                    </div>
                </div>
                <div className="card-footer bg-white subject-result-date d-flex align-items-end">
                    <small className="ml-auto">
                        { getAssessmentDate(assessment.testStartedOn) }
                    </small>
                </div>
            </Card>
        </div>
    )
}

export default Assessment