import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

class Specialization extends Component{

    state = {
        specialization : null,
    }

    handleRadioTypeChange = (type) =>{
        this.setState({
            specialization : type
        })
    }

    validateAndSetInState = (e) => {
        e.preventDefault()
        if(!this.state.specialization || typeof this.state.specialization == 'undefined'){
            alert('Please select a specialization type')
            return    
        }else{
            this.props.handleSpecializationChangeSR(this.state.specialization)
        }
    }

    render(){
        return(
            <>
                <br />
                <Card>
                <Card.Header><h4>Course Specialisation</h4></Card.Header>
                    <Card.Body>
                        <Form>
                            <fieldset>
                                <Form.Check inline
                                    required
                                    type="radio"
                                    name="specialization"
                                    label="Single Specialisation"
                                    value="Single Specialisation"
                                    id="1"
                                    onChange={e => this.handleRadioTypeChange("Single Specialization", e)}
                                />
                                
                                <Form.Check inline
                                    required
                                    type="radio"
                                    name="specialization"
                                    label="Dual Specialisation"
                                    value="Dual Specialisation"
                                    id="2"
                                    onChange={e => this.handleRadioTypeChange("Dual Specialization", e)}
                                />
                            </fieldset><br />
                            <Button type="submit" className="float-right" onClick={this.validateAndSetInState}>Save And Continue</Button><br />
                        </Form>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default Specialization;