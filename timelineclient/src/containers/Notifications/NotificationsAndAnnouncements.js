import React, { Component } from 'react';
 
import {connect} from 'react-redux';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import MyAnnouncementTable from "./Announcements/MyAnnouncementTable";
import "./Notifications.css";
import ConfigUrls from '../../shared/config'
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {analyticsManager} from '../../shared/Analytics'
import NewAnnouncementComponent from './Announcements/NewAnnouncementComponent';
import Row from 'react-bootstrap/Row'

const urls = new ConfigUrls().urls;
class Notifications_new extends Component{

    state={
        sapId:this.props.sapId,
        responseData: null,
       
    }

    componentDidMount(){
        console.log("userid-"+this.state.sapId)
		axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
        axios.post(urls.apiUrl_announcement+"/getAllStudentAnnouncements",
            JSON.stringify({ 
                userId : this.state.sapId,
                currentSemPSSId : []
            })
        ).then(response => {
        // console.log("****************"+JSON.stringify(response));
        this.setState({
            responseData : response.data
        });
        // console.log("responseData---in notification NEW===="+JSON.stringify(this.state.responseData));
        }).catch(function(error){
        console.log(error);
        })
    }

    
    
    render(){
            // console.log("inside render--**************"+JSON.stringify(this.state.responseData));
            return(
                <Row  className="marginRightForChatNoti">
                <Col>
                    {/* <Card className="marginForTabs"> */}
                        {/* <Card.Body id="notificationNavbar_1"> */}
                                {/* <Card.Header><h5>Announcements</h5></Card.Header> */}
                                {/* <Card.Img></Card.Img> */}
                                {/* Folowing commented block required for future dev */}
                                {/* <Tabs defaultActiveKey="Announcements" id="Announcements" className="marginForTabs tabCss">
                                    
                                    <Tab eventKey="Notifications" title="Notifications">
                                        <Card >
                                            <h5 className="card-title" >Your Notification</h5>
                                            
                                        </Card>
                                    </Tab>
                                    <Tab eventKey="Announcements" title="Announcements"> */}
                                        {this.state.responseData !== null ? 
                                        <>
                                            {this.state.responseData.length !== 0 ? 
                                                // <MyAnnouncementTable data={this.state.responseData} />
                                                <NewAnnouncementComponent data={this.state.responseData} />
                                            :
                                           
                                                <Card style={{height : '200px', textAlign : 'center'}}>
                                                    <Card.Text><h5 style={{marginTop: '50px'}}><FontAwesomeIcon icon="exclamation-circle"/>&nbsp;&nbsp;&nbsp;No Announcements to Display.</h5></Card.Text>
                                                </Card>
                                            
                                            }
                                        </>
                                        :<LoadingSpinner />}
                                            
                                    {/* </Tab>
                                </Tabs> */}
                        {/* </Card.Body> */}
                    {/* </Card> */}
                </Col>
                </Row>
                
            )
       
                       
    }
}



const mapStateToProps = state => {
	return {
		sapId: state.sapid
	}
}

export default connect(mapStateToProps)(analyticsManager(Notifications_new))
