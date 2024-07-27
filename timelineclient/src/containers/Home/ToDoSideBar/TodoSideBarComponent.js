import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap';
import Moment from 'react-moment';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import DueIcon from '@material-ui/icons/QueryBuilder';
import SubjectIcon from '@material-ui/icons/Subject';
import CheckIcon from '@material-ui/icons/Check';
import {   Link } from 'react-router-dom';
import { Pages, API } from '../../../shared/config'
import ViewDetailsIcon from '@material-ui/icons/ViewList';
import TakeTestIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ToDoSideBar from '../ToDoSideBar/ToDoSideBar';
import axios from 'axios';
import ConfigUrls from '../../../shared/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { connect } from 'react-redux';
import { AppConfig } from '../../../shared/config';
import moment from 'moment';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import ProjectRegistrationSideBar from './ProjectRegistrationSideBar';

const getTestDataForTODO_V2 = new ConfigUrls().api.getTestDataForTODO_V2
const getUpcomingTeeAssessmentsBySapid = new ConfigUrls().api.getUpcomingTeeAssessmentsBySapid
const getReRegistrationLink = new ConfigUrls().api.getReRegistrationLink
const getProjectRegBaseLink = new ConfigUrls().urls.apiUrl_exam;

const TIMEBOUNDS_MASTERKEYS = ["111","151","154","155","156","157","160"]; // 131 & 158
class TodoSideBarComponent extends Component{
    state = {
        sapId : this.props.sapId,
        sessionPlanModuleData : this.props.sessionPlanModuleData,
        currentTimeboundId : this.props.currentTimeboundId,
        consumerProgramStructureId: this.props.student.consumerProgramStructureId,
        testTodos : [],
        teeData: [],
        todosToShow: [],
		testDataLoaded: false,
		teeDataLoaded: false,
        noData : false,
        showError : false,
        errorMsg : 'Error in fetching Test Data, please try again later.',
        sysCompCheckLink: "https://tests.mettl.com/system-check?i=db696a8e#/systemCheck",
        sysComCheckLinkDesc : "(mobile phones / tablets are not supported for Mettl exam)",
        showMettlDemoLink : true,
        showSysCheckLink: true,
        todosToShowSorted: false,
        url : "",
        activeLink : false,
        projectRegistration: {}
    }
    componentWillReceiveProps(nextProps){
        //Load on first load and on each time timebound id is changed
        console.log(" inside component will rece in sidebar comp**************")
        console.debug(nextProps, this.props)
		if(this.props.currentTimeboundId != nextProps.currentTimeboundId){
            this.setState({
                currentTimeboundId : nextProps.currentTimeboundId,
                consumerProgramStructureId: nextProps.consumerProgramStructureId,
            }, () =>{
                console.log("inside &&^&^&^&^&&&&&&&&&&&^^^^^^",this.state)
                this.loadTestDataInTodo()
                this.loadTeeDatainTodo()
            })
			
        }
		this.props = nextProps
    } 
    componentDidUpdate(prevProps, prevState){
        if(this.state.testDataLoaded && this.state.teeDataLoaded){
            this.getTeeToShow()	            
        }
    }
    
    loadTestDataInTodo = () =>{
		// console.log("Test todo is loading----------> ",this.props.student)
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
		axios.post(getTestDataForTODO_V2,
			JSON.stringify({ 
				id : this.state.currentTimeboundId,
				sapid : this.state.sapId
			})
		).then(response => {
			console.log("TEST Todo data loaded************* ")

			this.setState({
                testTodos:response.data,
                testDataLoaded: true
			},
			() => {
                console.log("inside if----------------*&*&*&*&*&*&*&*&*",this.state)
				if(this.state.testTodos && this.state.testTodos.length <1){
					console.log("inside if----------------*&*&*&*&*&*&*&*&*",this.state)
					this.setState({
                        noData:true,
                        showError : false,
					})
                }
                else{
                    this.setState({
                        noData:false,
                        showError : false,
					})
                }
                // this.loadTeeDatainTodo()
                this.asyncWaitAndUpdateData();
              
			});
		
		}).catch(error =>{
            console.log("error in loadTestDataInTodo catch---");
            console.log(error);
            this.setState({
                showError : true,
                noData : false,
            }, () =>{
                // this.loadTeeDatainTodo()
                this.asyncWaitAndUpdateData();
            })
        })
        
    }

    makeMettlLinksLive = () =>{
        if(this.props.student.enrollmentMonth === "Oct" &&  this.props.student.enrollmentYear === "2019"){
            this.setState({
                showMettlDemoLink : false,
                showSysCheckLink : false,
            })
        }
    }
    asyncWaitAndUpdateData(){
        setTimeout(this.loadTestDataInTodo , AppConfig.SIDEBAR_UPDATE_INTERVAL);
        setTimeout(this.loadTeeDatainTodo , AppConfig.SIDEBAR_UPDATE_INTERVAL);
    }
    componentDidMount(){
        console.log("inside todo component",this.state)
        this.makeMettlLinksLive();
        this.loadTestDataInTodo();
        this.loadTeeDatainTodo();
        console.log("Inside componentDidMount()",this.props.student.consumerProgramStructureId);
        if(!(TIMEBOUNDS_MASTERKEYS.includes(this.props.student.consumerProgramStructureId))){
            this.loadReRegistrationTodo();
            this.loadProjectRegistrationToDo();
        }
    }

    loadTeeDatainTodo=()=>{
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
		axios.post(getUpcomingTeeAssessmentsBySapid,
			JSON.stringify({ 
				sapid :  this.state.sapId,			
			})
		).then(response => {
			this.setState({
				teeData : response.data,
				teeDataLoaded	: true
			},()=>{
                if(this.state.teeData && this.state.teeData.length <1){
					this.setState({
                        noTeeData:true,        
                        showTeeError:false            
					})
                }
                else{
                    this.setState({
                        noTeeData:false,    
                        showTeeError:false                    
					})
                }
                
            })	
			// this.getTeeToShow()	
		}).catch((error) => {
            this.setState({
                showTeeError:false,
                noTeeData:false
            })
		})
    }
    getTeeToShow = () => {

		if(this.state.teeDataLoaded && this.state.testDataLoaded){
			if(this.state.testTodos && this.state.teeData){
				var todosToShow = this.state.testTodos
				
				this.state.teeData.map((tee) =>{
					
					todosToShow.push(tee);

				})

				todosToShow.sort(function(data1, data2) {
					
					if (data1.type === "assessments") {
					if (data2.type === "assessments") {
					
						if (moment(data1.exam_start_date_time).format() < moment(data2.exam_start_date_time).format()) {
						return -1;
						}
						if ( moment(data1.exam_start_date_time).format() > moment(data2.exam_start_date_time).format()) {
						return 1;
						}
					} else {
					
		
						if ( moment(data1.exam_start_date_time).format() < moment(data2.startDate).format()) {
						return -1;
						}
						if ( moment(data1.exam_start_date_time).format() > moment(data2.startDate).format()) {
						return 1;
						}
					}
					} else {
					if (data2.type === "assessments") {
					
						if ( moment(data1.startDate).format() < moment(data2.exam_start_date_time).format()) {
						return -1;
						}
						if ( moment(data1.startDate).format() > moment(data2.exam_start_date_time).format()) {
						return 1;
						}
					} else {
					
		
						if ( moment(data1.startDate).format() < moment(data2.startDate).format()) {
						return -1;
						}
						if ( moment(data1.startDate).format() > moment(data2.startDate).format()) {
						return 1;
						}
					}
					}
                });

				this.setState({
                    todosToShow : todosToShow,
                    todosToShowSorted : true,
                    testDataLoaded: false,
                    teeDataLoaded: false            //to stop component repeatedly calls setState inside  componentDidUpdate
                                                      
				})
            }
		}
	}
    
    loadReRegistrationTodo = () => {
      
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
	
		axios.post(getReRegistrationLink,
			JSON.stringify({ 
				sapId : this.state.sapId,
                dob : this.props.student.dob,
                consumerProgramStructureId : this.props.student.consumerProgramStructureId,
			})
		).then(response => {
			this.setState({
                activeLink : response.data.success,
                url : response.data.url,
			},
			() => {
                this.asyncWaitAndUpdateData();
              
			});
		
		}).catch(error =>{
            
        })
    }

    loadProjectRegistrationToDo = () => {
		axios.defaults.baseURL = getProjectRegBaseLink;
		axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
		axios.defaults.headers.post["Accept"] = "application/json";
        axios.get("student/checkProjectRegistrationEligibility", {
			params: {
				timeboundId: this.state.currentTimeboundId,
				sapid: this.state.sapId
			}
		})
		.then(response => {
			const responseData = response.data;
			if(responseData.success === true) {
				console.log("Project Registration eligibility success response: ", responseData.message);
				this.setState(
                    {   projectRegistration: responseData.data  },
                    this.asyncWaitAndUpdateData()
                );
			}
			else {
				console.debug("Project Registration eligibility error response: ", responseData.message);
			}
        })
		.catch((error) => {
            console.debug("Project Registration eligibility error: ", error);
        })
    }


    render(){
        return(
            <>
            <Card>
						<Card.Header style={{backgroundColor : 'white'}}>
							<Link
								to={Pages.todo}
							>
								<div class="media">
									<div class="media-body media-middle">
										<h6 class="card-title">What's Due</h6>
										<p class="card-subtitle">Exams  &amp; Internal Assesments </p> 
										{/* <p>&nbsp; {(this.state.testTodos && this.state.testTodos.length >0) && !this.state.showError ?
										<span className="blinkingButton">Live</span> : null}</p> */}
										
									</div>
									<div class="media-right media-middle">
										<i class="material-icons">keyboard_arrow_right</i>
									</div>
								</div>
							</Link>
						</Card.Header>
							
							
							{/* <Card.Body> */}
								<ListGroup variant="flush">
                                
                                 {/* if no test data */}
                                    {(this.state.noData && this.state.noTeeData && !this.state.showError) 
                                        && (!this.state.activeLink) && (!this.state.projectRegistration.isEligible) ?
                                    
                                    <div> 
                                    <ErrorComponent message = {"No Work Due."} />
                                </div>
                                        // <div>  
                                        //     <h6 className="text-muted text-center" >
                                        //         <FontAwesomeIcon  className="mr-2" icon="exclamation-circle"/> 
                                                 
                                        //     </h6> 
                                        // </div>
                                    :null} 
                                    {/* {(this.state.showError && !this.state.noData) || (this.state.showTeeError && !this.state.noTeeData)   ? 
                                        <div>
                                            <h6 className="text-muted text-center" >
                                                <FontAwesomeIcon  className="mr-2" icon="exclamation-circle"/> 
                                                {this.state.errorMsg}
                                            </h6>
                                        </div>   
                                    :null}     */}
                                      
                                      {this.state.activeLink ? 
                                    <div class="text-muted content-right  py-4 mx-auto"  >
                                          
                                    <Row>
                                    <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginLeft:"6%"}}>
                                             <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                                         </svg>
                                   
                                    <Col style={{marginTop:"1%"}}>
                                        <a target="_blank" href={this.state.url} 
                                        >Re- Registration 
                                        </a> 
                                        
                                    </Col> 
                                </Row></div>  :<></>}

                                    {(this.state.projectRegistration.isEligible && !this.state.projectRegistration.isPaid) &&
                                        <ProjectRegistrationSideBar type={this.state.projectRegistration.type} subject={this.state.projectRegistration.subject}
                                            acadMonth={this.state.projectRegistration.acadMonth} acadYear={this.state.projectRegistration.acadYear}
                                            startDateTime={this.state.projectRegistration.startTime} endDateTime={this.state.projectRegistration.endTime} />}
                                    
                                    {this.state.todosToShow.length > 0 && this.state.todosToShowSorted?
                                        this.state.todosToShow.slice(0,3).map((todo, index)=>
                                            <>                                           
                                                    <ToDoSideBar todo={todo} sapId= {this.state.sapid} sessionPlanModuleData ={this.state.sessionPlanModuleData} />
                                                 
                                                    {/* show see more link if 3 or more tests */}
                                                    {/* {index >= 2 ?
                                                        <Row>
                                                            <Col style={{textAlign:'right'}}>
                                                                <Link to={Pages.todo}><small>See More</small></Link>
                                                            </Col>
                                                        </Row>
                                                    :null} */}
                                            </>
                                        )
                                    : null}
                                     {/* {this.state.showSysCheckLink ? 
                                        <>
                                            
                                            <div className="container" >
                                            <Row>
                                                <Col lg={2} sm={1}>
                                                    <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"1%"}}>
                                                        <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                                                    </svg>
                                                </Col>
                                                <Col lg={10} sm={5}>
                                                    <a target="_blank" href={this.state.sysCompCheckLink} 
                                                    >Mettl System Compatibility Check
                                                    </a> 
                                                    <br/>
                                                        <small><b>{this.state.sysComCheckLinkDesc}</b> </small>
                                                    <br/>
                                                    
                                                </Col> 
                                            </Row> 
                                            </div>
                                        <br/>   
                                        </>
                                    :null}  */}
                                     {/* {this.state.showMettlDemoLink ? 
                                        <>
                                            <div className="container" >
                                            <Row>
                                                <Col lg={2} sm={1}>
                                                    <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"1%"}}>
                                                        <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                                                    </svg>
                                                </Col>
                                                <Col lg={10} sm={5}>
                                                    <a target="_blank" href={this.state.mettlDemoTestLink} 
                                                    >Mettl Demo Exam <br/>
                                                    </a> 
                                                        <small><b>{this.state.mettleDemoLinkDesc}</b> </small>
                                                    <br/>
                                                    
                                                </Col>
                                            </Row>
                                            </div>

                                            <br/>   
                                        </>
                                    :null}  */}
							
							
						</ListGroup>
						{/* </Card.Body> */}
					</Card>
                    </>
        )
    }
}
const mapStateToProps = state => {
	return {
        student: state,
        sapId : state.sapid,
        currentTimeboundId: state.currentTimeboundId,
        sessionPlanModuleData : state.sessionPlanData,
        consumerProgramStructureId: state.consumerProgramStructureId,
    }
}

export default connect(mapStateToProps)(TodoSideBarComponent)