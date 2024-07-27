import React, { Component } from 'react';
 
import axios from 'axios'

import './ViewTestQuickJoin.css';
import 'material-design-icons/iconfont/material-icons.css';
import ConfigUrls from '../../../shared/config'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { throws } from 'assert';
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
import {connect} from 'react-redux';
import {   Link } from 'react-router-dom';

import { Pages, API } from '../../../shared/config'
import { confirmAlert } from 'react-confirm-alert';
import { analyticsManager } from '../../../shared/Analytics';

import logo from '../../../components/LeftSideRootNavigationDrawer/assets/logo/logo.jpg';

import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
/* import AppLozicChat from '../../../components/AppLozicChat/AppLozicChat' */
import '../../../../src/ResponsiveContentForChat.css'

//import Breadcrumbs from '../../../../../components/Breadcrumbs/Breadcrumbs'
//import Index from '../../../../../components/Breadcrumbs/Index'
//import Paths from '../../../../../components/Breadcrumbs/Paths'



const urls = new ConfigUrls().urls;

class ViewTestQuickJoin extends Component {
    state = {
        error: null,
        isLoaded: false,
        data: null,
        sapId : this.props.location.state.studentData.sapid,
        studentData : this.props.location.state.studentData,
        testsToBeShownInQuickJoin : this.props.location.state.testsToBeShownInQuickJoin,

    };
    
    goToQuickJoin = () => {
      this.props.history.push({pathname: '/timeline/testIAQuickJoin',state: { testsToBeShownInQuickJoin: this.state.testsToBeShownInQuickJoin}})
    }
    goToHome = () => {
        console.log("inside goToHome-----")
        this.props.history.push({pathname: '/timeline/home',state: { isHeaderRequired: true, isSideBarRequired  : true}})
   
    }
    
      componentDidMount(){
        /* window.$('.mck-close-sidebox').trigger( "click" ); */
        console.debug('Module Details: ', this.state);
        console.debug(this.props);
            console.log('In ViewTestQuickJoin componentDidMount()...');
            this.setIFrame();
        }
    
    setIFrame(){
        this.setState({
            testId:this.props.location.state.testId,
        })
        
        console.log('In ViewTestQuickJoin setIFrame() got \n sapid : '+this.state.sapId+'\n testId : '+this.state.testId);
        console.log(this.props.student);
        if( !isNaN(this.state.sapId) && !isNaN(""+this.state.testId) ){
            if(this.state.testId !=0 && this.state.sapId+"" != ""){
              //  let iFrameUrl = "http://localhost:8080/exam/viewTestDetailsForStudentsForAllViews?userId="+this.state.sapId+"&id="+this.state.testId+"&message=''";
              let iFrameUrl = API.viewTestDetailsForStudentsForAllViews+"?userId="+this.state.sapId+"&id="+this.state.testId+"&message=''&consumerProgramStructureId="+this.props.student.consumerProgramStructureId;
              console.log("iFrameUrl : \n "+iFrameUrl);
               
              // let iFrame = '<div className="h_iframe"> <iframe src="'+iFrameUrl+'" frameborder="0" ></iframe> </div>'; 
              // let isChrome =  !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
              var isIE =  !!document.documentMode;
              console.log("**********isIE-"+isIE);
              let iFrame = '';
              if(isIE){
                confirmAlert({
                  title: 'Browser Not Compatible',
                  message: 'Please Login using Google Chrome to proceed.',
                  buttons: [
                  {
                      label: 'OK',
                      onClick: () => {
                        this.props.history.push('/timeline/home')
                      }
                  },
                  ]
                });
                this.setState({
                  iFrameUrl: '',
                  iFrame : '',
                  isLoaded: true,
                })
              }
              else{
                // let iFrame = '<div className="embed-responsive embed-responsive-16by9"> <iframe className="embed-responsive-item" src="'+iFrameUrl+'" ></iframe> </div>';
                iFrame = '<div className="embed-responsive embed-responsive-16by9"> <iframe className="embed-responsive-item" src="'+iFrameUrl+'" ></iframe> </div>';
               console.log("iFrame : \n "+iFrame);
               this.setState({
                iFrameUrl: iFrameUrl,
                iFrame : iFrame,
                isLoaded: true,
                 })
              }
              
                
            }else{
                this.setState({
                    error : "Error in getting test.",
                    isLoaded: true,
                })
            }

        }else{
            this.setState({
                error : "Error in getting test.",
                isLoaded: true,
            })
        }


    }
    
	componentDidUpdate(prevProps, prevState) {
		console.log('In ViewTestQuickJoin componentDidUpdate()...');
		console.log("Got prevProps, prevState : ")
		console.log(prevProps)
		console.log(prevState)
		if (prevState.testId !== this.state.testId) {
		  let updateSateObj = {
			testId:this.state.testId,
			isLoaded: true
		  }
		  console.log("updateSateObj : ");
		  console.log(updateSateObj);
		  this.setState({updateSateObj})
		  this.setIFrame()
		}else{
		  console.log("No State update : ");
		}
	  }
	  
	  static getDerivedStateFromProps(nextProps, prevState){
		console.log('In ViewTestQuickJoin getDerivedStateFromProps()...');
		console.log("Got nextProps, prevState : ")
		console.log(nextProps)
		console.log(prevState)
		console.log("nextProps.id :")
		console.log(nextProps.id)
		if(nextProps.location.state.testId!==prevState.testId){
		  let returnNewValuesObj = {
			testId: nextProps.location.state.testId
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
      return <div><LoadingSpinner/></div>;
    }else{
      if(this.state.error != null){
        return <div> <h6 className="text-muted" ><i className="material-icons">error_outline</i> {this.state.error} </h6> </div>           
      }else{
        return(
          
          <>
                    
          <div >
            <div >
                          <Card>
                              <Row>
                                  <div className="navbar navbar-light bg-faded ">
                                      <Image src={logo} border="light" thumbnail style={{height:"75px"}}/>
                                  <hr />
                                  </div>
                              </Row>
                              <Card.Header>
                              
                              <Row className="mx-auto">
  
                                      <Col style={{maxWidth:'fit-content'}}>
                                          <div className="circular-portrait circular-portrait-feedbackForm">
                                              <Image src={this.state.studentData.imageUrl} />
                                          </div>
                                         
                                      </Col>
                                      <Col>
                                              <Row><h4 style={{marginLeft: "18px"}}>{this.state.studentData.firstName}  {this.state.studentData.lastName}</h4></Row>
                                              <Row><b><span style={{marginLeft: "18px"}}>{this.state.studentData.sapid}</span></b></Row>
                                              <Row>
                                                  <span style={{marginLeft: "18px"}}>{this.state.studentData.emailId}</span><span className="borderRight"></span>
                                                  <span style={{marginLeft: "18px"}}>{this.state.studentData.mobile}</span><span className="borderRight"></span>
                                                  <span style={{marginLeft: "18px"}}>{this.state.studentData.programForHeader}</span>
                                              </Row>
                                      </Col>
                                  
                              </Row>
                              
                              </Card.Header>
                              
                          
                          
                          <Card.Body> 
                              <Row>
                              <Col lg={7} sm={7} className="ml-4 mt-2">
                                   <h5> <span onClick={this.goToQuickJoin} style={{cursor : "pointer"}}  >Quick Join</span> >> Start Test</h5>      
                                   
                              </Col>
                              <Col lg={4} md = {4} sm={4} className="text-right" style={{marginLeft: 'auto',marginRight: 'auto'}}>
                                      <Button 
                                          onClick={this.goToHome}
                                          variant="primary" 
                                          style={{fontSize: "12px",marginTop:'10px'}} 
                                          size="lg">Go To Home Page</Button>                                                     
                                    
                              </Col>
                          </Row>
              <Row>
              <Col lg={12} sm={12} className="ml-4 mt-2"> 
          <Container fluid id="start-IA-container">
            
            <div className="iFrameContainer mt-1"> 
              <div className="h_iframe">
                  <iframe 
                    className="" 
                    src={this.state.iFrameUrl} 
                    frameborder="0"  
                    style={{
                      minHeight: '-webkit-fill-available'
                    }}
                  />
              </div>
              {/* <div   dangerouslySetInnerHTML = {{__html: this.state.iFrame}}  /> */}
            </div>
          </Container>
              </Col>
                            
              </Row>
                          </Card.Body>
  
                          </Card>
                          </div>
                          {/* <AppLozicChat parent={ this } /> */}
                          {/* {<QuickBlox sapid={this.props.data.sapid} firstName={this.props.data.firstName} lastName={this.props.data.lastName}/>} */}
                          </div>
      </>
        )
      }
    }
  }
}

const mapStateToProps = state => {
	return {
        sapId: state.sapId,
        student: state,        
    }
}

export default connect(mapStateToProps)(analyticsManager(ViewTestQuickJoin))