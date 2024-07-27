import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpecializationSelection from './SpecializationSelection.js'
import CourseSpecialisationMain from '../../containers/CourseSpecialisation/CourseSpecialisationMain'

class ElectiveSelection extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            sapid : this.props.sapid,
            consumerProgramStructureId : this.props.consumerProgramStructureId,
            isServiceRequest : this.props.location.state ? this.props.location.state.serviceRequest : false
        }
    }

    render(){
        return this.state.consumerProgramStructureId == 160 ? 
            <SpecializationSelection
                isServiceRequest = {this.state.isServiceRequest}/> : 
            <CourseSpecialisationMain
                serviceRequest = {this.state.isServiceRequest}/>
    }

}

const mapStateToProps = state => {
    return {
        sapid : state.sapid,
        consumerProgramStructureId : state.consumerProgramStructureId
    }
}

export default  connect(mapStateToProps) (ElectiveSelection);