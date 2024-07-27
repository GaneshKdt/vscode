import React, { Component } from 'react';
import ConfigUrls from '../../shared/config';
import './SessionFeedbackForm.css';
import SessionFeedbackForm from './SessionFeedbackForm';
import {connect} from 'react-redux';
import NavDropdown from 'react-bootstrap/NavDropdown'
import NavItem from 'react-bootstrap/NavItem'
import Dropdown from 'react-bootstrap/Dropdown'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavLink from 'react-bootstrap/NavLink'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav'
import Badge from 'react-bootstrap/Badge';
// import logo from './assets/logo/logo.jpg'
import logo from '../../components/LeftSideRootNavigationDrawer/assets/logo/logo.jpg'; 
import Alert from 'react-bootstrap/Alert';
import { analyticsManager } from '../../shared/Analytics';


class SessionFeedbackRouter extends Component{ 
    state={
        pendingFeedbackData :[],
        sapId:'',
        index :0,
        show:false,
        studentData : this.props.data,
        status : '',
        displayError : 'none',
        skipAll : false,
    }
    componentDidMount(){
        if(this.props.location.state && this.props.location.state.pendingFeedbackData){
            this.setState({
                pendingFeedbackData : this.props.location.state.pendingFeedbackData,
                index:this.props.location.state.indexvalue,
            })
        }
        if(this.props.location.state.show===true)
        {
            this.setState({
                show:true
            })
        }
    }

    addCompletedFeedback = (id) => {
        this.setState({
            complete: id
        })
    }
    getSuccessStatus = (status,sapId,currentIndex, pendingFeedback) =>{

        this.setState({
            sapId : sapId,
            index : 0,
            status : status,
        },()=>{
            console.log("((((((((((((((((((((((",this.state)
            if(this.state.status === "error"){
               //console.log("inside if 33333333333333"+"------"+this.state.pendingFeedbackData.length)
                this.setState({
                    displayError : 'block',
                })
            }
            else{
                if(this.state.pendingFeedbackData.length > 1){

                   let tempList=[]
                this.state.pendingFeedbackData.map((element, index)=>{
                    if(currentIndex!=index){
                        tempList.push(element)
                    }
                })

                this.setState({
                    pendingFeedbackData : tempList,
                    
                    displayError : 'none',
                })
                }else if(this.state.pendingFeedbackData.length == 1){
                    this.props.history.push({pathname: '/timeline/home',state: { isHeaderRequired: true, isSideBarRequired  : true}})
                }
            }
            if(this.state.status === "skip"){
                this.setState({
                    skipAll : true,
                })
            }
        })
    }

    handleFeedbackFormRender(index){
        // console.log("inside render of router-------------",this.state.pendingFeedbackData)
        // console.log(this.state.pendingFeedbackData.length)
        if(this.state.pendingFeedbackData.length > 0 && this.state.skipAll === false){
            var pendingArr = this.state.pendingFeedbackData;
            if(index<pendingArr.length){
                return (
                    <>
                        <Card style={{marginLeft:"20%"}}>
                            <Row>
                                {/* <Image src={logo} style={{width:"150px" ,height:"150px"}} /> */}
                                <div className="navbar navbar-light bg-faded ">
                                    <Image src={logo} border="light" thumbnail style={{height:"75px"}}/>
                                <hr />
                                </div>
                            </Row>
                            <Card.Header>
                                <Row className="mx-auto">
                                {/* <Col lg={{ span: 7 }} sm={{ span: 12 }} xs={{ span: 12 }} > */}
                                {/* <Nav > */}
                                {/* <Dropdown as={NavItem} alignRight id="collasible-nav-dropdown">
                                    <Dropdown.Menu>
                                    <Dropdown.Toggle as={NavLink} className="d-flex">
                    
                                        <div className="circular-portrait">
                                        <Image src={this.state.studentData.imageUrl} />
                                        </div>
                                        <div class="settings-arrow"><FontAwesomeIcon icon="angle-down" />
                                        </div> 
                                    </Dropdown.Toggle> */}

                                    <Col style={{maxWidth:'fit-content'}}>
                                        <div className="circular-portrait circular-portrait-feedbackForm">
                                            <Image src={this.state.studentData.imageUrl} />
                                        </div>
                                       
                                    </Col>
                                    <Col>
                                            <Row><h4 style={{marginLeft: "18px"}}>{this.state.studentData.firstName}  {this.state.studentData.lastName}</h4></Row><br/><br/>
                                            <Row><b><span style={{marginLeft: "18px"}}>{this.state.studentData.sapid}</span></b></Row>
                                            <Row>
                                                <span style={{marginLeft: "18px"}}>{this.state.studentData.emailId}</span><span className="borderRight"></span>
                                                <span style={{marginLeft: "18px"}}>{this.state.studentData.mobile}</span><span className="borderRight"></span>
                                                <span style={{marginLeft: "18px"}}>{this.state.studentData.programForHeader}</span>
                                            </Row>
                                            {/* <Row><span>{this.state.studentData.mobile}</span></Row>
                                            <Row><span>{this.state.studentData.programForHeader}</span></Row> */}
                                            
                                    </Col>
                                    {/* <Col>
                                    <span>{this.state.studentData.emailId}</span></Col> */}
                                        {/* <div class="settings-arrow"><FontAwesomeIcon icon="angle-down" />
                                        </div>  */}
                                        {/* <Col> */}
                                            {/* <LinkContainer to="/timeline/publicProfile">
                                                <Nav.Link active={false} className="">
                                                    <FontAwesomeIcon style={{alignSelf:"center"}} className = "fa headerNav" icon="user-edit"/>       
                                                    <div className="headerNav">
                                                        Notifications
                                                    </div>
                                                </Nav.Link>
                                            </LinkContainer> */}


                                            {/* <LinkContainer to="/timeline/notificationsAnnouncements">
                                                <Nav.Link active={false} className="dark-text hover-light headerIcon">
                                                    <div class="nav-icon-container" style={{position: "relative"}}>
                                                    <Badge variant="danger" pill style={{position:"absolute", top:"-10%", right:"20%"}}>
                                                        {this.state.notificationCount}
                                                    </Badge>
                                                    <FontAwesomeIcon className = "fa headerNav" icon="bullhorn"/>
                                                    <div className="dark-text hover-light headerIcon headerNav">
                                                        Notifications
                                                    </div>
                                                    </div>
                                                </Nav.Link>
                                            </LinkContainer>
                                        </Col>
                                        <Col>
                                            <LinkContainer to="timeline/logout">
                                                <Nav.Link active={false} className="dark-text hover-light headerIcon">
                                                    <FontAwesomeIcon className = "fa headerNav" icon="sign-out-alt"/>       
                                                    <div className="dark-text hover-light headerIcon headerNav">
                                                        Logout
                                                    </div>
                                                </Nav.Link>
                                            </LinkContainer>
                                        </Col> */}


                                        {/* <LinkContainer to="/timeline/logout">
                                            <Dropdown.Item>
                                                <small>
                                                <FontAwesomeIcon className = "fa mr-2" icon="sign-out-alt"/>
                                                </small>
                                                Logout
                                            </Dropdown.Item>
                                        </LinkContainer>

                                        <Dropdown.Divider /> */}

                                        {/* <LinkContainer to="/timeline/logout">
                                            <Dropdown.Item>
                                                <small>
                                                <FontAwesomeIcon className = "fa mr-2" icon="sign-out-alt" />
                                                </small> 
                                                Logout
                                            </Dropdown.Item>
                                        </LinkContainer> */}
                                    {/* </Dropdown.Menu>
                                    </Dropdown> */}
                                    {/* </Nav> */}
                                {/* </Col> */}
                                
                            </Row>
                            </Card.Header>
                            <Alert variant="danger" style={{display : this.state.displayError}}>
                                    Error in submitting feedback.
                            </Alert>
                        </Card>
                          
                        <SessionFeedbackForm show={this.state.show} pendingFeedbackData = {this.state.pendingFeedbackData[index]} studentData={this.state.studentData} onComplete={this.getSuccessStatus} pendingFeedbacks={this.state.pendingFeedbackData} currentIndex={index}/>
                        
                        
                    </>
                )
            }
            // if(pendingArr.length == 0){
            //     console.log("inside if 2222222222222"+index+"------"+this.state.pendingFeedbackData.length)
            //     // this.props.history.push('/timeline/login?sapid='+ this.state.sapId);
            //     this.props.history.push({pathname: '/timeline/home',state: { isHeaderRequired: true, isSideBarRequired  : true}})
            // }
            
            
        }
        if(this.state.status === 'skip' && this.state.skipAll === true){
            // console.log("inside if 3333333333333333322222222")
            this.props.history.push({pathname: '/timeline/home',state: { isHeaderRequired: true, isSideBarRequired  : true}})
        }
        
    }

    render(){
        return(
            <>
            {this.handleFeedbackFormRender(this.state.index)}
            </>
        )
    }
}

const mapStateToProps = state => {
	return {
		// sapId: state.sapid,
		data:state
	}
}

export default connect(mapStateToProps)(analyticsManager(SessionFeedbackRouter))
// export default SessionFeedbackRouter