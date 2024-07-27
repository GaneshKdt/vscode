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

class ToDoSideBar extends Component {
    state = {
        todo:this.props.todo,
        sessionPlanModuleData : this.props.sessionPlanModuleData,
        moduleToReturn : null,
        sapId : this.props.sapId,
        editToolTip : "Take Test"
    }
    //get module from moduleData for respective test referenceId
    handleTakeTest = () => {
        if(this.state.sessionPlanModuleData){
            this.state.sessionPlanModuleData.map(mod => {
                console.log("loop=="+mod.id)
                        if(toString(mod.id) === toString(this.state.todo.referenceId)){
                                this.setState({
                                    moduleToReturn : mod,
                                })
                        }  
            })
        }
            
                
      
    }
    
    
    redirectMettl = (schedule_accessUrl) => {
        window.open(schedule_accessUrl ,'_blank')

    }

    componentDidMount (){
        this.handleTakeTest();
        console.log("^^^^^^^^^^^^^^^^^^^^^^^(((((((("+(new Date(this.state.todo.startDate) <= new Date()));
    }
    render() {
        return(
            
            this.state.moduleToReturn || this.state.todo.type === "assessments" ? (
            // <Row>											
                
               
                
               
            //                 <>
            //                     {this.state.moduleToReturn ?  

            //                         this.state.todo.type === "assessments" ? (
            //                             <Link 
            //                             onClick={()=>this.redirectMettl(this.state.todo.schedule_accessUrl)}
            //                             // to={{
            //                             //     pathname: this.state.todo.schedule_accessUrl,                                            
            //                             //     }}
            //                             >
            //                                 <OverlayTrigger                                            
            //                                         placement="right-start"
            //                                         delay={{ show: 250, hide: 400 }}
            //                                         overlay={<Tooltip >
            //                                             {this.state.editToolTip}
            //                                         </Tooltip>}
            //                                     >
            //                                          <IconButton                                                     
            //                                          className="takeTestIcon" htmlFor="icon-button-file" aria-label="Add" component="span">
            //                                             <TakeTestIcon style={{height:"20px",width:'20px',color:'#007bff'}} />
            //                                         </IconButton>
            //                                 </OverlayTrigger> 
            //                                 </Link>
                                          
                                    
            //                             ):(
            //                         <Link to={{
            //                             pathname: '/timeline/startIATest',
            //                             state: {
            //                                 sapId : this.state.sapId,
            //                                 testId : this.state.todo.id,
            //                                 module : this.state.moduleToReturn,
            //                                 testName: this.state.todo.testName 
            //                                 }
            //                             }}>
            //                             <OverlayTrigger
            //                                     placement="right-start"
            //                                     delay={{ show: 250, hide: 400 }}
            //                                     overlay={<Tooltip >
            //                                         {this.state.editToolTip}
            //                                     </Tooltip>}
            //                                 >
            //                                      <IconButton className="takeTestIcon" htmlFor="icon-button-file" aria-label="Add" component="span">
            //                                         <TakeTestIcon style={{height:"20px",width:'20px',color:'#007bff'}} />
            //                                     </IconButton>
            //                             </OverlayTrigger> 
                                       
                                        
            //                         </Link>) : null}
            //                 </>
            //             :
            //                 <>
            //                     {this.state.moduleToReturn ?
            //                             <IconButton className="takeTestIcon" htmlFor="icon-button-file" aria-label="Add" component="span" disabled >
            //                                 <TakeTestIcon style={{height:"20px",width:'20px'}}  />
            //                             </IconButton>
            //                     : null}
            //                 </>}
            //     </Col>
            // </Row>
                        
            <div className="task-item">
               
               <div className="mini-task-item">
                   <div className="mini-task-item-wrapper">
                       <div className="iaIcon-content-left">
                     <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"1%"}}>
                         <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                     </svg>
                       </div>
                       <div className="content-right">
                           <div className="right-title-wrapper">
                               <div class="right-title" style={{width: "80%"}}>
                            {   
                            this.state.todo.type === "assessments" ? (

                                <Link 
                                    to = {{
                                        pathname: Pages.startTEEAssessment,
                                        state: { 
                                            startTest   : false,
                                            assessment : this.state.todo
                                        }
                                    }}
                                >
                                    {this.state.todo.testName ? this.state.todo.testName : this.state.todo.name}   
                                </Link>
                                ):(
                                <Link
                                    to={Pages.todo} 
                                >{this.state.todo.testName} 
                                </Link>)
                            }
                               </div>
                               {new Date(this.state.todo.startDate) <= new Date() && new Date()  <= new Date(this.state.todo.endDate) ?
                             <div className="blinkingButton">Live</div>:""} 
                               
                           </div>
                           
                           <div class="right-sub-box-wrapper">
                           <div class="class-name"><b>{this.state.todo.subject}
                           </b></div>
                           </div>
                           <div class="right-sub-box-wrapper">
                               
                               
                                   {/*<div class="text-red">
                                   <i class="material-icons" style={{    fontSize: '11px',paddingTop: '3px',fontWeight: '700'}} >access_time</i>
                                   Due ●  
                               </div>*/}
                               
                               <div class="class-color-icon" style={{backgroundColor: 'rgb(51, 102, 204)'}}></div>
                               <div class="class-name pl-1">
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
                                } 
                           
                                   {/* <Moment format="MMM D hh:mm a \(\I\S\T\)" withTitle>{ "session.date+' '+session.startTime "}</Moment> */}
                                   </div>

                               
                               <div class="line"></div>
                                
                               {new Date(this.state.todo.startDate) <= new Date() && new Date()  <= new Date(this.state.todo.endDate) ?(
                                 this.state.todo.type === "assessments" ? (

                                        
                                        <Link 
                                            to = {{
                                                pathname: Pages.startTEEAssessment,
                                                state: { 
                                                    startTest   : true,
                                                    assessment : this.state.todo
                                                }
                                            }}
                                        >
                                            <OverlayTrigger                                            
                                                placement="right-start"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={<Tooltip >
                                                    {this.state.editToolTip}
                                                </Tooltip>}
                                            >
                                                <IconButton                                                     
                                                     className="takeTestIcon" htmlFor="icon-button-file" aria-label="Add" component="span">
                                                      <TakeTestIcon style={{height:"20px",width:'20px',color:'#007bff'}} />
                                                </IconButton>
                                            </OverlayTrigger> 
                                            </Link>
                                          

                                        ):(
                                    <Link to={{
                                        pathname: '/timeline/startIATest',
                                        state: {
                                            sapId : this.state.sapId,
                                            testId : this.state.todo.id,
                                            module : this.state.moduleToReturn,
                                            testName: this.state.todo.testName 
                                            }
                                        }}>
                                        <OverlayTrigger
                                                placement="right-start"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={<Tooltip >
                                                    {this.state.editToolTip}
                                                </Tooltip>}
                                            >
                                                 <IconButton className="takeTestIcon" htmlFor="icon-button-file" aria-label="Add" component="span">
                                                    <TakeTestIcon style={{height:"20px",width:'20px',color:'#007bff'}} />
                                                </IconButton>
                                        </OverlayTrigger> 
                                       
                                        
                                    </Link>
                                    )
                                    ): 
                                      <IconButton className="takeTestIcon" htmlFor="icon-button-file" aria-label="Add" component="span" disabled >
                                                                     <TakeTestIcon style={{height:"20px",width:'20px'}}  />
                                                                 </IconButton>
                                }
                           </div>
                       </div>
                   </div>
               </div>
           </div>
           ):null
        )
    }

 }

export default ToDoSideBar
