import React from 'react';
import { Table } from 'react-bootstrap';
import { Paper } from '@material-ui/core';
import moment from 'moment'
import ErrorComponent from '../../../../components/ErrorComponent/ErrorComponent';

export default function BookedSubjectDetails(props) {
    return (
        <Paper className = 'p-3'>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Subject Name</th>
                        <th>Application Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.failedSubjects && props.failedSubjects.length > 0 ? getRows(props.failedSubjects) : (
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

    console.debug(subject, subject.subject)
    let requestStatus = 'Not Applied'
    let className = 'text-danger'
    if(subject.applied) {
        if(subject.applicationDetails) {
            if(subject.applicationDetails.requestStatus === "Submitted" || subject.applicationDetails.requestStatus === "In Progress") {
                className = 'text-warning'
                requestStatus = 'In Progress'
            } else if(subject.applicationDetails.requestStatus === "Closed"){
                className = 'text-success'
                requestStatus = 'Successful'
            } else if(subject.applicationDetails.requestStatus === "Cancelled"){
                className = 'text-danger'
                requestStatus = 'Cancelled'
            }
        }
    }

    return (
        <tr>
            <th scope="row">{props.index}</th>
            <td>{subject.subject}</td>
            <td className = { className } >
                { requestStatus }
            </td>
        </tr>
    )
}