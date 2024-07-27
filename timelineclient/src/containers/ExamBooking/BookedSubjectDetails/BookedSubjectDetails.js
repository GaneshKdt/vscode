import React from 'react';
import { Table } from 'react-bootstrap';
import { Paper } from '@material-ui/core';
import moment from 'moment'
import CenterInfoModal from '../Common/CenterInfo/CenterInfoModal';
import { formatExamDate, formatExamStartTime, formatExamEndTime } from '../Common/Functions/TimeFormatHelper';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';

export default function BookedSubjectDetails(props) {
    return (
        <Paper className = 'p-3'>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Subject Name</th>
                        <th>Term</th>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Booking Status</th>
                        <th>Center</th>
                        <th className="text-nowrap">Exam Date</th>
                        <th className="text-nowrap">Start Time</th>
                        <th className="text-nowrap">End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.subjectsAppliedFor && props.subjectsAppliedFor.length > 0 ? getRows(props.subjectsAppliedFor) : (
                            <tr>
                                    <td colspan="10">
                                        <ErrorComponent message = 'No bookings found for the current cycle!' />
                                    </td>
                                
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Paper>
    );
}

function getRows(subjectsAppliedFor) {
    return subjectsAppliedFor.map((row, index) => (
        <BookingRow 
            key={`Booked-${index}`}
            subject = {row} 
            index = {index + 1}
        />
    ))
}
function BookingRow(props) {
    let subject = props.subject
    let hasBookings = props.subject.previousBookingDetails ? true : false
    let booking = props.subject.previousBookingDetails
    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{subject.subjectName}</td>
            <td>{subject.term}</td>
            <td>{subject.month}</td>
            <td>{subject.year}</td>
            <td className = { hasBookings ? 'text-success' : 'text-danger' } >
                { hasBookings ? `Booked` : `Not Booked`}
            </td>
            <td>
                { hasBookings && booking.centerName ? (
                    <>
                        { booking.centerName }
                        <CenterInfoModal
                            center = {{
                                name : booking.centerName,
                                city : booking.centerCity,
                                address : booking.centerAddress,
                                googleMapUrl : booking.centerMapURL,
                            }} 
                        />
                    </>
                ) : `-` }
            </td>
            <td className="text-nowrap">{ formatExamDate(booking) }</td>
            <td className="text-nowrap">{ formatExamStartTime(booking) }</td>
            <td className="text-nowrap">{ formatExamEndTime(booking) }</td>
        </tr>
    )
}