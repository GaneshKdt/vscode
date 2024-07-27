import React, { Component } from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
// import logo from './assets/logo/logo.jpg'
import logo from '../../components/LeftSideRootNavigationDrawer/assets/logo/logo.jpg';
import { analyticsManager } from '../../shared/Analytics';
import './TestIAQuickJoin.css';
import TestIAQuickJoinInfoRow from './TestIAQuickJoinInfoRow/TestIAQuickJoinInfoRow';
import Button from 'react-bootstrap/Button';
/* import AppLozicChat from '../../components/AppLozicChat/AppLozicChat' */
import '../../../src/ResponsiveContentForChat.css'
import ChatButton from '../../components/ChatButton/ChatButton';

class TestIAQuickJoin extends Component{ 
    state={
        testsToBeShownInQuickJoin :[],
        sapId:'',
        index : 0,
        studentData : this.props.data,
        status : '',
        displayError : 'none',
        skipAll : false,
    }
    componentDidMount(){
        
        /* window.$('.mck-close-sidebox').trigger( "click" ); */
        if(this.props.location.state && this.props.location.state.testsToBeShownInQuickJoin){
            this.setState({
                testsToBeShownInQuickJoin : this.props.location.state.testsToBeShownInQuickJoin
            })
        }

        this.props.dispatch({
            type:'IA_QUICK_JOIN_VIEWED',
            data:{
              viewedIAQuickJoin:"Yes"
            }
          });

        console.log(" TestIAQuickJoin componentDidMount() : data------",this.state.studentData);
    }

    addCompletedFeedback = (id) => {
        this.setState({
            complete: id
        })
    }
    getSuccessStatus = (status,sapId) =>{
        console.log("inside succ------------")
        this.setState({
            sapId : sapId,
            index : this.state.index + 1,
            status : status,
        },()=>{
            console.log("((((((((((((((((((((((",this.state)
            if(this.state.status === "error"){
                console.log("inside if 33333333333333"+"------"+this.state.testsToBeShownInQuickJoin.length)
                this.setState({
                    displayError : 'block',
                })
            }
            else{
                this.setState({
                    displayError : 'none',
                })
            }
            if(this.state.status === "skip"){
                this.setState({
                    skipAll : true,
                })
            }
        })
    }
    goToHome = () => {
        console.log("inside goToHome-----")
        this.props.history.push({pathname: '/timeline/home',state: { isHeaderRequired: true, isSideBarRequired  : true}})
   
    }

    handleTestIAQuickJoinRender(){
        console.log("inside render of router-------------",this.state.testsToBeShownInQuickJoin)
        if(this.state.testsToBeShownInQuickJoin.length > 0 && this.state.skipAll === false){
            var testsArray = this.state.testsToBeShownInQuickJoin;
                return (
                    <>
                    
        <div className="App">
          <div className="wrapper">
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
                                      <h5> Internal Assessment Quick Join</h5>
                                 
                            </Col>
                            <Col lg={4} md = {4} sm={4} className="text-right" style={{marginLeft: 'auto',marginRight: 'auto'}}>
                                    <Button 
                                        onClick={this.goToHome}
                                        variant="primary" 
                                        style={{fontSize: "12px",marginTop:'10px'}} 
                                        size="lg">Go To Home Page</Button>                                                     
                                  
                            </Col>
                        </Row>

                        {this.state.testsToBeShownInQuickJoin.map((test)=>{
                              return <> <TestIAQuickJoinInfoRow testsToBeShownInQuickJoin={this.state.testsToBeShownInQuickJoin}  
                              test={test} sapId={this.state.studentData.sapid}  studentData={this.state.studentData} /> </>
                        })}
                        </Card.Body>

                        </Card>
                        </div>
                        {/* <AppLozicChat parent={ this } /> */}
                        {/* {<SalesforceChat liveagent={window.liveagent} sapid={this.props.data.sapid} city={this.props.data.city} 
                            emailId={this.props.data.emailId} firstName={this.props.data.firstName} lastName={this.props.data.lastName} 
                            mobile={this.props.data.mobile} dispatch={this.props.dispatch}/>} */}
                        {/* {<QuickBlox sapid={this.props.data.sapid} firstName={this.props.data.firstName} lastName={this.props.data.lastName}/>} */}
                        <ChatButton liveagent={window.liveagent} sapid={this.props.data.sapid} city={this.props.data.city} emailId={this.props.data.emailId} 
                            firstName={this.props.data.firstName} lastName={this.props.data.lastName} mobile={this.props.data.mobile}
                            dispatch={this.props.dispatch}/>
                        </div>


                    </>
                )
            
            
        }
        if(this.state.status === 'skip' && this.state.skipAll === true){
            console.log("inside if 3333333333333333322222222")
            this.props.history.push({pathname: '/timeline/home',state: { isHeaderRequired: true, isSideBarRequired  : true}})
        }
        
    }

    render(){
        return(
            <>
            {this.handleTestIAQuickJoinRender()}
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

export default connect(mapStateToProps)(analyticsManager(TestIAQuickJoin))
// export default TestIAQuickJoin