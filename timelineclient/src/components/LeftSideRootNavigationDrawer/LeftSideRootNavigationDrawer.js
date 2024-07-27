import React, { Component, Fragment } from 'react'
import './LeftSideRootNavigationDrawer.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Collapse from 'react-bootstrap/Collapse'
import Image from 'react-bootstrap/Image'
import Nav from 'react-bootstrap/Nav'
import {Link} from 'react-router-dom'
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner'
import logo from './assets/logo/logo.jpg'
import ConfigUrls from '../../shared/config'
import { LinkContainer } from 'react-router-bootstrap'
import merge from 'lodash/merge'
import QuickLinks from '../../containers/QuickLinks/QuickLinks'
const badge_color = {
    color: 'grey',
    fontSize: "12px"
}

const grey_color = {
    color: 'grey'
}

const archive_subject_link_color = {
    color: '#90949C'
}

const upcoming_subject_link_color = {
    color: '#90949C'
}

const pending_subject_link_color = {
    color: '#90949C'
}
const noStyle ={
    color:'black',
    textDecoration:'none'
}

const urls = new ConfigUrls().urls;
const subMenuClass = "sub-menu"
var goToSessionPlan = true

const MSCI_MASTERKEYS = ["131","154","155","156","157","158"];

var angleIcon ;
var courseAngleIcon;
class LeftSideRootNavigationDrawer extends Component {


    constructor(props) {
        super(props)

        // Sets up our initial state

        this.state = {
        
            error: false,

        //For Groups
            groupCollapse: false,
            isGroupLoaded: false,
            hasMore: true,
            isGroupLoading: false,
            data: null,
            groups: [],

        //For Course Subject
            isSubjectLoading: false,
            isSubjectLoaded: false,
            courseCollapse: true,
            applicableSubCollapse: false,
            currentSubCollapse: false,
            archiveSubCollapse: false,
            upcomingSubCollapse: false,
            pendingSubCollapse: false,   
            subjectData: {},
            activeSubjects: [],
            archiveSubjects: [],
            pendingSubjects: [],
            upcomingSubjects: [],
            activeUpcomingSubject: [],
            applicableSubjects: [],
            
        //For Session Plan Module
            isSessionPlanLoading: false,
            isSessionPlanLoaded: false,
            sessionPlanMainCollapse: false,
            sessionPlanModulesData: null,
            sessionPlanModules: [],

            // For quicklinks
            quickLinksCollapse : false,
        }
    }

    componentDidMount() {
        // Loads some users on initial load
        this.loadSubjectData();
        this.loadGroups();
        this.loadSessionPlan();
        this.loadSpecialisationAndBatch();
    }

    componentWillReceiveProps(){
        this.loadGroups();
        this.loadSessionPlan();
    }

    loadSubjectData = () => {
        // console.log('---------------> Load Subject CAlled')
        this.setState(
            { isSubjectLoading: true },
            () => {
                axios.defaults.headers.post['Content-Type'] = 'application/json';
                axios.post(urls.apiUrl_ltiDemo+"/m/loadTimeline",
                    JSON.stringify({
                        "userId": this.props.sapId
                    })
                ).then(response => {
                    // console.log("Got reponse data : ");
                    // console.log(response.data);
                    this.setState({
                        subjectData: response.data,
                        isSubjectLoaded: true,
                        isSubjectLoading: false,
                        currentSubject: response.data.activeSubjects,
                        archiveSubjects: [
                            ...response.data.archiveSubjects
                        ],
                        pendingSubjects: [
                            ...response.data.pendingSubjects
                        ],
                        upcomingSubjects: [
                            ...response.data.upcomingSubjects
                        ],
                        applicableSubjects: [
                            ...response.data.applicableSubjects
                        ],
                        genericTimeBoundId: response.data.genericTimeBoundId
                        // activeUpcomingSubject: [
                        //    ...response.data.activeUpcomingSubject
                        // ]
                    })
                    //>>>>>>>>>> concat all applicable subjects and save in redux <<<<<<<<<<<
                    let applicableSubjects=this.state.currentSubject.concat(
                        this.state.archiveSubjects).concat(
                            this.state.pendingSubjects).concat(
                                this.state.upcomingSubjects)
                    this.props.dispatch({
                        type:'APPLICABLE_SUBJECTS',
                        data:{ 
                            applicableSubjects:applicableSubjects 
                        }
                    });
                    
                    if (this.state.currentSubject.length === 0 && this.state.upcomingSubjects.length === 0) {
                        this.setState({
                                applicableSubCollapse: true
                            })
                    }else{
                        this.setState({
                                currentSubCollapse: true
                        })
                    } 
                    
                    //console.log("IN loadTimeline this.state.currentSubject : ");
                    
                    //console.log(this.state.currentSubject.length);
                    
                    //console.log(this.state.currentSubject);
                    //alert(this.state.currentSubject.length);

                    if (this.state.currentSubject.length > 0) {
                        this.props.dispatch({
                            type:'LOADED_SUBJECT_DETAILS',
                            data:{
                                currentTimeboundId: this.state.currentSubject[0].timeBoundId
                            }
                        });
                    }else{
                        this.props.dispatch({
                            type:'LOADED_SUBJECT_DETAILS',
                            data:{
                                currentTimeboundId: -1
                            }
                        });
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // console.log("dint get reponse data : ");
                })
            }
        )
    }

    loadGroups = () => {
        console.log('---------------> Load Groups Called')
        this.setState(
            { isGroupLoading: true },
            () => {
                axios.defaults.headers.post['Content-Type'] = 'application/json';
                axios.post(urls.apiUrl_ltiDemo+"/m/getGroupsNameByTimeBoundId",
                    JSON.stringify({
                        "userId": this.props.sapId,
                        "timeBoundId": this.props.currentTimeboundId
                    })
                ).then(response => {
                    console.log('--------------------------->Loaded')
                    console.log(response.data)
                    this.setState({
                        data: response.data,
                        isGroupLoaded: true,
                        isGroupLoading: false,
                        groups: [
                            ...response.data.groupsForStudentByTimeBoundId
                        ]
                    })

                }).catch(function (error) {
                    // console.log(error);
                })
            }
        )
    }

    loadSpecialisationAndBatch =() =>{
        //get batch name start
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_ltiDemo_m + "getBatchNameBySapId", 
        JSON.stringify({
                "sapid": this.props.sapId
            })
        ).then(response => {
            // alert(JSON.stringify(response.data))
            this.props.dispatch({
                type:'GOTBATCHNAME',
                data: response.data });
        }).catch( (error) => { 
            // this.props.history.push('/timeline/home')
        })

        //get batch name end
    }

    loadSessionPlan =() =>{
        // console.log('---------------> Load Session Plan Called')
        this.setState(
            {isSessionPlanLoading: true},
            () => {
                axios.defaults.headers.post['Content-Type'] = 'application/json';
                axios.post(urls.apiUrl_web_acads + "/api/getSessionPlanDetailsByTimeboundId",
                    JSON.stringify({
                        "timeboundId": this.props.currentTimeboundId
                    })
                ).then(response => {
                    // console.log("Got reponse data for api/getSessionPlanDetailsByTimeboundId : ");
                    // console.log(response.data);
                    this.setState({
                        sessionPlanModulesData: response.data,
                        isSessionPlanLoaded: true,
                        isSessionPlanLoading: false,
                        sessionPlanModules: [
                            ...response.data.modules
                        ]
                    })
                    this.props.dispatch({
                        type:'LOADED_SESSION_PLAN',
                        data:{
                            sessionPlanData: this.state.sessionPlanModules
                        }
                    });
                    console.log("inside session plan**********************"+JSON.stringify(response.data))
                }).catch(function (error) {
                    // console.log(error);
                })
            }
        )
    }
    
    updateTimeBoundId=(timeBoundId)=>{
        this.props.dispatch({
            type:'LOADED_SUBJECT_DETAILS',
            data:{
                currentTimeboundId: timeBoundId
            }
        });
    }

    SpecialisationMessage = () =>{
        return(
            <span style={{color: "grey"}}>
                <FontAwesomeIcon icon="exclamation-circle" />
                {/* &nbsp; Select Specialisation Subjects */}
                &nbsp; Subjects will be available after Elective Selection End Date
            </span>
        )
    }
    almashinesLogin = (almashinesId ) => { 
        axios.defaults.headers.post['Content-Type'] = 'application/json';
                axios.post(urls.apiUrl_studentPortals +"almashinesLogin",
                    JSON.stringify({
                        "almashinesId":almashinesId
                    })
                ).then(response => { 
                     window.location = response.data.urlLocation;
                }).catch(function (error) {
                    console.log(error);
                })
    }
    render() {
        const {
            //For Groups
            groupCollapse,
            isGroupLoaded,
            data,

            //For Subjects
            courseCollapse,
            currentSubCollapse,
            archiveSubCollapse,
            upcomingSubCollapse,
            pendingSubCollapse,
            applicableSubCollapse, 
            isSubjectLoaded,
            subjectData,
            applicableSubjects,

            //For Session Plan Modules
            isSessionPlanLoaded,
            sessionPlanModulesData,
            sessionPlanMainCollapse,

            // For quick links
            quickLinksCollapse,

        } = this.state;

        if (
            isGroupLoaded==false
             || 
             isSessionPlanLoaded==false 
             || 
             isSubjectLoaded==false 
             ){
            return <div></div>
        } else {
            // console.log("--------------------------------------->data.groupsForStudentByTimeBoundId")
            // console.log(data.groupsForStudentByTimeBoundId)

            // console.log("-----------------------> subjectData :::: ")
            // console.log(subjectData)
            if(sessionPlanMainCollapse ) {
                    angleIcon = "angle-down"
            }
            else{
                    angleIcon = "angle-up"
            }
        
            if(courseCollapse) {
                courseAngleIcon = "angle-down"
            }
            else{
                courseAngleIcon = "angle-up"
            }
           
            

            return (
                <>                    
                    <nav id="sidebar">
                    <div className="">
                        <div className="navbar navbar-light bg-faded ">
                            <LinkContainer to='/timeline/home' style={{border: 'none',cursor: 'pointer'}}><Image src={logo} border="light" thumbnail /></LinkContainer>
                        <hr />
                        </div>

                        <div className="sidebar-header">
                            <div className="navbar navbar-light bg-faded">
                                <div className="d-flex profilepic-fullname-wrapper">
                                    <div >
                                        <div className="circular-portrait">
                                            <LinkContainer to='/timeline/publicProfile' >
                                                <img src={this.props.imageUrl} alt="Student Photo" />
                                            </LinkContainer>
                                        </div>

                                    </div>
                                    <div >
                                        {/* changed active class name to stop the background color from .active from showing up */}
                                        <LinkContainer to='/timeline/publicProfile' activeClassName="selected">
                                            <a className="font-weight-bold">
                                                {this.props.firstName + " " + this.props.lastName}
                                            </a>
                                        </LinkContainer><br/> 
                                        <div >{this.props.sapId} </div>   
                                    </div>
                                    
                                </div>
                                <div className="leftsidedrawer-student-details">
                                            <div >{this.props.program + " | " + this.props.batch} </div>
                                            <div> 
                                              {  (this.props.specialisationType ) && 
                                                    <>
                                                    {this.props.specialisationType} Specialisation in : {this.props.specialisationName}
                                                   </>
                                                 }                                               
                                                  
                                                 
                                            </div> 
                                            <div >{this.props.emailId} </div>
                                             <div>  Validity End: {this.props.validityEndMonth} {this.props.validityEndYear}</div> 
                                            
                                            
                                            
                                        </div>
                            </div>
                        </div>
                        
                        <ul className="list-unstyled leftsidedrawer-alignIcons components">
                        {this.props.program === "MBA - WX" ?( <> 
                        <li>
                            <LinkContainer to='/timeline/preReads'>
                                <a>
                                    <FontAwesomeIcon icon="book-reader" />
                                    <span className="ml-2">Pre-reads</span>
                                </a>
                            </LinkContainer>
                        </li>
                        </>):(
                        <>
                        </>
                        ) }
                        
                        {!(MSCI_MASTERKEYS.includes(this.props.consumerProgramStructureId)) ?( <> 
                        <li>
                            <LinkContainer to='/timeline/eLearn'>
                                <a>
                                    <FontAwesomeIcon icon="graduation-cap" />
                                    <span className="ml-2">E-learning</span>
                                </a>
                            </LinkContainer>
                        </li>
                        </>):(
                        <>
                        </>
                        ) }
                        {/* <li>
                            <a  onClick={() => this.setState({ quickLinksCollapse: !quickLinksCollapse })} aria-controls="courses-data" aria-expanded={quickLinksCollapse}>
                                <span>
                                    <FontAwesomeIcon icon="link" />
                                    <span className="ml-2" >Quick Links</span>
                                    <span className=" float-right" style={badge_color}> 
                                        <FontAwesomeIcon icon="angle-down" /> 
                                    </span>
                                </span>
                            </a>
                        </li> */}
                        <Collapse in={this.state.quickLinksCollapse}>
                            <div id="quicklink-data" className={subMenuClass}>
                                <QuickLinks />   
                            </div>
                        </Collapse>
                        
                        {/* <li>
                            <LinkContainer onClick={() => this.updateTimeBoundId(7777111)} to="home">
                                <a>
                                    <FontAwesomeIcon icon="bookmark" />
                                    <span className="ml-2"> MBA - WX Generic</span>
                                </a>
                            </LinkContainer>
                        </li> */}

                        <li>
                            <a  onClick={() => this.setState({ courseCollapse: !courseCollapse })} aria-controls="courses-data" aria-expanded={courseCollapse}>
                                <span>
                                    <FontAwesomeIcon icon="book"/> 
                                    <span className="ml-2" >Courses</span>
                                    <span className=" float-right" style={grey_color}> 
                                        <FontAwesomeIcon icon={courseAngleIcon} /> 
                                    </span>
                                </span>
                            </a>
                        </li>

                    <Collapse in={this.state.courseCollapse}>
                    <div id="courses-data" className={subMenuClass}>
                            
                        <li>
                            <div className={subMenuClass}>
                                
                            {/* Applicable Subjects     */}

                           { (this.state.currentSubject.length === 0 && this.state.upcomingSubjects.length === 0) &&
                               <a onClick={() => this.setState({ applicableSubCollapse: !applicableSubCollapse })} aria-controls="applicable-data" aria-expanded={applicableSubCollapse} >
                                <span className="text-dark" >Applicable Subjects</span>
                                <span className="float-right" style={badge_color}> 
                                    {applicableSubjects.length}
                                </span>
                                </a>
                           }
                                <Collapse in={this.state.applicableSubCollapse}>
                                    <div id="applicable-data" className={subMenuClass}>
                                        {applicableSubjects.length == 0 && (this.props.sem == 3 || this.props.sem == 4) ? this.SpecialisationMessage() : ''}
                                        {applicableSubjects.map (applicableSubjects => {
                                            return (   
                                                <Fragment>
                                                    <Link onClick={e => e.preventDefault()} >
                                                        {applicableSubjects.subject}
                                                    </Link>
                                                </Fragment>
                                            )}
                                        )}
                                    </div>
                                </Collapse>
                            
                                
                            {/* Current Subjects     */} 
                                
                            { (this.state.currentSubject.length > 0) &&
                                <a onClick={() => this.setState({ currentSubCollapse: !currentSubCollapse })} aria-controls="current-data" aria-expanded={currentSubCollapse} >
                                    <span className="text-dark" >Current</span>
                                    <span className="float-right" style={badge_color}> 
                                        {subjectData.activeSubjects.length}
                                    </span>
                                </a>
                            }   
                                <Collapse in={this.state.currentSubCollapse}>
                                    <div id="current-data" className={subMenuClass}>
                                        {subjectData.activeSubjects.map (activeSubjects => {
                                           return (
                                                <Fragment>
                                                        <Link onClick={() => this.updateTimeBoundId(activeSubjects.timeBoundId)} to="home">
                                                            {activeSubjects.subject} ({activeSubjects.startDate} - {activeSubjects.endDate})
                                                        </Link>
                                                </Fragment>
                                            )}
                                        )}
                            
                                    </div>
                                </Collapse>

                                {/* Upcoming Subjects     */} 

                                { (this.state.upcomingSubjects.length > 0 ) &&
                                    <a onClick={() => this.setState({ upcomingSubCollapse: !upcomingSubCollapse })} aria-controls="upcoming-data" aria-expanded={upcomingSubCollapse}>
                                        <span className="text-dark" style={upcoming_subject_link_color}>Upcoming</span>
                                        <span className="float-right" style={badge_color}> 
                                            {subjectData.upcomingSubjects.length}
                                        </span>
                                    </a>
                                }
                                    <Collapse in={this.state.upcomingSubCollapse}>
                                        <div id="upcoming-data" className={subMenuClass}>
                                            {subjectData.upcomingSubjects.map (upcomingSubjects => {
                                                return (
                                                    <Fragment>
                                                        <Link onClick={() => this.updateTimeBoundId(upcomingSubjects.timeBoundId)}  to="home">
                                                                {upcomingSubjects.subject} ({upcomingSubjects.startDate} - {upcomingSubjects.endDate})
                                                        </Link>
                                                    </Fragment>
                                                )}
                                            )}
                                        </div>
                                    </Collapse>

                                {/* Pending Subjects     */} 
                                    
                                { (this.state.pendingSubjects.length > 0) &&
                                <a onClick={() => this.setState({ pendingSubCollapse: !pendingSubCollapse })} aria-controls="pending-data" aria-expanded={pendingSubCollapse}>
                                    <span className="text-dark" style={pending_subject_link_color}>Pending </span>
                                    <span className="float-right" style={badge_color}> 
                                        {subjectData.pendingSubjects.length}
                                    </span>
                                </a>
                                }

                                <Collapse in={this.state.pendingSubCollapse}>
                                    <div id="pending-data" className={subMenuClass}>
                                        {subjectData.pendingSubjects.map (pendingSubjects => {
                                            return (
                                                <Fragment> 
                                                    <Link onClick={() => this.updateTimeBoundId(pendingSubjects.id)} to="home">
                                                    {pendingSubjects.subject} ({pendingSubjects.acadMonth}-{pendingSubjects.acadYear}/Term {pendingSubjects.sem})
                                                    </Link>
                                                </Fragment>
                                            )}
                                        )}
                                    </div>
                                </Collapse>

                                {/* Archive Subjects     */} 

                                { (this.state.archiveSubjects.length > 0) &&
                                    <a onClick={() => this.setState({ archiveSubCollapse: !archiveSubCollapse })} aria-controls="archive-data" aria-expanded={archiveSubCollapse} >
                                        <span className="text-dark" style={archive_subject_link_color}>Archive</span>
                                        <span className="float-right" style={badge_color}> 
                                            {subjectData.archiveSubjects.length}
                                        </span>
                                    </a>
                                }
                                    <Collapse in={this.state.archiveSubCollapse}>
                                        <div id="archive-data" className={subMenuClass}>
                                            {subjectData.archiveSubjects.map (archiveSubjects => {
                                                return (
                                                    <Fragment>
                                                        <Link onClick={() => this.updateTimeBoundId(archiveSubjects.timeBoundId)} to="home">
                                                                {archiveSubjects.subject} ({archiveSubjects.acadMonth}-{archiveSubjects.acadYear}/Term {archiveSubjects.sem})
                                                        </Link>
                                                    </Fragment>
                                                )}
                                            )}
                                        </div>
                                    </Collapse>
                            
                            </div>
                        </li>
                    </div>
                    </Collapse>
                            
                            {/* Groups Nav*/}
                            
                            <li>
                                <a onClick={() => this.setState({ groupCollapse: !groupCollapse })} aria-controls="groups-data" aria-expanded={groupCollapse} >
                                    <span>
                                    <FontAwesomeIcon icon="users"/> 
                                        <span className="ml-1" style={{ marginLeft: '0.35rem!important' }}>Groups ({data.groupsForStudentByTimeBoundId.length})</span>
                                        <span className="float-right" style={badge_color}> 
                                            {/* ({data.groupsForStudentByTimeBoundId.length}) &nbsp; */}
                                            <FontAwesomeIcon icon="angle-down" />
                                        </span>
                                        
                                    </span>
                                </a>
                            </li>

                            <Collapse in={this.state.groupCollapse}>
                                <div id="groups-data" className={subMenuClass}>
                                    <li>
                                        <div className={subMenuClass}>
                                            {data.groupsForStudentByTimeBoundId.map(group => {
                                                    // console.log('--------------------------->group')
                                                    // console.log(group)
                                                    return (
                                                        <Fragment>
                                                            {/* <a href="/groups" >{group.groupName}</a> */}
                                                            <Link to={{
                                                                    pathname: '/timeline/groups',
                                                                    state: {
                                                                            group : group,
                                                                        }
                                                                    }}>
                                                                {group.groupName}
                                                            </Link>
                                                        </Fragment>
                                                    )
                                                })}
                                        </div>
                                    </li>
                                </div>
                            </Collapse>
                            {/* Groups List Nav */}
                            
                            <li>

                            <Link 
                                to={{
                                    pathname: '/timeline/sessionPlan',
                                    state:{
                                        timeboundId:this.props.currentTimeboundId
                                    }
                                }}

                                onClick = {
                                    (e) => {
                                        if(!goToSessionPlan){
                                            e.preventDefault()
                                            goToSessionPlan = true
                                        }
                                        this.setState({ 
                                            sessionPlanMainCollapse: !sessionPlanMainCollapse
                                        })
                                    }
                                }
                            >
                                <span>
                                    <FontAwesomeIcon icon="book-open"/> 
                                    <span className="ml-2" >Resources</span>
                                        <span 
                                            onClick={(e) => {
                                                    //Dont put this in state as setState is async and both of the onclick events trigger consecutively
                                                    goToSessionPlan = false
                                                    this.setState({ 
                                                        sessionPlanMainCollapse: !sessionPlanMainCollapse
                                                    })
                                                }
                                            } 
                                            aria-controls="sessionPlan-data" 
                                            aria-expanded={sessionPlanMainCollapse} 
                                            className="float-right" 
                                            style={grey_color}
                                        > 
                                      <FontAwesomeIcon icon={angleIcon} /> 
                                        </span>
                                </span>
                            </Link>
                            
                            {/* <a  >
                                    <span>
                                    <FontAwesomeIcon icon="calendar-alt"/> 
                                        <span className="ml-2" >Resources(SessionPlan)</span>
                                            <span onClick={() => this.setState({ sessionPlanMainCollapse: !sessionPlanMainCollapse })} aria-controls="sessionPlan-data" aria-expanded={sessionPlanMainCollapse} className="badge float-right" style={badge_color}> 
                                                <FontAwesomeIcon icon="angle-down" /> 
                                            </span>
                                    </span>
                                </a> */}
                            </li>

                            <Collapse in={this.state.sessionPlanMainCollapse}>
                                <div id="sessionPlan-data">
                                    <li>
                                    <div className={subMenuClass}>
                                        
                                        {sessionPlanModulesData.modules.map(modules => {
                                            // console.log('--------------------------->modules')
                                            // console.log(modules)
                                            return (
                                                <Fragment>
                                                    {/* <Link to="session-plan-module" params={{ id: modules.id }}>{modules.topic}</Link> */}
                                                    <Link to={{
                                                    pathname: '/timeline/sessionPlanModule',
                                                    state: {
                                                        id: modules.id,
                                                        module: modules
                                                    }
                                                }}>
                                                    {modules.topic}
                                                </Link>
                                                </Fragment>
                                            )
                                        })}

                                    </div>
                                    </li>
                                </div>
                            </Collapse>

                            <li>
                                <LinkContainer to='/timeline/calendar'>
                                    <Nav.Link style={noStyle}>
                                        <span>
                                            <FontAwesomeIcon icon="calendar-alt"/> 
                                            <span className="ml-2">Academic Calendar</span>
                                        </span>
                                    </Nav.Link>
                                </LinkContainer>
                            </li>
                            
                            <li>
                                <LinkContainer to="/timeline/todo">
                                    <Nav.Link style={noStyle}>
                                        <span>
                                            <FontAwesomeIcon icon="list-ul"/> 
                                            <span className="ml-2">Todo</span>
                                        </span>
                                    </Nav.Link>
                                </LinkContainer>
                            </li>
                            
                            <li>
                                <LinkContainer to="/timeline/bookmarks">
                                  <Nav.Link style={noStyle}>
                                    <span>
                                      <FontAwesomeIcon icon="bookmark" />
                                      <span className="ml-2">Bookmarks</span>
                                    </span>
                                  </Nav.Link>
                                </LinkContainer>
                            </li>
                            { (this.props.almashinesId  ) &&
                            <li>
                                <a onClick={() => this.almashinesLogin(this.props.almashinesId)} style={{padding: "0px"}}>
                                  <Nav.Link style={noStyle}>
                                    <span>
                                      <FontAwesomeIcon icon="user-graduate" />
                                      <span className="ml-2">Ngasce Alumni Portal</span>
                                    </span>
                                  </Nav.Link>
                                </a>
                            </li>
                            }
                        </ul>
                    </div>
                </nav>

                </>

            )
        }
    }
}

const mapStateToProps = state => {
    return {
        //student:state.student,
         sapId: state.sapid,
         firstName: state.firstName,
         lastName: state.lastName,
         imageUrl: state.imageUrl,
         program: state.program,
         sem: state.sem,
         validityEndMonth: state.validityEndMonth,
         almashinesId:state.almashinesId,
         validityEndYear: state.validityEndYear,
         emailId: state.emailId,
         prgmStructApplicable: state.prgmStructApplicable,
         currentTimeboundId: state.currentTimeboundId,
         batch : state.batch,
         specialisationType  : state.specialisationType,
         specialisationName  : state.specialisationName
    }
}
export default connect(mapStateToProps)(LeftSideRootNavigationDrawer)
