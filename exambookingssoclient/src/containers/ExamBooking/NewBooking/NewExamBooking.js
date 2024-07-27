import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LoadExamBookingData from '../../../shared/Functions/LoadExamBookingData'
import PageContent from '../../../components/PageContent/PageContent'
import ExamBookingPaymentFlow from '../../../components/PaymentFlow/ExamBooking/ExamBookingPaymentFlow'
import { Pages } from '../../../shared/config'

class NewExamBooking extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    componentDidMount() {
        new LoadExamBookingData().Initiate(this.props.sapid, this.setStateCallback, 'New Booking')
    }

    setStateCallback = (state) => {
        this.setState({
            ...state
        })
    }

    showBookingError = () => {
        if(this.state.failedSubjects){
            for(let failedSubject in this.state.failedSubjects) {
                if(!this.state.failedSubjects[failedSubject].previousBookingDetails) {
                    return false
                }
            }
        }
        return true
    }

    reSchedule = () => {
        this.props.history.push(Pages.slotChange)
    }

    render() {
        const backToExamBookingHome = (
            <Link to = { Pages.examBookingHome } >
                Back to Exam Booking
            </Link>
        )
        return (
            <PageContent
                id="exam-booking"
                title = 'New Exam Booking'
                subtitle = { backToExamBookingHome }

                loaded = {this.state.loaded}
                error = {this.state.error}
                loadingMessage = 'Loading...'
                errorMessage = { this.state.errorMessage }
            >
                <Alert show = { this.showBookingError() } variant="danger">
                    You have already made all bookings.
                    &nbsp;
                    <Alert.Link onClick={this.reSchedule}>Re Schedule a booking.</Alert.Link> 
                </Alert>
                <ExamBookingPaymentFlow
                    availableSubjects = { this.state.failedSubjects }
                    allCenters = { this.state.allCenters }
                    cantSelectSubjects = { this.state.subjectsAppliedFor }
                    bookingType = { 'New Booking' }
                />
            </PageContent>
        )
    }
}


const mapStateToProps = state => {
	return {
		sapid: state.sapid
	}
}
export default connect(mapStateToProps)(NewExamBooking)