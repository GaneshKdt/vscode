import React, { Component } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import bg from '../UserProfile/assets/images/cover/cover_image_in_Profile/cover_02.png'
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import   './Group.css';
import {analyticsManager} from '../../shared/Analytics';
import ConfigUrls from '../../shared/config';
import Timeline from '../Timeline/Timeline';
import TabGroupInfo from './TabGroupInfo';


import Nav from 'react-bootstrap/Nav'
const urls = new ConfigUrls().urls;

class Group extends Component{
	constructor(props) {
		super(props)

		// Sets up our initial state

		this.state = {
            group:null,
        }

    }   
    componentDidMount(){
        console.log("inside groups------------------",this.state)
        if(this.props.location.state !== undefined){
			console.log("inside component mount of groups--------"+JSON.stringify(this.props.location.state.group));
			this.setState({
				group : this.props.location.state.group,
            })
        }
    }
	
    render(){
        return(
            <Container fluid className="groups-container">
                {/* horizontal tab view */}
                {/* <Row>
                    <Col lg={10} md={8} sm={8}>
                            <Card >
                                <Card.Body>
                                {this.state.group ? 
                                    <Tabs defaultActiveKey="Posts" id="uncontrolled-tab-example" className="group-timeline-tab"> 
                                        <Tab eventKey="Posts" title="Posts" className="timeline-tab-groups">
                                            
                                            <Card className="timeline-card-groups">
                                                <Row>
                                                    <Col></Col>
                                                    <Col lg={8} > <Timeline timeBoundId ={this.state.group.timeBoundId} /> </Col>
                                                    <Col></Col>
                                                    </Row>
                                            </Card> 
                                            
                                            <br/>
                                            
                                        </Tab>
                                        <Tab eventKey="Group" title="Group Info"  className="timeline-tab-groups" >
                                            <TabGroupInfo group={this.state.group} /> 
                                                    
                                        </Tab>
                                        
                                    </Tabs>
                                : null}
                                
                            </Card.Body>
                        </Card>
                        
                    </Col>
                </Row> */}
                {/* vertical tab view */}
                <Row>
                    <Col  lg={9} md={8} sm={8}>
                        <Card>
                            <Card.Body className="notificationHeader">
                                Groups
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
                <br/>
                <Row>
                    <Col lg={10} md={8} sm={8}>
                    {this.state.group ? 
                        <Tab.Container id="left-tabs-example" defaultActiveKey="Posts">
                            <Row>
                                <Col lg={3}>
                                <Nav variant="pills" className="flex-column group-timeline-tab">
                                    <Nav.Item>
                                        <Nav.Link eventKey="Posts">Posts</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Group">Group Info</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                </Col>
                                <Col lg={7}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="Posts">
                                        <Card className="timeline-card-groups">
                                            <Row>
                                                <Col > <Timeline timeBoundId ={this.state.group.timeBoundId} /> </Col>
                                            </Row>
                                        </Card> 
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Group">
                                        <TabGroupInfo group={this.state.group} /> 
                                    </Tab.Pane>
                                </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    : null}
                    </Col>
                </Row>
            </Container>
    )
    }



}

export default analyticsManager(Group)