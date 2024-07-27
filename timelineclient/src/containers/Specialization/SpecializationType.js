import React, { Component, Fragment } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import $ from "jquery";

class SpecializationType extends Component{

    state = {
        specialisation : null,
        specializationType : null,
    }
    
    handleSpecializationTypeChange = (event) => {
        event.preventDefault()
        let val = []
        if(this.props.specialization == 'Single Specialization'){
            val.push($('input[name=specialisationType]:checked').val())
            if(val.length < 1 || typeof val[0] == 'undefined'){
                alert('Please select a specializations for your Single Specialization.')
                return
            }
            let text = this.props.specializationList.find(element => element.id == val[0]).specializationType
            this.props.handleSpecializationTypeChangeSR(val, text, 'Single Specialization')
        }else{
            val = $('input[name=specialisationType]:checked').map(function () {
                    return this.value;
                }).get();

            if(val.length != 2){
                alert('Please select two specializations for your Duel Specialization.')
                return
            }else{
                let text = this.props.specializationList.find(element => element.id == val[0]).specializationType + ' & ' + 
                    this.props.specializationList.find(element => element.id == val[1]).specializationType
                this.props.handleSpecializationTypeChangeSR(val, text, 'Duel Specialization')
            }
        }
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        return(
            <>
                <br />
                    <Card>
                        <Card.Header><h4>Course Specialisation Types</h4></Card.Header>
                        <Card.Body>
                            <Form>
                                <p>You have selected {this.props.specialization}</p>
                                
                                <fieldset>
                                {
                                    this.props.specialization == 'Single Specialization' ? 
                                    <>
                                        {
                                            this.props.specializationList.map (({id, specializationType}) => {
                                                return(
                                                    <Fragment>
                                                        <div key={id}>
                                                            <Form.Check custom inline
                                                                type="radio"
                                                                id={id}
                                                                value={id}
                                                                label={specializationType}
                                                                name={'specialisationType'}
                                                            />
                                                        </div>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </> 
                                    : 
                                    <>
                                        {
                                            this.props.specializationList.map (({id, specializationType}) => {
                                                return(
                                                    <Fragment>
                                                        <div key={id}>
                                                            <Form.Check custom inline
                                                                type="checkbox"
                                                                id={id}
                                                                value={id}
                                                                label={specializationType}
                                                                name={'specialisationType'}
                                                            />
                                                        </div>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </> 
                                }
                                </fieldset>
                                <br />

                                <Button className="float-right" type="" onClick={e => this.handleSpecializationTypeChange(e)}>Save And Continue</Button>
                                <Button className="float-right" onClick={this.back}>Back</Button>
                            
                            </Form>
                        </Card.Body>
                    </Card>
            </>
        )
    }

}
export default SpecializationType;