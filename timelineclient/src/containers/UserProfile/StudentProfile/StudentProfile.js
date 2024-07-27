import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import guy_1 from '../assets/images/people/110/guy01.jpg';
import logo2 from '../assets/images/images/cover/motivation.jpg'
import bg from '../assets/images/cover/background2.png'
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabBio from './TabBio';
import   './StudentProfile.css'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {analyticsManager} from '../../../shared/Analytics'
import profilePic from '../../Home/Assets/Default-Logo/admin.png'
import ConfigUrls from '../../../shared/config'
import Timeline from '../../Timeline/Timeline'
const urls = new ConfigUrls().urls;
const queryString = require('query-string')

class InstructorProfile extends Component{
	constructor(props) {
		super(props)

		// Sets up our initial state

		this.state = {
			studentData : null,
			userId : null,
            responseData : null,
            groups:null
        }

    }   

	componentDidMount(){
		if(this.props.location.state !== undefined){
			console.log("inside component mount of instructor--------"+JSON.stringify(this.props.location.state.userId));
			this.setState({
				userId : this.props.location.state.userId,
			})
			var studentUserId = "";
			if(this.state.userId === null){
				studentUserId = this.props.location.state.userId;
			}
			else{
				studentUserId = this.state.userId;
			}
			axios.defaults.headers.post['Content-Type'] = false;
			axios.post(urls.apiUrl_ltiDemo + 'getStudentProfileInfo',{
				sapid : this.props.location.state.userId
			}
			).then(response =>{ 
                console.log("******************************** student data=");
                console.log(response)
				this.setState({
                    studentData:response.data.student,
                    groups:response.data.groupsForStudentBySubjectId
                   
                })
                console.log(response.data.groupsForStudentBySubjectId)
			}).catch(function(error){
				console.log(error);
			})
		}

        let urlId = queryString.parse(this.props.location.search).id

		if(urlId !== undefined){
			this.setState({
				userId : urlId,
			})
			var studentUserId = "";
			if(this.state.userId === null){
				studentUserId = urlId;
			}
			else{
				studentUserId = this.state.userId;
			}
			axios.defaults.headers.post['Content-Type'] = false;
			axios.post(urls.apiUrl_ltiDemo + 'getStudentProfileInfo',{
				sapid : urlId
			}
			).then(response =>{ 
                console.log("******************************** student data=");
                console.log(response)
				this.setState({
                    studentData:response.data.student,
                    groups:response.data.groupsForStudentBySubjectId
                   
                })
                console.log(response.data.groupsForStudentBySubjectId)
			}).catch(function(error){
				console.log(error);
			})
		}
	}
    render(){
        return(
            <Container fluid className="instructor-container">
			<Row>
              <Col md={10} >
                    <Card >
					<img alt="" src={bg} style={{height: '300px' }}/>
						<Card.Body>
							
								<div className="d-flex">
									{this.state.studentData !== null && this.state.studentData.imgUrl !== "NULL" ? 
										<Image alt="" className="rounded-circle img-thumbnail profileNamepic" height="150px" width="150px" src={this.state.studentData.imageUrl} style={{marginTop: '-12%'}}/> 
									:
										<Image variant="top" src={profilePic} className="pro_pic" />
									}
									{this.state.studentData !== null ? 
										<span><h4 className="student-name">{this.state.studentData.firstName} {this.state.studentData.lastName}</h4></span> 
										: null} 
							    </div>
								
							
						<hr/>
						{this.state.studentData !== null ? 
							<Tabs defaultActiveKey="Profile" id="uncontrolled-tab-example" className="instructor-tab">
                                <Tab eventKey="Profile" title="Profile" >
									<TabBio studentData={this.state.studentData} groups={this.state.groups}/>
								</Tab>
								<Tab eventKey="Timeline" title="Timeline" className="timeline-tab">

								    
									<br/>
                                    <div> <h6 className="text-muted text-center" ><i className="material-icons">error_outline</i> No Feeds. </h6> </div> 
									
								</Tab>
								
							</Tabs>
						: null}
						
					</Card.Body>
				</Card>
			      
              </Col>
			</Row>
    </Container>
    )
    }



}

export default analyticsManager(InstructorProfile)