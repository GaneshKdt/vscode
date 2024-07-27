import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import { Pages } from '../../../../../shared/config'

import SessionHelper from '../../../../../shared/Helpers/SessionHelpers/SessionHelper'
import AttendSessionModal from '../../../../../shared/Helpers/SessionHelpers/AttendSessionModal'


class UpcomingSession extends Component{


    constructor(props) {
		super(props)
        // Sets up our initial state
        this.state = {
            showJoinSession: false,
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
        const {
            session,
            student
        } = this.props;
        var activeSession = SessionHelper.CheckIfSessionActive(session)
        return(
            <div className="task-item">
                {
                    this.state.showJoinSession ? (
                        <AttendSessionModal 
                            session = {session} 
                            student = {student}
                            onClose = {this.joinSessionModalHide}
                        />
                    ) : null
                }
                <div className="mini-task-item">
                    <div className="mini-task-item-wrapper">
                        <div className="content-left">
                            <i class="material-icons" style={{fontSize: '18px'}}>ondemand_video</i>			
                        </div>
                        <div className="content-right">
                            <div className="right-title-wrapper">
                                <div class="right-title">
                                    <Link to={{
                                                pathname: Pages.calendar,
                                                eventDetails: session,
                                                currentEventType: 'session'
                                            }}>{session.subject}
                                    </Link>
                                </div>
                                {(activeSession) ?<div className="blinkingButton">Live</div>:""}
                                
                            </div>
                            
                            <div class="right-sub-box-wrapper">
                            <div class="class-name"><b>{session.sessionName}</b></div><div class="line"></div>
                            <div class="class-name">{session.firstName} {session.lastName}</div>
                            </div>
                            <div class="right-sub-box-wrapper">
                                
                                
                                    {/*<div class="text-red">
                                    <i class="material-icons" style={{    fontSize: '11px',paddingTop: '3px',fontWeight: '700'}} >access_time</i>
                                    Due ●  
                                </div>*/}
                                
                                <div class="class-color-icon" style={{backgroundColor: 'rgb(51, 102, 204)'}}></div>
                                <div class="class-name pl-1">
                                    <Moment format="MMM D hh:mm a " withTitle local>{ session.date+' '+session.startTime }</Moment></div>
                                <div class="line"></div>
                                {(activeSession) ? <><button className="joinButton" onClick= {()=>this.joinSession(session)}> Join</button></>:<button className="joinButton-disabled">Join</button>}
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpcomingSession