import React, { Component } from 'react';
import { Route } from 'react-router-dom'
 
import axios from 'axios'

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Media from 'react-bootstrap/Media';
import {connect} from 'react-redux';
import './WatchVideo.css';
import 'material-design-icons/iconfont/material-icons.css';
import {   Link } from 'react-router-dom';
import Comments from './Comments/Comments';
import FacultyInfoCard from './FacultyInfoCard/FacultyInfoCard';
import ConfigUrls from '../../shared/config'
import Reaction from '../Reaction/Reaction'
import {analyticsManager} from '../../shared/Analytics'
import Iframe from 'react-iframe';
import  Player  from '@vimeo/player';
import FormControl from 'react-bootstrap/FormControl'
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import InputGroup from 'react-bootstrap/InputGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ContentLoader from "react-content-loader"
import { API } from '../../shared/config'

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Index from '../../components/Breadcrumbs/Index'
import Paths from '../../components/Breadcrumbs/Paths'

const MyLoader = () => (
  <ContentLoader 
	height={520}
	width={480}
    speed={2}
    primaryColor="#f2f2f2"
	secondaryColor="#e6e6e6"
  >
   <circle cx="30" cy="26" r="12" /> 
    <circle cx="30" cy="73" r="12" /> 
    <circle cx="30" cy="120" r="12" /> 	
	<circle cx="30" cy="167" r="12" /> 
	<circle cx="30" cy="214" r="12" /> 
	<circle cx="30" cy="261" r="12" /> 
	<circle cx="30" cy="308" r="12" /> 
	<circle cx="30" cy="355" r="12" /> 
	<circle cx="30" cy="402" r="12" /> 
	<circle cx="30" cy="449" r="12" /> 
	<circle cx="30" cy="496" r="12" /> 
	{/* //47 */}
    <rect x="59" y="17" rx="0" ry="0" width="298" height="14" /> 
    <rect x="59" y="63" rx="0" ry="0" width="298" height="14" /> 
    <rect x="59" y="109" rx="0" ry="0" width="298" height="14" /> 
    <rect x="59" y="155" rx="0" ry="0" width="298" height="14" /> 	
	<rect x="59" y="201" rx="0" ry="0" width="298" height="14" /> 	
	<rect x="59" y="247" rx="0" ry="0" width="298" height="14" /> 
	<rect x="59" y="293" rx="0" ry="0" width="298" height="14" />
	<rect x="59" y="339" rx="0" ry="0" width="298" height="14" /> 	
	<rect x="59" y="385" rx="0" ry="0" width="298" height="14" /> 	
	<rect x="59" y="431" rx="0" ry="0" width="298" height="14" /> 
	<rect x="59" y="477" rx="0" ry="0" width="298" height="14" /> 
	{/* //46 */}   
    <rect x="395" y="16" rx="0" ry="0" width="52" height="12" /> 
    <rect x="395" y="64" rx="0" ry="0" width="52" height="12" /> 
    <rect x="395" y="110" rx="0" ry="0" width="52" height="12" />
	<rect x="395" y="156" rx="0" ry="0" width="52" height="12" />
	<rect x="395" y="202" rx="0" ry="0" width="52" height="12" />
	<rect x="395" y="248" rx="0" ry="0" width="52" height="12" />
	<rect x="395" y="294" rx="0" ry="0" width="52" height="12" />
	<rect x="395" y="340" rx="0" ry="0" width="52" height="12" />
	<rect x="395" y="386" rx="0" ry="0" width="52" height="12" />
	<rect x="395" y="432" rx="0" ry="0" width="52" height="12" />
	<rect x="395" y="478" rx="0" ry="0" width="52" height="12" />


  </ContentLoader>
)


const urls = new ConfigUrls().urls;
//const BASE_API_URL ="https://uat-studentzone-ngasce.nmims.edu"
// const BASE_API_URL ="http://localhost:8080"
//const BASE_API_URL ="http://10.100.100.92:8080"
class WatchVideo extends Component {
	constructor(props) {
        super(props);
        this.subTopicsScrolled= false;
    }
    state = {
        error: null,
        isLoaded: false,
        student:this.props.student,
        gotPostId : false,
        post_id : 0,
		videoId: this.props.location.state.videoId,
		currentTopicId: -1,
		isSubTopicsLoaded: false
	};
    
      componentDidMount(){
			console.log('In WatchVideo componentDidMount()...');
	
            console.log("Module : ");
			console.log(this.props.location.state.module);

			this.getVideoDetails()	
			this.getVideoSubTopics()
			this.timeUpdate = this.timeUpdate.bind(this);

		}		
			
	  initPlayer(){
		let iFrame = document.querySelector('iframe');
		if(iFrame){		
		var player = new Player(iFrame);
		this.setState({
			player : player
		})
		}
	  }
      getVideoDetails(){
            console.log("In getVideoDetails videoId : ");
            console.log(this.state.videoId);

            this.setState({isLoaded:false})
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.get(
				urls.apiUrl_acads + "/watchVideos", 				
					// "http://localhost:8080/acads/m/watchVideos", 
            {
              params: {
                id: this.state.videoId
              }
            }
            ).then( response => {
              console.log("/watchVideos Got reponse data : ");
              console.log(response.data);
             this.setState({
                data: response.data,
                isLoaded: true				
                },()=>this.initPlayer())
              
                if(!isNaN(this.state.data.mainVideo[0].id)){
                  this.getPostIdByVideoId()
                }


            }).catch(function(error){
              console.log(error);
            })
      }
	
	  getVideoSubTopics(){
		console.log("In getVideoSubTopics videoId : ");
		console.log(this.state.videoId);

		this.setState({isSubTopicsLoaded:false})
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.get(
			API.getVideoSubTopics,			
				// "http://localhost:8080/acads/m/getVideoSubTopics", 
		{
		  params: {
			id: this.state.videoId
		  }
		}
		).then( response => {
		  console.log("/getVideoSubTopics Got reponse data : ");
		  console.log(response.data);
		 this.setState({
			subTopicsData: response.data,
			isSubTopicsLoaded: true				
			})
			}).catch(function(error){
		  console.log(error);
		})
  }
      getPostIdByVideoId(){
        console.log("In getPostIdByVideoId videoId : ");
            console.log(this.state.videoId);
            
              axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
              axios.defaults.headers.post['Content-Type'] = 'application/json';
              axios.post(urls.apiUrl_acads + "getPostIdByVideoId",
              //"http://localhost:8080/acads/m/getPostIdByVideoId",
              JSON.stringify({
                  "id": this.state.videoId
              })
              ).then( response => {
              console.log("getPostIdByVideoId Got reponse data : ");
              console.log(response.data);
             this.setState({
                post_id: response.data.post_id,
                gotPostId: true              
                })
              
            }).catch(function(error){
              console.log(error);
            })
        }
        
	componentDidUpdate(prevProps, prevState) {
		console.log('In WatchVideo componentDidUpdate()...');
		console.log("Got prevProps, prevState : ")
		console.log(prevProps)
		console.log(prevState)
		var containerElement = document.getElementById("subTopics_container"); 
		if(containerElement != null){
			containerElement.addEventListener("wheel", (e)=>{
				this.subTopicsScrolled = true;
				document.getElementById("autoScrollBtn").style.display = "";
			});
		}
		if(this.state.player){		
			this.state.player.on('timeupdate',this.timeUpdate);	
		}		
		if (prevState.videoId !== this.state.videoId) {
		  let updateSateObj = {
      videoId:this.state.videoId
		  }
		  console.log("updateSateObj : ");
		  console.log(updateSateObj);
		  this.setState({updateSateObj})
		  this.getVideoDetails()
	}else{
		  console.log("No State update : ");
		}
	  }
	  
	  static getDerivedStateFromProps(nextProps, prevState){
		console.log('In WatchVideo getDerivedStateFromProps()...');
		console.log("Got nextProps, prevState : ")
		console.log(nextProps)
		console.log(prevState)
		console.log("nextProps.location.state.videoId :")
		console.log(nextProps.location.state.videoId)
		if(nextProps.location.state.videoId !== prevState.videoId){
		  let returnNewValuesObj = {
			videoId: nextProps.location.state.videoId
		  }
		  console.log("returnNewValuesObj : ");
		  console.log(returnNewValuesObj);
		 return returnNewValuesObj;
		}
		else { 
		  console.log("returning null : ");
		  return null;
		}
	  }
   
	  
	setTimeDuration = topic => {
		
		this.state.player.setCurrentTime(topic.startTimeInSeconds)	
		this.state.player.play()

	}
	
	getSubTopics_Id(topic,index){
		let subTopics_Id = ""
		if(index === this.state.currentTopicId){
			subTopics_Id = "subTopics_Id"
		}
		return subTopics_Id;
	}
	getSubTopicsTitle_Id(topic,index){
		let subTopicsTitle_Id = ""
		if(index === this.state.currentTopicId){
			subTopicsTitle_Id = "subTopicsTitle_Id"
		}
		return subTopicsTitle_Id;
	}
	timeUpdate = (data)=> {	
		// let x = window.matchMedia("(min-width: 991px)")	
		// let fullScreen = false
		// if (x.matches) { 
		// 	fullScreen = true
		// }			
			let scrolled = this.subTopicsScrolled;
			this.state.player.getPaused().then((paused)=> {
				// `paused` indicates whether the player is paused
				if(!paused){
							
					this.state.subTopicsData.videoSubTopicsList.map((topic, index) => {
						if (parseInt(data.seconds) >= topic.startTimeInSeconds && parseInt(data.seconds) < topic.endTimeInSeconds) {
							if(index !== this.state.currentTopicId ){
								
									this.setState({
										currentTopicId: index
									}, 
									() => {
										const element = document.getElementById("subTopics_Id"); 
										if(element != null && !scrolled){
											var containerElement = document.getElementById('subTopics_container');			
											// element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }) 
											containerElement.scrollTop =  element.offsetTop - (containerElement.getBoundingClientRect().height / 2);
										}
									})							
									console.clear();	
														
							}
						}
					})
				}});	
			}		
	searchSubTopics(e){	
	
		var searchSubTopicsTitle = document.getElementsByClassName("searchSubTopicsTitle"); //searchSubTopicsTitle is an array
		var searchSubTopicsSpan = document.getElementsByClassName("searchSubTopicsSpan"); //searchSubTopicsSpan is an array	
		var searchSubTopicsStartTime = document.getElementsByClassName("searchSubTopicsStartTime"); //searchSubTopicsSpan is an array	
		var filter = ''	
		var searchSubTopicsTitleValue;
		var searchSubTopicsSpanValue;
		if(e.target.value){ filter = e.target.value.toUpperCase() }
			for(var i = 0; i < searchSubTopicsTitle.length; i++){	
			searchSubTopicsTitleValue = searchSubTopicsTitle[i].innerHTML;
			searchSubTopicsSpanValue =	searchSubTopicsStartTime[i].innerHTML;

			if (searchSubTopicsTitleValue.toUpperCase().indexOf(filter) > -1 || searchSubTopicsSpanValue.toUpperCase().indexOf(filter) > -1) {
				searchSubTopicsSpan[i].style.display = "";
			}else{
				searchSubTopicsSpan[i].style.display = "none";
			}
		}
	
	}	
	viewCurrentElement = () => {
		let element = document.getElementById("subTopics_Id"); 
		if(element!=null){
		var containerElement = document.getElementById('subTopics_container');										
		containerElement.scrollTop =  element.offsetTop - (containerElement.getBoundingClientRect().height / 2);			
		}
		this.subTopicsScrolled = false
		document.getElementById("autoScrollBtn").style.display = "none";
	}
	
  render() { 	
    if(!this.state.isLoaded)
    {
      return <div > 
          <Spinner animation="border" variant="secondary">
            <span className="sr-only">Loading...</span>
          </Spinner>
      </div>;
    }else{
		if (this.state.data.mainVideo[0] == null) {
			return <div> <h6 className="text-muted" ><i className="material-icons">error_outline</i> Content Not Available </h6> </div>
		}

        return (
			<div className="text-left">	
			<Col>
			<Breadcrumbs 
				crumbsList = {[
					Index.home, 
					{
						...Index.sessionPlanDashboard,
						data : {
							state: {
								timeboundId : this.props.currentTimeboundId
							}
						}
					},
					{
						...Index.sessionPlanModule,
						text : this.props.location.state.module.topic,
						data : {
							state: {
								id:  this.props.location.state.module.id,
								module:  this.props.location.state.module 
							}
						}
					},
					{
						...Index.watchVideo,
						text : this.state.data.mainVideo[0].fileName,
					},
				]}
			/>
			<Row className="mt-2">
				
				<Col lg={8} >
					<Card>
						<Card.Body className="p-0"  >
							{/* <div className="embed-responsive embed-responsive-16by9">
					
								 <Iframe className="embed-responsive-item" 
									src={this.state.data.mainVideo[0].videoLink}
									allowfullscreen="allowfullscreen"
									title='video'
									allow='autoplay'
								/>   
								</div> */}
								<div className="embed-responsive embed-responsive-16by9">
									<iframe className="embed-responsive-item" src={this.state.data.mainVideo[0].videoLink} allowfullscreen="allowfullscreen" 
									title='video'
									allow='autoplay'>
									</iframe>
								</div>
									<div className=" p-2 "> <br/>
										<Card.Text className="h5 pl-2 text-dark ">
											{this.state.data.mainVideo[0].fileName}
										</Card.Text>

                  {this.state.post_id &&                  
                    <Col xs={6} className="mt-3">
                      <Reaction 
                      post={ {post_id : this.state.post_id} }                   
                      sapId={this.state.student.sapid}
                      showComments="false"   />
                      </Col>
                    }  

										{/* <span>
											<button type="button"
											className="btn btn-link"
											style={{color: 'gray'}}
										>
										<i className="material-icons"> thumb_up </i> </button>0 Likes</span>
										&nbsp;&nbsp;
											<span>
											<button type="button" 
												className="btn btn-link"
												style={{color: 'gray'}}> 
										<i className="material-icons">share</i> </button> Share </span>
										&nbsp;&nbsp;
											<span> 
											<button type="button" 
											className="btn btn-link" 
											style={{color: 'gray', textDecoration: 'none'}}>
											<i className="material-icons"> cloud_download </i> 
											</button>Download</span> */}
									
									</div> <hr />  	
								<Media className="mb-3 p-2 ">
							{/* <img className="mr-3 rounded-circle" 
							src={BASE_API_URL+"/ltidemo/assets/images/cover/Business-Economics-logo.jpg"}
							alt="image" style={{width: '50px', height: '50px'}} /> */}
									<Media.Body className="media-body">
										<p className="mt-0">{this.state.data.mainVideo[0].subject}<br />:
											<span className="text-muted">Published on {this.state.data.mainVideo[0].addedOn}</span>
										</p> 
										<span>Description : </span>
										<p style={{fontWeight: '400'}}>
											{this.state.data.mainVideo[0].description}
										</p>
										{
											this.state.data.mainVideo[0].keywords == null 
											? <div></div>
											: this.state.data.mainVideo[0].keywords.split(',').map(function (keyword, index) {
											return <span className="mb-0" key={index}>
												<button type="button" className="btn btn-light">
												{keyword} <span className="badge badge-light"></span>
												</button>
											</span>; 
											})
										}
								</Media.Body>
							</Media>
						</Card.Body>
					</Card>

		{/* <Card className="mt-2">
			<Card.Body>
		{
		this.state.gotPostId == true 
		? <Comments 
			post_id = {this.state.post_id}
			student={this.props.student} />
		: <div> 
			<span className="text-muted" >
			<i className="material-icons">error_outline</i> Comments Not Available </span> 
			</div>
		}
			</Card.Body>
		</Card> */}
		</Col>
			
			<Col lg={4} className="">
			
			{/* <!-- Video Topics Start--> */}
			<Card className=" mb-2" >
				<Card.Body className=" p-1">
				
				
					<div style={{ fontSize: "16px" , fontWeight: 600}} className="d-flex justify-content-center p-2 ">Transcript</div>
				
					<div className="d-flex justify-content-center p-2">
					<InputGroup >
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend"><FontAwesomeIcon icon="search"/></InputGroup.Text>
                        </InputGroup.Prepend>
						<FormControl type="search" placeholder="Search by any text/duration in the transcript"  onChange={this.searchSubTopics}  className=" mr-sm-2" />
                    </InputGroup>						
					</div>
					
							{this.state.isSubTopicsLoaded ? (					
					<>	
						{
							this.state.subTopicsData.videoSubTopicsList.length == 0
							? (
								<div> <h6 className="text-muted text-center" ><i className="material-icons">error_outline</i> Content Not Available </h6> </div>
							) :
								<div id="subTopics_container" style={{overflowY : "scroll" ,  height:"530px"}} >
							{	this.state.subTopicsData.videoSubTopicsList.map((topic, index) => {
								return(
								<span className="mb-0 searchSubTopicsSpan" key={index} onClick={this.searchSubTopics}>
								
									<a  onClick={ () => this.setTimeDuration(topic) }>
										<div className="d-flex flex-row mb-2 " id={this.getSubTopics_Id(topic,index)}>
											<div className="p-2 ml-2">
											<i className="material-icons" style={{color:'#26a9e0'}}> play_circle_outline </i>
											</div>
											<div id={this.getSubTopicsTitle_Id(topic,index)} className="p-2 searchSubTopicsTitle">{topic.fileName}</div>
											<div id={this.getSubTopicsTitle_Id(topic,index)} className="p-2 mr-2 ml-auto searchSubTopicsStartTime">{topic.startTime}</div>
										</div>
									</a> 
								</span>)
							})}
						
								</div>
							
								
						}	<div className="d-flex justify-content-center p-2 "><button  id="autoScrollBtn" onClick={this.viewCurrentElement} className="btn btn-primary btn-sm btn-responsive animated animatedFadeInUp fadeInUp fadeInDown" style={{position: "absolute",display:"none"}}>
							  <FontAwesomeIcon  className="mr-2" icon="arrow-up"/>Resume Transcript Auto-Scroll</button></div>
				</> 
				): 
				<MyLoader/>
			// 	<div className="loadingSpinner">
			// 	<div className ={this.props && this.props.noSpace ? "pb-1" : "loadingSpinnerParent mt-5"}>
			// 	<div className = {this.props && this.props.noSpace ? "" : "loadingSpinnerChildForSubTopics"}>
			// 	<Spinner animation="border" variant="secondary">
			// 	<span className="sr-only">Loading...</span>
			// 	</Spinner>
			//   </div></div></div>			
			  }			  			  
					</Card.Body>
				</Card>
			{/* <!-- Video Topics End--> */}
			
			{/* <!-- Subject PDF Start --> */}
			{/* <Card className=" mb-2 text-center" >
				<Card.Header className="">
		<Card.Img variant="top" 
			src="https://mhcampus-book-covers.s3.amazonaws.com/mhcover-w148-h179/1259899403.jpg" 
			alt="Card image cap" />
					<a href="/"	className="btn btn-primary btn-block btn-rounded">View Text Book</a>
					<a href="/" className="btn btn-primary btn-block btn-rounded">download PDF</a>
				</Card.Header>
			</Card> */}
			{/* <!-- Subject PDF End --> */}
			
			{/* <!-- Subject Instructor details start --> */}
			<FacultyInfoCard facultyId = {this.state.data.mainVideo[0].facultyId}  />
			{/* <!-- Subject Instructor details End --> */}
				</Col>
				
			</Row>
			</Col>
			</div>
		)
    }
  }
}

const mapStateToProps = state => {
	return {
		student: state,
    currentTimeboundId: state.currentTimeboundId
	}
}

export default connect(mapStateToProps)(analyticsManager(WatchVideo))