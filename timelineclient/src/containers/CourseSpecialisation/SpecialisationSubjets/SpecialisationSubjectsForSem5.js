import React, { Component, Fragment } from 'react'
import { Container, ListGroup, Card, Row, Col, Table, Form, Button } from 'react-bootstrap';

// let specialisation1Count = 0;
// let specialisation2Count = 0;
export class SpecialisationSubjectsForSem5 extends Component {
   
    state = {
        specialisation1Id : null,
        specialisation2Id : null,
        makeDisabledTerm3Subjects : [],
        selectedBlock5SpecializationType : null,
        selectedBlock5Sequence : null,
        specialisation1Count : 0,
        specialisation2Count : 0
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        let specialisation1Id = this.props.values.specialisationType[0].id
        let selectedSubjects = this.props.values.selectedSubjects
        let specializationType1 = ''

        if (this.props.values.serviceRequest) {
            specializationType1 = this.props.values.specialisationType[0].Specialisation
        }else{
            specializationType1 = this.props.values.specialisationType[0].specialisation.specializationType
        }

        e.preventDefault();

        this.subjectSelectionChecks(selectedSubjects,specialisation1Id,specializationType1)

    }

    subjectSelectionChecks = (selectedSubjects,specialisation1Id,specializationType1) => {
        
        if ( selectedSubjects.length == 2 ) {

            this.props.nextStep();

        } else {
            alert('You need to select one subject from each block, please update your selection to proceed.')
        }
    }

    disableSameSubjectFromOtherBlocks = ( subject ) => {

        let disabledSubject = subject
        let selectedSubjects = this.props.values.selectedSubjects

        if( !subject.isActive && selectedSubjects.some( selectedsubject => selectedsubject.id == subject.id ) )
            disabledSubject = {
                ...subject,
                isDisabled : true
            }
        
        return disabledSubject
    }

    createCheckBox = (subject) => {

        subject = this.disableSameSubjectFromOtherBlocks( subject );

        if( subject.subject.trim() == ""){
            return(<td></td>)
        }else{
            return(
                <Fragment>
                    <td style={{padding:'0.25rem'}}>
                        <ListGroup.Item style={{textAlign:'center', minHeight:'80px', padding:'0.2rem' }} 
                            action 
                            value={subject}
                            onClick ={() => {
                                this.props.addSpecializationForSem5(subject)
                            }}
                            active = {subject.isActive} 
                            disabled = {subject.isDisabled}
                            className = {`${subject.isTerm3Subject ? 'term3Subjects': subject.isAutoSelected ? 'isAutoSelected' : 
                            subject.isPrerequisite ? 'prerequisite' : subject.isCoreSubject ? 'coreSubject' : ''}`}
                        >        
                            {subject.subject}
                        </ListGroup.Item>
                    </td>
                </Fragment>
            )
        }
    }

    componentDidMount(){
        if (this.props.values.specialisationType.length > 1) {
            this.setState({
                specialisation1Id : this.props.values.specialisationType[0].id,
                specialisation2Id : this.props.values.specialisationType[1].id,
            })
        }
    }

    render() {
        const { values } = this.props
        return (
            <>
                <br />
                <Card>
                    <Card.Header><h4>Step-{values.step}: Choose Your Term 5 Electives</h4></Card.Header>
                    <Card.Body>

                    <h5>Guidelines:</h5>
                    <ul style={{listStyle:"circle",fontSize:"16px",lineHeight:"150%"}}>
                        <li>As per the October 2020 policy update, there is a change in MBA(WX) Term-5 credit structure, 
                            where two electives need to be taken apart from the Capstone Project.</li>
                        <li>A 'Block' basically means a period of two weeks in a sequential manner. There are 2 blocks 
                            for the 2 electives to be completed in term-5, followed by the Capstone Project.</li>
                        <li>Same set of 4 elective options run in Block-1 and Block-2, and a student is free to select 
                            any elective in each block of his choice. However, it is highly recommended to select the 
                            electives from your core specialisation track(s) basis your specialisation type (single/dual)
                        </li>
                        <li>If one elective is selected in Block-1, the same elective cannot be selected in Block-2. 
                            You’re free to select in any order in the respective blocks.</li>
                        <li>Please note that you cannot select two subjects running parallel in the same block.</li>
                        <li>Once you submit your electives selection, you may change it again before the deadline from 
                            the “Re-Select Electives” button that will be visible on the Electives Selection Page</li>
                    </ul>
                    
                    <hr />

                    <Form.Group as={Row} className="fs-16">
                        <Form.Label column sm={3}> <b>Specialisation Type: </b> </Form.Label>
                        <Form.Label column sm={8}> {values.specialisation} </Form.Label>
                    </Form.Group>

                    <Form.Group as={Row} className="fs-16">
                        <Form.Label column sm={3}> <b>Specialisation In: </b> </Form.Label>
                        <Form.Label column sm={8}> 
                            {
                                values.serviceRequest ? (
                                    values.specialisationType.map((type) => {
                                        return (<p>{type.Specialisation}</p>)
                                    })
                                ) : ( 
                                    values.specialisationType.map((type) => {
                                            return (<p>{type.specialisation.specializationType}</p>)
                                    })
                                )
                            }
                        </Form.Label>
                    </Form.Group>

                    <Table responsive >
                        <thead>
                            <tr>
                                <th width='12%'>Term V</th>
                                {values.SpecialisationList.map (({id, specializationType}) => {
                                    if( id == 9 ){
                                        return(
                                            <Fragment>
                                                <th width='16.66%' style={{textAlign:'center'}}>Marketing / Digital Marketing</th>
                                            </Fragment>
                                        )
                                    }else{
                                        return(
                                            <Fragment>
                                                <th width='16.66%' style={{textAlign:'center'}}>{specializationType}</th>
                                            </Fragment>
                                        )
                                    }
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr>
                                <td  rowSpan="2" style={{verticalAlign:'middle'}}>Block 1</td>
                                {values.specialisation1Sem5SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation2Sem5SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                <td  rowSpan="2" style={{verticalAlign:'middle'}}>Block 2</td>
                                {values.specialisation3Sem5SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>

                            <tr>
                                {values.specialisation4Sem5SubjectList.map ((subject) => {
                                    return(this.createCheckBox(subject))
                                })}
                            </tr>
                        </tbody>
                        </Table>

                        <Button className="float-right" type="" onClick={this.saveAndContinue}>Save And Continue</Button>
                        {values.serviceRequest ? 
                            <Button className="float-right" onClick={this.back}>Back</Button> : ''
                        }

                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default SpecialisationSubjectsForSem5
