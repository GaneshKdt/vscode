import React, { Component } from 'react';
import { Container,Card } from 'react-bootstrap';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export class StepperPage extends Component{

    state = {
        step : this.props.step,
    }

    render(){
        return (
            <Container>
                <Stepper activeStep={ this.props.step-1 }>
                    <Step><StepLabel>Guidelines</StepLabel></Step>
                    <Step><StepLabel>Choose Your Electives</StepLabel></Step>
                    <Step><StepLabel>Confirm Your Selection on Electives</StepLabel></Step>
                    <Step><StepLabel>Electives Overview</StepLabel></Step>
                </Stepper>
                {this.props.handlePages()}
            </Container>
        )
    }
}

export default StepperPage;