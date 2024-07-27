import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'

import { formatExamDate, formatExamStartTime, formatExamEndTime } from '../../../../shared/Functions/TimeFormatHelper'
import { AppConfig } from '../../../../shared/config';
import CenterInfoModal from '../../../CenterInfo/CenterInfoModal';

class PaymentConfirmation extends Component {
	constructor(props) {
		super(props)
		this.state = {
			paymentMethods : []
		};
    }

	render() {
		return (
            <>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Subject Name</th>
                            <th>Center</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Charges (₹)</th>
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
                                        <td className="text-nowrap">{ formatExamDate(subject.slot) }</td>
                                        <td className="text-nowrap">{ formatExamStartTime(subject.slot) }</td>
                                        <td className="text-nowrap">{ formatExamEndTime(subject.slot) }</td>
                                        <td>{ getBookingAmount(subject.amount, this.props.bookingType) }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            {/* <td colSpan="4"></td> */}
                            <td colSpan="6" className="text-right font-weight-bold">Total</td>
                            <th className = "text-nowrap">₹ {this.props.total} /-</th>
                        </tr>
                    </tfoot>
                </Table>
            </>
		)
    }
}

const getBookingAmount = (amount, bookingType) => {
    if(amount){
        return `${amount}`
    }

    if(bookingType === 'New Booking') {
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