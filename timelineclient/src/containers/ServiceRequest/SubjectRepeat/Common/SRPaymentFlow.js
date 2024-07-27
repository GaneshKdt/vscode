import { Paper } from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import SubmitPayment from './PaymentFlow/SubmitPayment/SubmitPayment'
import Stepper from '@material-ui/core/Stepper';
import React, { Component } from 'react';
import { Button, ButtonToolbar, Col, Container, Modal, Row } from 'react-bootstrap';
import SubjectSelection from './PaymentFlow/SubjectSelection/SubjectSelection';
import PaymentMethodSelection from '../../../ExamBooking/Common/PaymentFlow/PaymentMethodSelection/PaymentMethodSelection';
import SubmitPayment from './PaymentFlow/SubmitPayment/SubmitPayment';


class SRPaymentFlow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showConfirmDialog : false,
            selectedPaymentProvider : undefined,
            selectedSubjects : [],
            total : 0,
            activeStep : 0,
        };
    }

    setStateFromHelper = (state) => {
        this.setState({
            ...state
        })
    }

    setSelectedSubjects = (row, isSelect) => {
        let selected = this.state.selectedSubjects

        if (isSelect) {
            selected.push(row)
        } else {
            selected = selected.filter(x => x.subject !== row.subject)
        }

        var total = 0
        var error = false
        if (selected.length > 0) {
            selected.forEach((subject) => {
                let charge = subject.amount
                if(!isNaN(charge)) {
                    total = total + Number(charge)
                } else {
                    error = true
                }
            })
        }
        let sortedSelectedSubjects = selected.sort((a,b) => (a.subject > b.subject) ? 1 : ((b.subject > a.subject) ? -1 : 0))
        this.setState({
            selectedSubjects : sortedSelectedSubjects,
            total : !error ? total : 'ERR',
        })
    }

    setPaymentProvider = (selectedPaymentProvider) => {
        this.setState({
            selectedPaymentProvider : selectedPaymentProvider,
            submitPayment : true
        })
    }
    nextTab = () => {
        this.setState({
            activeStep : this.state.activeStep + 1
        })
    }
    previousTab = () => {
        this.setState({
            activeStep : this.state.activeStep - 1
        })
    }
    setTab = (id) => {
        this.setState({
            activeStep : id
        })
    }

    getContent = () => {

        if(this.state.activeStep < 2) {
            return (
                <SubjectSelection
                    selectedSubjects = { this.state.selectedSubjects }
                    setSelectedSubjects = { this.setSelectedSubjects }

                    availableSubjects = { this.props.availableSubjects }

                    bookingType = { this.props.bookingType }
                />
            )
        }
    }
    render() {
        return(
            <div id="exam-booking-flow">
                {
                    this.state.submitPayment ? (
                        <>
                        <SubmitPayment
                             selectedPaymentProvider = { this.state.selectedPaymentProvider }
                             selectedSubjects = { this.state.selectedSubjects }
                             bookingType = { this.props.bookingType }
                         />
                        </>
                    ) : (
                        <>
                            <Stepper activeStep={ this.state.activeStep } style={{backgroundColor : 'inherit'}}>
                                <Step><StepLabel>Select Subjects</StepLabel></Step>
                                <Step><StepLabel>Select Gateway</StepLabel></Step>
                                <Step><StepLabel>Make Payment</StepLabel></Step>
                            </Stepper>
                            <Paper className = 'p-3' style = {{overflowX : 'auto'}}>
                                <h6 className="card-title mt-0">
                                    <span className="my-auto mr-auto">
                                        {
                                            this.state.activeStep === 0 ? 'Select Subjects'
                                            : this.state.activeStep === 1 ? 'Select Gateway'
                                            : 'Make Payment'
                                        }
                                    </span>
                                </h6>
                                <hr/>
                                { this.getContent() }
                                {
                                    this.state.activeStep === 1 ? (
                                        <Modal
                                            show = { true }
                                            onHide={ this.previousTab }
                                            size="xl"
                                            centered
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title id="contained-modal-title-vcenter">
                                                    Select Payment Provider
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Container>
                                                    <PaymentMethodSelection
                                                        setPaymentProvider = { this.setPaymentProvider }
                                                        bookingType = { this.props.bookingType }
                                                    />
                                                </Container>
                                            </Modal.Body>
                                        </Modal>
                                    ) : null
                                }
                                <Row>
                                    <Col sm={12} md={"auto"}>
                                        <ButtonToolbar>
                                            <Button
                                                variant="secondary"
                                                className="mx-1"
                                                disabled = { this.state.activeStep === 0 || this.state.activeStep > 2 }
                                                onClick = { this.previousTab }
                                            >
                                                Back
                                            </Button>

                                            <Button
                                                variant="primary"
                                                className="mx-1"
                                                disabled = { this.nextButtonDisabled() }
                                                onClick = { this.nextTab }
                                            >
                                                Select Payment Gateway
                                            </Button>
                                        </ButtonToolbar>
                                    </Col>
                                    <Col sm={12} md={3}  className="my-auto ml-auto" style={{fontSize: 'larger'}}>
                                        {
                                            this.state.selectedSubjects && this.state.selectedSubjects.length ? (
                                                <span>Total : <b>₹ {this.state.total} /-</b></span>
                                            ) : null
                                        }
                                        &nbsp;
                                    </Col>
                                </Row>
                            </Paper>
                        </>
                    )
                }
            </div>
        )
    }

    handleDialogClose = () => {
        this.setState({
            showConfirmDialog : false,
            dialogProps : {}
        })
    }
    nextButtonDisabled = () => {
        const currentTab = this.state.activeStep
        const selectedSubjects = this.state.selectedSubjects

        var enabled = true
        let subjectsSelected = selectedSubjects.length > 0 && !selectedSubjects.length <= 2

        if(currentTab >= 0) {
            enabled = enabled && subjectsSelected
        }
        if(currentTab > 2) {
            enabled = false
        }
        return !enabled
    }
}

export default SRPaymentFlow