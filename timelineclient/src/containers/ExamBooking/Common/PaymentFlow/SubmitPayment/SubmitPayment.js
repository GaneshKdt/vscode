import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import LoadingSpinner from "../../../../../shared/LoadingSpinner/LoadingSpinner";
import ErrorAndLoadingWrapper from '../../../../../shared/Helpers/ErrorAndLoadingWrapper/ErrorAndLoadingWrapper';
import AxiosHandler from '../../../../../shared/AxiosHandler/AxiosHandler';
import { API, URL } from '../../../../../shared/config';

class SubmitPayment extends Component {

    constructor(props) {
        super(props)
        
        this.state = {}
    }
    componentDidMount() {
        if(this.checkIfFieldsComplete()) {
            this.saveExamBookingRequest()
        }
    }
    
    saveExamBookingRequest() {
        var selectedSubjects = []
        
        this.props.selectedSubjects.forEach((subject) => {
            let obj = {
                timeboundId : subject.timeboundId,
                slotId : subject.slot.slotId,
            }
            selectedSubjects.push(obj)
        })

        AxiosHandler.AxiosPostHandler({
            url : API.saveExamBookingRequest,
            data : {
                sapid : this.props.sapid,
                selectedSubjects : selectedSubjects,
                paymentOption : this.props.selectedPaymentProvider.name,
                source : "webapp",
                generatePaymentMap : false,
                isForSlotChange : this.props.bookingType == 'Slot Change' ? true : false
            },
            successCallBack : (response) => {
                console.debug(response.data)
                let data = response.data
                if(data && data.status == "success" && data.response) {
                    let trackId = data.response.trackId
                    // let centers = createStateAndCenterMap(data.response)
                    this.setState({
                        loaded : true,
                        error : false,
                        errorMessage : "",
                        trackId : trackId
                    },
                    () => {
                        this.submitPaymentForm()
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

    checkIfFieldsComplete() {
        let fieldsPresent = this.props.sapid && this.props.selectedSubjects && this.props.selectedPaymentProvider ? true : false
        let moreThanOneSubject =  this.props.selectedSubjects && this.props.selectedSubjects.length > 0 ? true : false
        
        return fieldsPresent && moreThanOneSubject
    }

    submitPaymentForm() {
        if(this.checkIfFieldsComplete() && this.state.trackId) {
            window.$("#submit-payment").submit()
        }
    }
	render() {
		return (
            <ErrorAndLoadingWrapper
                loaded = {this.state.loaded}
                error = {this.state.error}
                loadingMessage = 'Initiating payment request...'
                errorMessage = { this.state.errorMessage }
            >
                <Container>
                    <div className="w-100 text-center">
                        <LoadingSpinner loadingText = { `Please wait...` } noSpace />
                    </div>
                    
                    <div className="d-none">
                        <form id="submit-payment" action={ URL.initiateExamBooking } method="POST">
                            <input 
                                type  = "hidden" 
                                name  = "sapid" 
                                id    = "sapid" 
                                value = { this.props.sapid }
                            />
                            <input 
                                type  = "hidden" 
                                name  = "source" 
                                id    = "source" 
                                value = { "WebApp" }
                            />
                            <input 
                                type  = "hidden" 
                                name  = "paymentOption" 
                                id    = "paymentOption" 
                                value = { this.props.selectedPaymentProvider.name }
                            />
                            <input 
                                type  = "hidden" 
                                name  = "trackId" 
                                id    = "trackId" 
                                value = { this.state.trackId }
                            />
                            <input 
                                type  = "hidden" 
                                name  = "isWeb" 
                                id    = "isWeb" 
                                value = { true }
                            />
                            {
                                this.props.bookingType == 'Slot Change' ? (
                                    <input 
                                        type  = "hidden" 
                                        name  = "isForSlotChange" 
                                        id    = "trackId" 
                                        value = { true }
                                    />
                                ) : null
                            }
                        </form>
                    </div>
                </Container>
            </ErrorAndLoadingWrapper>
		)
	}
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid
	}
}
export default connect(mapStateToProps)(SubmitPayment)