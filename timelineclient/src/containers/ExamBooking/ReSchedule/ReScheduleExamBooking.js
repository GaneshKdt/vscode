import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import PageContent from '../../../components/PageContent/PageContent'
import { analyticsManager } from '../../../shared/Analytics'
import { Pages } from '../../../shared/config'
import ExamBookingPaymentFlow from '../Common/ExamBookingPaymentFlow'
import LoadExamBookingData from '../Common/Functions/LoadExamBookingData'
class ReScheduleExamBooking extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            failedSubjects : []
        }
    }
    
    componentDidMount() {
        new LoadExamBookingData().Initiate(this.props.sapid, this.setStateCallback, 'Slot Change')
    }

    setStateCallback = (state) => {
        
        this.setState({
            ...state
        })
    }

    getUnSelectables = () => {
        let unSelectableSubjects = []
        
        this.state.failedSubjects.forEach((subject) => {
            if(this.state.subjectsAppliedFor && !this.state.subjectsAppliedFor.includes(subject.timeboundId)) {
                unSelectableSubjects.push(subject.timeboundId)
            }
        })
        return unSelectableSubjects
    }

    showBookingError = () => {
        if(this.state.failedSubjects){
            for(let failedSubject in this.state.failedSubjects) {
                if(this.state.failedSubjects[failedSubject].previousBookingDetails) {
                    return false
                }
            }
        }
        return true
    }
    render() {
        const backToExamBookingHome = (
            <Link to = { Pages.examBooking } >
                Back to Exam Booking
            </Link>
        )
        return (
            <PageContent
                id="exam-booking"
                title = 'Exam Centre Change'
                subtitle = { backToExamBookingHome }
                
                loaded = { this.state.loaded }
                error = { this.state.error }
                loadingMessage = 'Loading...'
                errorMessage = { this.state.errorMessage }
            >
                <Alert show={ this.showBookingError() } variant="danger">
                    You don't have any bookings to be Re-Scheduled
                </Alert>
                {
                    this.showBookingError() ? (
                        <LinkContainer to = { Pages.reScheduleExamBooking } >
                            <Button size="small" className="disableBtnHover" variant="contained" color="primary">
                                Change Exam Center
                            </Button>
                        </LinkContainer>
                    ) : null
                }
                <ExamBookingPaymentFlow 
                    availableSubjects = { this.state.failedSubjects }
                    allCenters = { this.state.allCenters }
                    cantSelectSubjects = { this.getUnSelectables() }
                    bookingType = { 'Slot Change' }
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
export default connect(mapStateToProps)(analyticsManager(ReScheduleExamBooking))