import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Pages, API } from '../../../shared/config';
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler';
import PageContent from '../../../components/PageContent/PageContent';
import BookingDetails from './BookingDetails';
import { Alert, ButtonToolbar } from 'react-bootstrap';
import { Button } from '@material-ui/core';

const queryString = require('query-string')

class BookingSuccess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errorMessage : '',
            trackId : '',
        }
    }
    componentDidMount() {
        let trackId = queryString.parse(this.props.location.search).trackId

        this.setState({
            loaded : false,
            error : false,
            errorMessage : '',
            trackId : trackId,
        },
        () => {
            this.fetchOrderDetails()
        })
    }

    fetchOrderDetails = () => {
        AxiosHandler.AxiosPostHandler({
            url : API.getBookingsForTrackId,
            data : {
                trackId : this.state.trackId,
                sapid : this.props.sapid,
            },
            successCallBack : (response) => {
                if(response.data) {
                    let data = response.data
                    if(data.status === "success") {
                        this.setState({
                            loaded : true,
                            error : false,
                            bookingsMade : data.response && data.response.bookings ? data.response.bookings : []
                        })
                    } else {
                        this.setState({
                            loaded : true,
                            error : true,
                            errorMessage : 'Error Fetching data from server!'
                        })
                    }
                }
            },
            failureCallBack : (error) => {
                console.debug(error)
            }
        })
    }

    goToBookingPage = () => {
        this.props.history.push({
			pathname: Pages.examBookingHome
		})
    }

    render() {
        const { loaded, error, errorMessage } = this.state
        return (
            <PageContent
                id="exam-booking"
                title = 'Exam Booking'
                subtitle = { 'Payment Successful' }

                loaded = { loaded }
                error = { error }
                loadingMessage = 'Loading...'
                errorMessage = { errorMessage }
            >
                <Alert variant="success"> Exam Booking Successful </Alert>
                <BookingDetails subjectsAppliedFor = { this.state.bookingsMade } />

                <ButtonToolbar className = "mt-2">
                    <Button
                        variant="contained"
                        color="primary"
                        className="mx-1"
                        onClick = {this.goToBookingPage}
                    >
                        New Booking
                    </Button>
                </ButtonToolbar>
            </PageContent>
        )
    }
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid
	}
}
export default connect(mapStateToProps)(BookingSuccess)