import React, { Component } from 'react'
import Select from "react-select";
import { API } from '../../../../shared/config';
import AxiosHandler from '../../../../shared/AxiosHandler/AxiosHandler';
import LoadingSpinner from '../../../../shared/LoadingSpinner/LoadingSpinner';
import AllCenters from './AllCenters'
import SearchIcon from '@material-ui/icons/Search';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';

class SingleCenterAndSlot extends Component {

    constructor(props) {
        super(props) 

        this.state = {
            centerGroups : [],
            disableSlotSelection : true,
            showCentersModal : false,
        }
    }

    showExamCenters = () => {
        this.setState({
            showCentersModal : true
        })
    }

    hideExamCenters = () => {
        this.setState({
            showCentersModal : false
        })
    }

    createStateAndCenterMap = () => {
        let centers = this.props.allCenters
        // Set centers with the state title on top
        var statesAndCenters = {}
        centers.forEach((center) => {
            let stateName = center.state.trim().toLowerCase()
            if(!statesAndCenters[stateName]) {
                statesAndCenters[stateName] = []
            }
            let centerInfo = {
                value: center.centerId, label: center.name, data: center
            }
            statesAndCenters[stateName].push(centerInfo)
        })
        
        var keyedCenterGroups = []
        for(var state in statesAndCenters) {
            let data = {
                label: state,
                options: statesAndCenters[state].sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0)),
            }
    
            keyedCenterGroups.push(data)
        }
        return keyedCenterGroups.sort((a,b) => (a.label > b.label) ? 1 : ((b.label > a.label) ? -1 : 0));
    }

    centerChanged = (selected) => {
        this.setState({
            slotLoading : true,
            disableSlotSelection : true,
        }, () => {
            this.props.setCenter(selected.data).then(() => this.getSlotsForCenter())
        })
    }

    getSlotsForCenter = () => {
        AxiosHandler.AxiosPostHandler({
            url : API.getAvailableSlots,
            data : {
                timeboundId : this.props.subject.timeboundId,
                centerId : this.props.subject.center.centerId,
            },
            successCallBack : (response) => {
                let data = response.data
                if(data && data.status === "success" && data.response) {
                    var slots = []
                    data.response.forEach((slot) => {
                        let slotObj = this.getSlotObject(slot)
                        slots.push(slotObj)
                    })
                    this.props.setSlotsListToSubject(slots)
                    var disableSlotSelection = false
                    if(slots.length === 1) {
                        disableSlotSelection = true
                        this.slotChanged(slots[0])
                    }
                    this.setState({
                        slotLoading : false,
                        disableSlotSelection : disableSlotSelection,
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

    slotChanged = (selected) => {
        this.props.setSlot(selected.data)
    }

    getSelectedCenter = () => {
        if(this.props.subject.center){
            return {
                value : this.props.subject.center.centerId,
                label : this.props.subject.center.name
            }
        }
        return null
    }

    getSelectedSlot = () => {
        if(this.props.subject.slot){
            return this.getSlotObject(this.props.subject.slot)
        }
        return null
    }

    getSlotObject = (slot) => {
        let startTime = `${moment(slot.examStartDateTime).format("MMM D, hh:mm a")} (IST)`
                        
        let isDisabled = slot.availableSlots ? false : true
        let slotName = (
            <span>
                <span>
                    {startTime}
                </span>
                {/* <small className={isDisabled ? '' : `text-muted`}>
                    &nbsp;| Slots Left : { slot.availableSlots }
                </small> */}
            </span>
        )
        let slotObj = {
            value: slot.slotId, label: slotName, data: slot, isDisabled: isDisabled 
        }

        return slotObj
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
    
    getSlotInfo = () => {
        if (!this.state.slotLoading && this.props.subject.slotsList && this.props.subject.center) {
            let numberOfSlots = this.props.subject.slotsList.length
            if (numberOfSlots === 0) {
                return 'No slots available for this center!'
            } else if (numberOfSlots === 1) {
                return this.getSelectedSlot().label
            }else if (numberOfSlots > 1) {
                return (
                    <Select
                        isDisabled =  { this.state.disableSlotSelection }
                        value = { this.getSelectedSlot() }
                        isLoading = { this.state.slotLoading }
                        name = "slot"
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                        options = { this.props.subject.slotsList }
                        onChange = { this.slotChanged } 
                    />
                )
            }
        } else if (this.state.slotLoading) {
            return <LoadingSpinner />
        }

        return 'Exam Time'
    }

    render() {
        console.debug(this.props)
        return (
            <tr>
                <td className="align-middle" width="33%">
                    {this.props.subject.subjectName}
                </td>
                <td className = "align-middle" width="33%">
                    {
                        this.state.showAllCenters ? (
                            <AllCenters 
                                allCenters = { this.props.allCenters }
                                show = { this.state.showAllCenters }
                                closed = { this.hideAllCenters }
                                saveCenter = { this.centerChanged }
                                selectedCenter = { this.props.subject.center }
                            />
                        ) : null
                    }
                    <Row>
                        <Col>
                            <Select
                                isDisabled =  { false }
                                isLoading = { false }
                                name = "center"
                                value = { this.getSelectedCenter() }
                                menuPlacement="auto"
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                options = { this.createStateAndCenterMap() }
                                onChange = { this.centerChanged }
                            />
                        </Col>
                        <Col md="auto" className="d-flex pl-0">
                            <SearchIcon className="mx-auto my-auto" style={{cursor : 'pointer'}} onClick={this.showAllCenters}/>
                        </Col>
                    </Row>
                </td>
                <td className = "align-middle" width="33%">
                    {
                        this.getSlotInfo()
                    }
                </td>
            </tr>
        )
    }
}

export default SingleCenterAndSlot