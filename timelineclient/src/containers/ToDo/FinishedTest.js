import React, { Component } from 'react';
import axios from 'axios'
import FinishedTestComponent from './FinishedTestComponent';
import ConfigUrls from '../../shared/config';
import moment from 'moment';

const getFinishedTestDataForTODO = new ConfigUrls().api.getFinishedTestDataForTODO
const getFinishedTeeAssessmentsBySapid = new ConfigUrls().api.getFinishedTeeAssessmentsBySapid



class FinishedTest extends Component {
    state = {
        todo:this.props.todo,
        sessionPlanModuleData : this.props.sessionPlanModuleData,
        moduleToReturn : null,
        finishedTestTodoData : [],
        finishedTeeTodoData : [],
        showError : false,
        noData : false,
        showTeeError : false,
        noTeeData : false,        
        errorMsg : 'Error in fetching Test Data, please try again later.',
        testDataLoaded : false,
        teeDataLoaded : false
    }
    //get module from moduleData for respective test referenceId
    handleTakeTest = () => {
        if(this.state.sessionPlanModuleData){
            this.state.sessionPlanModuleData.map(mod => {
                console.log("loop=="+mod.id)
                        if(mod.id === this.state.todo.referenceId){
                                this.setState({
                                    moduleToReturn : mod,
                                })
                        }
                        
            })
        }
            
                
      
    }
    loadFinishedTestTodo = () =>{
        console.log("Finished Test todo is loading------###########----> "+this.state.currentTimeboundId)
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
        // axios.post("http://localhost:8080/exam/m/getFinishedTestDataForTODO",
        axios.post(getFinishedTestDataForTODO,
            JSON.stringify({ 
                id : this.props.currentTimeboundId,
                sapid : this.props.sapId
            })
        ).then(response => {
        console.log("Finished TEST Todo data loaded************* ")
        console.log("((((((((((((((((((("+JSON.stringify(response.data))
        this.setState({
            finishedTestTodoData : response.data,
            testDataLoaded : true
        },()=>{
            if(this.state.finishedTestTodoData && this.state.finishedTestTodoData.length < 1){
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
            this.loadFinishedTeeTodo()
        })
        }).catch(error =>{
            console.log("error in loadFinishedTestTodo-------")
            console.log(error);
            this.setState({
                noData : false,
                showError:true,
            })
        })
    }

    loadFinishedTeeTodo = () =>{
        console.log("Finished Test todo is loading------###########----> "+this.state.currentTimeboundId)
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
        // axios.post("http://localhost:8080/exam/m/getFinishedTeeAssessmentsBySapid",
        axios.post(getFinishedTeeAssessmentsBySapid,
            JSON.stringify({                 
                sapid : this.props.sapId
            })
        ).then(response => {        
        this.setState({
            finishedTeeTodoData : response.data,
            teeDataLoaded : true
        },()=>{
            if(this.state.finishedTeeTodoData && this.state.finishedTeeTodoData.length < 1){
                this.setState({
                    noTeeData : true,
                    showTeeError:false,
                })
            }else{
                this.setState({
                    noTeeData : false,
                    showTeeError:false,
                })
            }
            this.getTeeToShow()	
        })
        }).catch(error =>{
            this.setState({
                noTeeData : false,
                showTeeError:true,
            })
        })
    }

    getTeeToShow = () => {

		if(this.state.teeDataLoaded && this.state.testDataLoaded){
			if(this.state.finishedTestTodoData && this.state.finishedTeeTodoData){
				var todosToShow = this.state.finishedTestTodoData
				
				this.state.finishedTeeTodoData.map((tee) =>{
					
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
                    finishedTestTodoData : todosToShow,
                    todosToShowSorted : true
				})
            }
		}
	}	

    componentDidMount (){
        // this.handleTakeTest();
        this.loadFinishedTestTodo();
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&" + JSON.stringify(this.state.finishedTestTodoData));
    }
    render() {
        return(
           
           
            <>
                {this.state.noData && !this.state.showError && this.state.noTeeData && !this.state.showTeeError ? 
                    <div><h6 className="text-muted" ><i class="material-icons">error_outline</i> No ToDo </h6></div>
                :null}
                {(this.state.showError && !this.state.noData)  || (this.state.showTeeError && !this.state.noTeeData) ?                
                    <div><h6 className="text-muted" ><i class="material-icons">error_outline</i>{this.state.errorMsg}</h6></div>   
                :null}
                {this.state.finishedTestTodoData.length > 0 && this.state.todosToShowSorted ? 
                    this.state.finishedTestTodoData.map((todo, id) => 
                        <FinishedTestComponent todo={todo} sessionPlanModuleData={this.state.sessionPlanModuleData} />
                    )
                :null  
                }
           </> 
            
            
        )
    }

 }

export default FinishedTest