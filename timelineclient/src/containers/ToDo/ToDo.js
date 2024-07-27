import React, { Component } from 'react';
// import logo from './logo.svg';
 
import axios from 'axios'

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {connect} from 'react-redux';
import TodoItem from './components/TodoItem';
import TodoTr from './components/FinishedTodo';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
// import { CardContent, Link } from '@material-ui/core';
import Media from 'react-bootstrap/Media'
import ConfigUrls from '../../shared/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {analyticsManager} from '../../shared/Analytics'
import PendingTest from './PendingTest';
import FinishedTest from './FinishedTest';
import './ToDo.css';

import { Pages, API } from '../../shared/config'
import TestDataHelper from '../../shared/Helpers/TestDataHelper';
import Utilities from './Utilities'
import PendingProjectRegistration from './PendingProjectRegistration';

const urls = new ConfigUrls().urls;
class ToDo extends Component { 
	 
	state={
		data: [],
		todos: [],
		finished:[],
		testTodos:this.props.testTodos,
		pendingTestTodoData : [],
		finishedTestTodoData : [],
		sessionPlanModuleData : this.props.sessionPlanModuleData,
		moduleToReturn : [],
		currentTimeboundId : this.props.currentTimeboundId,
		projectRegistration: {}
	}
 
  	componentDidMount() {
		this.loadTodo();
		this.loadFinishedTodo();
		this.checkProjectRegistrationEligibility();
	}

loadTodo=()=>{
	console.log("Todo is loading----------> ")
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
	axios.post(urls.apiUrl_ltiDemo + "/StudentTodo",

		JSON.stringify({ 
			sapId : this.props.sapId
		})
	).then(response => {
	this.setState({todos : response.data})
	console.log("Todo data loaded-----------> ")
	console.log(response.data)
	}).catch(function(error){
	console.log(error);
	})
}

loadFinishedTodo=()=>{
	console.log("Todo is loading----------> ")
	axios.defaults.headers.post['Content-Type'] = 'application/json';
	axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
	axios.post(urls.apiUrl_ltiDemo + "/StudentTodoFinished",

		JSON.stringify({ 
			sapId : this.props.sapId
		})
	).then(response => {
	this.setState({finished : response.data})
	console.log("Finished Todo data loaded-----------> ")
	console.log(response.data)
	}).catch(function(error){
	console.log(error);
	})
}

	checkProjectRegistrationEligibility = () => {
		axios.defaults.baseURL = urls.apiUrl_exam;
		axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
		axios.defaults.headers.post["Accept"] = "application/json";
        axios.get("student/checkProjectRegistrationEligibility", {
			params: {
				timeboundId: this.state.currentTimeboundId,
				sapid: this.props.sapId
			}
		})
		.then(response => {
			const responseData = response.data;
			if(responseData.success === true) {
				console.log("Check Project Registration eligibility success response: ", responseData.message);
				this.setState({projectRegistration: responseData.data});
			}
			else {
				console.debug("Check Project Registration eligibility error response: ", responseData.message);
			}
        })
		.catch((error) => {
            console.debug("Check Project Registration eligibility error: ", error);
        })
	}

  render() {
    return (
      <Container>	
			  <Row>
					<Col lg={10} sm={12}>
							<Col>
								<Tabs defaultActiveKey="Todo" id="uncontrolled-tab-example">
									<Tab eventKey="Todo" title="To do">
										<Card>
											{this.state.projectRegistration.isEligible 
												&& <PendingProjectRegistration consumerProgramStructureId={this.state.projectRegistration.consumerProgramStructureId}
														acadMonth={this.state.projectRegistration.acadMonth} acadYear={this.state.projectRegistration.acadYear}
														startDateTime={this.state.projectRegistration.startTime} endDateTime={this.state.projectRegistration.endTime}
														subject={this.state.projectRegistration.subject} type={this.state.projectRegistration.type} paid={this.state.projectRegistration.isPaid} />}
											<PendingTest sapId= {this.props.sapId} currentTimeboundId={this.state.currentTimeboundId} sessionPlanModuleData ={this.state.sessionPlanModuleData}
												isProjectRegActive={this.state.projectRegistration.isEligible} />
										</Card>
									</Tab> 
									<Tab eventKey="Finished" title="Finished">
										<Card>
												<FinishedTest sapId= {this.props.sapId} currentTimeboundId={this.state.currentTimeboundId} sessionPlanModuleData ={this.state.sessionPlanModuleData}/>
										</Card>
									</Tab>
									<Tab eventKey="Utilities" title="Utilities">
										<Card>
												<Utilities sapId= {this.props.sapId} currentTimeboundId={this.state.currentTimeboundId} sessionPlanModuleData ={this.state.sessionPlanModuleData}/> 
										</Card>
									</Tab>
								</Tabs>
							</Col>

						</Col>
					</Row>
		
  {/* <Footer /> */}
      </Container>
    );
  }
}

const mapStateToProps = state => {
	return {
		sapId: state.sapid,
		testTodos : state.testTodos,
		sessionPlanModuleData : state.sessionPlanData,
		currentTimeboundId : state.currentTimeboundId,
	}
}

export default connect(mapStateToProps)(analyticsManager(ToDo))