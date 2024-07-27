import React from 'react'
import { Accordion, Card, Row, Container, Col } from 'react-bootstrap'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import { Pages } from '../../../shared/config'

const Query = (props) => {
    let query = props.query
    let type = props.type
    let index = props.index
    return (
        <Card  className="my-2 border" >
            <Accordion.Toggle as={Card.Header} eventKey={index} className="py-2 cursor">
                <div className="card-title text-dark text-truncate">
                    <span className="pr-2">
                        Q.
                    </span>
                    {query.query}
                </div>
                <h7 class="card-subtitle mb-2 text-muted">
                    <small>
                        Asked 
                        {
                            type=="All Queries" ? (
                                <>
                                    &nbsp;by&nbsp;
                                    <Link 
                                        to={{
                                            pathname: Pages.studentProfile,
                                            state   : { 
                                                userId: query.sapId
                                            }
                                        }} 
                                    >
                                        {query.name} 
                                    </Link>
                                    
                                </>
                            ) : null
                        }
                        &nbsp;on  {
                            query.createdDate ? (
                                <>
                                    <Moment format="MMM D" withTitle>{query.createdDate}</Moment>
                                </>
                            ) : null
                        }
                    </small>
                </h7>
                <div className="float-right">
                    {
                        query.isAnswered == 'Y' ? (
                            <>
                                <span className="text-success">Answered</span>
                            </>
                        ) : (
                            <span className="text-warning">Not yet answered</span>
                        )
                    }
                </div>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
                <Card.Body className="py-2">
                    <Container>
                        <Row>
                            <div className="pb-1 font-weight-600 default-cursor">
                                Q.
                            </div>
                            <Col className="multi-line-text">
                                {query.query.trim()}
                            </Col>
                        </Row>
                    </Container>
                    
                    <hr />
                    {
                        query.isAnswered == 'Y' ? (
                            <>
                            <Container>
                                <Row>
                                    <div className="pb-1 font-weight-600 default-cursor">
                                        A.
                                    </div>
                                    <Col className="multi-line-text">
                                    <span dangerouslySetInnerHTML = {{__html: query.answer}} ></span>
                                        <div className="mt-2 small text-muted">
                                            Answered by<Link 
                                                to={{
                                                    pathname: Pages.instructorProfile,
                                                    state   : { 
                                                        userId: query.assignedToFacultyId
                                                    }
                                                }} 
                                            >
                                                &nbsp;{query.facultyName}&nbsp;
                                            </Link>on&nbsp;<Moment format="MMM D" withTitle>{query.createdDate}</Moment>
                                        </div>
                                    </Col>
                                </Row>
                                
                            </Container>
                            </>
                        ) : (
                            <div className="text-center">
                                <ErrorComponent message="This query isn't answered yet!"/>
                            </div>
                        )
                    }
                    
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

export default Query