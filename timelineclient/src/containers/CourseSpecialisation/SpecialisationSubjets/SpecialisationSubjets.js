import React, { Component, Fragment } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import SpecialisationSubjectsForSem3 from './SpecialisationSubjectsForSem3'
import SpecialisationSubjectsForSem4 from './SpecialisationSubjectsForSem4'

class SpecialisationSubjets extends Component{
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){

        const { values } = this.props
        
        return(
            <>
                <br />
                <Card>
                    <Card.Header><h4>Course Specialisation Subject</h4></Card.Header>
                    <Card.Body>

                    <h5>Note : </h5>
                    <ul>
                        <li>Select 2 Subjects from Block 1 to Block 4 for in &nbsp;
                            {values.specialisationType.map((type) => {
                                return(<span>{type.Specialisation} </span>)
                            })} Specialisation
                        </li>
                        <li>Select 2 Subjects from other in selected Specialisation</li>
                        <li>Select 1 Subject from Block 5</li>
                    </ul> 

                    <Table responsive >
                        <SpecialisationSubjectsForSem3
                            values={values}
                            nextStep={this.props.nextStep}
                            prevStep={this.props.prevStep}
                            addSpecializationForSem3 = {this.props.addSpecializationForSem3}
                            // handleAddSpecialisationSubject = {this.props.handleAddSpecialisationSubject}
                        />
                    <br /><br />
                    <SpecialisationSubjectsForSem4
                            values={values}
                            nextStep={this.props.nextStep}
                            prevStep={this.props.prevStep}
                            addSpecializationForSem4 = {this.props.addSpecializationForSem4}
                            // handleAddSpecialisationSubject = {this.props.handleAddSpecialisationSubject}
                        />
                    </Table>

                    <Button className="float-right" type="" onClick={this.saveAndContinue}>Save And Continue</Button>
                    <Button className="float-right" onClick={this.back}>Back</Button>

                    </Card.Body>
                </Card>
            </>

        )
    }
}

export default SpecialisationSubjets;