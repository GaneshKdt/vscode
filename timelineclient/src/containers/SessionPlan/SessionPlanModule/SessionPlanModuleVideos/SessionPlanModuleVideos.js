import React, { Component } from 'react';
 
import axios from 'axios'

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'


import './SessionPlanModuleVideos.css';
import 'material-design-icons/iconfont/material-icons.css';
import {   Redirect,Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
// Need to add Pagination, Navigation modules
import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm'
import ConfigUrls from '../../../../shared/config'
import $ from "jquery";
import "jquery-ui-bundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Box } from "@material-ui/core";
import AxiosHandler from "../../../../shared/AxiosHandler/AxiosHandler";
import adminDefaultImage from '../../Assets/Default-Logo/admin.png'

const urls = new ConfigUrls().urls;

const prof_pic = {
  height: '20px',
  width: '20px'
}

  const params = {
    modules: [ Navigation],
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    freeMode:true,
    slidePerView:4
  }

class SessionPlanModuleVideos extends Component {
    state = {
        error: null,
        isLoaded: false,
        data: null ,
        id: this.props.id,
        sapId: this.props.sapId,
      };
    
      getDaysFromUpload = (sessionDate) => {
       try{
        var startDate = Date.parse(sessionDate);
        var endDate = new Date();
        console.log("In getDaysFromUpload sdate : edate are :");
        console.log(startDate);
        console.log(endDate);
        var timeDiff = endDate - startDate;
        var daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        if(daysDiff > 7){
          return sessionDate
        }else{
          return daysDiff+" days ago"
        }
        
        }catch(error){
        return " "
       }
    }
    
      componentDidMount(){
            console.log('In SessionPlanModuleVideos componentDidMount()...');
            console.log(this.props.module);
            this.setState({
                id: this.props.id
            })
            this.getVideosDataByIdFromState()
        
    }
    
    
	getVideosDataByIdFromState(){
		console.log('In SessionPlanModuleVideos getVideosDataByIdFromState()...');
		this.setState({
			isLoaded: false
		})
		axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.post(urls.apiUrl_web_acads + "/api/getVideosBySessionPlanModuleId",
            JSON.stringify({
                "id":this.state.id,
                "sapId":this.state.sapId
            })
            ).then( response => {
                
                console.log("IN componentDidMount() got response : ")
                console.log(response);
            this.setState({
                data: response.data,
                isLoaded: true
            })
    
            }).catch(function(error){
                console.log(error);
            })
	}
	
	componentDidUpdate(prevProps, prevState) {
		console.log('In SessionPlanModuleVideos componentDidUpdate()...');
		console.log("Got prevProps, prevState : ")
		console.log(prevProps)
		console.log(prevState)
		if (prevState.id !== this.state.id) {
		  let updateSateObj = {
			id:this.state.id,
			isLoaded: true
		  }
		  console.log("updateSateObj : ");
		  console.log(updateSateObj);
		  this.setState({updateSateObj})
		  this.getVideosDataByIdFromState()
		}else{
		  console.log("No State update : ");
		}
	  }
	  
	  static getDerivedStateFromProps(nextProps, prevState){
		console.log('In SessionPlanModuleVideos getDerivedStateFromProps()...');
		console.log("Got nextProps, prevState : ")
		console.log(nextProps)
		console.log(prevState)
		console.log("nextProps.id :")
		console.log(nextProps.id)
		if(nextProps.id!==prevState.id){
		  let returnNewValuesObj = {
			id: nextProps.id
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
    
      handleBookmark = (event) => {
            console.log("handleBookmark : ", event.target);
            let obj = $(event.target);
            if (!$(event.target).attr("type")) {
              obj = $(event.target).parent().parent();
              console.log("obj : ", $(obj));
            }
            if ($(obj).attr("id")) {
              if ($(obj).attr("data-selected") == "no") {
                AxiosHandler.AxiosPostHandler({
                  url: urls.apiUrl_studentPortals + "setBookmark",
                  data: {
                    id: $(obj).attr("id"),
                    bookmarked: "Y",
                    url: "video",
                    sapId: this.props.sapId,
                  },
                  successCallBack: (response) => {
                    $(obj).attr("data-selected", "yes");
                    $(obj).find("svg").attr("style", "color:#fabc3d;");
                  },
                  failureCallBack: (error) => {
                    console.log(error);
                  },
                });
              } else {
                AxiosHandler.AxiosPostHandler({
                  url: urls.apiUrl_studentPortals + "setBookmark",
                  data: {
                    id: $(obj).attr("id"),
                    sapId: this.props.sapId,
                  },
                  successCallBack: (response) => {
                    $(obj).attr("data-selected", "no");
                    $(obj).find("svg").attr("style", "");
                  },
                  failureCallBack: (error) => {
                    console.log(error);
                  },
                });
              }
            }
          };

  render() { 
    if(!this.state.isLoaded)
    {
      return <div>Loading...</div>;
    }else{
        return <div  className="text-left sessionplan-container-bg" >
        
        {/* Session Recordings start */}
        <div>
        <Card className="mb-3 mt-0">
            
            <Card.Body >
            <Card.Title className="mb-3 mt-3" ><i className="material-icons ">play_circle_filled</i> Session Recordings</Card.Title>

            {
                    this.state.data.sessionVideos.length < 1 
                    ? <div> <h6 className="text-muted" ><i className="material-icons">error_outline</i> No Session Recordings Available </h6> </div>
                    : <div>    
            <Swiper className="" {...params}>
                
                    {this.state.data.sessionVideos.map((video) => {
                        return    (
                        <Col xl={4} lg={6} md={6} sm={6} xs={12} key={video.id} >
                                <Card className="session-plan-module-session-rec-card">
                                             
                                <Link to={{
                                pathname: '/timeline/watchVideo',
                                state: {
                                    videoId: video.id,
                                    module: this.props.module
                                }
                                }}>
                                  <Card.Img variant="top" src={video.thumbnailUrl} alt="Video Thumbnail" />
                                </Link>     
                                        <Card.Body >
                                            <Box>
                                            <Grid container spacing={2}>
                                              <Grid items xs={9}>
                                                <Card.Text>             
                                                  <Link to={{
                                                  pathname: '/timeline/watchVideo',
                                                  state: {
                                                      videoId: video.id,
                                                      module: this.props.module
                                                  }
                                                  }}>
                                                  {video.fileName}
                                                  </Link>
                                                </Card.Text>
                                              </Grid>
                                              
                                              <Grid items xs={3}>
                                                {video.bookmarked === "Y" ? (
                                                  <Button variant="light" style={{ float: "right" }}
                                                    id={video.id}  data-selected="yes"
                                                    onClick={this.handleBookmark}
                                                  >
                                                    <FontAwesomeIcon icon="bookmark" style={{ color: "#fabc3d" }}/>
                                                  </Button>
                                                    ) : (
                                                        <Button variant="light" style={{ float: "right" }}
                                                          id={video.id}data-selected="no"
                                                          onClick={this.handleBookmark}
                                                        >
                                                          <FontAwesomeIcon icon="bookmark" />
                                                        </Button>
                                                    )}
                                                </Grid>
                                                  <Card.Text>
                                                    <span className="text-muted" >
                                                      {video.imgUrl ? 
                                                      (
                                                        
                                                          <Image className="mr-2 rounded-circle" style={prof_pic} src={urls.productionUrl+video.imgUrl} alt="image"/> 
                                                      ) : <Image className="mr-2 rounded-circle" style={prof_pic} src={adminDefaultImage} alt="image"/> }

                                                        <span>{video.facultyName}</span>
                                                        {/* <i className="material-icons">person_pin</i>&nbsp;{video.facultyName} */}
                                                    </span><br/><br/>
                                                    <span className="text-muted">
                                                        <FontAwesomeIcon icon="clock" className="video-clock-size-fa"/>
                                                        {/* <i className="material-icons">schedule</i>  */}
                                                      &nbsp; { this.getDaysFromUpload(video.sessionDate) } 
                                                    </span>
                                                  </Card.Text>
                                                </Grid>
                                            </Box>
                                        </Card.Body>
                                    </Card>

                            </Col>
                            )
                    })
                
                }
            </Swiper>
            </div>
        }
        </Card.Body>
    </Card>
    {/* Session Recordings end */}
    
        {/* Curated Videos start */}
        <Card className="mb-3 mt-3">
            
            <Card.Body >
            <Card.Title className="mb-3 mt-3" ><i className="material-icons ">play_circle_filled</i> Curated Videos</Card.Title>

            {
                ( (this.state.data.curatedVideos == null) ||
                  (this.state.data.curatedVideos.length == 0) )
                ? <div> <h6 className="text-muted" ><i className="material-icons">error_outline</i> No Session Recordings Available </h6> </div>
                : 
            <Swiper {...params}>
                {   
                    this.state.data.curatedVideos.length < 1 
                    ? <div> <h6 className="text-muted" ><i className="material-icons">error_outline</i> No Curated Videos Available </h6> </div>
                    :
                    this.state.data.curatedVideos.map((video) => {
                        return    <Col md={3} key={video.id} >
                                <Card border="secondary">
                                            
                                <Link to={{
                                pathname: '/timeline/watchVideo',
                                state: {
                                    videoId: video.id,
                                    module: this.props.module
                                }
                                }}>
                                  <Card.Img variant="top" src={video.thumbnailUrl} alt="Video Thumbnail" />
                                </Link>     
                                        <Card.Body >
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid items xs={8}>
                                            <Card.Text >
                                                             
                                            <Link to={{
                                            pathname: '/timeline/watchVideo',
                                            state: {
                                                videoId: video.id,
                                                module: this.props.module
                                            }
                                            }}>
                                            <Card.Title >
                                               
                                             {video.fileName}
                                             </Card.Title>
                                             </Link>
                                            <span className="text-muted" >
                                                <i className="material-icons">person_pin</i> {video.facultyName}
                                            </span><br/><br/>
                                            <span className="text-muted" >
                                                <i className="material-icons">schedule</i> 1 day ago 
                                            </span>		 
                                            </Card.Text>
                                            </Grid>
                                                    <Grid items xs={4}>
                                                    {video.bookmarked === "Y" ? (
                                                        <Button
                                                        variant="light"
                                                        id={video.id}
                                                        data-selected="yes"
                                                        onClick={this.handleBookmark}
                                                        style={{ float: "right" }}
                                                        >
                                                        <FontAwesomeIcon
                                                            icon="bookmark"
                                                            style={{ color: "#fabc3d" }}
                                                        />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                        variant="light"
                                                        id={video.id}
                                                        data-selected="no"
                                                        onClick={this.handleBookmark}
                                                        style={{ float: "right" }}
                                                        >
                                                        <FontAwesomeIcon icon="bookmark" />
                                                        </Button>
                                                    )}
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Card.Body>
                                    </Card>

                            </Col>
                    })
                }
                
            </Swiper>
            }
        </Card.Body>
    </Card>
      
    {/* Curated Videos end */}
    
    
        {/* Recommended start */}
        <Card className=" mt-3">
            
            <Card.Body >
            <Card.Title className="mb-3 mt-3" ><i className="material-icons ">play_circle_filled</i> Recommended</Card.Title>

            {
                ( (this.state.data.recommended == null) ||
                  (this.state.data.recommended.length == 0) )
                ? <div> <h6 className="text-muted" ><i className="material-icons">error_outline</i> No Session Recordings Available </h6> </div>
                :  
            <Swiper {...params}>
                {   
                    this.state.data.recommended.length < 1 
                    ? <div> <h6 className="text-muted" ><i className="material-icons">error_outline</i> No Recommended Videos Available </h6> </div>
                    :
                    this.state.data.sessionVideos.map((video) => {
                        return    <Col md={3} key={video.id} >
                                <Card border="secondary">
                                            
                                <Link to={{
                                pathname: '/session-plan-module',
                                state: {
                                    id: 2
                                }
                                }}>
                                  <Card.Img variant="top" src={video.thumbnailUrl} alt="Video Thumbnail" />
                                </Link>     
                                        <Card.Body >
                                        <Box>
                                            <Grid container spacing={2}>
                                                <Grid items xs={8}>
                                            <Card.Text >
                                                             
                                            <Link to={{
                                            pathname: '/session-plan-module',
                                            state: {
                                                id: 2
                                            }
                                            }}>
                                            <Card.Title >
                                               
                                             {video.fileName}
                                             </Card.Title>
                                             </Link>
                                            <span className="text-muted" >
                                                <i className="material-icons">person_pin</i> {video.facultyName}
                                            </span><br/><br/>
                                            <span className="text-muted" >
                                                <i className="material-icons">schedule</i> 1 day ago 
                                            </span>		 
                                            </Card.Text>
                                            </Grid>
                                                    <Grid items xs={4}>
                                                    {video.bookmarked === "Y" ? (
                                                        <Button
                                                        variant="light"
                                                        id={video.id}
                                                        data-selected="yes"
                                                        onClick={this.handleBookmark}
                                                        style={{ float: "right" }}
                                                        >
                                                        <FontAwesomeIcon
                                                            icon="bookmark"
                                                            style={{ color: "#fabc3d" }}
                                                        />
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                        variant="light"
                                                        id={video.id}
                                                        data-selected="no"
                                                        onClick={this.handleBookmark}
                                                        style={{ float: "right" }}
                                                        >
                                                        <FontAwesomeIcon icon="bookmark" />
                                                        </Button>
                                                    )}
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Card.Body>
                                    </Card>

                            </Col>
                    })
                }
                
            </Swiper>
            }
        </Card.Body>
    </Card>
        </div>

      
    {/* Recommended end */}

    
    
    
     </div>  
     {/* container-fluid ends */}
    
    }
  }
}

export default SessionPlanModuleVideos;