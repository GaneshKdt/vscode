import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import UpcomingSideBar from './UpcomingSideBar/UpcomingSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'material-design-icons'
import './Home.css'
// import ChatBar from './ChatBar/ChatBar'
import axios from 'axios'  
import Card from 'react-bootstrap/Card'
import ConfigUrls from '../../shared/config'
import Col from 'react-bootstrap/Col'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import {analyticsManager} from '../../shared/Analytics'
import StickyElement from '../../components/StickyElement/StickyElement';
import Timeline from '../Timeline/Timeline'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const urls = new ConfigUrls().urls;
const listposts = new ConfigUrls().api.listposts;
const queryString = require('query-string')

class Home extends Component {

	constructor(props) {
		super(props)
		// Sets up our initial state
		this.state = {
			error: false,
			isLoading: false,
			data: null,
			serverPath: null,
			student: this.props.data,
			isGotCurrentTimeboundId: false,
			keyword:null,
			timeBoundId:this.props.data.currentTimeboundId,
			faculties:[],
			showActiveSubjects:true,
			post_id:""
		}
		this.filterByActiveSubject = this.filterByActiveSubject.bind(this)
		this.loadFaculties=this.loadFaculties.bind(this)		
	}



	componentWillReceiveProps(nextProps) { 
        this.props = nextProps
		 this.setState({
			showActiveSubjects:true
		})

    //parameters for filter timeline
	var keyword = (
		this.props.location.searchParams ? 
			(this.props.location.searchParams.keyword ? this.props.location.searchParams.keyword : "")
		: ""
	)
	var facultyName = (
		this.props.location.searchParams ? 
			(this.props.location.searchParams.facultyName ? this.props.location.searchParams.facultyName : "")
		: ""
	)
	var facultyId = (
		this.props.location.searchParams ? 
			(this.props.location.searchParams.facultyId ? this.props.location.searchParams.facultyId : "")
		: ""
	) 
	var fileType = (
		this.props.location.searchParams ? 
			(this.props.location.searchParams.fileType ? this.props.location.searchParams.fileType : "")
		: ""
	)
	this.setState({
		facultyId:facultyId,
		facultyName:facultyName,
		fileType:fileType,
		keyword:keyword
	})
	var post_id = queryString.parse(this.props.location.search).post_id
	
	if(post_id !== undefined){
		this.setState({
			post_id : post_id
		})
	}	
	var timeBoundId =(this.state.showActiveSubjects)?this.props.currentTimeboundId:0
	this.loadFaculties();
	} 
	
	componentWillMount() {
		this.loadFaculties(); 
	}

//get faculties to show in filter
	loadFaculties=()=>{
				axios.defaults.headers.post['Content-Type'] = 'application/json';
				axios.post(urls.apiUrl_ltiDemo + "/facultyByTimeboundId", 
					JSON.stringify({
						"timeBoundId":this.props.currentTimeboundId,
						"sapid" : this.props.sapId
					})
				).then(response => {
					console.log("loaded faculties-------->"); 
					console.log(response.data.faculties);
					this.setState({
						showFacultyListForFilter:true,
						faculties: [...response.data.faculties]
					})
					console.log("state after fac load")
					console.log(this.state)
				}).catch(function (error) { 
					//alert("couldnot load faculties"); 
				})

	}


	filterPostByFaculty=(facultyId,facultyName)=>{
		console.log("after filtering by faculty")
		console.log(this.state)
		this.props.history.push({
			pathname: '/timeline/home',
			//use search params to add parameters to this search.
			searchParams: { 
			  facultyId: facultyId,
			  facultyName: facultyName
			}
		  }) 
	}

	searchPostByFileType=(key)=>{
		this.props.history.push({
		  pathname: '/timeline/home',
		  //use search params to add parameters to this search.
		  searchParams: { 
			fileType: key
		  }
		}) 
	}  
	    
	filterByActiveSubject=(e)=>{
		if(e.target.checked){
			this.setState({
				timeBoundId:this.props.data.currentTimeboundId,
				listOfPosts: [],
				page:1,
				showActiveSubjects:true
			})
		}else{
			this.setState({
				timeBoundId:0,
				listOfPosts: [],
				page:1,
				showActiveSubjects:false
			})
		}
		//this.loadPosts()
	} 
	closeSearch=()=>{
		this.props.history.push({
			pathname: '/timeline/home',
			//use search params to add parameters to this search.
			searchParams: { 
			  keyword: null
			}
		  })
	} 
	setSelectedTab = (tab) =>{
		this.setState({
			selectedClass: tab
		})
	}
	render() {
		const {
			error,
			hasMore,
			isLoading,
			listOfPosts,
			serverPath,
			keyword,
			student,
			showFacultyListForFilter,
			faculties,
			facultyName,
			facultyId,
			fileType,
			showActiveSubjects
		} = this.state;
		
	var fileTypeSet=[ 
		{icon:"images",name:"Image",iconClass:"far"},
		{icon:"file-video", name:"Video",iconClass:"far"},
		{icon:"file", name:"File",iconClass:"far"},
		{icon:"file-alt", name:"Text",iconClass:"far"},
		{icon:"link", name:"Link",iconClass:"fas"},
		{icon:"bullhorn",name:"Announcement",iconClass:"fas"},
		{icon:"tasks", name:"Assignment",iconClass:"fas"},
		{icon:"play-circle", name:"Session",iconClass:"far"},
		{icon:"book-open", name:"Resource",iconClass:"fas"}
	]
	console.log("faculties before render")
	console.log(faculties)
			return (
					<Container id="home-container" className={ this.state.selectedClass ? this.state.selectedClass  : 'Feed timelineSidebar' }>
						<Row>
							<Col lg= {7.8} md={7} sm={12} id="feed">
	
								<div className="pb-1 Home-feed">
									<div style={streamContainer} >
										<hr />
										<div style={streamTools} className="d-flex">
									
											<div className="custom-control custom-switch pr-3" style={{borderRight: "1px solid #abaeba",zIndex:"0"}}> 
												<input type="checkbox" className="custom-control-input" data-toggle="toggle"  id="customSwitches" onChange={this.filterByActiveSubject} defaultChecked/>
												<label className="custom-control-label" htmlFor="customSwitches">Active subject only</label>
											</div>

											<div className="float-right"> 
												<NavDropdown title={
												<span >Filter posts by <FontAwesomeIcon style={{fontSize:" 11px"}} icon="sort-down"/></span>
												}  id="collasible-nav-dropdown">
													<div className="container-fluid d-flex ">
														<div>
															<span className="text-muted"><small >FACULTIES</small></span><br/><br/>
															{
																faculties.map((faculty, id) => {
																return <NavDropdown.Item key={id} style={{paddingLeft:"0px"}} onClick={(e) => this.filterPostByFaculty(faculty.facultyId,faculty.firstName+' '+faculty.lastName)}>
																		<FontAwesomeIcon className = "fa text-muted"  icon={["far","user"]}/> {faculty.firstName+' '+faculty.lastName}
																	</NavDropdown.Item>
															})
															}
														</div>
														<div>
															<span className="mb-1 text-muted"><small>POST TYPE</small></span><br/><br/> 
															{fileTypeSet.map((type, id) => {
																return <NavDropdown.Item  key={id} style={{paddingLeft:"0px",paddingRight:"0px"}} onClick={(e) => this.searchPostByFileType(type.name)}>
																		<FontAwesomeIcon className="text-muted"  icon={[type.iconClass,type.icon]}/> {type.name}
																	</NavDropdown.Item>
															})}
														</div>
													</div>
												</NavDropdown>
											</div> 
										</div>
									</div>

									{keyword &&
										<>
											<i className="material-icons">filter</i> Search results for <strong><i>{keyword}</i></strong>
											<span className="float-right pr-3" onClick={this.closeSearch}><FontAwesomeIcon className = "fa text-muted"  icon={["fas","times"]}/></span>
										</>
									}
									{fileType&&
										<>
											<i className="material-icons">filter</i> Search results for <strong><i>{fileType}</i></strong>
											<span className="float-right pr-3" onClick={this.closeSearch}><FontAwesomeIcon className = "fa text-muted"  icon={["fas","times"]}/></span>
										</>
									}
									<br/>
									{this.state.facultyId &&
										<>
											<i className="material-icons">filter</i> Search results for <a href="profileInstructor"><strong><i>{facultyName}</i></strong></a>
											<span className="float-right pr-3" onClick={this.closeSearch}><FontAwesomeIcon className = "fa text-muted"  icon={["fas","times"]}/></span>
										</>
									}
							</div>

							{/* Subject CountDown */}

							{/* <Card body className="card-stats-primary mb-2"><CountDown /></Card> */}

							 {/* <Card className="card-stats-primary mb-2">
								<Card.Body>
								<div className="media">
									<div className="media-body media-middle">
									Your Course Begins on 
									<strong> 29 July 2019, 7:00 PM</strong>
									</div>
								</div>
								</Card.Body>
							</Card>  */}
								<Timeline className="text-center" facultyId={this.state.facultyId} keyword={this.state.keyword} fileType={this.state.fileType}
								timeBoundId ={this.state.timeBoundId} post_id={this.state.post_id}
								/>
							</Col>

							{/* <header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<p>
							Edit <code>src/App.js</code> and save to reload.
						</p>
						<a
							className="App-link"
							href="https://reactjs.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							Learn React
						</a>
					</header> */}
							{/* <jsp:include page="header.jsp"></jsp:include> */}


							{/* <style>
	 .hover-light:hover {
		background-color: #F6F7F9;
	}
	</style> */}


							<Col   lg = {3.2} md={5} sm={12} >
								<StickyElement 
									id="schedule" 
									className="inner-sidebar" 
									topDistance={75} 
									bottomDistance={75}
								>
									<UpcomingSideBar timeBoundId ={this.state.timeBoundId}/>
								</StickyElement>
							</Col>
							{/* <div className="col-md-1"></div> */}
							{/* <div className="col-lg-2 col-md-2 ml-auto"> */}

							{/* <Footer /> */}
							{/* <Route path="/" exact render={() => <h1> Home  </h1>} />
							<Route path="/" exact render={() => <h1> Test </h1>} /> */}
							{/* <h1> {this.props.ctr} </h1> */}
							{/* <div className="ml-auto"> */}
							{/* </div> */}
						</Row>
						<Navbar fixed="bottom" className="navbar-icon-bottom d-none" id="home-control-buttons">
							<Nav className="mx-auto" fill variant="tabs">
								<Nav.Link 
									className="text-center text-bold"
									onClick={(e) => { this.setSelectedTab('Feed') }}
								>
									Feed
								</Nav.Link>
								<Nav.Link  
									className="text-center text-bold border-left"
									onClick={(e) => { this.setSelectedTab('Schedule') }}
								>
									Schedule
								</Nav.Link>
							</Nav>
						</Navbar>
						{/* <div 
							id="chatBarContainer"
							className="h-100 d-xs-none d-none d-lg-block position-fixed"  
							style={{
								marginTop: '60px', 
								top: '0px', 
								right: '0px'
							}}
						>
							<StickyElement 
								topdistance={60 + 'px'} 
								rightDistance={0 + 'px'}
								className="chatBarContainer"
							>
									<ChatBar/>
							</StickyElement>
						</div> */}
					</Container>
					
			)
		}
	}
const streamContainer={
	backgroundColor: "#e1e1e7",
    position: "relative"
}
const streamTools={
	backgroundColor: "#ECE9E7",
    padding: "2px 0 2px 5px",
    position: "absolute",
    right: "0",
	top: "-15px",
	float: "right"
}

const mapStateToProps = state => {
	return {
		sapId: state.sapid,
		data:state,
		currentTimeboundId: state.currentTimeboundId
	}
}
export default connect(mapStateToProps)(analyticsManager(Home))
