import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment'
import { Paper } from '@material-ui/core';


export default function BookingDetails(props) {

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
                        <th>City</th>
                        <th>Center</th>
                        {/* <th>Amount Paid</th> */}
                        <th>Exam Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.subjectsAppliedFor.map((row, index) => (
                            <tr key={`Booked-${index}`}>
                                <th scope="row">{index+1}</th>
                                <td>{row.subjectName}</td>
                                <td>{row.term}</td>
                                <td>{row.month}</td>
                                <td>{row.year}</td>
                                <td className = { row.bookingStatus === 'Y' ? 'text-success' : 'text-danger' }>
                                    { row.bookingStatus === 'Y' ? `Booked` : `Not Booked`}
                                </td>
                                <td>
                                    { row.centerCity }
                                </td>
                                <td>
                                    { row.centerName }
                                </td>
                                {/* <td>
                                    {
                                        row.bookingType == 'New Booking' ? 
                                            row.bookingAmount : row.slotChangeAmount
                                    }
                                </td> */}
                                <td>{ formatExamDate(row) }</td>
                                <td>{ formatExamStartTime(row) }</td>
                                <td>{ formatExamEndTime(row) }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Paper>
    );
}

export function formatExamDate(subject) {
    if(subject && subject.examStartDateTime) {
        return moment(subject.examStartDateTime).format("D MMM YYYY")
    } else {
        return '-'
    }
}

export function formatExamStartTime(subject, previous) {
    if(subject && subject.examStartDateTime) {
        return moment(subject.examStartDateTime).format("hh:mm a")
    } else {
        return '-'
    }
}

export function formatExamEndTime(subject) {
    if(subject && subject.examEndDateTime) {
        return moment(subject.examEndDateTime).format("hh:mm a")
    } else {
        return '-'
    }
}