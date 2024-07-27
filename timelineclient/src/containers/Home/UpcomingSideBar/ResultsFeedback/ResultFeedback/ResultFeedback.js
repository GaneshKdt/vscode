import React from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import { Pages } from '../../../../../shared/config';

const ResultFeedback = (props) => {
        
    var sessionPlanData
    if(props.student && props.student.sessionPlanData && props.student.sessionPlanData.length > 0){
        props.student.sessionPlanData.forEach((sessionPlan) => {
            if(props.feedback.referenceId == sessionPlan.id){
                sessionPlanData = sessionPlan
            }
        })
    }

    return(
        <ListGroup.Item >
            <Row>
                <Col lg={2} sm={1}>
                    <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"1%"}}>
                        <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                    </svg>
                </Col>
                <Col>
                    <Link
                        to={{
                            pathname: Pages.viewTestResults,
                            state: {
                                sapId : props.student.sapid,
                                testId : props.feedback.id,
                                module : sessionPlanData,
                                testName: props.feedback.testName
                            }
                        }} 
                    >{props.feedback.testName}</Link>
                
                    <br/>
                    <small><b>Marks Obtained: {props.feedback.score ? props.feedback.score : 0}/{props.feedback.maxScore ? props.feedback.maxScore : 0}   </b> </small>
                    <br/>
                    <small><b>Test Date: <Moment format="MMM D hh:mm a \(\I\S\T\)" withTitle>{props.feedback.startDate}</Moment></b> </small> 
                </Col> 
            </Row>
        </ListGroup.Item>
    )
}

export default ResultFeedback