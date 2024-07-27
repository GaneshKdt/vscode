import React, { Component } from 'react'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Pages, API, AppConfig } from '../../../../shared/config'
import ErrorComponent from '../../../../components/ErrorComponent/ErrorComponent'
import LoadingSpinner from '../../../../shared/LoadingSpinner/LoadingSpinner'
import AxiosHandler from '../../../../shared/AxiosHandler/AxiosHandler'

import UpcomingSession from './UpcomingSession/UpcomingSession'

import TestDataHelper from '../../../../shared/Helpers/TestDataHelper'

class UpcomingSessions extends Component{

	constructor(props) {
		super(props)

		this.state = {
            student:this.props.student,
            loading: false,
		}
    }
    
    componentDidMount(){
        //Load recent feedback on first load and on each time timebound id is changed
        this.firstLoadRecentFeedback()
    }

	componentWillReceiveProps(nextProps){
        //Load recent feedback on first load and on each time timebound id is changed
		if(this.props.currentTimeboundId != nextProps.currentTimeboundId){
			this.firstLoadRecentFeedback()
		}
		this.props = nextProps
    } 
    
    asyncWaitAndUpdateData(){
        if(TestDataHelper.CanCallApiIfTimeIsOutOfWindowOfHighLoad()){
            setTimeout(this.loadUpcomingSessions , AppConfig.SIDEBAR_UPDATE_INTERVAL_FOR_UPCOMINGSESSIONS)
        }else{
            console.log("Not doing asyncWaitAndUpdateData() UpcomingSessions.");
        }
    }

    firstLoadRecentFeedback = () => {
        this.setState({
            loading: true,
            firstLoad : true,
        },
        () => {
            this.loadUpcomingSessions()
        })
    }
    loadUpcomingSessions = () => {
            // make the call
        AxiosHandler.AxiosPostHandler({
            url: API.studentTimeTableUpcomingHome,
            data: {
                "sapid" : this.state.student.sapid,
                "centerName":this.state.student.centerName,
                "subject":this.state.timeBoundIdToFilter
            },
            successCallBack: this.getUpcomingSessionsSuccessCallback,
            failureCallBack: this.getUpcomingSessionsErrorCallback,
        })
        
    }
    
    getUpcomingSessionsErrorCallback = (error) => {
        console.error("Error loading results feedback", error)
        if(this.state.firstLoad){
            this.setState({
                loading : false,
                error   : true,
                firstLoad : false,
            },
            () => {
                this.asyncWaitAndUpdateData()
            })
        }else{
            this.asyncWaitAndUpdateData()
        }
    }
    
    getUpcomingSessionsSuccessCallback = (response) => {
        console.log('--------------------------->Upcoming session Loaded')
        console.log(response)
        this.setState({
            UpcomingSessions:response.data,
            loading : false,
            error   : false,
            firstLoad : false,
        },
        () => {
            this.asyncWaitAndUpdateData()
        })
    }

    render(){
        return	(

            <Card>
                <Card.Header style={{backgroundColor : 'white'}}>
                    <Link
                        to={Pages.calendar}
                    >
                        <div class="media">
                            <div class="media-body media-middle">
                                <h6 class="card-title">Coming Up</h6>
                                <p class="card-subtitle">Sessions &amp; Events</p>
                            </div>
                            <div class="media-right media-middle">
                                <i class="material-icons">keyboard_arrow_right</i>
                            </div>
                        </div>
                    </Link>
                </Card.Header>
                    
                <ListGroup variant="flush">
                {
                            this.state && !this.state.loading ? (
                                <>
                                {
                                    !this.state.error && this.state.UpcomingSessions && this.state.UpcomingSessions.length > 0 ? (
                                        <>
                                        {
                                            this.state.UpcomingSessions.slice(0, 3).map((session, index)=>{
                                                if(index < 3){
                                                    //var time = session.date+' '+session.startTime
                                                    return	(
                                                        <UpcomingSession session = {session} student = {this.props.student}/>
                                                    )
                                                }else if(index == 3){
                                                    return(
                                                        <Row>
                                                            <Col style={{textAlign:'right'}}>
                                                                <Link to={Pages.calendar}>
                                                                    <small>
                                                                        See More({this.state.UpcomingSessions.length - 3})
                                                                    </small>
                                                                </Link>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }else{
                                                    return null
                                                }
                                            })
                                        }
                                        </>
                                    ) :
                                    (
                                        <div> 
                                            <ErrorComponent message = {"Nothing for this week."} />
                                        </div>
                                    )
                                }
                                </>
                            ) : (
                                <div className="mx-auto p-1 text-center">
                                    <LoadingSpinner noSpace loadingText={'Loading Upcoming sessions..'}/>
                                </div>
                            )
                        }
                    {/* {
                        this.state.UpcomingSessions.length < 1 ? 
                        (
                            <div> 
                                <h6 className="text-muted text-center nodata" > 
                                    <FontAwesomeIcon  className="mr-2" icon="exclamation-circle"/>
                                    Nothing for this week 
                                </h6> 
                            </div>
                        ): (
                            this.state.UpcomingSessions.slice(0, 3).map(session=>{
                                var time = session.date+' '+session.startTime

                                var activeSession = SessionHelper.CheckIfSessionActive(session)
                                return	(  
                                    <UpcomingSession session = {session} />
                                )
                            })
                        )
                    } */}
                </ListGroup>
        </Card>
        )
    }
}

const mapStateToProps = state => {
	return {
		student: state,
		currentTimeboundId: state.currentTimeboundId
    }
}

export default connect(mapStateToProps)(UpcomingSessions)