import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { LinkContainer } from 'react-router-bootstrap'
import Collapse from 'react-bootstrap/Collapse'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { connect } from 'react-redux'
import moment from 'moment'
import ConfigUrls, { Pages } from '../../shared/config'
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment'

import SessionHelper from '../../shared/Helpers/SessionHelpers/SessionHelper'
import AttendSessionModal from '../../shared/Helpers/SessionHelpers/AttendSessionModal'
import { Link } from 'react-router-dom'

const red_color = {
    color: 'red'
}
export class ScheduledSession extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){
        console.log(this.props.session)
		this.setState({
            session: this.props.session,
            sessionBean: this.props.session,
            infoCollapse: false,
            openingZoom: false,
            facultyName: null
           
         })
    }
    // componentDidUpdate(prevProps, prevState) {
    //     console.log('In SessionPlanModule componentDidUpdate()...');
    //     console.log("Got prevProps, prevState : ")
    //     console.log(prevProps)
    //     console.log(prevState)
    //     // if (prevState.id !== this.state.id) {
    //     //   let updateSateObj = {
    //     //     id:this.state.id,
    //     //     module:this.state.module,
    //     //     key:"videos",
    //     //     isLoaded: true
    //     //   }
    //     //   console.log("updateSateObj : ");
    //     //   console.log(updateSateObj);
    //     //   this.setState({updateSateObj})
    //     // }else{
    //     //   console.log("No State update : ");
    //     // }
    //     return {
    //         session: this.nextProps.session,
    //         sessionBean: this.nextProps.session.sessionBean,
    //         infoCollapse: false,
    //         openingZoom: false,
    //         facultyName: null
    //     }
    //   }
      
      static getDerivedStateFromProps(nextProps, prevState){
        console.log('In viewScheduledSession getDerivedStateFromProps()...');
        console.log("Got nextProps, prevState : ")
        console.log(nextProps)
        console.log(prevState)
        //console.log(moment().isAfter("2019-06-23"));
        if(nextProps.session){
            var join_enabled =false;
            
            if (SessionHelper.CheckIfSessionActive(nextProps.session)) {
           
                console.log("enable zoom button");
                join_enabled = true;
              //join_button_color = "#c72127";
            }
            return {
                sessionBean: nextProps.session,
                infoCollapse:prevState?(prevState.infoCollapse?prevState.infoCollapse:false):false,
                openingZoom: prevState?(prevState.openingZoom?prevState.openingZoom:false):false,
                studentData: nextProps.data,
                facultyName: null,
                join_enabled: join_enabled,
                showJoinSession: prevState?(prevState.showJoinSession?prevState.showJoinSession:false):false,
                //join_button_color: nextProps.join_button_color
            }
        }else{
            return null;
        }
    
    }

    joinSession = () =>{
        this.setState({
            showJoinSession: true,
        })
    }
    
    joinSessionModalHide = () => {
        this.setState({
            showJoinSession: false,
        })
    }

    render() {
        
        {console.log(this.state.join_enabled)}
        const {
            session,
            sessionBean,
            infoCollapse,
            openingZoom,
            join_button_color,
            join_enabled
        } = this.state;
       
        return (
                <Card>
                    {
                        this.state.showJoinSession ? (
                            <AttendSessionModal 
                                session = {this.state.sessionBean}
                                student = {this.state.studentData}
                                onClose = {this.joinSessionModalHide}
                            />
                        ) : null
                    }
                    <Card.Header>{sessionBean.subject ? sessionBean.subject : ""}</Card.Header>
                    <Card.Body>
                        <Table striped hover>
                            <tbody>
                                <tr>
                                    <td>Session Name</td>
                                    <td>{sessionBean.sessionName}</td>
                                </tr>
                                <tr>
                                    <td>Date / Time</td>
                                    <td>
                                        <Moment format="MMM D \at hh:mm a " withTitle local>
                                            {sessionBean.date+' '+sessionBean.startTime}
                                        </Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Faculty </td>
                                    {/* <td> <Image src={sessionBean.imgUrl} height="40px" width="40px" class="rounded"/> {sessionBean.firstName} {sessionBean.lastName}</td> */}
                                    <td>
                                        {console.log("sessionBean",sessionBean)}
                                        <Link 
                                                to={{
                                                    pathname: Pages.instructorProfile,
                                                    state   : { 
                                                        userId: sessionBean.facultyId
                                                    }
                                                }} 
                                            >
                                                &nbsp;{sessionBean.firstName} {sessionBean.lastName}&nbsp;
                                            </Link></td>
                                </tr>
                            </tbody>
                        </Table>

                        <a onClick={() => this.setState({ infoCollapse: !infoCollapse })} aria-controls="info-data" 
                               className="pl-2" aria-expanded={infoCollapse} >
                                   <FontAwesomeIcon icon="plus-square" /> Instructions to attend session:
                        </a>
                        <Collapse in={this.state.infoCollapse}>
                            <div id="info-data">
                                <ul>
                                    <li >Attend Session Button will be enabled 1 hour before session.</li>
                                    <li >You can join meeting 15 minutes before start time.</li>
                                    <li >Please keep your Headset ready to attend the session over Zoom.</li>
                                    <li >You can post queries related to session after session is over.</li>
                                    <li >Please use Google Chrome OR Mozilla Firefox OR Safari browser preferably.</li>
                                    <li >Please contact Technical Support Desk +1-888-799-9666 for any Technical Assistance in joining Zoom Webinar </li>
                                </ul>
                            </div>
                        </Collapse>
                        <hr />

                        {(sessionBean.isCancelled === 'Y') &&
                             <span style={red_color}>
                                <h6>Session Cancelled </h6> 
                                <p>Remarks : {sessionBean.reasonForCancellation}</p>
                             </span>
                        }
                       
                        <Button 
                            disabled={!join_enabled}
                            onClick= {this.joinSession} variant="primary" size="sm">Attend Session by Prof. {sessionBean.firstName} {sessionBean.lastName}
                        </Button>
                        <br /><br /><br /><br />
{/*                         
                        <LinkContainer
                            to={{
                                pathname: "/timeline/PostAQuery",
                                session: this.state.sessionBean
                            }}
                        >
                            <Button 
                                disabled={join_enabled}
                                // onClick= {this.postAQueryEventClick} 
                                variant="primary" 
                                size="sm"
                            > Post A Query </Button>
                        </LinkContainer><br/>
                        <Button 
                        disabled={join_enabled}
                         onClick= {this.handleEventClick} variant="primary" size="sm"> My Queries </Button>
                        <br />
                        <Button 
                        disabled={join_enabled}
                         onClick= {this.handleEventClick} variant="primary" size="sm"> View Session Recordings </Button>
                        <br /> */}
                    </Card.Body>
                </Card>
            
        )
    }
}
const mapStateToProps = state => {
	return {
		data: state
	}
}

export default connect(mapStateToProps)(ScheduledSession)
