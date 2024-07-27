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

import './Comment.css';
import 'material-design-icons/iconfont/material-icons.css';
import {   Redirect } from 'react-router-dom';
import LoadingSpinner from '../../../../shared/LoadingSpinner/LoadingSpinner';
import Container from 'react-bootstrap/Container';
import AddComment from '../AddComment/AddComment';
import ConfigUrls from '../../../../shared/config'
import { confirmAlert } from 'react-confirm-alert';

const urls = new ConfigUrls().urls;


//const BASE_API_URL ="https://uat-studentzone-ngasce.nmims.edu"
//const BASE_API_URL ="http://localhost:8080"
//const BASE_API_URL ="http://10.100.100.92:8080"
// const BASE_API_URL ="http://10.100.64.78:8080"

class Comment extends Component {
  constructor(props) {
    super(props)
    
    this.deleteCommentButtonClick = this.deleteCommentButtonClick.bind(this)
  } 
  state = {
        error: null,
        isLoaded: false,
        comment : this.props.comment,
        student : this.props.student,
        showReplyInputBox : false,
        collapseRepliesDiv : false,
        replies : [],
        subcomments_count : this.props.comment.subcomments_count,
        loadingSubComments : false
      };
    
      
      addCommentToRepliesArray = (commentToPost) => {
        console.log("IN addCommentToRepliesArray got : ")
        console.log(commentToPost)
        this.setState({
            replies : [
            commentToPost,
            ...this.state.replies,  
            ],
            subcomments_count : this.state.subcomments_count + 1
        })
      }
      
      
      loadSubComments = () => {
        console.log("IN loadSubComments called...")
        this.setState({ loadingSubComments : true })
        console.log(this.state.replies);
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_ltiDemo + "/subComments",
        JSON.stringify({	
          "id" : ""+this.state.comment.id , 
          "offset":1 ,
          "limit":500
        })
        ).then( response => {
            
            console.log("loadSubComments  response : ")
            console.log(response);
          
            if(response.data.comments.length > 0 ) {
                this.setState({
                    replies : []
                })
                  
                  this.setState({
                    replies : response.data.comments,
                      loadingSubComments : false
                    });
              
              
            }
        
            console.log("loadSubComments after response : ")
            console.log(this.state.replies);
        
        this.setState({
          isCommentsLoaded: true
        })

        }).catch(function(error){
            console.log(error);
        })

// let loadMoreDivYOffset = this.refs.loadMoreDiv.getBoundingClientRect().top;
//var waitTillMoreCommnetsLoad = false;   
      };

      componentDidMount(){
            console.log('>>>>>> In Comment componentDidMount()...');
            this.setState({
                isLoaded: true
                })
            // axios.defaults.headers.post['Content-Type'] = 'application/json';
            // axios.post(BASE_API_URL+"/studentportal/getFacultyDetails", 
            // JSON.stringify({
            //     "userId": this.props.facultyId
            // })
            // ).then( response => {
            //   console.log("Got reponse data : ");
            //   console.log(response.data);
             
            // }).catch(function(error){
            //   console.log(error);
            // })
      }
  
      toggleReplyInputDiv = () => {
        this.setState({
            showReplyInputBox : !this.state.showReplyInputBox 
        })
      }
      
      toggleRepliesDiv = () => {
        
        this.setState({
            collapseRepliesDiv : !this.state.collapseRepliesDiv 
        })
        this.loadSubComments();
      }
      
      deleteCommentButtonClick = () => {
        
        console.log("IN deleteCommentButtonClick got commentId : ")
        console.log(this.state.comment.id)
        
        confirmAlert({
          title: 'Confirm to submit',
          message: 'Are you sure you want delete this comment?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                  this.deleteCommentFromDB(this.state.comment.id)
              }
            },
            {
              label: 'No',
              onClick: () => {
                  return; 
              }
            }
          ]
        });
        
      }

      deleteCommentFromDB(commentId){
        
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_ltiDemo + "m/deleteCommentById",
        JSON.stringify({	
          "id" : ""+this.state.comment.id  
        })
        ).then( response => {
            
            console.log("deleteCommentButtonClick  response : ")
            console.log(response);
          
            if(response.data.success === "true" ) {

              if(!isNaN(this.state.comment.commentId) && this.state.comment.commentId !== 0){
                this.props.removeCommentFromRepliesArray(this.state.comment)
              }

              this.props.showMessageInSnackBar(true,"Comment deleted !","success");
              this.props.refreshComments()
            }else{
                this.props.showMessageInSnackBar(true,"Error In deleting Comment, Try Again.","error");
            }
        
        }).catch(function(error){
            console.log(error);
          })
      }

                  
	componentDidUpdate(prevProps, prevState) {
		console.log('In Comment componentDidUpdate()...');
		console.log("Got prevProps, prevState : ")
		console.log(prevProps)
		console.log(prevState)
		if (prevState.comment.id !== this.state.comment.id) {
		  let updateSateObj = {
        comment : this.state.comment,
        showReplyInputBox : false,
        collapseRepliesDiv : false,
        replies : [],
        subcomments_count : this.state.comment.subcomments_count,
        
		  }
		  console.log("updateSateObj : ");
		  console.log(updateSateObj);
		  this.setState({updateSateObj})
    }else{
		  console.log("No State update : ");
		}
	  }
	  
	static getDerivedStateFromProps(nextProps, prevState){
		console.log('In Comment getDerivedStateFromProps()...');
		console.log("Got nextProps, prevState : ")
		console.log(nextProps)
		console.log(prevState)
		console.log("nextProps.comment.id :")
		console.log(nextProps.comment.id)
		if(nextProps.comment.id !== prevState.comment.id){
		  let returnNewValuesObj = {
        comment: nextProps.comment
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
    
    removeCommentFromRepliesArray = (commentToRemove) =>{
      var newReplies = this.state.replies.filter((c)=>{
        return c.id !== commentToRemove.id
      })
      
      console.log("removeCommentFromRepliesArray commentToRemove : ")
      console.log(commentToRemove)
      console.log("removeCommentFromRepliesArray newReplies : ")
      console.log(newReplies)
      this.setState({
        replies : newReplies,
        subcomments_count : newReplies.length
      })
    }

  render() { 
      const {
          state : { comment,student,showReplyInputBox,
                    collapseRepliesDiv,replies,subcomments_count,
                    loadingSubComments }
      } = this
    if(!this.state.isLoaded)
    {
      return <div >
        <LoadingSpinner />
      </div>;
    }else{
        return  <div className="">
            	<Media key ={comment.id} className=" mb-3">
                    
                    <img className="mr-3 rounded-circle"
                        src={comment.imageUrl !=null 
                            ? comment.imageUrl
                            : urls.apiUrl_ltiDemo +"/assets/images/people/110/guy-9.jpg"
                            }
                        alt="image" style={{width: '40px', height:'40px'}} />
                            <Media.Body className="">
                            <p> {comment.firstName} {comment.lastName} 
                              {
                                this.state.student.firstName+this.state.student.lastName+this.state.student.imageUrl
                                ===
                                comment.firstName+comment.lastName+comment.imageUrl
                                ?
                              <button type="button" 
                              className="btn btn-link pl-0" 
                              style={{float: 'right', color:'grey'}}
                              onClick={this.deleteCommentButtonClick}
                              >
                              <i className="material-icons"> delete </i></button>
                              : <span></span>  
                            }
                            </p>
                            <p style={{fontWeight: '400'}}>
                            {comment.comment}
                        </p>
                        <br />
                        {/* <button type="button" 
                        className="btn btn-link pl-0" 
                        style={{color: 'gray'}}
                        >
                        <i className="material-icons"> thumb_up </i> 0 Likes</button>
                        
                        &nbsp;&nbsp;  */}
                        { comment.subcomments_count 
                        ? 
                        <button type="button" 
                        className="btn btn-link pl-0" 
                        style={{color: 'gray'}}
                        onClick={ this.toggleReplyInputDiv}
                        >
                        <i className="material-icons"> reply </i>  Reply </button> 
                        : <span></span>
                        }
                        <div className="mt-4" >
                            <div className = "mb-2">
                            {
                                showReplyInputBox == true
                                ? <AddComment 
                                    post_id = {comment.post_id}
                                    comment_id = {comment.id} 
                                    showMessageInSnackBar={this.props.showMessageInSnackBar.bind(this)} 
                                    refreshComments={this.props.refreshComments.bind(this)} 
                                    addCommentToCommentsArray={this.addCommentToRepliesArray.bind(this)} 
                                    />
                                : <div></div>
                            }
                            </div>
                            <div>
                            <div>
                            {    subcomments_count > 0 
                                ? 
                                    collapseRepliesDiv != true 
                                    ? <span className="cursorPointer"
                                        onClick={ this.toggleRepliesDiv} 
                                      > View {
                                                    subcomments_count == 1 
                                                    ? <span>Reply</span> 
                                                    : <span>{subcomments_count} Replies</span>           
                                                  } 
                                        <i className="material-icons">keyboard_arrow_down</i>
                                     </span>
                                    : <span className="cursorPointer"
                                        onClick={ this.toggleRepliesDiv}
                                      > Hide {
                                                    subcomments_count == 1 
                                                    ? <span>Reply</span> 
                                                    : <span>{subcomments_count} Replies</span>           
                                                 }  
                                        <i className="material-icons">keyboard_arrow_up</i>
                                      </span>
                                  
                                : <div></div> 
                            }
                            </div >
                            {
                                collapseRepliesDiv == true 
                                ? 
                                    loadingSubComments == true
                                    ? <LoadingSpinner />
                                    :
                                    <div className="mt-2">
                                        {
                                            replies.map((c) => {
                                                return <Comment
                                                        key={c.id}
                                                        showMessageInSnackBar={this.props.showMessageInSnackBar.bind(this)} 
                                                        comment={c}
                                                        refreshComments={this.props.refreshComments.bind(this)} 
                                                        removeCommentFromRepliesArray={this.removeCommentFromRepliesArray.bind(this)} 
                                                        student = {student} />
                                            })
                                        }
                                    </div> 
                                : <div></div>
                            }
                            </div>
                        </div>
                            
                                
                            </Media.Body>
                        </Media>
        </div>
    
    }
  }
}

export default Comment;