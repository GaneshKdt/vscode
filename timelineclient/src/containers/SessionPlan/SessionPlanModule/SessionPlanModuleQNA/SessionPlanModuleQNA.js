import React, { Component } from 'react';
 
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import './SessionPlanModuleQNA.css';
import 'material-design-icons/iconfont/material-icons.css';

import ConfigUrls from '../../../../shared/config'
import Container from 'react-bootstrap/Container';

const urls = new ConfigUrls().urls;

class SessionPlanModuleQNA extends Component {
    state = {
        error: null,
        isLoaded: false,
        data: null ,
        id: this.props.id
      };
    
    
      componentDidMount(){
            console.log('In SessionPlanModuleQNA componentDidMount()...');
            this.setState({
                isLoaded: true
            })
            // axios.defaults.headers.post['Content-Type'] = 'application/json';
            // axios.post(urls.apiUrl_web_acads + "/acads/api/getLRBySessionPlanModuleId",
            // JSON.stringify({
            //     "id":this.state.id
            // })
            // ).then( response => {
                
            //     console.log("IN componentDidMount() got response : ")
            //     console.log(response);
            // this.setState({
            //     data: response.data,
            //     isLoaded: true
            // })
    
            // }).catch(function(error){
            //     console.log(error);
            // })
        
    }
    
    
  render() { 
    if(!this.state.isLoaded)
    {
      return <div>Loading...</div>;
    }else{
        return <div className="sessionplan-container-bg"> 
          <div className="">
		      	<Card >
              
				    	<Card.Body >
              <Card.Title className = "mt-3">
              <i className="material-icons">help</i><span>{' Q&A'}</span>
						</Card.Title>
                <Card.Title className = "mt-3">
                <h6 class="text-muted"><i class="material-icons">error_outline</i> No Q&amp;A Available  </h6>
                </Card.Title>
				      </Card.Body>
            </Card>
          </div>
          </div>
        //     return <div className="container-fluid text-left" >
    //    {/*  <!-- qAndACard start --> */}			
    //     <div className="card mb-2 ">
    //     <div className="card-body">
    //     <div className="media mb-2">
    //     <img className="mr-3" src="http://admissions-ngasce.nmims.edu:4001/StudentDocuments/00Q0o00001ONkZL/00Q0o00001ONkZL_xCTb_Picture.jpeg" style={ {height: '50px' , width: '50px'} } alt="image" />
    //     <div className="media-body">
    //     <p><a href="/"><b>What are the traits of President Kennedy that you consider as inherited?</b></a>
    //      <br/><small className="text-muted ">5 hours ago</small>
    //     </p>
    //     </div>
    //     </div>
        
    //     <div className="container">
            
    //         The research on how much of human behavior is hereditary, and how much is acquired through socialization is far from conclusive. So we really cannot say what character traits 
            
    //     </div>
    //    <br/><br/>
    //     <a href="/" title="LIKE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> thumb_up </i>
    //     </a>
    //     <a href="/"  title="SHARE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> share </i>
    //     </a>
    //     <a href="/"  title="COMMENT" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> mode_comment </i>
    //     </a>
    //     </div> 
    //     </div>
    //    {/*  <!-- qAndACard end --> */}
        
    //    {/*  <!-- qAndACard start --> */}			
    //     <div className="card mb-2 ">
    //     <div className="card-body">
    //     <div className="media mb-2">
    //     <img className="mr-3" src="http://admissions-ngasce.nmims.edu:4001/StudentDocuments/0010o00002BAtdk/0010o00002BAtdk_cXiR_Picture.jpg" style={ {height: '50px' , width: '50px'} } alt="image" />
    //     <div className="media-body">
    //     <p><a href="/"><b>What are the traits of President Kennedy that you consider as inherited?</b></a><span id="action_menu_btn" style={ {float: 'right' , color: '#d9d9d9'} }>
    //     <svg className="svg-inline--fa fa-ellipsis-h fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path></svg> {/* <!-- <i className="fas fa-ellipsis-h"></i> --> */}</span> 
    //    <br/><small className="text-muted ">5 hours ago</small>
    //     </p>
    //     </div>
    //     </div>
        
    //     <div className="container">
            
    //         The research on how much of human behavior is hereditary, and how much is acquired through socialization is far from conclusive. So we really cannot say what character traits 
            
    //     </div>
    //    <br/><br/>
    //     <a href="/" title="LIKE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> thumb_up </i>
    //     </a>
    //     <a href="/"  title="SHARE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> share </i>
    //     </a>
    //     <a href="/"  title="COMMENT" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> mode_comment </i>
    //     </a>
    //     </div> 
    //     </div>
    //    {/*  <!-- qAndACard end --> */}
    //    {/*  <!-- qAndACard start --> */}			
    //     <div className="card mb-2 ">
    //     <div className="card-body">
    //     <div className="media mb-2">
    //     <img className="mr-3" src="http://admissions-ngasce.nmims.edu:4001/StudentDocuments/00Q0o00001ONkZL/00Q0o00001ONkZL_xCTb_Picture.jpeg" style={ {height: '50px' , width: '50px'} } alt="image" />
    //     <div className="media-body">
    //     <p><a href="/"><b>What are the traits of President Kennedy that you consider as inherited?</b></a><span id="action_menu_btn" style={ {float: 'right' , color: '#d9d9d9'} }>
    //     <svg className="svg-inline--fa fa-ellipsis-h fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path></svg> {/* <!-- <i className="fas fa-ellipsis-h"></i> --> */}</span> 
    //    <br/><small className="text-muted ">5 hours ago</small>
    //     </p>
    //     </div>
    //     </div>
        
    //     <div className="container">
            
    //         The research on how much of human behavior is hereditary, and how much is acquired through socialization is far from conclusive. So we really cannot say what character traits 
            
    //     </div>
    //    <br/><br/>
    //     <a href="/" title="LIKE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> thumb_up </i>
    //     </a>
    //     <a href="/"  title="SHARE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> share </i>
    //     </a>
    //     <a href="/"  title="COMMENT" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> mode_comment </i>
    //     </a>
    //     </div> 
    //     </div>
    //    {/*  <!-- qAndACard end --> */}
    //    {/*  <!-- qAndACard start --> */}			
    //     <div className="card mb-2 ">
    //     <div className="card-body">
    //     <div className="media mb-2">
    //     <img className="mr-3" src="http://admissions-ngasce.nmims.edu:4001/StudentDocuments/00Q0o00001ONkZL/00Q0o00001ONkZL_xCTb_Picture.jpeg" style={ {height: '50px' , width: '50px'} } alt="image" />
    //     <div className="media-body">
    //     <p><a href="/"><b>What are the traits of President Kennedy that you consider as inherited?</b></a><span id="action_menu_btn" style={ {float: 'right' , color: '#d9d9d9'} }>
    //     <svg className="svg-inline--fa fa-ellipsis-h fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path></svg> {/* <!-- <i className="fas fa-ellipsis-h"></i> --> */}</span> 
    //    <br/><small className="text-muted ">5 hours ago</small>
    //     </p>
    //     </div>
    //     </div>
        
    //     <div className="container">
            
    //         The research on how much of human behavior is hereditary, and how much is acquired through socialization is far from conclusive. So we really cannot say what character traits 
            
    //     </div>
    //    <br/><br/>
    //     <a href="/" title="LIKE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> thumb_up </i>
    //     </a>
    //     <a href="/"  title="SHARE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> share </i>
    //     </a>
    //     <a href="/"  title="COMMENT" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> mode_comment </i>
    //     </a>
    //     </div> 
    //     </div>
    //    {/*  <!-- qAndACard end --> */}
    //    {/*  <!-- qAndACard start --> */}			
    //     <div className="card mb-2 ">
    //     <div className="card-body">
    //     <div className="media mb-2">
    //     <img className="mr-3" src="http://admissions-ngasce.nmims.edu:4001/StudentDocuments/00Q0o00001ONkZL/00Q0o00001ONkZL_xCTb_Picture.jpeg" style={ {height: '50px' , width: '50px'} } alt="image" />
    //     <div className="media-body">
    //     <p><a href="/"><b>What are the traits of President Kennedy that you consider as inherited?</b></a><span id="action_menu_btn" style={ {float: 'right' , color: '#d9d9d9'} }>
    //     <svg className="svg-inline--fa fa-ellipsis-h fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path></svg> {/* <!-- <i className="fas fa-ellipsis-h"></i> --> */}</span> 
    //    <br/><small className="text-muted ">5 hours ago</small>
    //     </p>
    //     </div>
    //     </div>
        
    //     <div className="container">
            
    //         The research on how much of human behavior is hereditary, and how much is acquired through socialization is far from conclusive. So we really cannot say what character traits 
            
    //     </div>
    //    <br/><br/>
    //     <a href="/" title="LIKE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> thumb_up </i>
    //     </a>
    //     <a href="/"  title="SHARE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> share </i>
    //     </a>
    //     <a href="/"  title="COMMENT" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> mode_comment </i>
    //     </a>
    //     </div> 
    //     </div>
    //    {/*  <!-- qAndACard end --> */}
    //    {/*  <!-- qAndACard start --> */}			
    //     <div className="card mb-2 ">
    //     <div className="card-body">
    //     <div className="media mb-2">
    //     <img className="mr-3" src="http://admissions-ngasce.nmims.edu:4001/StudentDocuments/00Q0o00001ONkZL/00Q0o00001ONkZL_xCTb_Picture.jpeg" style={ {height: '50px' , width: '50px'} } alt="image" />
    //     <div className="media-body">
    //     <p><a href="/"><b>What are the traits of President Kennedy that you consider as inherited?</b></a><span id="action_menu_btn" style={ {float: 'right' , color: '#d9d9d9'} }>
    //     <svg className="svg-inline--fa fa-ellipsis-h fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path></svg> {/* <!-- <i className="fas fa-ellipsis-h"></i> --> */}</span> 
    //    <br/><small className="text-muted ">5 hours ago</small>
    //     </p>
    //     </div>
    //     </div>
        
    //     <div className="container">
            
    //         The research on how much of human behavior is hereditary, and how much is acquired through socialization is far from conclusive. So we really cannot say what character traits 
            
    //     </div>
    //    <br/><br/>
    //     <a href="/" title="LIKE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> thumb_up </i>
    //     </a>
    //     <a href="/"  title="SHARE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> share </i>
    //     </a>
    //     <a href="/"  title="COMMENT" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> mode_comment </i>
    //     </a>
    //     </div> 
    //     </div>
    //    {/*  <!-- qAndACard end --> */}
    //    {/*  <!-- qAndACard start --> */}			
    //     <div className="card mb-2 ">
    //     <div className="card-body">
    //     <div className="media mb-2">
    //     <img className="mr-3" src="http://admissions-ngasce.nmims.edu:4001/StudentDocuments/00Q0o00001ONkZL/00Q0o00001ONkZL_xCTb_Picture.jpeg" style={ {height: '50px' , width: '50px'} } alt="image" />
    //     <div className="media-body">
    //     <p><a href="/"><b>What are the traits of President Kennedy that you consider as inherited?</b></a><span id="action_menu_btn" style={ {float: 'right' , color: '#d9d9d9'} }>
    //     <svg className="svg-inline--fa fa-ellipsis-h fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="ellipsis-h" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"></path></svg> {/* <!-- <i className="fas fa-ellipsis-h"></i> --> */}</span> 
    //    <br/><small className="text-muted ">5 hours ago</small>
    //     </p>
    //     </div>
    //     </div>
        
    //     <div className="container">
            
    //         The research on how much of human behavior is hereditary, and how much is acquired through socialization is far from conclusive. So we really cannot say what character traits 
            
    //     </div>
    //    <br/><br/>
    //     <a href="/" title="LIKE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> thumb_up </i>
    //     </a>
    //     <a href="/"  title="SHARE" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> share </i>
    //     </a>
    //     <a href="/"  title="COMMENT" className="btn btn-outline-light card-link qAndALinkink">
    //         <i className="material-icons text-muted"> mode_comment </i>
    //     </a>
    //     </div> 
    //     </div>
    //    {/*  <!-- qAndACard end --> */}
    //     </div> 
    //     {/* <!-- #four end --> */} 
     }
  }
}

export default SessionPlanModuleQNA;