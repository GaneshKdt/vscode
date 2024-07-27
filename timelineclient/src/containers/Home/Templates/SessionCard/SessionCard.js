import React, { Component } from 'react'
import {Button, Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux';
import Moment from 'react-moment'
import { LinkContainer } from 'react-router-bootstrap'

import { Pages } from '../../../../shared/config'
import AttendSessionModal from '../../../../shared/Helpers/SessionHelpers/AttendSessionModal'
import SessionHelper from '../../../../shared/Helpers/SessionHelpers/SessionHelper'
import LoadingSpinner from '../../../../shared/LoadingSpinner/LoadingSpinner';

export class SessionCard extends Component {
    constructor(props) {
		super(props)
        // Sets up our initial state
        this.state = {
            session: this.props.session,
            loaded: false,
            showJoinSession: false,
        }
    } 

    componentWillMount(){
        this.getSessionDetails()
    }

    getSessionDetails = () => {
        console.debug("this.props.session",this.props.session)
        return (
            SessionHelper.GetSessionDetails(
                this.props.session.referenceId, 
                this.props.sapid, 
                this.getSessionDetailsSuccessCallback, 
                this.getSessionDetailsFailureCallback
            )
        )
    }

    getSessionDetailsSuccessCallback = (response) => {
        console.debug(response)
        this.setState({
            session : response.data[0].sessionBean,
            loaded : true
        })
    }

    getSessionDetailsFailureCallback = (error) => {
        console.error("error loading session details")
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
            session
		} = this.state;
        return (
            <div>
                {
                    this.state.showJoinSession ? (
                        <AttendSessionModal 
                            session = {this.state.session} 
                            student = {this.props.student}
                            onClose = {this.joinSessionModalHide}
                        />
                    ) : null
                }
                <Card style={card}>
                    <Card.Header className="bg-white" style={icon}> 
                        <FontAwesomeIcon style={{fontSize:" 35px"}} icon="headphones-alt"/> 
                        <h6  style={caption}>Join Session  </h6>
                    </Card.Header>
                    
                    <Card.Body>
                        {
                            this.state.loaded ? (
                                <>
                                    <p style={content}>{session.content}</p>
                                    <p>Prof. {session.firstName} {session.lastName} is going live on session {session.sessionName} </p>
                                    <p>
                                        <span className="text-muted">Date / Time : </span>  
                                        <Moment format=" D MMM YYYY,hh:mm a " withTitle local>{ session.date+' '+session.startTime }</Moment>
                                    </p>  
                                    
                                    <div style={alignRight}>
                                        {
                                            SessionHelper.CheckIfSessionActive(session) ? (
                                                <Button variant="link" onClick = {this.joinSession}>Join</Button>
                                            ) : (
                                                <Button variant="link" disabled>Join</Button>
                                            ) 
                                        }
                                        <LinkContainer 
                                            to={{
                                                pathname: Pages.calendar,
                                                sessionDetails: session
                                            }}
                                        >
                                            <Button variant="link">Explore</Button>
                                        </LinkContainer>
                                    </div>
                                </>
                            ) : (
                                <div className="p-3 text-center">
                                    <LoadingSpinner noSpace loadingText = {'Loading session details...'} />
                                </div>
                            )
                        }
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
const icon={
    textAlign: 'center',
    color: '#358fe2a6'
}
const content={
    fontWeight: '700',
    fontSize: '14px'
}
const alignRight={textAlign: 'right'}

const caption={
    fontWeight: '600',
    color: 'black'
}
const card={
    marginLeft:'1rem',
    width:'94%',
}


const mapStateToProps = state => {
	return {
        sapId: state.sapid,
        student: state
	}
}
export default connect(mapStateToProps)(SessionCard)