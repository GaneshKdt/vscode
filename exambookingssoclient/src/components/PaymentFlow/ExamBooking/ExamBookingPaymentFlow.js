import React, { Component } from 'react'
import { Col, Row, ButtonToolbar, Modal, Container } from 'react-bootstrap'
import SubjectSelection from './SubjectSelection/SubjectSelection'
import PaymentMethodSelection from './PaymentMethodSelection/PaymentMethodSelection'
import PaymentConfirmation from './PaymentConfirmation/PaymentConfirmation'
import CenterSlotSelection from './CenterSlotSelection/CenterSlotSelection'
import SubmitPayment from './SubmitPayment/SubmitPayment'

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import moment from 'moment'
import { AppConfig } from '../../../shared/config'
import { Button, Paper } from '@material-ui/core'
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog'

class ExamBookingPaymentFlow extends Component {
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
            selected = selected.filter(x => x.timeboundId !== row.timeboundId)
        }

        var total = 0
        var error = false
        if (selected.length > 0) {
            selected.forEach((subject) => {
                let charge = this.props.bookingType === 'New Booking' ? subject.bookingAmount : subject.slotChangeAmount
                if(!isNaN(charge)) {
                    total = total + Number(charge)
                } else {
                    error = true
                }
            })
        }
        let sortedSelectedSubjects = selected.sort((a,b) => (a.timeboundId > b.timeboundId) ? 1 : ((b.timeboundId > a.timeboundId) ? -1 : 0))
        this.setState({
            selectedSubjects : sortedSelectedSubjects,
            total : !error ? total : 'ERR',
        })
    }

    checkIfSameSlotSelected = (slot, timeboundId) => {
        var selectedSubjects = this.state.selectedSubjects

        selectedSubjects.forEach((subject) => {
            if(subject.timeboundId === timeboundId) {
                if(subject.previousBookingDetails.slotId === slot.slotId) {
                    this.setState({
                        showConfirmDialog : true,
                        dialogProps : {
                            title: 'Same Slots Selected',
                            message: AppConfig.EXAM_BOOKING_SAME_SLOT_SELECTED
                        }
                    })
                }
            }
        })
    }

    
    setSlotsListToSubject = (slotsList, timeboundId, resolve) => {
        var selectedSubjects = this.state.selectedSubjects
        var newSelectedSubjects = []
        selectedSubjects.forEach((subject) => {
            if(subject.timeboundId === timeboundId) {
                subject.slotsList = slotsList
            }
            newSelectedSubjects.push(subject)
        })
    
        this.setState({
            selectedSubjects : newSelectedSubjects,
        }
        ,() => {
            resolve()
        })
    }
    
    setSlotToSubject = (slot, timeboundId, resolve) => {
        
        if(slot.availableSlots <= 0) {
            this.setState({
                showConfirmDialog : true,
                dialogProps : {
                    title: 'No Seats Left!',
                    message: AppConfig.EXAM_BOOKING_NO_SLOTS_LEFT,
                }
            })
            
        } else {
            if (this.props.bookingType === 'Slot Change') {
                this.checkIfSameSlotSelected(slot, timeboundId)
            }
        }

        var selectedSubjects = this.state.selectedSubjects
    
        var newSelectedSubjects = []
        selectedSubjects.forEach((subject) => {
            if(subject.timeboundId === timeboundId) {
                subject.slot = slot
            }
            newSelectedSubjects.push(subject)
        })

        let noClashesFoundWithNewSelection = this.checkForSameSlotTime(newSelectedSubjects)
        if(noClashesFoundWithNewSelection) {
            this.setState({
                selectedSubjects : newSelectedSubjects,
            }, () => resolve(newSelectedSubjects)
            )
        }
    }
    setCenterToSubject = (center, timeboundId, resolve) => {
        var selectedSubjects = this.state.selectedSubjects
        var newSelectedSubjects = []
        selectedSubjects.forEach((subject) => {
            if(subject.timeboundId === timeboundId) {
                subject.center = center
                subject.slot = null
            }
            newSelectedSubjects.push(subject)
        })

        this.setState({
            selectedSubjects : newSelectedSubjects,
        }, () => {
            this.checkForDifferentCenters()
            resolve(newSelectedSubjects)
        })
    }
    checkForDifferentCenters = () => {

        var listOfCities = this.getAllSubjectDetails()
        let differentCenterNames = false

        listOfCities.forEach((cityADetails) => {
            listOfCities.forEach((cityBDetails) => {
                if(cityADetails.cityName && cityBDetails.cityName && cityADetails.timeboundId !== cityBDetails.timeboundId) {
                    let cityA = cityADetails.cityName.toLowerCase().trim()
                    let cityB = cityBDetails.cityName.toLowerCase().trim()
                    if(cityA !== cityB) {
                        differentCenterNames = true
                    }
                }
            })
        })

        if(differentCenterNames) {
            this.setState({
                showConfirmDialog : true,
                dialogProps : {
                    title: 'Different Cities Selected',
                    message: AppConfig.EXAM_BOOKING_DIFFERENT_CITIES_SELECTED,
                }
            })
        }
    }
    checkForSameSlotTime = (selectedSubjects) => {

        var listOfStartEndTimes = this.getAllSubjectDetails()

        let timeSlotsClashing = false

        listOfStartEndTimes.forEach((slotA) => {
            listOfStartEndTimes.forEach((slotB) => {
                let slotAFields = slotA.start && slotA.end
                let slotBFields = slotB.start && slotB.end
                let differentTimebounds = slotA.timeboundId !== slotB.timeboundId
                if(differentTimebounds && slotAFields && slotBFields) {
                    // check if start/end times are in between
                    // inclusive start time, exclusive end time. might need further testing
                    let condition1 = slotA.start.isBetween( slotB.start, slotB.end, null, '()')
                    let condition2 = slotA.end.isBetween( slotB.start, slotB.end, null, '()')
                    let condition3 = slotB.start.isBetween( slotA.start, slotA.end, null, '()')
                    let condition4 = slotB.end.isBetween( slotA.start, slotA.end, null, '()')

                    let condition5 = slotA.start.valueOf() === slotB.start.valueOf()
                    if(condition1 || condition2 || condition3 || condition4 || condition5) {
                        timeSlotsClashing = true
                    }
                }
            })
        })

        if(timeSlotsClashing) {
            
            this.setState({
                showConfirmDialog : true,
                dialogProps : {
                    title: 'Same Center Selected',
                    message: AppConfig.EXAM_BOOKING_INVALID_SLOT_SELECTION,
                }
            })
            return false
        } else {
            return true
        }
    }
    getAllSubjectDetails = () => {
        // get slot mapping and city details for the subjects
        var subjectDatas = {}

        this.props.availableSubjects.forEach((subject) => {
            if(subject.previousBookingDetails) {
                let cityDetails = {
                    timeboundId : subject.timeboundId,
                    cityName : subject.previousBookingDetails.centerCity,
                    start : moment(subject.previousBookingDetails.examStartDateTime),
                    end : moment(subject.previousBookingDetails.examEndDateTime),
                }
                subjectDatas[subject.timeboundId] = cityDetails
            }
        })

        this.state.selectedSubjects.forEach((subject) => {
            let cityDetails = {
                timeboundId : subject.timeboundId,
                cityName : subject.center ? subject.center.city : null,
                start : subject.slot ? moment(subject.slot.examStartDateTime) : null,
                end : subject.slot ? moment(subject.slot.examEndDateTime) : null,
            }
            subjectDatas[subject.timeboundId] = cityDetails
        })

        var listOfSubjectData = []
        for(let key in subjectDatas) {
            listOfSubjectData.push(subjectDatas[key])
        }

        return listOfSubjectData
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

        if(this.state.activeStep === 0) {
            return (
                <SubjectSelection
                    selectedSubjects = { this.state.selectedSubjects }
                    setSelectedSubjects = { this.setSelectedSubjects }

                    availableSubjects = { this.props.availableSubjects }
                    cantSelectSubjects = { this.props.cantSelectSubjects }

                    bookingType = { this.props.bookingType }
                />
            )
        } else if (this.state.activeStep === 1) {
            return (
                <CenterSlotSelection
                    subjects = { this.state.selectedSubjects }
                    setSlotsListToSubject = { this.setSlotsListToSubject }
                    setSlotToSubject = { this.setSlotToSubject }
                    setCenterToSubject = { this.setCenterToSubject }
                    allCenters = { this.props.allCenters }
                    bookingType = { this.props.bookingType }
                />
            )
        } else {
            return (
                <PaymentConfirmation
                    selectedPaymentProvider = { this.state.selectedPaymentProvider }
                    selectedSubjects = { this.state.selectedSubjects }
                    total = { this.state.total }
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
                        <SubmitPayment
                            selectedPaymentProvider = { this.state.selectedPaymentProvider }
                            selectedSubjects = { this.state.selectedSubjects }
                            bookingType = { this.props.bookingType }
                        />
                    ) : (
                        <>
                            <Stepper activeStep={ this.state.activeStep } style={{backgroundColor : 'inherit'}}>
                                <Step><StepLabel>Select Subjects</StepLabel></Step>
                                <Step><StepLabel>Select Center</StepLabel></Step>
                                <Step><StepLabel>Confirm Selection</StepLabel></Step>
                            </Stepper>
                            <Paper className = 'p-3' style = {{overflowX : 'auto'}}>
                                <h6 className="card-title mt-0">
                                    <span className="my-auto mr-auto">
                                        {
                                            this.state.activeStep === 0 ? 'Select Subjects'
                                            : this.state.activeStep === 1 ? 'Select Center'
                                            : 'Confirm Selection'
                                        }
                                    </span>
                                </h6>
                                <hr/>
                                { this.getContent() }
                                {
                                    this.state.activeStep > 2 ? (
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
                                                variant="contained"
                                                color="secondary"
                                                className="mx-1"
                                                disabled = { this.state.activeStep === 0 || this.state.activeStep > 2 }
                                                onClick = { this.previousTab }
                                            >
                                                Back
                                            </Button>

                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className="mx-1"
                                                disabled = { this.nextButtonDisabled() }
                                                onClick = { this.nextTab }
                                            >
                                                { this.state.activeStep >= 2 ? 'Select Payment Gateway' : 'Next' }
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
                <ConfirmDialog
                    open = {this.state.showConfirmDialog}
                    handleClose = {this.handleDialogClose}
                    {...this.state.dialogProps}
                />
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

        let slotsSelected = true
        selectedSubjects.forEach((subject) => {
            if(!subject.slot || subject.slot.availableSlots <= 0) {
                slotsSelected = false
            }
        })

        if(currentTab >= 0) {
            enabled = enabled && subjectsSelected
        }

        if(currentTab >= 1) {
            enabled = enabled && slotsSelected
        }

        if(currentTab > 2) {
            enabled = false
        }
        return !enabled
    }
}

export default ExamBookingPaymentFlow