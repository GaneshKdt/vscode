import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import axios from 'axios';
import ConfigUrls from '../../../shared/config'
import InstructorProfile from './InstructorProfile';
import Timeline from '../../Timeline/Timeline'
import { analyticsManager } from '../../../shared/Analytics';
const urls = new ConfigUrls().urls;

export class InstructorProfileNew extends Component {
	
	componentDidMount(){
		
		
}

constructor(props) {
	super();

	this.state = {
		// Takes active tab from props if it is defined there
		activeTab: props.activeTab || 1,
		facultyId:"",
		loadFaculties:null,
		data:null,
		firstName:""
	};
	this.loadFacultyDetails = this.loadFacultyDetails.bind(this);
	this.handleSelect = this.handleSelect.bind(this);
}
static getDerivedStateFromProps(nextProps, prevState){
	prevState.facultyId=nextProps.location.state.userId
	return prevState
}
componentDidMount(){
	this.setState({
		facultyId:this.props.location.state.userId
	})
	this.loadFacultyDetails()
}
 loadFacultyDetails=()=>{
	var element =this;
		
			axios.defaults.headers.post['Content-Type'] = 'application/json';
			axios.post(urls.apiUrl_web_studentPortal + "/getFacultyDetails",
				JSON.stringify({ 
					userId : this.state.facultyId
			})
			).then(function(response){
				element.setState({
					data: response.data,
					
				})
				
				console.log("faculty details")
				console.log(element.state)
			}).catch(function(error){
		console.log(error);
			})
	

	
}

	
	render() {
		const {
			data,
			facultyId
		}=this.state
    return (
		this.state.data &&
      <div>
        <Row>
            <Col xs={4} md={2}>
               Side Drawer
            </Col>
            <Col xs={10} md={7}> 
                <Row>
                    <Col md={12}> 
                        <Card>
                            <Card.Header>
                                <Image src="http://10.100.64.78:8080/ltidemo/assets/images/cover/Logo2.jpg"  />
                            </Card.Header>
                            <Card.Body>
                                <Image src={urls.baseUrl+data.imgUrl} roundedCircle  style ={{marginTop:'-330px',marginLeft:'20px', height:'200px', width:'200px' }} />
                                <Row>
																	<section>
                                 	<Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
																			<Tab eventKey={1} title="Timeline">
																			<br />
																			<Timeline facultyId={facultyId}  postType="All"/>
																			
																			
																			</Tab>
																			<Tab eventKey={2} title="About">
																			<br />
																			<h3>About Prof. {data.firstName} {data.lastName}</h3><hr />
			  <h5>
			  	Rating : 4
						<span style ={{color: '#FFDF00'}}>
							<i className="fas fa-star"></i>
							<i className="fas fa-star"></i>
							<i className="fas fa-star"></i>
							<i className="fas fa-star"></i>
							<i className="far fa-star"></i>
						</span>
			  </h5><br />
			  <h5><i className="fas fa-book-reader mr-2 align-self-center"></i> Expert In</h5><hr />
			  <i className="fas fa-book mr-2 align-self-center"></i>Business Finance<br />
			  <i className="fas fa-book mr-2 align-self-center"></i>Brand Management<br />
			  <i className="fas fa-book mr-2 align-self-center"></i>Business Finance<br />
			  <br />
			  <h5>Summary</h5><hr />
			  <p>{data.facultyDescription}</p>
																			
																			</Tab>
																			<Tab eventKey={3} title="More">
																			<br />
																				More
																			</Tab>
																	</Tabs>
																	</section>
                                </Row>    
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
      </div>
    )
	}
	
	handleSelect(selectedTab) {
    // The active tab must be set into the state so that
    // the Tabs component knows about the change and re-renders.
    this.setState({
      activeTab: selectedTab
    });
	}
}

export default analyticsManager(InstructorProfileNew)
