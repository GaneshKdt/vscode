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
                <Col>
                    <Link 
                        to={Pages.facultyQuestionAnswers}
                    >
                        <div class="d-inline-block text-truncate">
                            {props.query.query}
                        </div>
                    </Link>
                    <br/>
                    <div class="d-inline-block text-truncate">
                        {props.query.answer}
                    </div>
                    <br/>
                    <small><b>{props.query.facultyName ? "Answered By: " + props.query.facultyName : ""}</b> </small>
                    <br/>
                    <small><b>Answered : <Moment format="MMM D hh:mm a \(\I\S\T\)" withTitle>{props.query.lastUpdatedOn}</Moment></b> </small> 
                </Col> 
            </Row>
        </ListGroup.Item>
    )
}

export default ResultFeedback