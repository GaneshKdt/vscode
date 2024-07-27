import React, { Component } from 'react'
import { Container, Card, Row, Col, Button,Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Error extends Component {

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.isSpecialisationDone();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return (
            <>
                <br />
                <Card>
                    <Card.Body>
                        {/* <Row className="mx-auto text-center justify-content-center">
                            <Col md={"12"} className=" text-danger">
                                <FontAwesomeIcon icon="times-circle" style={{fontSize: '80px'}}/>
                            </Col>
                            <Col md={"12"} className="d-flex justify-content-center">
                                <h4 className="my-auto">
                                    Save Failed. Please try again...
                                </h4>
                            </Col>
                        </Row> */}

                            <Alert variant="danger" className="fs-16">
                                <FontAwesomeIcon className="mr-2" icon="times-circle"/> Save Failed. Please try again...
                            </Alert>

                        <Button className="float-right" type="" onClick={this.saveAndContinue}>Finish & Try Again</Button>
                        {/* <Button className="float-right" onClick={this.back}>Back</Button> */}

                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default Error
