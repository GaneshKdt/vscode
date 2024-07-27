import React, { Component, useState } from 'react'
import { Container, Table, Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import ConfigUrls from '../../shared/config'
import axios from 'axios'
import CourseSpecialisationMain from './CourseSpecialisationMain'

const urls = new ConfigUrls().urls;
export class SpecialisationHome extends Component {

   constructor(props) {
    super(props)
    this.state = {
        showSRMessage           : true,
        isServiceRequestLoaded  : false,
        isServiceRequestRaised  : false,
        isSubjectSelected       : false,
        serviceRequest          : this.props.values.serviceRequest,
        isReSelect              : this.props.isReSelect,
        showReSelect            : this.props.showReSelect
    };
  }  
  componentDidMount(){
    this.getServiceRequestForSpecialisationStatus();
  }
  getServiceRequestForSpecialisationStatus(){

        this.setState({isServiceRequestLoaded:false})
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.get(urls.apiUrl_exam + "/isServiceRequestRaised?sapId="+this.props.sapId
        ).then( response => {     
            if(response.data.isServiceRequestRaised == "true"){
                this.setState({
                    isServiceRequestRaised : true,
                    isServiceRequestLoaded :true
                })
            }else{
                this.setState({
                    isServiceRequestLoaded :true
                })
            }
        }).catch(function(error){
          console.log(error);
        })
    }

    reSelectSubejct = () => {
        const isConfirm = window.confirm('Are you sure you want to Re-Select Electives? This will clear your previous selection of subjects');
        if(isConfirm){
            this.setState({
                reSelectSubejct : true,
                isReSelect : true
            })
        }
    }

    render() {
        const { values } = this.props;
        return (
            <>           
                <br />
                {!this.state.isReSelect ? (
                <Card>
                    <Card.Header><h4>Course Specialisation</h4></Card.Header>
                    <Card.Body>
                        {   
                            values.appliedSpecialisationList.length > 1 ? (
                                <>
                                
                                {this.state.showReSelect ? (
                                    <Button variant="secondary" id="reSelect" onClick={this.reSelectSubejct}>Re-Select Electives</Button>
                                ) : '' 
                                }
                                {this.state.reSelectSubejct === true?
                                    <CourseSpecialisationMain
                                        isReSelect = {true}/>
                                : null 
                                }
                                {
                                this.state.showSRMessage && this.state.isServiceRequestRaised && this.state.isServiceRequestLoaded && this.state.serviceRequest ? (
                                    <Alert className="text-center" variant="success" >
                                        <FontAwesomeIcon  className="mr-2" icon="info-circle"/>
                                        You've raised a Service Request
                                        <FontAwesomeIcon  onClick={() => this.setState({showSRMessage: false })} 
                                        style={{float: "right",cursor: "pointer"}} className="mr-2 " icon="times"/>
                                    </Alert>
                                ) : ''
                                } 
                                {
                                this.state.showSRMessage && this.state.isServiceRequestLoaded && (this.state.serviceRequest || !this.state.serviceRequest) ? (
                                    <Alert className="text-center" variant="success" >
                                        <FontAwesomeIcon  className="mr-2" icon="info-circle"/>
                                        You've Selected Course Subjects                                        <FontAwesomeIcon  onClick={() => this.setState({showSRMessage: false })} 
                                        style={{float: "right",cursor: "pointer"}} className="mr-2 " icon="times"/>
                                    </Alert>
                                ) : ''
                                }</>
                            ) : <Alert variant="danger" >
                                    <FontAwesomeIcon className="mr-2" icon="times-circle"/> Please try again...                    
                                    <FontAwesomeIcon onClick={() => this.setState({showSRMessage: false })} 
                                    style={{float: "right",cursor: "pointer"}} className="mr-2 " icon="times"/>
                                </Alert>
                        }
                        

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Sr.No</th>
                            <th>Subject</th>
                            <th>Term</th>
                            <th>Specialisation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                values.appliedSpecialisationList.length < 1 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            <FontAwesomeIcon icon="exclamation-circle"/> Error in getting subject. Please try again...
                                        </td>
                                    </tr>
                                ): values.appliedSpecialisationList.map((subject, index) => {
                                    return(
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{subject.subject}</td>
                                            <td>{values.maxTerm+1}</td>
                                            {/* <td>{subject.term}</td> */}
                                            <td>{subject.specializationType}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        </Table>
                    </Card.Body>
                    {
                        values.appliedSpecialisationList.length < 1 ? (
                            <Card.Footer>
                                <Button className="float-right" href="courseSpecialisationMain">Try again</Button>
                            </Card.Footer>
                        ) : ''
                    }
                    
                </Card>
                ) : <CourseSpecialisationMain
                        isReSelect = {true}/>}
            </>
        )  
    }
}



export default (SpecialisationHome)
