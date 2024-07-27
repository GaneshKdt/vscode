import React, { Component } from 'react';
import { Button, Table, Form, Row, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConfigUrls from '../../../shared/config'

const urls = new ConfigUrls().urls;

class ConfirmationPage extends Component{
    
    state = {
        savingDetails : false,
        savedDetails : false,
        error: false,
        count : 0
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        const isConfirm = window.confirm('Are you sure you want to submit your selection of electives?');
        if(isConfirm){
            let saveToDB = {
                "specializationType" : this.props.values.specialisation,
                "specialisation1" : this.props.values.specialisationType[0].id,
                "specialisation2" : this.props.values.specialisationType.length > 1 ? this.props.values.specialisationType[1].id : '' ,
                "sapid" : this.props.sapid,
                "specialisationSubjectList" : this.props.values.selectedSubjects,
                "status" : '',
                "serviceRequest" :   this.props.values.serviceRequest
            }
            this.props.savesaveSpecialisationToDB(saveToDB)
            this.props.nextStep();
        }
    }

    render(){
        const {values: { specialisation, specialisationType,selectedSubjects, serviceRequest,step, maxTerm }} = this.props;

        return(
            <>
                <br />
                <Card>
                    <Card.Header><h4>Step-{step}: Confirm Your Selection on Term {maxTerm+1} Electives</h4></Card.Header>
                    <Card.Body>
                        <Form>
                            {/* <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                   <b> Specialisation : </b>
                                </Form.Label>
                                <Form.Label column sm={9}>
                                    {specialisation}
                                </Form.Label>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    <b>Specialisation Type : </b>
                                </Form.Label>
                                <Form.Label column sm={9}>
                                    {
                                        serviceRequest ? (
                                            specialisationType.map((type) => {
                                                return (<p>{type.Specialisation}</p>)
                                            })
                                        ) : (
                                            specialisationType.map((type) => {
                                                return (<p>{type.specialisation.specializationType}</p>)
                                            })
                                        )
                                    }
                                </Form.Label>
                            </Form.Group> */}

                            {/* <Form.Group as={Row}>
                                <Form.Label column sm={3}>
                                    <b>Specialisation Subjects: </b>
                                </Form.Label>
                               
                                <Form.Label column sm={9}>
                                    {selectedSubjects.map((subject) => {
                                        return (<p>Term - {subject.sem} : {subject.subject}</p>)
                                    })}
                                </Form.Label>
                            </Form.Group> */}

                            <h5>Note:</h5>
                            <ul style={{listStyle:"circle",fontSize:"16px",lineHeight:"120%"}}>
                                <li>
                                    Below is the preview of your selection in Step-1, kindly review carefully before you click on the submit button. 
                                    To change your selection, click on back button to go to the previous step.
                                </li>
                            </ul>
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
                                                
                                                if( subject.sequence == 1 || subject.sequence == 2 ){
                                                    this.state.count = 1
                                                }else if( subject.sequence == 3 || subject.sequence == 4 ){
                                                    this.state.count = 2
                                                }else if( subject.sequence == 5 || subject.sequence == 6 ){
                                                    this.state.count = 3
                                                }else if( subject.sequence == 7 || subject.sequence == 8 ){
                                                    this.state.count = 4
                                                }else if( subject.sequence == 9 || subject.sequence == 10 ){
                                                    this.state.count = 5
                                                }

                                                return(
                                                    <tr>
                                                        <td>{this.state.count}</td>
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

                            <Button className="float-right" type="" onClick={this.saveAndContinue}>Confirm And Save</Button>
                            <Button className="float-right" onClick={this.back}>Back</Button>
                       
                        </Form>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default ConfirmationPage;