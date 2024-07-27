import React, { Component } from 'react';
import {  Route, Redirect,Link } from 'react-router-dom';
import {connect} from 'react-redux';
 
import axios from 'axios'

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import './SessionPlanModuleIA.css';
import 'material-design-icons/iconfont/material-icons.css';
import LoadingSpinner from '../../../../shared/LoadingSpinner/LoadingSpinner';
import ConfigUrls from '../../../../shared/config'
import { Pages, API } from '../../../../shared/config'
import Moment from 'react-moment';
import TestDataHelper from '../../../../shared/Helpers/TestDataHelper';


const urls = new ConfigUrls().urls;

// import { ReactReader } from "react-reader";
//import FileViewer from 'react-file-viewer';
//import { Document, Page } from 'react-pdf';

//const BASE_API_URL ="https://uat-studentzone-ngasce.nmims.edu"
//const BASE_API_URL ="http://localhost:8080"
//const BASE_API_URL ="http://10.100.100.92:8080"
//const BASE_API_URL_2 ="http://10.100.64.78:8080"

// SessionPlanModuleIA here IA = Internal Assessments, 
//which can have various types of tests like PDF file upload, MCQ test, Project etc.
class SessionPlanModuleIA extends Component {
	// constructor(props) {
    //     super(props)
    //     this.showTestInJSWindow = this.showTestInJSWindow.bind(this)
        
    // }
	state = {
        student : this.props.student,
        error: null,
        isLoaded: false,
        data: null ,
		id: this.props.id,
		errorStatus : false,
		errorMessage: ""
      };
		
    
      componentDidMount(){
        console.log('In SessionPlanModuleIA componentDidMount()...');
		this.getIAForModule()
	  }
	
	  showTestInJSWindow(testId){
		console.log('In showTestInJSWindow()...');
		let sapId =this.state.student.sapid;
      	console.log(" In showTestInJSWindow got Testid : "+testId+" Sapid : "+sapId);
		  if( !isNaN(sapId) && !isNaN(""+testId) ){
            if(testId !=0 && sapId+"" != ""){
               let iFrameUrl = "http://localhost:8080/exam/startStudentTestForAllViews?sapId="+sapId+"&testId="+testId;
               console.log("iFrameUrl : \n "+iFrameUrl);
               
               
				window.open(iFrameUrl,
				"MCQ Tests","toolbar=0,location=0,status=1,scrollbars=1,width=900,height=1000");

            }else{
                this.setState({
                    error : "Error in getting test.",
                    isLoaded: true,
                })
            }

        }else{
            			this.setState({
					errorStatus : true,
					errorMessage: "Error getting Internal Assessments, Please try again...",
					isLoaded: true
				})
        }
	   }

	getIAForModule(){
        console.log('In SessionPlanModuleIA getIAForModule()...');
        this.setState({
            isLoaded: false
		})

		axios.defaults.headers.post['Content-Type'] = 'application/json';
            //axios.post(urls.apiUrl_web_exam + "getIABySapIdNModuleId",
			//axios.post("http://localhost:8080/exam/" + "getIABySapIdNModuleId",
			
				axios.post(API.getIABySapIdNModuleId,
				JSON.stringify({
					"referenceId":this.state.id,
					"userId": ""+this.state.student.sapid
				})
				).then( response => {
					
					console.log("IN SessionPlanModuleIA componentDidMount() got response : ")
					console.log(response);
				this.setState({
					data: response.data,
					isLoaded: true
				})
				//console.log("EPUB URL : ");
									//console.log(urls.baseUrl + "/content/"+this.state.data.learningResources[3].previewPath);
	
				}).catch(error => {
					console.log(error);
					this.setState({
						errorMessage : "Error getting Internal Assessments, Please try again...",
						errorStatus :true,
						isLoaded: true,
					})
			
				})
			
           
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log('In SessionPlanModuleIA componentDidUpdate()...');
		console.log("Got prevProps, prevState : ")
		console.log(prevProps)
		console.log(prevState)
		if (prevState.id !== this.state.id) {
		  let updateSateObj = {
			id:this.state.id,
			isLoaded: true
		  }
		  console.log("updateSateObj : ");
		  console.log(updateSateObj);
		  this.setState({updateSateObj})
		  this.getIAForModule()
		}else{
		  console.log("No State update : ");
		}
	  }
	  
	  static getDerivedStateFromProps(nextProps, prevState){
		console.log('In SessionPlanModuleIA getDerivedStateFromProps()...');
		console.log("Got nextProps, prevState : ")
		console.log(nextProps)
		console.log(prevState)
		console.log("nextProps.id :")
		console.log(nextProps.id)
		if(nextProps.id!==prevState.id){
		  let returnNewValuesObj = {
			id: nextProps.id
		  }
		  console.log("returnNewValuesObj : ");
		  console.log(returnNewValuesObj);
		 return returnNewValuesObj;
		}
		else { 
		  console.log("returning null : ");
		  return null;
		}
	  }
    
  render() { 
		
		
    if(!this.state.isLoaded)
    {
      return <div>Loading...</div>;
	}
	else if(this.state.isLoaded && this.state.errorStatus)
    {
      return <div className="text-left"> <div className="text-muted pt-2 " ><i className="material-icons">error_outline</i> {this.state.errorMessage}  </div></div>;
    }
	else{
        return (
		<div  className="text-left sessionplan-container-bg" >	
			<div className="">
			<Card className="mb-2">
					<Card.Body >
						<Card.Title className = "mt-3">
						<i className="material-icons">assessment</i> Internal Assessments 
						</Card.Title>
				    </Card.Body>
                </Card>
				<Card className="mt-3">
					<Card.Body >
						<Card.Title className = "mt-3">
						<i className="material-icons">assessment</i> Internal Assessments - MCQs
						</Card.Title>
						
							{/* <!-- tests from api cards start --> */}
							{
                            !this.state.data.testsForStudent
                            ?  <div> <h6 className="text-muted" ><i className="material-icons">error_outline</i> No Internal Assessments Available </h6> </div>
                            :
								this.state.data.testsForStudent.length < 1 
								? <div> <h6 className="text-muted" ><i className="material-icons">error_outline</i> No Internal Assessments Available </h6> </div>
								: 
								<Col>
								{/* Resources tableview start */}
									
									<Table responsive  className="session-plan-lr">
                            <thead>
                                <tr>
                                <th>Sr. No</th>
                                <th>Name</th>
                                <th>Start DateTime</th>
                                <th>End DateTime</th>
                                <th>Attempt</th>
                                <th colSpan="2" className="text-center" >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {	this.state.data.testsForStudent.map((test, index)=>{
                                        return(
											
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{test.testName}</td>
                                            <td>
                                                <Moment format="MMM D \at hh:mm a \(\I\S\T\)" withTitle>
												{test.startDate}
                                                </Moment>
											</td>
                                            <td>
                                                <Moment format="MMM D \at hh:mm a \(\I\S\T\)" withTitle>
												{test.endDate}
                                                </Moment>
											</td>
                                            <td>{test.attempt}</td>
                                            <td> 
													
													
														<Col xs={12} className = "text-center moduleCardIconLinks">
													{TestDataHelper.CheckIfIATestIsActive(test)  && 
														
													<Link 
														title="Start Test"
														className="btn btn-outline-light card-link btn-block"
														to = {{
														pathname : "/timeline/startIATest",
														state:  {
															sapId : this.state.student.sapid,
															testId : test.id,
															module : this.props.module,
															testName: test.testName
														}
														}}
													>
														<i className="material-icons text-muted">play_circle_outline</i>
													</Link>	
															
													}
													{	(!(TestDataHelper.CheckIfIATestIsActive(test)))	&&
															<Link
																title="View Test Result" 
																className="btn btn-outline-light card-link btn-block"
																to = {{
																pathname: Pages.viewTestResults,
																state:  {
																	sapId : this.state.student.sapid,
																	testId : test.id,
																	module : this.props.module,
																	testName: test.testName
																}
																}}
																>
																<i className="material-icons text-muted">grade</i>
															</Link>															
															}
															{/* <Button
																variant="primary"
																className="btn btn-primary btn-sm"
																onClick={ () => { this.showTestInJSWindow(test.id) } }
															>Show Test IN POP UP
															</Button>       */}
															{/* <span className="notification-dot"></span> */}
														</Col>
													</td>
                                        </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </Table>
						{/* test tableview end */}

									</Col>
								
							}	
								{/* <!-- tests from api cards end --> */}
						
					</Card.Body>
				</Card>
			</div>
		</div> 
		)
        {/* container-fluid ends */}
					
					

    }
  }
}

const mapStateToProps = state => {
	return {
        sapId: state.sapId,
        student: state        
    }
}

export default connect(mapStateToProps)(SessionPlanModuleIA)