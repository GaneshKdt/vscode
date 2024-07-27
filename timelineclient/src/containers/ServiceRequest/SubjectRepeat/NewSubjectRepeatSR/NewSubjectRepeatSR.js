import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import AxiosHandler from '../../../../shared/AxiosHandler/AxiosHandler'
import { API } from '../../../../shared/config'
import PageContent from '../../../../components/PageContent/PageContent'
import { analyticsManager } from '../../../../shared/Analytics'
import { Pages } from '../../../../shared/config'
import SRPaymentFlow from '../Common/SRPaymentFlow'

class NewSubjectRepeatSR extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }
    
    componentDidMount() {
        this.getStudentBookings()
    }
    
    getStudentBookings = () => {
        AxiosHandler.AxiosPostHandler({
            url : API.getStudentSubjectRepeatStatus,
            data : {
                sapId : this.props.sapid,
            },
            successCallBack : (response) => {
                let data = response.data
                if(response.data) {
                    if(response.data.error === "false") {
                        let failedSubjects = data.repeatSubjects ? data.repeatSubjects : []
                        let subjectsAppliedFor = data.repeatSubjectsApplied ? data.repeatSubjectsApplied : []

                        let subjectsList = this.formatSubjectDetails(failedSubjects, subjectsAppliedFor)
                        let subjects = subjectsList.filter(subject => subject.applied !== true);
                        this.setState({
                            loaded : true,
                            error : false,
                            failedSubjectsList : subjects
                        }, 
                        () => {
                            let hasNonAppliedSubjects = false
                            this.state.failedSubjectsList.forEach((subject) => {
                                if(!subject.applied) {
                                    hasNonAppliedSubjects = true
                                }
                            })
                            this.setState({
                                error : !hasNonAppliedSubjects,
                                errorMessage : 'You have already applied for all the subjects!'
                            })
                        })
                    } else {
                        this.setState({
                            loaded : true,
                            error : true,
                            errorMessage : response.data.errorMessage ? response.data.errorMessage : "Internal Server Error! Please try again!",
                        })
                    }
                } else {
                    this.setState({
                        loaded : true,
                        error : true,
                        errorMessage : "Internal Server Error! Please try again!",
                    })
                }
            },
            failureCallBack : (error) => {
                this.setState({
                    loaded : true,
                    error : true,
                    errorMessage : "Error connecting to server!",
                })
            },
    
        })
    }

    formatSubjectDetails = (failedSubjects, subjectsAppliedFor) => {
        return failedSubjects.map((subject) => {
            return this.getSubjectApplicationStatus(subject, subjectsAppliedFor)
        })
    }
    getSubjectApplicationStatus = (subject, subjectsApplied) => {
        subjectsApplied.forEach((subjectApplied) => {
            if(subjectApplied.informationForPostPayment === subject.subject && subjectApplied.requestStatus !== 'Cancelled') {
                subject.applied = true
                subject.applicationDetails = subjectApplied
            }
        })
        return subject
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

    render() {
        const backToExamBookingHome = (
            <Link to = { Pages.examBooking } >
                Back to Exam Booking
            </Link>
        )
        return (
            <PageContent
                id="exam-booking"
                title = 'New Subject Repeat SR'

                loaded = {this.state.loaded}
                error = {this.state.error}
                loadingMessage = 'Loading...'
                errorMessage = { this.state.errorMessage }
            >
                <SRPaymentFlow 
                    availableSubjects = { this.state.failedSubjectsList }
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
export default connect(mapStateToProps)(analyticsManager(NewSubjectRepeatSR))