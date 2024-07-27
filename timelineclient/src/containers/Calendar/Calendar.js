import React, { Component } from 'react'

// imports for FullCalendar Libarary
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import axios from 'axios'
import moment from 'moment'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed'
import './Calendar.css' 
import { connect } from 'react-redux'
import ScheduledSession from './viewScheduledSessions'
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner'
import ConfigUrls from '../../shared/config'
import { Pages, API } from '../../shared/config'
import {analyticsManager} from '../../shared/Analytics'

import ErrorComponent from '../../components/ErrorComponent/ErrorComponent'
import SessionHelper from '../../shared/Helpers/SessionHelpers/SessionHelper';
import MomentHelper from '../../shared/MomentHelper/MomentHelper';
import TeeHelper from '../../shared/Helpers/TeeHelper/TeeHelper'
import ScheduledTee from './viewScheduledTee'
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler';
import ScheduledIA from './viewScheduledIA';

const getStudentTimeTable = new ConfigUrls().api.getStudentTimeTable;
const getTeeAssessmentsBySapid = new ConfigUrls().api.getTeeAssessmentsBySapid;
const getIABySapIdNTimeBoundId = new ConfigUrls().api.getIABySapIdNTimeBoundId;


const urls = new ConfigUrls().urls;

export class Calendar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            calendarWeekends: true,
            calendarEvents: [],
            teeEvents: [],
            allEvents: [],
            isAllSessionsLoaded: false,
            isAllTeeExamsLoaded: false,
            isSingleSessionLoaded: false,
            sessionId: null,
            isSingleSessionLoadingError: false,
            isSingleSessionLoading: false,      
            isSingleTeeLoadingError: false,
            isSingleTeeLoading: false,
            isSingleTeeLoaded: false,
            eventDetails:[],
            eventDetails:[],
            teeLoaded : false,
            sessionLoaded : false,
            error : false,
            errorMessage : '',
            sessionDetails:[],
            calendarTestEvents:[],
        };

    }
    calendarComponentRef = React.createRef();

    componentDidMount(){
        console.log('Upcoming Calendar session');
        console.log(this.props.location.eventDetails);
        console.log('Inside Calendar');

        AxiosHandler.AxiosPostHandler({
            url     : getStudentTimeTable,
            data    : { 
                sapid : this.props.sapId
            },
            successCallBack: (teeResponse) => {
                this.setState({
                    calendarEvents: teeResponse.data,
                    sessionLoaded : true,
                });
            },
            failureCallBack: (error) => {
                console.debug("get Tee Assessments details failure")
                this.setState({
                    sessionLoaded : true,
                    error : true,
                    errorMessage : "Error Loading Calender details!",
                })
            }
        })

        AxiosHandler.AxiosPostHandler({
            url     : getTeeAssessmentsBySapid,
            data    : { 
                sapid : this.props.sapId
            },
            successCallBack: (teeResponse) => {
                this.setState({
                    teeEvents: teeResponse.data,
                    teeLoaded : true,
                });
            },
            failureCallBack: (error) => {
                console.debug("get Tee Assessments details failure")
                this.setState({
                    teeLoaded : true,
                    error : true,
                    errorMessage : "Error Loading Calender details!",
                })
            }
        })
        
        AxiosHandler.AxiosPostHandler({
          url     : getIABySapIdNTimeBoundId,
          data    : { 
            userId : this.props.sapId
          },
          successCallBack: (iaResponse) => {
              this.setState({
                calendarTestEvents: iaResponse.data.testsForStudent
              });
          },
          failureCallBack: (error) => {
        
              this.setState({
                  error : true,
                  errorMessage : "Error Loading Calender details!",
              })
          }
        })

        if(this.props.location.eventDetails){
            this.setState({
                eventDetails : this.props.location.eventDetails,
                currentEventType : this.props.location.currentEventType,
                currentEventLoaded : true,
            })
        }
    }

    getSessionToSelect = (sessions) => {


        for (var event = 0; event < sessions.length; event++) {
            // console.debug('evDate : ', sessions[event].date)
            let evDate = MomentHelper.getISTDateInCurrentTimezone( sessions[event].date,sessions[event].startTime)
            // console.debug('evDate : ', evDate, 'Before : ', evDate.isBefore())
            if(!evDate.isBefore()){
                return sessions[event]
            }
        }
    }
    
    handleEventClick = (clickEvent) => {
        let eventType = clickEvent.event._def.extendedProps.type
        this.setState({
            currentEventType : eventType,
            currentEventLoaded : false,
            currentEventLoadingError : false,
        }, 
        () => {
            if(eventType === 'tee'){
                this.teeEventClicked(clickEvent)
            } else if(clickEvent.event._def.extendedProps.type === 'session'){     
                this.sessionEventClicked(clickEvent)
            } else if(clickEvent.event._def.extendedProps.type === 'ia'){     
                this.iaEventClicked(clickEvent)
            }
        })
    }

    iaEventClicked = (clickEvent) => {
        this.setState({ 
            eventDetails: clickEvent.event._def.extendedProps.iadetails,
            currentEventLoaded: true,
            currentEventLoadingError: false,
        })
    }

    teeEventClicked = (clickEvent) => {
        clickEvent.el.style.borderColor = 'yellow';

        this.setState({
            isSingleTeeLoading: true,
            isSingleTeeLoadingError: false,
        })
        TeeHelper.GetTeeDetails(clickEvent.event.id,this.props.sapId, this.getTeeInfoSuccessResponse, this.getTeeInfoErrorResponse)
    }
    
    sessionEventClicked = (clickEvent) => {
        this.state.sessionId = clickEvent.event.id
        // alert('sessionId : ' + this.state.sessionId)

        clickEvent.el.style.borderColor = 'red';
        console.log(clickEvent)
        console.debug("handle event click")
        this.setState({
            isSingleSessionLoading: true,
            isSingleSessionLoadingError: false,
        })
        SessionHelper.GetSessionDetails(clickEvent.event.id, this.props.sapId, this.getSessionInfoSuccessResponse, this.getSessionInfoErrorResponse)
        // var sessionDate = moment(this.state.sessionDetails.date);
            // var now = moment();
            // console.log('*************************** session date has passed ?**********************************')
            // var dateString = clickEvent.event.date;
            // var momentObj = moment(dateString, 'MM-DD-YYYY');
            // var sessionDate = momentObj.format('YYYY-MM-DD'); 
            // console.log(now);
            // console.log(sessionDetails.date);
        //   if (now.isAfter(sessionDate)) {
        //     console.log('*************************** session date has passed **********************************')
        //       console.log(now);
        //       console.log(sessionDate);
        //   }else{
        // }
    }

    getSessionInfoSuccessResponse = (response) => {
        this.setState({ 
            eventDetails: response.data[0].sessionBean,
            showSessionFromState:true,
            currentEventLoaded: true,
            timeboundId: response.data[0].sessionBean.timeboundId,
            currentEventLoaded: true,
            currentEventLoadingError: false,
        })
    }

    getSessionInfoErrorResponse = (error) => {
        console.error("error loading session details", error)
        this.setState({ 
            currentEventLoadingErrorMessage: 'Error Loading Session',
            currentEventLoaded: true,
            currentEventLoadingError: true,
        })
    }

    getTeeInfoSuccessResponse = (response) => {
        this.setState({ 
            eventDetails: response.data[0],
            currentEventLoaded: true,
            currentEventLoadingError: false,
        })
    }

    getTeeInfoErrorResponse = (error) => {
        console.error("error loading tee details", error)
        this.setState({ 
            currentEventLoaded: true,
            currentEventLoadingError: true,
            currentEventLoadingErrorMessage: 'Error Loading TEE',
        })
    }

    

    // getSessionDetails = () =>{
    //     if(this.state.isSingleSessionLoaded && !this.state.isSingleSessionLoading){
    //     console.log('*************************** check if session date has passed **********************************')
    //     console.log(this.state.sessionDetails.date);
        
    //     var now = moment();
    //     if (now.isAfter(this.state.sessionDetails.date)) {
    //         console.log('*************************** session date has passed **********************************')
    //             console.log(now);
    //             console.log(this.state.sessionDetails.date);
    //             //this.props.history.push('/timeline/watchVideo?videoId='+this.state.sessionDetails.sessionModuleNo)
    //             //  this.props.history.setState({timeboundId:this.state.sessionDetails.timeboundId})
    //             // this.props.history.push({
    //             //   pathname: '/timeline/sessionPlanModule',
    //             //   state: { 
    //             //     //timeboundId: this.state.sessionDetails.timeboundId
    //             //     id:this.state.sessionDetails.moduleId,
    //             //               showTab:"videos",
    //             //               module: module 
    //             //   }
    //             // })
            
                
    //         }

    //     return (
    //         <ScheduledSession session={this.state.sessionDetails} />
    //     )
    //     }else if(this.state.isSingleSessionLoading && !this.state.isSingleSessionLoadingError){
    //     return (
    //         <LoadingSpinner />
    //     )
    //     }else if(this.state.isSingleSessionLoadingError){
    //     return (
    //         <ErrorComponent message={'Error loading session details!'}/>
    //     )
    //     }else{
    //     return null;
    //     }
    // }

    getEvents = () => {
        var allEvents = []
        
        this.state.teeEvents.map(event =>{
            
            allEvents.push({
                title: event.name,
                id: event.id,
                allDay: false,
                forceEventDuration: true,
                start: event.exam_start_date_time,
                end: event.exam_end_date_time,
                backgroundColor: "#1536d8",
                borderColor: "#1536d8",
                type: "tee"
                
            })

        })
    
        this.state.calendarEvents.map (event => {
            allEvents.push({
                title: event.sessionName,
                id: event.id,
                allDay: false,
                forceEventDuration: true,
                start: event.date+"T"+event.startTime+"+05:30",
                end: event.date+"T"+event.endTime+"+05:30",
                type: "session",
                // backgroundColor:'red',
                // borderColor: 'black'
            })
        })


        this.state.calendarTestEvents.map (event => {
          allEvents.push({
            title: "IA Test: "+event.testName,
            id: event.testId,
            allDay: false,
            forceEventDuration: true,
            start: event.startDate,
            end: event.endDate,
            type: "ia",
            backgroundColor: event.attemptStatus == 'Not Attempted' ? ( '#8B8B8B')  : event.attemptStatus == 'Upcoming' || event.attemptStatus == 'Resume' ? ('#00A9FF') : ('#03BD9E') ,
            borderColor: event.attemptStatus == 'Not Attempted' ? ( '#8B8B8B')  : event.attemptStatus == 'Upcoming' || event.attemptStatus == 'Resume' ? ('#00A9FF') : ('#03BD9E'), 
            iadetails : event

          })

        })

        return allEvents
    }
    render() {
        const { sessionLoaded, teeLoaded, error } = this.state;

        const sessionDot = {
            height: "12px",
            width: "12px",
            borderRadius: "50%",
            display: "inline-block",
            backgroundColor: "#3788D8",
            border: "1px solid #3788D8"
          };

          const teeDot = {
            height: "12px",
            width: "12px",
            borderRadius: "50%",
            display: "inline-block",
            backgroundColor: "#1536d8",
            border: "1px solid #1536d8"
          };

          const iaAttemptedDot = {
            height: "12px",
            width: "12px",
            borderRadius: "50%",
            display: "inline-block",
            backgroundColor: "#03BD9E",
            border: "1px solid #03BD9E"
          };

          const iaUpcomingDot = {
            height: "12px",
            width: "12px",
            borderRadius: "50%",
            display: "inline-block",
            backgroundColor: "#00A9FF",
            border: "1px solid #00A9FF"
          };

          const iaNADot = {
            height: "12px",
            width: "12px",
            borderRadius: "50%",
            display: "inline-block",
            backgroundColor: "#8B8B8B",
            border: "1px solid #8B8B8B"
          };

        if (!(sessionLoaded && teeLoaded)) {
            return <LoadingSpinner />
        } else if (error) {
            return <ErrorComponent />
        } else {
            return (
                <div>
                <Row>
                    <Col md={8} className = "ml-0 mb-3">
                        <Card>
                            <Card.Body>
                                <div className="demo-app">
                                    <div className="demo-app-calendar">
                                        <FullCalendar
                                            defaultView="dayGridMonth"
                                            footer={{
                                            right: "prev,next"
                                            }}
                                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                            ref={this.calendarComponentRef}
                                            weekends={this.state.calendarWeekends}
                                            events={this.getEvents()}
                                            dateClick={this.handleDateClick}
                                            eventClick={this.handleEventClick}
                                            
                                            header={{
                                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                                            center: " ",
                                            left: "title"
                                            }}
                                            
                                        />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} className = "ml-0 mb-3"> 
                        { this.getEventDetailsBasedOnType() }
                    </Col>
                </Row>

                <Row>
                    <Col md={8} className = "ml-0 mb-3">
                        <Card>
                            <Card.Body>
                            <div className="status-keys">
                            <table className="table">
                            <tbody>
                            <tr><td><span style={sessionDot}></span></td><td colSpan="6">Sessions</td></tr>
                            <tr><td><span style={teeDot}></span></td><td >TEE</td></tr>
                            <tr><td><span style={iaAttemptedDot}></span></td><td>Attemped IA</td>
                            <td><span style={iaUpcomingDot}></span> </td><td>Upcoming IA</td>
                            <td><span style={iaNADot}></span></td><td>Not Attempted IA</td></tr>
                            
                            </tbody>
                            </table>
                            </div>    
                             
                            </Card.Body>
                        </Card>
                    </Col> 
                </Row>   
            </div>        
        )
    }

    // handleDateClick = arg => {
    //   if (window.confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
    //     this.setState({
    //       // add new event data
    //       calendarEvents: this.state.calendarEvents.concat({
    //         // creates a new array
    //         title: "New Event",
    //         start: arg.date,
    //         allDay: arg.allDay
    //       })
    //     });
    //   }
    // };

    }
    getEventDetailsBasedOnType = () =>{
        let eventType = this.state.currentEventType

        if(eventType){
            let eventTypeName = eventType == "session" ? ('Session') : eventType == "tee" ? ('TEE') : ('IA')
            if(!this.state.currentEventLoaded) {
                return <LoadingSpinner loadingText = { `Loading ${eventTypeName} details...` } />
            } else if(this.state.currentEventLoadingError) {
                return <ErrorComponent message = { this.state.currentEventLoadingErrorMessage ? this.state.currentEventLoadingErrorMessage : 'Error!' } />
            }
            switch(eventType) {
                case 'session' : return <ScheduledSession session={this.state.eventDetails} />
                case 'tee'     : return <ScheduledTee tee={this.state.eventDetails}/>
                case 'ia'     : return <ScheduledIA ia={this.state.eventDetails} sapid={this.props.sapId}/>
            }
        }
    }
}

const mapStateToProps = state => {
  return {
      sapId: state.sapid,   

  }
}

export default connect(mapStateToProps)(analyticsManager(Calendar))
