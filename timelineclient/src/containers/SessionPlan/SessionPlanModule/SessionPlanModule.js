import React, { Component } from 'react';
import axios from 'axios'

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import { Route } from 'react-router-dom'
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import 'material-design-icons/iconfont/material-icons.css';

import SessionPlanModuleVideos from './SessionPlanModuleVideos/SessionPlanModuleVideos'
import SessionPlanModuleLR from './SessionPlanModuleLR/SessionPlanModuleLR'
import SessionPlanModuleFeeds from './SessionPlanModuleFeeds/SessionPlanModuleFeeds'
import SessionPlanModuleQNA from './SessionPlanModuleQNA/SessionPlanModuleQNA';
import SessionPlanModuleIA from './SessionPlanModuleIA/SessionPlanModuleIA';
import {analyticsManager} from '../../../shared/Analytics'
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'
import Index from '../../../components/Breadcrumbs/Index'
import Paths from '../../../components/Breadcrumbs/Paths'
import './SessionPlanModule.css';


class SessionPlanModule extends Component {
    state = {
        error: null,
        isLoaded: false,
        data: null ,
        id: "5",
        key: "",
        module: {}
      };
     
    
      componentDidMount(){
        
            console.log('In SessionPlanModule componentDidMount()...');
            console.log('Got id : '+this.props.location.state.id+', showTab : '+this.props.location.state.showTab);
            console.log(this.props.location.state.module);
            this.setState({
              id:this.props.location.state.id,
              key:this.props.location.state.showTab,
              module: this.props.location.state.module,
              isLoaded: true
          })
          if(this.props.student.activeTab)this.setState({ key:this.props.student.activeTab })
          this.props.dispatch({
            type:'LAST_ACTIVE_TAB',
            data:{
              activeTab:""
            }
          });
      }
   
  componentDidUpdate(prevProps, prevState) {
    console.log('In SessionPlanModule componentDidUpdate()...');
    console.log("Got prevProps, prevState : ")
    console.log(prevProps)
    console.log(prevState)
    if (prevState.id !== this.state.id) {
      let updateSateObj = {
        id:this.state.id,
        module:this.state.module,
        key:"videos",
        isLoaded: true
      }
      console.log("updateSateObj : ");
      console.log(updateSateObj);
      this.setState({updateSateObj})
    }else{
      console.log("No State update : ");
    }
  }
  
  static getDerivedStateFromProps(nextProps, prevState){
    console.log('In SessionPlanModule getDerivedStateFromProps()...');
    console.log("Got nextProps, prevState : ")
    console.log(nextProps)
    console.log(prevState)
    console.log("nextProps.location.state.module :")
    console.log(nextProps.location.state.module)
    if(nextProps.location.state.id!==prevState.id){
      let returnNewValuesObj = {
        id: nextProps.location.state.id,
        module: nextProps.location.state.module,
        key:"videos",
        isLoaded: true
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
      return <div>Session Plan module Loading...</div>;
    }else{
        return  <div>
        <Col md={12} id="session-plan-module-home">
          <Breadcrumbs 
            crumbsList = {[
              Index.home, 
              {
                ...Index.sessionPlanDashboard,
                data : {
                  state: {
                    timeboundId : this.props.currentTimeboundId
                  }
                }
              },
              {
                ...Index.sessionPlanModule,
                text : this.state.module.topic
              }
            ]}
          />
{/*         
        <Col md={12} id="session-plan-module-home">
        
        <Card >
          <Card.Body className="text-secondary text-left">
            
          <Link to={{pathname: '/timeline/home'}}>
                  <i class="material-icons breadCrumbIcon">
                    home
                    </i> Home </Link> 
                    &nbsp;
                    <i class="material-icons breadCrumbIcon">
                     keyboard_arrow_right
                    </i>
                    &nbsp; 

          <Link to={{pathname: '/timeline/sessionPlan',
            state: {
              timeboundId : this.props.currentTimeboundId
            }
          }}>
            Session Plan Dashboard
          </Link>
            &nbsp;
            <i class="material-icons breadCrumbIcon">
                     keyboard_arrow_right
                    </i>&nbsp;
            <a  className="active" > {this.state.module.topic} </a> 
          </Card.Body>
        </Card>
          <br/> */}

          <h5 className="card-title">{this.state.module.topic}</h5>
          {/* <h6 className="card-subtitle pl-3">
             - For {this.state.data.sessionPlan.subject}
          </h6> */}
          <div class="tabbable-panel">
						<div class="tabbable-line">
              <Tabs
              id="controlled-tab-example"
              activeKey={this.state.key}
              onSelect={key => this.setState({ key })}
              >
              <Tab eventKey="videos" title={<div><i className="material-icons f-15">play_circle_filled</i><br/>Videos</div>}>
                <SessionPlanModuleVideos 
                  id={this.state.id} 
                  sapId={this.props.sapId}
                  module= {this.state.module}
                />
              </Tab>
              <Tab eventKey="LR" title={<div><i className="material-icons f-15">folder</i><br/>Resources</div>}>
                <SessionPlanModuleLR 
                  id={this.state.id}
                  sapId={this.props.sapId}
                  module= {this.state.module}
                />
              </Tab>
              
              <Tab eventKey="IA" title={<div><i className="material-icons f-15">assessment</i><br/>Assessment</div>}>
                <SessionPlanModuleIA 
                  id={this.state.id}
                  module = {this.props.location.state.module}
                  />
              </Tab>
              
              <Tab eventKey="feeds" title={<div><i className="material-icons f-15">desktop_windows</i> <br/>Feeds</div>} >
                <SessionPlanModuleFeeds 
                  id={this.state.id}
                  module= {this.state.module}
                />
              </Tab>
              <Tab eventKey="qna" title={<div><i className="material-icons f-15">help</i><br/> {' Q&A'}</div>} >
                <SessionPlanModuleQNA id={this.state.id} />
              </Tab>

              <Tab eventKey="about" title={<div><i className="material-icons f-15">info</i><br/>About</div>} className="sessionplan-container-bg ">
                
              {/* <!-- for details start --> */}
             
                
                <Card className=" no-border">
                
              <Card.Body className="card-body">
              <Card.Title className = "mt-3 h5">
                    <i className="material-icons">info</i> <span>About</span>
                </Card.Title>
                <h6 >Module Details</h6>
                
                <div className="pl-2">        <div className="card-text">
                  <p className="card-text">
                Module No : {this.state.module.sessionModuleNo}
                </p> <br/>
                <p className="card-text">
                Chapter  : {this.state.module.chapter}
                </p> <br/>
                <p className="card-text">
                Topic :
                </p>
                  <div className="text-muted pl-2" 
                    dangerouslySetInnerHTML={{__html: this.state.module.topic}}>
                
                </div> <br/>
                <p className="card-text">
                Outcomes :
                </p>
                  <p className="text-muted pl-2" 
                    dangerouslySetInnerHTML={{__html: this.state.module.outcomes}}>
                  </p> <br/>
              
                <p className="card-text">
                  Pedagogical Tool :
                </p>
                  <p className="text-muted pl-2" 
                    dangerouslySetInnerHTML={{__html: this.state.module.pedagogicalTool}}>
              </p> <br/>          
                </div>
                </div>
        
              </Card.Body>
            </Card>
        
        
                
                  
                  
                  
              {/* <!-- col --> */}
                {/* <!-- for details end --> */}
              </Tab>
            </Tabs>
            </div>

            
          </div>
          <Accordion defaultActiveKey="0">
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button}  variant="link" eventKey="0">
                    <div><i className="material-icons f-15">play_circle_filled</i><br/>Videos</div>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <SessionPlanModuleVideos 
                    id={this.state.id} 
                    sapId={this.props.sapId}
                    module= {this.state.module}
                  />
                </Accordion.Collapse>
              </Card>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    <div><i className="material-icons f-15">folder</i><br/>Resources</div>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <SessionPlanModuleLR 
                    id={this.state.id}
                    sapId={this.props.sapId}
                    module= {this.state.module}
                  />
                </Accordion.Collapse>
              </Card>
              <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                  <div><i className="material-icons f-15">assessment</i><br/>Assessment</div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="2">
                <SessionPlanModuleIA 
                    id={this.state.id}
                    module = {this.props.location.state.module}
                    />
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="3">
                  <div><i className="material-icons f-15">desktop_windows</i> <br/>Feeds</div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="3">
                <SessionPlanModuleFeeds 
                    id={this.state.id}
                    module= {this.state.module}
                  />
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="4">
                  <div><i className="material-icons f-15">help</i><br/> {' Q&A'}</div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="4">
                <SessionPlanModuleQNA id={this.state.id} />
              </Accordion.Collapse>
            </Card>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="5">
                  <div><i className="material-icons f-15">info</i><br/>About</div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="5">
                <Card className=" no-border">
                  
                  <Card.Body className="card-body">
                  <Card.Title className = "mt-3 h5">
                        <i className="material-icons">info</i> <span>About</span>
                    </Card.Title>
                    <h6 >Module Details</h6>
                    
                    <div className="pl-2">        <div className="card-text">
                      <p className="card-text">
                    Module No : {this.state.module.sessionModuleNo}
                    </p> <br/>
                    <p className="card-text">
                    Chapter  : {this.state.module.chapter}
                    </p> <br/>
                    <p className="card-text">
                    Topic :
                    </p>
                      <div className="text-muted pl-2" 
                        dangerouslySetInnerHTML={{__html: this.state.module.topic}}>
                    
                    </div> <br/>
                    <p className="card-text">
                    Outcomes :
                    </p>
                      <p className="text-muted pl-2" 
                        dangerouslySetInnerHTML={{__html: this.state.module.outcomes}}>
                      </p> <br/>
                  
                    <p className="card-text">
                      Pedagogical Tool :
                    </p>
                      <p className="text-muted pl-2" 
                        dangerouslySetInnerHTML={{__html: this.state.module.pedagogicalTool}}>
                  </p> <br/>          
                    </div>
                    </div>
            
                  </Card.Body>
                </Card>
              </Accordion.Collapse>
            </Card>
            </Accordion>

        </Col>
                </div>
    }
  }
}

const mapStateToProps = state => {
	return {
    student: state,
    currentTimeboundId: state.currentTimeboundId
	}
}

export default connect(mapStateToProps)(analyticsManager(SessionPlanModule))