import React, { Component } from 'react'
import { Table, Card, Button } from 'react-bootstrap'
import SpecializationSelection from './SpecializationSelection'

export class SpecialisationOverview extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isSubjectSelected       : false,
            isReSelect              : this.props.isReSelect,
            showReSelect            : this.props.showReSelect
        };
    }  

    render() {
        return (
            <>           
                <br />
                {!this.state.isReSelect ? (
                <Card>
                    <Card.Header><h4>Course Specialisation</h4></Card.Header>
                    <Card.Body>

                        <Button variant="secondary" id="reSelect" onClick={this.props.handleReselectElectives}>Re-Select Electives</Button>
                        <br/> <br/>
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
                    </Card.Body>
                </Card>
                ) : <SpecializationSelection
                        isReSelect = {true}/>}
            </>
        )  
    }
}

export default SpecialisationOverview
