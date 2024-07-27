import React, { Component } from 'react'
import { analyticsManager } from '../../shared/Analytics'
import { connect } from 'react-redux'
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent'
import { Container, Row, Col, Table, Card, Button, ButtonToolbar, Alert } from 'react-bootstrap'
import ErrorAndLoadingWrapper from '../../shared/Helpers/ErrorAndLoadingWrapper/ErrorAndLoadingWrapper'
import { Pages, API } from '../../shared/config'
import { LinkContainer } from 'react-router-bootstrap'
import moment from 'moment'
import PageContent from '../../components/PageContent/PageContent'
import { Paper } from '@material-ui/core'
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler'
import BootstrapTable from 'react-bootstrap-table-next';
import { bookingStatusFormatter, centerFormatter } from './Common/Functions/SubjectsTable'
import { formatExamDate, formatExamStartTime, formatExamEndTime } from './Common/Functions/TimeFormatHelper'
import BookedSubjectDetails from './BookedSubjectDetails/BookedSubjectDetails'
import DownloadReceipt from './ExamFeeReceipt/DownloadReceipt';

class ExamBooking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    componentDidMount() {
        this.getStudentBookings()
    }

    getStudentBookings = () => {
        AxiosHandler.AxiosPostHandler({
            url : API.getStudentExamBookings,
            data : {
                sapid : this.props.sapid,
            },
            successCallBack : (response) => {
                let data = response.data.response
                if(response.data && response.data.status == "success") {
                    this.setState({
                        loaded : true,
                        error : false,
                        canBook : data.canBook,
                        canNotBookReason : data.canNotBookReason,
                        failedSubjectsList : data.failedSubjectsList ? data.failedSubjectsList : [],
                        subjectsAppliedFor : data.subjectsAppliedFor ? data.subjectsAppliedFor : [],
                    }, 
                    () => {
                        let canBook = this.state.canBook
                        let hasMadeBookings = this.state.subjectsAppliedFor && this.state.subjectsAppliedFor.length > 0
                        if(canBook && !hasMadeBookings) {
                            this.props.history.push(Pages.newExamBooking)
                        }
                    })

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
    setStateFromHelper = (state) => {
        this.setState({
            ...state
        })
    }

    goToNewBooking = () => {
        this.props.history.push({
			pathname: Pages.newExamBooking
		}) 
    }
    
    goToSlotChange = () => {
        this.props.history.push({
			pathname: Pages.reScheduleExamBooking
		}) 
    }

    startDownload = () => {
        this.setState({
            showDownloadModal : true
        })
    }
    
    hideDownloadModal = () => {
        this.setState({
            showDownloadModal : false
        })
    }

    render() {
        const { subjectsAppliedFor, failedSubjectsList } = this.state
        let slotChangeDisabled = !(subjectsAppliedFor && subjectsAppliedFor.length)
        let downloadReceiptsDisabled = !(subjectsAppliedFor && subjectsAppliedFor.length)
        let allSubjectsBooked = failedSubjectsList && subjectsAppliedFor && subjectsAppliedFor.length === failedSubjectsList.length
        let newBookingDisabled = !failedSubjectsList || allSubjectsBooked
        return(
            <PageContent
                id = 'exam-booking'
                title = 'Exam Booking'
                subtitle = 'Your Current Bookings'
                loaded = {this.state.loaded}
                error = {this.state.error}
                loadingMessage = 'Loading...'
                errorMessage = { this.state.errorMessage }
            >
                <Alert show = { !this.state.canBook } variant="danger">
                    { this.state.canNotBookReason }
                </Alert>

                <BookedSubjectDetails subjectsAppliedFor = { this.state.failedSubjectsList } />
                
                {
                    this.state.canBook ? (
                        <>
                            <Button 
                                disabled = {newBookingDisabled}
                                variant = "primary" 
                                className="mx-1 mt-2 mb-1" 
                                onClick = {this.goToNewBooking}
                            >
                                New Booking
                            </Button>
                            <Button 
                                disabled = {slotChangeDisabled}
                                variant = "primary" 
                                className = "mx-1 mt-1 mb-1"
                                onClick = {this.goToSlotChange}
                            >
                                Exam Center Change
                            </Button>
                            <Button 
                                disabled = {downloadReceiptsDisabled}
                                variant = "primary" 
                                className = "mx-1 mt-1 mb-1"
                                onClick = {this.startDownload}
                            >
                                Download Fee Receipt
                            </Button>
                            {
                                this.state.showDownloadModal ? (
                                    <DownloadReceipt
                                        hideDownloadModal = {this.hideDownloadModal}
                                    />
                                ) : null
                            }
                        </>
                    ) : null
                }
            </PageContent>
        )
    }
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid
	}
}
export default connect(mapStateToProps)(analyticsManager(ExamBooking))


const columnCommon = {
    align: 'left',
    headerAlign: 'left',
    hidden: false,
}

const columns = [{
    dataField: 'timeboundId',
    text: 'Subject Id',
    hidden: true,
}, {
    dataField: 'subjectName',
    text: 'Subject Name',
    ...columnCommon,
}, {
    dataField: 'term',
    text: 'Term',
    ...columnCommon,
}, {
    dataField: 'month',
    text: 'Month',
    ...columnCommon,
}, {
    dataField: 'year',
    text: 'Year',
    ...columnCommon,
}, {
    text : 'Booking Status',
    formatter : bookingStatusFormatter,
    ...columnCommon,
}, {
    text: 'Center',
    formatter : centerFormatter,
    ...columnCommon,
}, {
    text: 'Exam Date',
    formatter : (cell, row) => formatExamDate(row.previousBookingDetails),
    ...columnCommon,
}, {
    text: 'Start Time',
    ...columnCommon,
    formatter : (cell, row) => formatExamStartTime(row.previousBookingDetails)
}, {
    dataField: '',
    text: 'End Time',
    formatter : (cell, row) => formatExamEndTime(row.previousBookingDetails),
    ...columnCommon,
}]