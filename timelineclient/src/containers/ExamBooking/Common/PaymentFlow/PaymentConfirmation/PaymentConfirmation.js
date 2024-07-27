import React, { Component } from 'react'
import { Row, Container, Col, Button, Table, Card, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'
import moment from 'moment';
import { AppConfig } from '../../../../../shared/config';
import CenterInfoModal from '../../CenterInfo/CenterInfoModal';
import { formatExamDate, formatExamStartTime, formatExamEndTime } from '../../Functions/TimeFormatHelper';

class PaymentConfirmation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			paymentMethods : []
		};
    }

	render() {
		return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Subject Name</th>
                        <th>Center</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th className="text-nowrap">Charges (₹)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.selectedSubjects.map((subject, index) =>{
                            return (
                                <tr key={`selected-subject-${index}`} >
                                    <td>{ index + 1 }</td>
                                    <td>{ subject.subjectName }</td>
                                    <td>
                                        { subject.center.name }
                                        <CenterInfoModal center = { subject.center } />
                                    </td>
                                    <td>{ formatExamDate(subject.slot) }</td>
                                    <td>{ formatExamStartTime(subject.slot) }</td>
                                    <td>{ formatExamEndTime(subject.slot) }</td>
                                    <td>{ this.props.bookingType === 'New Booking' ? subject.bookingAmount : subject.slotChangeAmount }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        {/* <td colSpan="4"></td> */}
                        <td colSpan="6" className="text-right font-weight-bold">Total</td>
                        <th>₹ {this.props.total} /-</th>
                    </tr>
                </tfoot>
            </Table>
		)
    }
}

const getBookingAmount = (amount, bookingType) => {
    if(amount){
        return `${amount}`
    }

    if(bookingType == 'New Booking') {
        return AppConfig.EXAM_BOOKING_DEFAULT_CHARGE
    } else {        
        return AppConfig.EXAM_BOOKING_RELEASE_BOOKING_DEFAULT_CHARGE
    }
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid
	}
}
export default connect(mapStateToProps)(PaymentConfirmation)