import React, { Component } from 'react'
import SingleCenterAndSlot from './SingleCenterAndSlotRow/SingleCenterAndSlot'
import { Table, Button } from 'react-bootstrap'

class CenterSlotSelection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded : false,
        }
    }

    showAllCenters = () => {
        this.setState({
            showAllCenters : true
        })
    }

    hideAllCenters = () => {
        this.setState({
            showAllCenters : false
        })
    }
    render() {
        return (
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            Subject Name
                        </th>
                        <th style={{minWidth : '200px'}}>
                            Center
                        </th>
                        <th>
                            Slot
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.subjects.map((subject, index) => {
                            return (
                                <SingleCenterAndSlot 
                                    key = { `center-slot-${index}` }
                                    subject = { subject }
                                    allCenters = { this.props.allCenters }
                                    setSlot = { (slot) => {
                                        var promise = new Promise((resolve, reject) => {
                                            this.props.setSlotToSubject(slot, subject.timeboundId, resolve)
                                        })
                                        return promise
                                    } }
                                    setSlotsListToSubject = { (slotsList) => {
                                        return new Promise((resolve, reject) => {
                                            this.props.setSlotsListToSubject(slotsList, subject.timeboundId, resolve)
                                        })
                                    }}
                                    setCenter = { (center) => {
                                        return new Promise((resolve, reject) => {
                                            this.props.setCenterToSubject(center, subject.timeboundId, resolve)
                                        })
                                    } } 
                                />
                            )
                        })
                    }
                </tbody>
            </Table>
        )
    }
    
    
}

export default CenterSlotSelection