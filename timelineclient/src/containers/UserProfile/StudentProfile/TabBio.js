import React, { Component } from 'react';

class TabBio extends Component{
    render(){
        return(
            <div>
                <h6>Basic Details</h6>
                    <p>sapid: {this.props.studentData.sapid}</p>
                    <p>sem: {this.props.studentData.sem}</p>
                    <p>program: {this.props.studentData.program}</p>
                <hr />
                <h6>Qualification</h6>
                    <p>UG Qualification: {this.props.studentData.ugQualification}</p>
                    <p>Highest Qualification: {this.props.studentData.highestQualification}</p>
                    <p>Industry: {this.props.studentData.industry}</p>
                <hr />
                <h6>Location</h6>
                    <p><span ><i class="material-icons">location_on</i>{this.props.studentData.city}</span></p>
                    {/* <p>mobile: {this.props.studentData.mobile}</p> */}
                <hr />
                <h6>Groups</h6>
                    {this.props.groups.map(group => {
                        return <><i className="fas fa-book mr-2 align-self-center"></i>{group.groupName}<br /></>
                    })}       
            </div>
        )
    }
}

export default TabBio