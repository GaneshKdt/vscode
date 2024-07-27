import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'  
import './UpcomingSideBar.css'
import { API } from '../../../shared/config'
import ResultsFeedback from './ResultsFeedback/ResultsFeedback'
import UpcomingSessions from './UpcomingSessions/UpcomingSessions'
import TodoSideBarComponent from '../ToDoSideBar/TodoSideBarComponent';
import AskFaculty from './AskFaculty/AskFaculty'
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler'


class UpcomingSideBar extends Component {

	constructor(props) {
		super(props)

		this.state = {
			student:this.props.student,
			UpcomingSessions:[],
			todos: [],
			testTodos:null,
			expiredTests:[],
			sessionPlanModuleData : this.props.sessionPlanModuleData,
			showError : false,
			applicableTests:[],
			nonApplicableTests:[],
			
			showError : false,
			timeBoundIdToFilter:this.props.student.currentTimeboundId
		}

	}



	componentWillReceiveProps(nextProps){
		let isCurrentTimeboundIdChanged = false;
		if(this.props.currentTimeboundId != nextProps.currentTimeboundId){
			isCurrentTimeboundIdChanged = true;
		}
		this.props = nextProps
		
		this.loadTodo();
		
		// Kept below check to avoid infinite loop calling of below method
		if(isCurrentTimeboundIdChanged){
			
		}
	
	} 


	loadTodo=()=>{
		console.log("Todo is loading----------> "+JSON.stringify(this.state))
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
		axios.post(API.StudentTodo,
			JSON.stringify({ 
				sapId : this.state.student.sapid
			})
		).then(response => {
		this.setState({todos : response.data})
		console.log("Todo data loaded-----------> ")
		console.log(response.data)
		}).catch(function(error){
		console.log(error);
		})
	}
	

	//>>>>>> this calls right after getDerivedStateFromProps <<<<<<<<
	componentDidUpdate(prevProps, prevState) {

		if (prevState.timeBoundIdToFilter !== this.state.timeBoundIdToFilter) {
			 
			// this.loadTestDataInTodo();
		}
	}   
	static getDerivedStateFromProps(nextProps, prevState){

		if(nextProps.student.applicableSubjects){
			//>>>>>>>>>>>>>>>> get all applicable subjects from redux and extract timebound ids  <<<<<<<<<<<<<<<<<
			var applicableSubjects =nextProps.student.applicableSubjects.map(function (a) {
				return a.timeBoundId ;
			});
			var applicableTimeboundIds="'"+applicableSubjects.join("','")+"'"
			//>>>>>>>>> If active subject ON directly get current timebound id from redux else set extracted ids
			var timeBoundIdToFilter =(nextProps.timeBoundId==0)?applicableTimeboundIds:nextProps.student.currentTimeboundId
			
			let props={
				timeBoundIdToFilter:timeBoundIdToFilter
			}

			return props
		}
		
    } 	
    componentDidMount() {
		
		this.loadTodo();
		// this.loadTestDataInTodo();
		// this.loadUpcomingSessions () ;
	}	
	loadReRegistration() {
		AxiosHandler.AxiosPostHandler({
            url : API.checkIfReRegApplicable,
            data : {
                sapid : this.props.student.sapid,
            },
            successCallBack : (response) => {
				
				this.setState({
					loadedReRegCheck : true,
					reRegAvailable : response.data.status == "success" && response.data.url,
					reRegUrl : response.data.url,
					reRegSettings : response.data.configuration
				})
			},
            failureCallBack : (error) => {
				this.setState({
					loadedReRegCheck : true,
					reRegAvailable : false,
				})
			}
		})
	}

    render() {
		return (
			<div>
					<UpcomingSessions />
				<br/>
					<TodoSideBarComponent />
				<br/>
					<ResultsFeedback />
				<br/>
					<AskFaculty />
			</div>
		);
    }
}
const mapStateToProps = state => {
	return {
		student: state,
		currentTimeboundId: state.currentTimeboundId,
		sessionPlanModuleData : state.sessionPlanData,
	}
}
Date.prototype.subtractHours= function(h){
    this.setHours(this.getHours()-h);
    return this;
}
Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

export default connect(mapStateToProps)(UpcomingSideBar)