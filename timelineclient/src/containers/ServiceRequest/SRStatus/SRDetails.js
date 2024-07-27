import React from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment'
import { Paper } from '@material-ui/core';


export default function SRDetails(props) {

    return (
        <Paper className = 'p-3'>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Subject Name</th>
                        <th>Term</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.srDetails.map((row, index) => {
                            
                            let sr = row
                            let className = ""
                            let requestStatus = sr.requestStatus
                            
                            if(sr.requestStatus === "Submitted" || sr.requestStatus === "In Progress") {
                                className = 'text-warning'
                                requestStatus = 'In Progress'
                            } else if(sr.requestStatus === "Closed"){
                                className = 'text-success'
                                requestStatus = 'Successful'
                            } else if(sr.requestStatus === "Cancelled"){
                                className = 'text-danger'
                                requestStatus = 'Cancelled'
                            }
                            return (
                            <tr key={`Booked-${index}`}>
                                <th scope="row">{index+1}</th>
                                <td>{row.subject}</td>
                                <td>{row.sem}</td>
                                <td className = {className}>{ requestStatus }</td>
                            </tr>
                        )
                        })
                    }
                </tbody>
            </Table>
        </Paper>
    );
}