import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import DemoExamHelper from '../../shared/Helpers/DemoExamHelper/DemoExamHelper';
import { Link } from 'react-router-dom';
import ConfigUrls from '../../shared/config';
const demoExamUrl = new ConfigUrls().api.demoExamUrl+"?sapid=";
class Utilities extends Component {
    state = {
        sapId : this.props.sapId,
        sessionPlanModuleData : this.props.sessionPlanModuleData,
        currentTimeboundId : this.props.currentTimeboundId,
        program : this.props.program,
		testDataLoaded: false,
		teeDataLoaded: false,
        noData : false,
        showError : false,
        errorMsg : 'Error in fetching Test Data, please try again later.',
        mettleDemoLinkDesc:"(one email-id can attempt the demo exam online once, use dummy email-ids to try the demo exam again)",
        sysCompCheckLink: "https://tests.mettl.com/system-check?i=db696a8e#/systemCheck",
        sysComCheckLinkDesc : "(mobile phones / tablets are not supported for Mettl exam)",
        showMettlDemoLink : true,
        showSysCheckLink: true
    }
    componentWillReceiveProps(nextProps){
        //Load on first load and on each time timebound id is changed
        console.log(" inside component will rece in sidebar comp**************")
        console.debug(nextProps, this.props)
		if(this.props.currentTimeboundId != nextProps.currentTimeboundId){
            this.setState({
                currentTimeboundId : nextProps.currentTimeboundId
            }, () =>{
                console.log("inside &&^&^&^&^&&&&&&&&&&&^^^^^^",this.state)
              
            })
			
        }
		this.props = nextProps
    } 
    

    makeMettlLinksLive = () =>{
        if(this.props.student.enrollmentMonth === "Oct" &&  this.props.student.enrollmentYear === "2019"){
            this.setState({
                showMettlDemoLink : true,
                showSysCheckLink : true,
            })
        }
    }
  
    componentDidMount(){
        console.log("inside todo component",this.state)
        this.makeMettlLinksLive();
    }

    demoTest = () => {
        // DemoExamHelper.startDemoExam(this.state.program)
        window.open(demoExamUrl+this.state.sapId, '_blank')
    }
  
    
    render() {
        return(
           
            <>
                          <Card style={{padding:'1rem'}}>
							
							
							{/* <Card.Body> */}
								<ListGroup variant="flush">
                                
                                 {/* if no test data */}
									{this.state.noData && this.state.noTeeData && !this.state.showError && !this.state.showMettlDemoLink && !this.state.showSysCheckLink? 
                                        <div> 
                                            <h6 className="text-muted text-center" >
                                                <FontAwesomeIcon  className="mr-2" icon="exclamation-circle"/> 
                                                No Work Due 
                                            </h6> 
                                        </div>
                                    :null} 
                                    {(this.state.showError && !this.state.noData) || (this.state.showTeeError && !this.state.noTeeData)   ? 
                                        <div>
                                            <h6 className="text-muted text-center" >
                                                <FontAwesomeIcon  className="mr-2" icon="exclamation-circle"/> 
                                                {this.state.errorMsg}
                                            </h6>
                                        </div>   
                                    :null}    
                                        
                                    {/* // if test data &&  --> */}
                                    
                                    
                                     {this.state.showSysCheckLink ? 
                                        <>
                                            
                                            <div className="container" >
                                            <Row>
                                                <Col lg={2} sm={1}>
                                                    <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"1%"}}>
                                                        <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                                                    </svg>
                                                </Col>
                                                <Col lg={10} sm={5}>
                                                    <a target="_blank" href={this.state.sysCompCheckLink} 
                                                    >Mettl System Compatibility Check
                                                    </a> 
                                                    <br/>
                                                        <small><b>{this.state.sysComCheckLinkDesc}</b> </small>
                                                    <br/>
                                                    
                                                </Col> 
                                            </Row> 
                                            </div>
                                        <br/>   
                                        </>
                                    :null} 
                                     {this.state.showMettlDemoLink ? 
                                        <>
                                            <div className="container" >
                                            <Row>
                                                <Col lg={2} sm={1}>
                                                    <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"1%"}}>
                                                        <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                                                    </svg>
                                                </Col>
                                                <Col lg={10} sm={5}>
                                                    
                                                        <Link onClick = {this.demoTest}>
                                                            Mettl Demo Exam 
                                                        </Link>
                                                        {/* <br/>  */}
                                                        {/* <small><b>{this.state.mettleDemoLinkDesc}</b> </small> */}
                                                    {/* <br/> */}
                                                    
                                                </Col>
                                            </Row>
                                            </div>

                                            <br/>   
                                        </>
                                    :null} 
							
							
						</ListGroup>
						{/* </Card.Body> */}
					</Card>  
           </> 
        )
    }

 }
 const mapStateToProps = state => {
	return {
        student: state,
        program: state.program,
        sapId : state.sapid,
        currentTimeboundId: state.currentTimeboundId,
        sessionPlanModuleData : state.sessionPlanData,
    }
}
export default connect(mapStateToProps)(Utilities)