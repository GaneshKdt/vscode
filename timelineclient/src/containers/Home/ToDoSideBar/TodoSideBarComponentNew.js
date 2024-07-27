import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ConfigUrls, { AppConfig, Pages, API } from '../../../shared/config';
import ToDoSideBar from './ToDoSideBar';
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler';
import { Row, Col } from 'react-bootstrap';
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent';
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
const getTestDataForTODO_V2 = new ConfigUrls().api.getTestDataForTODO_V2
const getUpcomingTeeAssessmentsBySapid = new ConfigUrls().api.getUpcomingTeeAssessmentsBySapid

let METTL_DEMO_EXAM_URL = AppConfig.METTL_DEMO_EXAM_URL

class TodoSideBarComponent extends Component{
    state = {
        sapId : this.props.sapId,
        sessionPlanModuleData : this.props.sessionPlanModuleData,
        currentTimeboundId : this.props.currentTimeboundId,
        testTodos : [],
        teeData: [],
        todosToShow: [],
		testDataLoaded: false,
		teeDataLoaded: false,
        noData : false,
        showError : false,
        errorMsg : 'Error in fetching Test Data, please try again later.',
        // set showMettlDemoLink and showSysCheckLink to 'false' to hide mettl demo test link and system compatibility check link
        mettlDemoTestLink: METTL_DEMO_EXAM_URL,
        mettleDemoLinkDesc:"(one email-id can attemp the demo exam online once, use dummy email-ids to try the demo exam again)",
        sysCompCheckLink: "https://tests.mettl.com/system-check?i=db696a8e#/systemCheck",
        sysComCheckLinkDesc : "(mobile phones / tablets are not supported for Mettl exam)",
        showMettlDemoLink : false,
        showSysCheckLink: false,
        todosToShowSorted: false
    }
    componentWillReceiveProps(nextProps){
        //Load on first load and on each time timebound id is changed
		if(this.props.currentTimeboundId != nextProps.currentTimeboundId){
            this.setState({
                currentTimeboundId : nextProps.currentTimeboundId
            }, () =>{
                this.loadTestDataInTodo()
            })
			
        }
		this.props = nextProps
    } 
    componentDidUpdate(prevProps, prevState){
        if(this.state.testDataLoaded && this.state.teeDataLoaded){
            this.loadTestDataInTodo()	            
        }
    }
    
    makeMettlLinksLive = () =>{
        if(this.props.student.enrollmentMonth === "Jan" &&  this.props.student.enrollmentYear === "2020"){
            this.setState({
                showMettlDemoLink : true,
                showSysCheckLink : true,
            })
        }
    }

    asyncWaitAndUpdateData(){
        setTimeout(this.loadTestDataInTodo , AppConfig.SIDEBAR_UPDATE_INTERVAL);
    }
    componentDidMount(){
        console.log("inside todo component",this.state)
        this.makeMettlLinksLive();
        this.loadTestDataInTodo();
        this.loadTeeDatainTodo();
    }

    
    loadTestDataInTodo = () =>{

        AxiosHandler.AxiosPostHandler({
            url : API.getTestDataForTODO_V2,
            data : { 
				id : this.state.currentTimeboundId,
				sapid : this.state.sapId
            },
            successCallBack : (response) => {

                this.setState({
                    testTodos:response.data
                })
                this.loadTeeDatainTodo()
            },
            failureCallBack : (error) =>{
                console.error('todo 1 ', error)
                // this.setState({
                //     loaded	: true,
                //     error : true,
                //     errorMessage : 'Internal Server Error'
                // })
                this.loadTeeDatainTodo()
            }
        })
        
    }

    loadTeeDatainTodo=()=>{
        
        AxiosHandler.AxiosPostHandler({
            url : API.getUpcomingTeeAssessmentsBySapid,
            data : { 
				sapid : this.state.sapId
            },
            successCallBack : (response) => {

                this.setState({
                    teeData : response.data,
                    loaded	: true,
                })
                this.asyncWaitAndUpdateData()
            },
            failureCallBack : (error) =>{
                console.error('todo 2 ', error)
                this.setState({
                    loaded	: true,
                    // error : true,
                    // errorMessage : 'Internal Server Error'
                })
                this.asyncWaitAndUpdateData()
            }
        })
    }

    getTodoData = () => {

        if(!this.state.loaded) {
            return (
                <div className = "mx-auto text-center">
                    <LoadingSpinner noSpace loadingText={'Loading What\'s Due...'}/>
                </div>
            )
        }
        if(this.state.error) {
            return (
                <div className = "mx-auto text-center">
                    <ErrorComponent message = {this.state.errorMessage} />
                </div>
            )
        }
		if(this.state.loaded){
			if(this.state.testTodos && this.state.teeData){
                // Merge Arrays
				let todosToShow = this.state.testTodos.concat(this.state.teeData)
				todosToShow.sort(function(data1, data2) {
                    let date1 = data1.type === "assessments" ? data1.exam_start_date_time : data1.startDate
                    let date2 = data2.type === "assessments" ? data2.exam_start_date_time : data2.startDate
                    if(moment(date1).format() < moment(date2).format()) {
                        return -1;
                    } else if (moment(date1).format() > moment(date2).format()) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                console.debug('todosToShow.length' , todosToShow.length)
                if(todosToShow.length == 0) {
                    return (
                        <div className = "mx-auto text-center">
                            <ErrorComponent message = 'No Work Due' />
                        </div>
                    )
                }

                return todosToShow.slice(0,3).map((todo, index)=> {
                    return (
                        <ToDoSideBar 
                            todo={todo} 
                            sapId= {this.state.sapid} 
                            sessionPlanModuleData ={this.state.sessionPlanModuleData} 
                        />
                    )
                });
            }
        }
        console.debug("TODO ERR")
        console.debug(this.state.loaded)
        console.debug(this.state.testTodos)
        console.debug(this.state.teeData)
        return '----------------------------------------';
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

                        {/* // if test data &&  --> */}
                        {
                            this.getTodoData()
                        }
                        {/* {this.state.showSysCheckLink ? 
                            <>
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
                            <br/>   
                            </>
                        :null} */}
                        {/* {this.state.showMettlDemoLink ? 
                            <>
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
                                <br/>   
                            </>
                        :null} */}
							
							
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
    }
}

export default connect(mapStateToProps)(TodoSideBarComponent)