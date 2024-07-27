import React, { Component } from 'react';
import { Table, Card, Row, Col, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Success extends Component{

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
        const {values: {selectedSubjects, maxTerm}} = this.props;
        return (
            <>
                <br />
                <Card>
                    <Card.Body>
                        {/* <Row className="mx-auto text-center justify-content-center">
                            <Col md={"12"} className=" text-success">
                                <FontAwesomeIcon icon="check-circle" style={{fontSize: '80px'}}/>
                            </Col>
                            <Col md={"12"} className="d-flex justify-content-center">
                                <h4 className="my-auto">
                                    Successfully Saved Specialisation Details.
                                </h4>
                            </Col>
                        </Row> */}

                            {/* <h5>Note:</h5> */}
                            <Alert variant="success" className="fs-16">
                                <FontAwesomeIcon className="mr-2" icon="check-circle"/> You have successfully submitted the selection of your Term {maxTerm+1} electives.
                            </Alert>
                            {/* <ul style={{listStyle:"circle",fontSize:"16px",lineHeight:"120%"}}> */}
                                <li className="fs-16">
                                    Here is the summary of your selected subjects of Term {maxTerm+1}:
                                </li>
                            {/* </ul> */}
                            <hr />

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Sequence</th>
                                        <th>Subject</th>
                                        <th>Specialisation</th>
                                        <th>Term</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        selectedSubjects.length < 1 ? (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    <FontAwesomeIcon icon="exclamation-circle"/> Error in getting subject. Please try again...
                                                </td>
                                            </tr>
                                        ) : 
                                        selectedSubjects.sort((a,b) => {
                                                return a.sequence - b.sequence
                                            }).map((subject) =>{
                                                return(
                                                    <tr>
                                                        <td>{subject.sequence}</td>
                                                        <td>{subject.subject}</td>
                                                        <td>{subject.specializationTypeName}</td>
                                                        <td>{maxTerm+1}</td>
                                                        {/* <td>{subject.sem}</td> */}
                                                    </tr>
                                                )
                                            }
                                        )
                                        
                                
                                    }
                                </tbody>
                            </Table>



                        <Button className="float-right" type="" onClick={this.saveAndContinue}>Finish</Button>
                        {/* <Button className="float-right" onClick={this.back}>Back</Button> */}

                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default Success;