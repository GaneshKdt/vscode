import React, { Component, Fragment } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from 'axios';
import ConfigUrls, { API } from '../../shared/config';


let getSpecialisationTypes = API.getSpecialisationTypes

class SpecialisationTypes extends Component{

    state = {
        status : false,
        SpecialisationList : null,
        isSelected : '',
        isLoaded : false
    }
    
    saveAndContinue = (e) => {
        e.preventDefault()
        if (this.props.values.specialisationType.length == this.props.values.checkedId) {
            this.props.nextStep();
        }else{
            alert('Please Select '+this.props.values.checkedId+' Specialisation to continue.');
        }
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
         const { values } = this.props
        if(!values.isSpecialisationLoaded) {
            return <div>Course Specialisation Types Loading...</div>;
        }

        else{
            return(
                <>
                <br />
                    <Card>
                        <Card.Header><h4>Step-{values.step}: Course Specialisation Types</h4></Card.Header>
                        <Card.Body>
                            <Form>
                                <p>You are Selected {values.specialisation}</p>
                                <fieldset>
                                    {values.SpecialisationList.map (({id, specializationType}) => {
                                        return(
                                            <Fragment>
                                                <div key={id}>
                                                    <Form.Check custom inline
                                                        type="checkbox"
                                                        id={id}
                                                        value={specializationType}
                                                        label={specializationType}
                                                        name={'specialisationType'}
                                                        onChange={this.props.handleCheckBox('specialisationType')}
                                                        checked={values.specialisationType.some(specialization => {
                                                                return specialization.id == id})}
                                                        // disabled={this.props.isDisabled(id)}
                                                    />
                                                </div>
                                            </Fragment>
                                        )
                                    })}
                                </fieldset><br />

                                <Button className="float-right" type="" onClick={this.saveAndContinue}>Save And Continue</Button>
                                <Button className="float-right" onClick={this.back}>Back</Button>
                            
                            </Form>
                        </Card.Body>
                    </Card>
                </>
            )
        }
    }
}

export default SpecialisationTypes;