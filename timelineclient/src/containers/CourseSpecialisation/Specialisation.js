import React, { Component } from 'react';
import { Button,Container,Card,Form } from 'react-bootstrap';

class Specialisation extends Component{

    state = {
        isDisabled1 : false,
        isDisabled2 : false
    }

    saveAndContinue = (e) => {
        e.preventDefault()
        if(this.props.values.specialisation){
            this.props.nextStep()
        }else{
            alert('Please Select Specialisation')
        }  
    }

    checkIsDisabled = () => {
        if (!this.props.values.serviceRequest) {
            if (this.props.values.specialisation == 'Dual Specialisation') {
                this.setState({
                    isDisabled1 : true
                })
            } else if(this.props.values.specialisation == 'Single Specialisation'){
                this.setState({
                    isDisabled2 : true
                })
            }
        }
    }

    componentDidMount(){
        this.checkIsDisabled()
    }

    render(){
        const { values } = this.props;
        return(
            <>
                <br />
                <Card>
                <Card.Header><h4>Step-{values.step}: Course Specialisation</h4></Card.Header>
                    <Card.Body>
                    <Form>
                    <fieldset>
                        <Form.Check inline
                            required
                            type="radio"
                            name="specialisation"
                            value="Single Specialisation"
                            id="1"
                            label="Single Specialisation"
                            disabled={this.state.isDisabled1}
                            onChange={this.props.handleCheck('specialisation')}
                            checked={values.specialisation == 'Single Specialisation'}
                        />
                        
                        <Form.Check inline
                            required
                            type="radio"
                            label="Dual Specialisation"
                            name="specialisation"
                            value="Dual Specialisation"
                            id="2"
                            disabled={this.state.isDisabled2}
                            onChange={this.props.handleCheck('specialisation')}
                            checked={values.specialisation == 'Dual Specialisation'}
                        />
                    </fieldset><br />

                        <Button type="submit" className="float-right" onClick={this.saveAndContinue}>Save And Continue</Button><br />
                    </Form>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

export default Specialisation;