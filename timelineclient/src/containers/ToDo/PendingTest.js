import React, { Component } from 'react';
import axios from 'axios'
import PendingTestComponent from './PendingTestComponent';
import ConfigUrls from '../../shared/config';
import TestDataHelper from '../../shared/Helpers/TestDataHelper';
import moment from 'moment';

const getTestDataForTODO_V2 = new ConfigUrls().api.getTestDataForTODO_V2
const getPendingTeeAssessmentsBySapid = new ConfigUrls().api.getPendingTeeAssessmentsBySapid

class PendingTest extends Component {
    state = {
        // todo:this.props.todo,
        sessionPlanModuleData : this.props.sessionPlanModuleData,
        moduleToReturn : null,
        sapId : this.props.sapId,
        pendingTestTodoData : [],
        pendingTeeTodoData : [],        
        showError : false,
        noData : false,
        errorMsg : 'Error in fetching Test Data, please try again later.',
        teeDataLoaded : false,
        testDataLoaded : false,
        todosToShowSorted : false
    }
    //get module from moduleData for respective test referenceId
    handleTakeTest = (todo) => {
        if(this.state.sessionPlanModuleData){
            this.state.sessionPlanModuleData.map(mod => {
                     if(mod.id ===  this.state.todo.referenceId){
                                this.setState({
                                    moduleToReturn : mod,
                                })
                        
                            }  
            })
        }
    }
    loadPendingTestTodo = () =>{
        console.log("Pending Test todo is loading------###########----> "+this.state.currentTimeboundId)
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
        axios.post(getTestDataForTODO_V2,
            JSON.stringify({ 
                id : this.props.currentTimeboundId,
                sapid : this.props.sapId
            })
        ).then(response => {
        console.log("Pending TEST Todo data loaded************* ")
        console.log("((((((((((((((((((("+JSON.stringify(response.data))
        this.setState({
            pendingTestTodoData : response.data,
            testDataLoaded : true
        },()=>{
            if(this.state.pendingTestTodoData && this.state.pendingTestTodoData.length < 1){
                this.setState({
                    noData : true,
                    showError:false,
                })
            }
            else{
                this.setState({
                    noData : false,
                    showError:false,
                })
            }
            this.loadPendingTeeTodo()
        })        
        
        }).catch(error =>{
            console.log("error in loadPendingTestTodo-------")
            console.log(error);
            this.setState({
                noData : false,
                showError:true,
            })
        })

        
    }

    loadPendingTeeTodo = () =>{
       
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
        //  axios.post("http://localhost:8080/exam/m/getPendingTeeAssessmentsBySapid",
        axios.post(getPendingTeeAssessmentsBySapid,
            JSON.stringify({ 
                sapid : this.props.sapId
            })
        ).then(response => {
          this.setState({
            pendingTeeTodoData : response.data,
            teeDataLoaded	: true
            },()=>{
                if(this.state.pendingTeeTodoData && this.state.pendingTeeTodoData.length < 1){
                    this.setState({
                        noTeeData : true,
                        showTeeError:false,
                    })
                }
                else{
                    this.setState({
                        noTeeData : false,
                        showTeeError:false,
                    })
                }
                this.getTeeToShow()	
            })
        }).catch(error =>{
            console.log(error);
            this.setState({
                noTeeData : false,
                showTeeError:true,
            })
        })
    }

    getTeeToShow = () => {

		if(this.state.teeDataLoaded && this.state.testDataLoaded){
			if(this.state.pendingTestTodoData && this.state.pendingTeeTodoData){
				var todosToShow = this.state.pendingTestTodoData
				
				this.state.pendingTeeTodoData.map((tee) =>{
					
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
                    pendingTestTodoData : todosToShow,
                    todosToShowSorted : true
				})
            }
		}
	}

    componentDidMount (){
        // this.handleTakeTest();
        this.loadPendingTestTodo();        
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&& pending---------" + JSON.stringify(this.state.pendingTestTodoData));
    }
    
    render() {
        return(
           
            <>
                {this.state.noData && !this.state.showError && this.state.noTeeData && !this.state.showTeeError && !this.props.isProjectRegActive ? 
                    <div><h6 className="text-muted" ><i class="material-icons">error_outline</i> No ToDo </h6></div>
                :null}
                {(this.state.showError && !this.state.noData)  || (this.state.showTeeError && !this.state.noTeeData) ?
                    <div><h6 className="text-muted" ><i class="material-icons">error_outline</i>{this.state.errorMsg}</h6></div>   
                :null}
                {this.state.pendingTestTodoData.length > 0 && this.state.todosToShowSorted ? 
                    this.state.pendingTestTodoData.map((todo, id) => 
                       <PendingTestComponent todo={todo} sessionPlanModuleData={this.state.sessionPlanModuleData} />
                    )
                :null  
                }
           </> 
        )
    }

 }

export default PendingTest