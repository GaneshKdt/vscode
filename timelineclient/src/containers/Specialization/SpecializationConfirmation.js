import React, { Component } from 'react'
import { Button, Table, Form, Card } from 'react-bootstrap';

class SpecializationConfirmation extends Component {

    constructor(props) {
        super(props)
        this.state = {  
            sapid : this.props.sapid,
            selectedTermThreeSubjects : this.props.selectedTermThreeSubjects,
            selectedTermFourSubjects  : this.props.selectedTermFourSubjects,
            selectedTermFiveSubjects  : this.props.selectedTermFiveSubjects,
            specializationList        : this.props.specializationList
        } 
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        return(
            <>
                <br />
                <Card>
                    <Card.Header><h4>Confirm Your Elective Selection</h4></Card.Header>
                    <Card.Body>
                        <Form>
                            <h5>Note:</h5>
                            <ul style={{listStyle:"circle",fontSize:"16px",lineHeight:"120%"}}>
                                <li>
                                    Below is the preview of your selection, kindly review carefully before you click on the submit button. 
                                    To change your selection, click on back button to go to the previous step.
                                </li>
                            </ul>
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
                                        this.state.selectedTermThreeSubjects.map((subject, index) => {
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{subject.subject}</td>
                                                    <td>{
                                                        this.state.specializationList .filter(specialization => 
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
                                        this.state.selectedTermFourSubjects.map((subject, index) => {
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{subject.subject}</td>
                                                    <td>{
                                                        this.state.specializationList .filter(specialization => 
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
                                        this.state.selectedTermFiveSubjects.map((subject, index) => {
                                            return (
                                                <tr>
                                                    <td>{index+1}</td>
                                                    <td>{subject.subject}</td>
                                                    <td>{
                                                        this.state.specializationList .filter(specialization => 
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

                            <Button className="float-right" type="" onClick={this.props.buildAndSaveSpecialization}>Confirm And Save</Button>
                            <Button className="float-right" onClick={this.back}>Back</Button>
                       
                        </Form>
                    </Card.Body>
                </Card>
            </>
        )
    }

}

export default SpecializationConfirmation;