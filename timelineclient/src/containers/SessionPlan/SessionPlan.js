import React, { Component } from 'react';
import './SessionPlan.css';
 
import axios from 'axios'

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import 'material-design-icons/iconfont/material-icons.css';
import {  Route, Redirect,Link } from 'react-router-dom';
import { API } from '../../shared/config'
import WarningMessage from '../../shared/WarningMessage/WarningMessage'
import Container from 'react-bootstrap/Container';
import {analyticsManager} from '../../shared/Analytics'
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler';
import Moment from 'react-moment';
import SessionPlanModuleInfo from './SessionPlanModuleInfo';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';

const moduleNoStyle = {
  color:" rgba(0, 0, 0, 0.2);", 
  fontSize: "14px"
}

class SessionPlan extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sapId:this.props.sapId,
      error: null,
      isLoaded: false,
      data: null ,
      goToModuleDetails : false,
      goToModuleDetailsId : 0,
      open: false,
      noDataForSessionPlan: false
    };
  }  

 colorCodes = [ "#827717", "#43A047","#0097A7", "#1E88E5","#673AB7" ];
 tempColorCodes = [ "#827717", "#43A047","#0097A7", "#1E88E5","#673AB7" ];
  
  setBgColorToModuleTitle = (moduleId) => {
    console.log("  ")
    console.log(" ===Module Id=== ")
    console.log(moduleId)
    console.log("  ")
    // console.log("IN setBgColorToModuleTitle got...");
    // if(this.tempColorCodes.length == 0){
    //   console.log("IN if pushing new codes got...");
    //   for (var i = 0, len = this.colorCodes.length; i < len; i++) {
    //     this.tempColorCodes.push(this.colorCodes[i]);
    //   }
    //   console.log(this.tempColorCodes);
    // }
    // var colorCode = this.tempColorCodes.pop()
    // console.log("colorCode : "+colorCode);
    // console.log(this.tempColorCodes);
    let colorCode = this.colorCodes[moduleId % this.colorCodes.length]
    return colorCode;
  }

  checkedSessionDateForModuleCard(module){
    if(module.sessionModuleNo > 0)
      if(module.session != null){
        if((Date.parse(new Date())) <= (Date.parse(new Date(module.session.date)))){
          return 'sessionPlanHomeCardTitleDisable';
        }
      }
    return 'sessionPlanHomeCardTitle';
  }

  checkedSessionDateForBottom(module){
    if(module.sessionModuleNo > 0)
      if(module.session != null){
        if((Date.parse(new Date())) <= (Date.parse(new Date(module.session.date)))){
          return 'sessionplan-resourcecard-disabled';
        }
    }
    return 'sessionplan-resourcecard';
  }

  checkedSessionDateForIcon(module){
    if(module.sessionModuleNo > 0)
      if(module.session != null){
        if((Date.parse(new Date())) <= (Date.parse(new Date(module.session.date)))){
          return 'btnn font12 hoverblueDisable';
        }
      }
    return 'btnn font12 hoverblue';
  }

  componentDidMount(){
    console.log('In SessionPlan componentDidMount() got...');
    console.log("TimeboundID : "+this.props.location.state.timeboundId);
  
    AxiosHandler.AxiosPostHandler({
      url : API.getSessionPlanDetailsBySapidAndTimeboundId,
      data : {
          sapid: this.props.sapId,
          timeboundId: this.props.location.state.timeboundId,
      },
      successCallBack : (response) => {
        console.debug("Got reponse data : ");
        console.debug(response.data);
        this.setState({
          data: response.data,
          isLoaded: true,
          noDataForSessionPlan : response.data.modules.length < 1 ? true : false
        })
      },
      failureCallBack : (error) => {
        console.debug(error)
        this.setState({
          isLoaded: true,
          error   : true,
          noDataForSessionPlan : true,
        })
      },
      sapid : this.props.sapId,
    })
    
}
  render() { 
    const { open } = this.state;
    if(!this.state.isLoaded)
    {
      return <div>Session Plan Loading...</div>;
    }
    else{
      return (
        
        <div className="text-left container">

        <Row>
        {
           this.state.noDataForSessionPlan == true
           ? <Container> 
           <Card >
             <Card.Body className="text-secondary">
              <WarningMessage message="Content Not Available."/>
             </Card.Body>
           </Card> </Container>
           : <div className="w-100" >
         
        <Col xs={12} >
         
        {/* <Card > */}
          {/* <Card.Body className="text-secondary"> */}
          {/* <b>Session Plan Dashboard For {this.state.data.sessionPlan.subject}</b> */}
          {/* </Card.Body> */}
        {/* </Card> */}
        
          <h5 className="card-title">Session Plan Dashboard</h5>
          <h6 className="card-subtitle pl-3">
             - {this.state.data.sessionPlan.subject}
          </h6>
          
          <Row className = "mr-5 mb-3 sessionplan-block ">
            
            {/* Generate Topic Card from API start */}
            
         {/* <!-- for topic card start --> */}

          {
            this.state.data.modules.map(
              (module) => {
                  return ( 
                     (  module.sessionModuleNo == 0 ?  true : 'session' in module ) ? ( 
                  <Col xs={12} sm={6} md={6} lg={6} xl={4} key={module.id} className="mt-3 resourcecards">
                  <Card className={this.checkedSessionDateForBottom(module)}>
		              <Link to={{
                      pathname: '/timeline/sessionPlanModule',
                      state: {
                        id: module.id,
                        module: module 
                      }
                    }}>

                <div className={this.checkedSessionDateForModuleCard(module)}>
                  <span className="" style={moduleNoStyle}><span class="module-heading small-font light-font">
                    Module : {module.sessionModuleNo}&nbsp;&nbsp;|&nbsp;&nbsp;
                    {(module.chapter.length > 80 ) ? module.chapter.slice(0,80)+" ...": module.chapter}
                     </span><br/>
                    <span className="module-name">
                      {(module.topic.length > 80 ) ? module.topic.slice(0, 80)+" ...":module.topic }
                    </span>
                  </span>
                </div>
                </Link>
   

                <Card.Body className="text-dark pt-0 pb-0 sessionplan-card-body">
                
                <Row className = "pt-3 resource-cardbutton-container">
                  <Col xl={6} lg={6} md={6} sm={6} xs={6} className = "links-column ">
                  <Link className={this.checkedSessionDateForIcon(module)}
                       to={{
                        pathname: '/timeline/sessionPlanModule',
                        state: {
                          id: module.id,
                          showTab:"videos",
                          module: module 

                        }
                      }}>
                        <i className="material-icons sessionplan-icon">play_circle_outline </i>  <span className="fontSizeResourceCardSub"> Session</span>
                     
                      </Link>
                      <Link className={this.checkedSessionDateForIcon(module)}
                       to={{
                        pathname: '/timeline/sessionPlanModule',
                        state: {
                          id: module.id,
                          showTab:"LR",
                          module: module 

                        }
                      }}>
                      <i className="material-icons sessionplan-icon">folder_open</i> <span className="fontSizeResourceCardSub">Resources</span>
                      </Link>
                      <Link className={this.checkedSessionDateForIcon(module)}
                       to={{
                        pathname: '/timeline/sessionPlanModule',
                        state: {
                          id: module.id,
                          showTab:"IA",
                          module: module 

                        }
                      }}>
                      <i className="material-icons sessionplan-icon">assessment</i><span className="fontSizeResourceCardSub">Assessment</span>
                      </Link>
                    </Col>
                    <Col xl={6} lg={6} md={6} sm={6} xs={6} className = "text-left ">
                    <Link className={this.checkedSessionDateForIcon(module)}
                       to={{
                        pathname: '/timeline/sessionPlanModule',
                        state: {
                          id: module.id,
                          showTab:"feeds",
                          module: module 

                        }
                      }}>
                      <i className="material-icons sessionplan-icon">desktop_windows</i> <span className="fontSizeResourceCardSub">Feeds</span> 
                      </Link>
                      <Link className={this.checkedSessionDateForIcon(module)}
                       to={{
                        pathname: '/timeline/sessionPlanModule',
                        state: {
                          id: module.id,
                          showTab:"qna",
                          module: module 

                        }
                      }}>
                      <i className="material-icons sessionplan-icon">question_answer
                      </i><span className="fontSizeResourceCardSub">{' Q&A'}</span>
                      </Link>
                      <Link className={this.checkedSessionDateForIcon(module)}
                       to={{
                        pathname: '/timeline/sessionPlanModule',
                        state: {
                          id: module.id,
                          showTab:"about",
                          module: module 

                        }
                      }}>
                      <i className="material-icons sessionplan-icon">info</i><span className="fontSizeResourceCardSub"> About</span>
                      </Link>
                    </Col>
                </Row>
                {/* <Link 
                  to={{
                      pathname: '/timeline/sessionPlanModule',
                      state: {
                        id: module.id,
                        module: module,
                        showTab: "about" 
                      }
                    }}>
                  <Row >
                  <Col 
                    className="noUnderlineOnHover fixedHeight mt-3" 
                    dangerouslySetInnerHTML={{__html: module.outcomes.replace(/<[^>]+>/g, '').substring(0,80)+"..." }}>
                  
                  </Col>
                  </Row>
                </Link> */}
               <SessionPlanModuleInfo 
                  module = { module }
                  sapid = { this.props.sapId }
                />
                </Card.Body>
               
                  
              </Card>
                      </Col>)
                 : (<> </>)
                     
             )
              }
            )
          }
        
                  
               {/* <!-- for topic card end --> */}
            {/* from API end */}

          </Row>
        </Col>
         {/* <!-- for modules end --> */}
        
         {/* <!-- for details start --> */}
         <Col xs={12}  className="">
          
        <Card className="">
      <Card.Body className="card-body">
        <Card.Title >Session Plan Details</Card.Title>
        
        <div className="table-responsive">
       <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan="3">Teaching Scheme</th>
          </tr>
        </thead>
        <tbody>
          <tr>
        
            <td>Classroom Session
    </td>
            <td>Group work
    </td>
            <td>Assessments</td>
         
          </tr>
          <tr>
            <td>{this.state.data.sessionPlan.noOfClassroomSessions}</td>
            <td>{this.state.data.sessionPlan.noOf_Practical_Group_Work}</td>
            <td>{this.state.data.sessionPlan.noOfAssessments}</td>
            
          </tr>
        </tbody>
      </table>
      </div>
      
      <Collapse in={this.state.open}>
        <div className="collapse card-text" id="block-id">
          <p className="card-text">
        Course Rationale :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.courseRationale}}>
         </p> <br/>
        <p className="card-text">
        Course Objectives :
        </p>
          <div className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.objectives}}>
        
        </div> <br/>
        <p className="card-text">
        Learning Outcomes :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.learningOutcomes}}>
      </p> <br/>
      
        <p className="card-text">
        Pre-requisite(s) :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.prerequisites}}>
      </p> <br/>
        <p className="card-text">
        Pedagogy :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.pedagogy}}>
        
         </p>
         <br/>
        <p className="card-text">
        TextBook :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.textbook}}>
        
         </p>
         <br/>
        <p className="card-text">
        Journals :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.journals}}>
        
         </p>
         <br/>
        <p className="card-text">
        Links :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.links}}>
          
        
         </p>

         <br/>
        <p className="card-text">
        Inovative Pedagogy Used :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.pedagogyUsed}}>
          
          </p>
         <br/>
        <p className="card-text">
        Case Study Name :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.casestudyName}}>
           
          </p>
         <br/>
        <p className="card-text">
        Pedagogical Tool :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.pedagogicalTool}}>
          
          </p>
         <br/>
        <p className="card-text">
        Inovative Teaching Method :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.teachingMethod}}>
            
          </p>
         <br/>
        <p className="card-text">
        Case Study Source :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.casestudySource}}>
             
          </p>
         <br/>
        <p className="card-text">
        Case Study Type :
        </p>
          <p className="text-muted" dangerouslySetInnerHTML={{__html: this.state.data.sessionPlan.casestudyType}}>

          </p>
        
        </div>
        </Collapse>
      
           {/* <!-- aria-expanded attribute is mandatory --> */}
           {/* <!-- bootstrap changes it to true/false on toggle --> */}
          <a 
             className="btn btn-outline-secondary card-link "
             onClick={() => this.setState({ open: !open })}
             aria-controls="example-collapse-text"
             aria-expanded={open}
          >
            
            <span className="collapsed">
              Show more
            </span>
            <span className="expanded">
              Show Less
            </span>
            
          </a>
      </Card.Body>
    </Card>

 
         
          
          
          
        </Col>  {/* <!-- col --> */}
         {/* <!-- for details end --> */}
         </div>
        }
      </Row>  
    </div>  
        

        );  
    }

    return null
    
  }

 

} 
const mapStateToProps = state => {
	return {
    sapId: state.sapid,
    currentTimeboundId: state.currentTimeboundId
	}
}

export default connect(mapStateToProps)(analyticsManager(SessionPlan)) 
