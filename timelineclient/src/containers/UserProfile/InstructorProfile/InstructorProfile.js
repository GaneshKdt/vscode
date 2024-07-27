import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import guy_1 from '../assets/images/people/110/guy01.jpg';
import logo2 from '../assets/images/images/cover/motivation.jpg'
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabBio from './TabBio';
import InstructorProfile_CSS from './InstructorProfile.css'
import TabExpertise from './TabExpertise';
import TabContact from './TabContact';
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
			facultyData : null,
			facultyId : null,
			responseData : null,

        }

    }   

	componentDidMount(){
		if(this.props.location.state !== undefined){
			console.log("inside component mount of instructor--------"+JSON.stringify(this.props.location.state.userId));
			this.setState({
				facultyId : this.props.location.state.userId,
			})
			var facultyUserId = "";
			if(this.state.facultyId === null){
				facultyUserId = this.props.location.state.userId;
			}
			else{
				facultyUserId = this.state.facultyId;
			}
			axios.defaults.headers.post['Content-Type'] = false;
			axios.post(urls.apiUrl_web_studentPortal + 'getFacultyDetails',{
				userId : facultyUserId
			}
			).then(response =>{
				console.log("********************************",response);
				this.setState({
					facultyData : response.data,
				})
			}).catch(function(error){
				console.log(error);
			})
		}

		let urlId = queryString.parse(this.props.location.search).id;
		if(urlId !== undefined){
			console.log("inside component mount of instructor--------"+JSON.stringify(urlId));
			this.setState({
				facultyId : facultyUserId,
			})
			var facultyUserId = "";
			if(this.state.facultyId === null){
				facultyUserId = urlId;
			}
			else{
				facultyUserId = this.state.facultyId;
			}
			axios.defaults.headers.post['Content-Type'] = false;
			axios.post(urls.apiUrl_web_studentPortal + 'getFacultyDetails',{
				userId : urlId
			}
			).then(response =>{
				console.log("********************************",response);
				this.setState({
					facultyData : response.data,
				})
			}).catch(function(error){
				console.log(error);
			})
		}
	}
    render(){
        return(
            <Container  className="instructor-container">
			<Row>
              <Col md={10} >
                    <Card >
						<Card.Body>
							<Row className="bg">
								<Col >
								<div className="d-flex">
									{this.state.facultyData !== null && this.state.facultyData.imgUrl !== "NULL" ? 
										<Image variant="top" src={"https://studentzone-ngasce.nmims.edu/"+this.state.facultyData.imgUrl} className="pro_pic"/>
									:
										<Image variant="top" src={profilePic} className="pro_pic" />
									}
									{this.state.facultyData !== null ? 
										<span><h4 className="instructor-name">Prof. {this.state.facultyData.firstName} {this.state.facultyData.lastName}</h4></span> 
										: null} 
							    </div>
								
								</Col>
							</Row>
						<hr/>
						{this.state.facultyData !== null ? 
							<Tabs defaultActiveKey="Timeline" id="uncontrolled-tab-example" className="instructor-tab">
								<Tab eventKey="Timeline" title="Timeline" className="timeline-tab">

								    <div className="timeline"> 
									<br/>
									<Timeline  facultyId={this.state.facultyData.facultyId}  postType="All"/>
									</div>
									
								</Tab>
								<Tab eventKey="Profile" title="Profile" >
									<TabBio facultyData={this.state.facultyData}/>
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