import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PageContent from '../../../components/PageContent/PageContent'
import { analyticsManager } from '../../../shared/Analytics'
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler'
import { API, Pages } from '../../../shared/config'
import BookedSubjectDetails from './BookedSubjectDetails/BookedSubjectDetails'

class SubjectRepeat extends Component {
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
                        
                        this.setState({
                            loaded : true,
                            error : false,
                            failedSubjectsList : subjectsList
                        }, 
                        () => {
                            let hasNonAppliedSubjects = false
                            this.state.failedSubjectsList.forEach((subject) => {
                                if(!subject.applied) {
                                    hasNonAppliedSubjects = true
                                }
                            })
                            this.setState({
                                allowBooking : hasNonAppliedSubjects
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
    setStateFromHelper = (state) => {
        this.setState({
            ...state
        })
    }

    goToNewSR = () => {
        this.props.history.push({
			pathname: Pages.newSubjectRepeatSR
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
        const { subjectsAppliedFor, failedSubjectsList, allowBooking } = this.state
        let slotChangeDisabled = !(subjectsAppliedFor && subjectsAppliedFor.length)
        let downloadReceiptsDisabled = !(subjectsAppliedFor && subjectsAppliedFor.length)
        
        return(
            <PageContent
                id = 'exam-booking'
                title = 'Service Request'
                subtitle = 'Subject Repeat Registration'
                loaded = {this.state.loaded}
                error = {this.state.error}
                loadingMessage = 'Loading...'
                errorMessage = { this.state.errorMessage }
            >
                <BookedSubjectDetails
                    failedSubjects = { this.state.failedSubjectsList } 
                />
                
                <Button 
                    disabled = {!allowBooking}
                    variant = "primary" 
                    className="mx-1 mt-2 mb-1" 
                    onClick = {this.goToNewSR}
                >
                    New Service Request
                </Button>
            </PageContent>
        )
    }
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid
	}
}
export default connect(mapStateToProps)(analyticsManager(SubjectRepeat))


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
}]