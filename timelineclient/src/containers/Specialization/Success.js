import React, { Component } from 'react';
import { Table, Card, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Success extends Component{

    navigateToSummary = (e) => {
        e.preventDefault();
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
                            <Alert variant="success" className="fs-16">
                                <FontAwesomeIcon className="mr-2" icon="check-circle"/> You have successfully submitted the selection of your electives.
                            </Alert>
                            <li className="fs-16">
                                Here is the summary of your specialization selected subjects:
                            </li>
                            <hr />

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{width: '15%'}}>Sequence</th>
                                        <th style={{width: '50%'}}>Subject</th>
                                        <th style={{width: '20%'}}>Specialisation</th>
                                        <th style={{width: '15%'}}>Term</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.selectedTermThreeSubjects.map((subject, index) => {
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{subject.subject}</td>
                                                    <td>{
                                                        this.props.specializationList .filter(specialization => 
                                                            specialization.id == subject.specialization)[0].specializationType
                                                        }
                                                    </td>
                                                    <td>{subject.sem}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{width: '15%'}}>Sequence</th>
                                        <th style={{width: '50%'}}>Subject</th>
                                        <th style={{width: '20%'}}>Specialisation</th>
                                        <th style={{width: '15%'}}>Term</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.selectedTermFourSubjects.map((subject, index) => {
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{subject.subject}</td>
                                                    <td>{
                                                        this.props.specializationList .filter(specialization => 
                                                            specialization.id == subject.specialization)[0].specializationType
                                                        }
                                                    </td>
                                                    <td>{subject.sem}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                
                                </tbody>
                            </Table>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th style={{width: '15%'}}>Sequence</th>
                                        <th style={{width: '50%'}}>Subject</th>
                                        <th style={{width: '20%'}}>Specialisation</th>
                                        <th style={{width: '15%'}}>Term</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.selectedTermFiveSubjects.map((subject, index) => {
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{subject.subject}</td>
                                                    <td>{
                                                        this.props.specializationList .filter(specialization => 
                                                            specialization.id == subject.specialization)[0].specializationType
                                                        }
                                                    </td>
                                                    <td>{subject.sem}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody> 
                            </Table>

                            <Button className="float-right" type="" onClick={this.navigateToSummary}>Finish</Button>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default Success;