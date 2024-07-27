import React, { Component } from 'react';
import { Container,Card } from 'react-bootstrap';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

export class StepperPage extends Component{
    state = {
        serviceRequest : this.props.serviceRequest,
        step : this.props.step,
        maxTerm : this.props.maxTerm
    }

    render(){
        if(this.state.maxTerm === 2){
            if(this.state.serviceRequest){
                return (
                    <Container>
                        <Stepper activeStep={ this.props.step-1 }>
                            <Step><StepLabel>Choose Specialisation</StepLabel></Step>
                            <Step><StepLabel>Choose Specialisation Types</StepLabel></Step>
                            <Step><StepLabel>Choose Your Term 3 Electives</StepLabel></Step>
                            <Step><StepLabel>Confirm Your Selection on Term 3 Electives</StepLabel></Step>
                            <Step><StepLabel>Electives Opted in Term 3</StepLabel></Step>
                            {/* <Step><StepLabel>Subjects Preview</StepLabel></Step> */}
                        </Stepper>
                        {this.props.getStepContents()}
                    </Container>
                )
            }else{
                return (
                    <Container>
                        <Stepper activeStep={ this.props.step-1 }>
                            <Step><StepLabel>Choose Your Term 3 Electives</StepLabel></Step>
                            <Step><StepLabel>Confirm Your Selection on Term 3 Electives</StepLabel></Step>
                            <Step><StepLabel>Electives Opted in Term 3</StepLabel></Step>
                            {/* <Step><StepLabel>Subjects Preview</StepLabel></Step> */}
                        </Stepper>
                        {this.props.getStepContents()}
                    </Container>
                )
            }
        }else if(this.state.maxTerm === 3){
            if(this.state.serviceRequest){
                return (
                    <Container>
                        <Stepper activeStep={ this.props.step-1 }>
                            <Step><StepLabel>Choose Specialisation</StepLabel></Step>
                            <Step><StepLabel>Choose Specialisation Types</StepLabel></Step>
                            <Step><StepLabel>Choose Your Term 4 Electives</StepLabel></Step>
                            <Step><StepLabel>Confirm Your Selection on Term 4 Electives</StepLabel></Step>
                            <Step><StepLabel>Electives Opted in Term 4</StepLabel></Step>
                            {/* <Step><StepLabel>Subjects Preview</StepLabel></Step> */}
                        </Stepper>
                        {this.props.getStepContents()}
                    </Container>
                )
            }else{
                return (
                    <Container>
                        <Stepper activeStep={ this.props.step-1 }>
                            <Step><StepLabel>Choose Your Term 4 Electives</StepLabel></Step>
                            <Step><StepLabel>Confirm Your Selection on Term 4 Electives</StepLabel></Step>
                            <Step><StepLabel>Electives Opted in Term 4</StepLabel></Step>
                            {/* <Step><StepLabel>Subjects Preview</StepLabel></Step> */}
                        </Stepper>
                        {this.props.getStepContents()}
                    </Container>
                )
            }
        }else if(this.state.maxTerm === 4){
            if(this.state.serviceRequest){
                return (
                    <Container>
                        <Stepper activeStep={ this.props.step-1 }>
                            <Step><StepLabel>Choose Specialisation</StepLabel></Step>
                            <Step><StepLabel>Choose Specialisation Types</StepLabel></Step>
                            <Step><StepLabel>Choose Your Term 5 Electives</StepLabel></Step>
                            <Step><StepLabel>Confirm Your Selection on Term 5 Electives</StepLabel></Step>
                            <Step><StepLabel>Electives Opted in Term 5</StepLabel></Step>
                            {/* <Step><StepLabel>Subjects Preview</StepLabel></Step> */}
                        </Stepper>
                        {this.props.getStepContents()}
                    </Container>
                )
            }else{
                return (
                    <Container>
                        <Stepper activeStep={ this.props.step-1 }>
                            <Step><StepLabel>Choose Your Term 5 Electives</StepLabel></Step>
                            <Step><StepLabel>Confirm Your Selection on Term 5 Electives</StepLabel></Step>
                            <Step><StepLabel>Electives Opted in Term 5</StepLabel></Step>
                            {/* <Step><StepLabel>Subjects Preview</StepLabel></Step> */}
                        </Stepper>
                        {this.props.getStepContents()}
                    </Container>
                )
            }
        }else{
            return(
                <Card>
                    <Card.Body>
                        <h6>Specialization Subjects are not applicable to you. </h6>
                    </Card.Body>
                </Card>
            )
        }
        
    }
}

export default StepperPage;