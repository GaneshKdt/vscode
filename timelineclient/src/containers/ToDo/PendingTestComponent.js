import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap';
import Moment from 'react-moment';
import {   Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import DueIcon from '@material-ui/icons/QueryBuilder';
import SubjectIcon from '@material-ui/icons/Subject';
import axios from 'axios'
import { Pages } from '../../shared/config';

class PendingTestComponent extends Component {

    state ={
        todo : this.props.todo,
        sessionPlanModuleData : this.props.sessionPlanModuleData,
        moduleToReturn : [],
    }
     //get module from moduleData for respective test referenceId
     handleTakeTest = (todo) => {
        if(this.state.sessionPlanModuleData){
            this.state.sessionPlanModuleData.map(mod => {
                console.log("loop=="+mod.id)
                        if(toString(mod.id) === toString(todo.referenceId)){
                                this.setState({
                                    moduleToReturn : mod,
                                })
                        }  
            })
        }
    }

    startTEEAssessment = () => {
        this.props.history.push({
            pathname: Pages.startTEEAssessment,
            state: { 
                startTest   : true,
                assessment  : this.state.todo
            }
        })
    }

    viewTEEAssessment = () => {
        console.debug(this.props)
        this.props.history.push({
            pathname: Pages.startTEEAssessment,
            state: { 
                startTest   : false,
                assessment  : this.state.todo
            }
        })
    }

    render(){
        return(
            <Card lg={7} sm={7} style={{margin:"10px"}}>
                        <Row>
                            <Col lg={7} sm={7} className="ml-4 mt-2">
                                <div> 
                                <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"2%"}}>
                                    <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                                </svg>
                                <b>
                                { this.state.todo.type === "assessments" ? this.state.todo.testName ? this.state.todo.testName : this.state.todo.name : this.state.todo.testName }</b></div> 
                                <div className="testTextUnderHeader" style={{marginLeft:"33px"}}> <DueIcon className="iconForDueTest"/>&nbsp;
                                {
                                    this.state.todo.type === "assessments" ? (
                                        <>
                                            Start Time: <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>{this.state.todo.startDate}</Moment>
                                        </>
                                    ) : (
                                        <>
                                            Join Within: <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>{this.state.todo.startDate}</Moment> to <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>{this.state.todo.endDate}</Moment>
                                            
                                        </>
                                    )
                                } &nbsp;
                                    <span style={{borderLeft: "1px solid rgb(171, 174, 186)"}}> &nbsp; <SubjectIcon className="iconForDueTest"/>&nbsp;{this.state.todo.subject}</span>
                                </div>   
                            </Col>
                            <Col lg={4} md = {4} sm={4} className="text-right" style={{marginLeft: 'auto',marginRight: 'auto'}}>
                                {new Date(this.state.todo.startDate) <= new Date() && new Date()  <= new Date(this.state.todo.endDate) ?

                                
                                    <>
                                     {this.state.moduleToReturn || this.state.todo.type === "assessments" ?  

                                        this.state.todo.type === "assessments" ? (
                                            <>
                                                <Button onClick={()=>this.startTEEAssessment()} variant="primary" style={{fontSize: "12px",marginTop:'10px'}} size="sm">Take Test</Button>
                                                <Button onClick={()=>this.viewTEEAssessment()} variant="outline-primary" style={{fontSize: "12px",marginTop:'10px'}} size="sm">View Details</Button>
                                            </> 
                                                ):( <>
                                                    <Link to={{
                                                        pathname: '/timeline/startIATest',
                                                        state: {
                                                            sapId : this.state.sapId,
                                                            testId : this.state.todo.id,
                                                            module : this.state.moduleToReturn,
                                                            testName: this.state.todo.testName 
                                                            }
                                                        }}>
                                                        <Button variant="primary" style={{fontSize: "12px",marginTop:'10px'}} size="sm">Take Test</Button>                                                     
                                                    </Link> 
                                                    
                                                    <Link to={{
                                                        pathname:  Pages.viewTestResults,
                                                        state: {
                                                            sapId : this.state.sapId,
                                                            testId : this.state.todo.id,
                                                            module : this.state.moduleToReturn,
                                                            testName: this.state.todo.testName 
                                                            }
                                                        }}>
                                                       <Button variant="outline-primary" style={{fontSize: "12px",marginTop:'10px'}} size="sm">View Details</Button>
                                                    </Link> 
                                                       </>
                                                )
                                            
                                            : null}
                                    </>
                                 :
                                    <>
                                        {this.state.moduleToReturn  || this.state.todo.type === "assessments" ?  
                                            this.state.todo.type !== "assessments" ? (
                                        <Link to={{
                                                pathname: '/timeline/startIATest',
                                                state: {
                                                    sapId : this.state.sapId,
                                                    testId : this.state.todo.id,
                                                    module : this.state.moduleToReturn,
                                                    testName: this.state.todo.testName 
                                                    }
                                                }}>
                                                <Button variant="primary" style={{fontSize: "12px",marginTop:'10px'}} size="sm" >Take Test</Button>
                                                <Button variant="outline-primary" style={{fontSize: "12px",marginTop:'10px'}} size="sm">View Details</Button>
                                        </Link> 
                                            ) :(
                                                <>
                                                    <Button disabled variant="primary" style={{fontSize: "12px",marginTop:'10px'}} size="sm">Take Test</Button>
                                                    <Button onClick={()=>this.viewTEEAssessment()} variant="outline-primary" style={{fontSize: "12px",marginTop:'10px'}} size="sm">View Details</Button>
                                                </> 
                                            )                                       
                                        : null}
                                    </> 
                                 } 
                                
                            </Col>
                        </Row>
                
                </Card>
        )
        
    }
}
export default withRouter(PendingTestComponent)