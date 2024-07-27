import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import ConfigUrls from '../shared/config'
import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner'
import { confirmAlert } from 'react-confirm-alert'
import TestDataHelper from '../shared/Helpers/TestDataHelper'

const queryString = require('query-string')

const urls = new ConfigUrls().urls;
const api = new ConfigUrls().api;
export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sapId : "",
            password : "app@ngasce20",
            isLoaded : false
        }
    }

    componentWillMount(){
        //End previous session.
        this.props.dispatch({
            type:'USER_LOGOUT',
            data:""
        });
    }

    handleSubmit = (sapid) => {
      
        
        // Commenting below links and taking data from state for now. 
        //e.preventDefault();
        // const username = this.getUserName.value;
        // const password =  this.getPassword.value;

        let username = sapid;
        let password =  this.state.password;

        //alert(username+""+password)


        const data ={
            userId:username,
            password:password
        }
        console.log('---------------> submit CAlled')
        console.log(data)
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_studentPortals + "authenticate", 
            JSON.stringify({
                "userId":data.userId,
                "password":data.password
            })

        ).then(response => {
            console.log("after authentication:");
            console.log(response.data);
            var student =response.data;

            //Check if IE or Edge Start
            try { 
                eval("var foo = (x)=>x+1");
                // Opera 8.0+

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;
            
                if(isIE || isEdge ){
                    throw "Outdated Web browser!";
                }
 
            } catch (e) {
                confirmAlert({
                    title: 'Update/Change Web Browser',
                    message: 'You are using an outdate web browser. For seamless experience in IA Tests, Session Joining, etc. Please use chrome (Version 51 and above). ',
                    buttons: [
                    {
                        label: 'Ok, I will download/update Chrome and try again!',
                        onClick: () => {
                            window.location.assign("https://www.google.com/intl/en_uk/chrome/")
                        },
                    },{
                        label: 'No, Continue Anyway.',
                        onClick: () => {
                            //do nothing
                        }
                    }
                    ]
                });
            }
             //Check if IE or Edge End

            this.props.dispatch({
                type:'Authenticated',
                data:student});
                    axios.defaults.headers.post['Content-Type'] = 'application/json';
                    axios.post(urls.apiUrl_ltiDemo + "/checkStudentType", 
                    JSON.stringify({
                            "userId": data.userId
                        })
                    ).then(response => {
                        // redirect
                        
                        //check for louConfirmed status
                        this.checkLOUConfirmed(sapid);

                    }).catch(function (error) { 
                        window.location.assign(urls.baseUrl + "logout")
                    })
        }).catch(function (error) {
            window.location.assign(urls.baseUrl + "logout")
        })
	}

    checkLOUConfirmed=(sapid)=>{
        axios.defaults.headers.post['Content-Type']="application/json";
        axios.post(api.checklouConfirmed,JSON.stringify({"sapid":sapid}))
        .then(response=>{
            if(response.data.louConfirmed==="false"){
                this.props.history.push({pathname: '/timeline/LOUForm'});
            }else{
                this.checkForUpcomingTestsFromCache(sapid);
            }
        }).catch(error => {
            this.checkForUpcomingTestsFromCache(sapid);
        })
        
    }

    checkForUpcomingTestsFromCache = (sapid) => {
                                
        console.log("checkForUpcomingTestsFromCache api------***"+api.getUpcomingTestsFromCache)
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(api.getUpcomingTestsFromCache , 
            JSON.stringify({
                "sapid": sapid
            })
        ).then(response => {
            console.log("response of getUpcomingTestsFromCache--"+JSON.stringify(response))
            if(Object.entries(response.data).length !== 0){
                console.log("inside getUpcomingTestsFromCache-----if-----")
                let upcomingTestsFromCache = response.data;
                console.log("upcomingTestsFromCache : ",upcomingTestsFromCache);
                let testsToBeShownInQuickJoin = [];
                
                upcomingTestsFromCache.map((upComingTest)=>{
                    if(TestDataHelper.CheckIfIATestIsActive(upComingTest)){
                        testsToBeShownInQuickJoin.push(upComingTest);
                    }
                                
                });
                 
                console.log("testsToBeShownInQuickJoin : ",testsToBeShownInQuickJoin)
                
                if(testsToBeShownInQuickJoin.length > 0){
                    this.props.history.push({pathname: '/timeline/testIAQuickJoin',state: { testsToBeShownInQuickJoin: testsToBeShownInQuickJoin}})
                }else{
                    this.checkForSessionFeedbacks(sapid);
                }
            
            }
            else{
                this.checkForSessionFeedbacks(sapid);
            }
        }).catch(error => {
            console.log("response of getUpcomingTestsFromCache--error : ",error)
            this.checkForSessionFeedbacks(sapid);
        })
        
        }
    
        
                        //get session feedbackdata start-----------------------------------------------------
                        checkForSessionFeedbacks = (sapid) => {
                            
                            console.log("api------***"+api.getSessionFeedback)
                            axios.defaults.headers.post['Content-Type'] = 'application/json';
                            axios.post(api.getSessionFeedback , 
                            // axios.post("http://localhost:8080/studentportal/m/feedbackCheck" , 
                                JSON.stringify({
                                    "sapId": sapid
                                    // "sapId": '77218673919'
                                })
                            ).then(response => {
                                //if pending sessions found, redirect to session feedback, hide header and sidebar
                                console.log("response of feedback--"+JSON.stringify(response))
                                if(response.data.pendingFeedback && response.data.pendingFeedback.length > 0){
                                    console.log("inside session feedback-----if-----")
                                    this.props.history.push({pathname: '/timeline/sessionFeedback',state: { indexvalue:0,pendingFeedbackData: response.data.pendingFeedback, isHeaderRequired: false, isSideBarRequired  : false}})
                                }
                                else{
                                    //else redirect to home
                                    console.log("inside session feedback-----else-----")
                                    this.props.history.push({pathname: '/timeline/home',state: { isHeaderRequired: true, isSideBarRequired  : true}})
                                }
                            }).catch(error => {
                                console.log("response of feedback--error"+JSON.stringify(error))
                                this.props.history.push({pathname: '/timeline/home',state: { isHeaderRequired: true, isSideBarRequired  : true}})
                            })
                            
                            }
                            //get session feedbackdata end---------------------------------------------
    

    componentDidMount(){
        console.log('In Login componentDidMount()...');
        let sapid = queryString.parse(this.props.location.search).sapid
        //alert(sapid)
        

        // this.setState({
        //     sapId : sapid
        // })
        
        // alert(this.state.sapId)
        this.handleSubmit(sapid);
    
    }
    
    render() {
        return (
            <Container className="justify-content-lg-center">
              {
                this.state.isLoaded != true 
                ? <div className ="">
                    <LoadingSpinner />
                </div>
                :  
              
                <Row>
                    <Col md={{ span: 4, offset: 2 }}>
                    <Card > 
                        <Card.Header >
                            <Col ><img class="logo-size" src="http://studentzone-ngasce.nmims.edu/studentportal/assets/images/logo.png" alt=""/></Col><br/>
                            <Card.Title> Login </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group >
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon="user-circle"/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text"  id="username" placeholder="Enter email" ref={(input)=>this.getUserName = input} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group >
                                <InputGroup>  
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon="key"/></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password"  id="password" placeholder="Password" ref={(input)=>this.getPassword = input}/>
                                    </InputGroup>
                                </Form.Group>

                                <Button type="submit" block>Login</Button>

                                <Card.Link href="#">Forgot Password?</Card.Link>

                            </Form>
                        </Card.Body>
                        
                        <Card.Footer>
                            Not yet a student?<Card.Link href="#">Sign up</Card.Link>
                        </Card.Footer>
                    </Card>
                    </Col>
                   
                </Row>
              }
          </Container>
        )
    }
}

export default withRouter(connect()(Login))