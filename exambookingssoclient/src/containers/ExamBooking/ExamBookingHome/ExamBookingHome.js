import React, { Component } from 'react'

import { connect } from 'react-redux'
import PageContent from '../../../components/PageContent/PageContent';
import BookedSubjectDetails from './BookedSubjectDetails/BookedSubjectDetails';
import { API, Pages } from '../../../shared/config';
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler';
import { Button } from '@material-ui/core';
import DownloadReceipt from './DownloadReceipt';

class MyBookingsHome extends Component {
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
            url : API.getExamBookingData,
            data : {
                sapid : this.props.sapid,
            },
            successCallBack : (response) => {
                let data = response.data
                if(data && data.status === "success" && data.response) {
                    let responseData = data.response

                    if (responseData.canBook) {
                        this.setState({
                            loaded : true,
                            error : false,
                            canBook : responseData.canBook,
                            failedSubjectsList : responseData.failedSubjectsList ? responseData.failedSubjectsList : [],
                            subjectsAppliedFor : responseData.subjectsAppliedFor ? responseData.subjectsAppliedFor : [],
                        }, 
                        () => {
                            let hasMadeBookings = this.state.subjectsAppliedFor && this.state.subjectsAppliedFor.length > 0
                            if(!hasMadeBookings) {
                                this.props.history.push(Pages.newExamBooking)
                            }
                        })
                    } else {
                        this.setState({
                            loaded : true,
                            error : true,
                            errorMessage : responseData.canNotBookReason,
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
			pathname: Pages.slotChange
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
                <BookedSubjectDetails subjectsAppliedFor = { this.state.failedSubjectsList } />
                
                {
                    this.state.canBook ? (
                        <>
                            <Button 
                                disabled = {newBookingDisabled}
                                variant="contained" 
                                color="primary" 
                                className="mx-1 mt-2 mb-1" 
                                onClick = {this.goToNewBooking}
                            >
                                New Booking
                            </Button>
                            <Button 
                                disabled = {slotChangeDisabled}
                                variant = "contained" 
                                color = "primary" 
                                className = "mx-1 mt-1 mb-1"
                                onClick = {this.goToSlotChange}
                            >
                                Exam Center Change
                            </Button>
                            <Button 
                                disabled = {downloadReceiptsDisabled}
                                variant = "contained" 
                                color = "primary" 
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
        state : state,
		sapid: state.sapid
	}
}

export default connect(mapStateToProps)(MyBookingsHome)