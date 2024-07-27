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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Comment.css';
import 'material-design-icons/iconfont/material-icons.css';
import {   Redirect } from 'react-router-dom';
import LoadingSpinner from '../../../../shared/LoadingSpinner/LoadingSpinner';
import Container from 'react-bootstrap/Container';
import AddComment from '../AddComment/AddComment';
import ConfigUrls from '../../../../shared/config'
import { confirmAlert } from 'react-confirm-alert';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Moment from 'react-moment'
import adminDefaultImage from '../../Assets/Default-Logo/admin.png'
import FbReactions from '../../../../containers/FbReactions/FbReactions'
import '../../../../containers/FbReactions/newReaction.scss'
import { Link } from 'react-router-dom'
import { RFC_2822 } from 'moment';
import { FeedCardHeaderDate } from '../../../../shared/MomentHelper/TimestampDate';
import _clone from 'lodash/clone'
import _escapeRegExp from 'lodash/escapeRegExp'


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
        replies : this.props.comment.replies ?  this.props.comment.replies : [],
        subcomments_count : this.props.comment.replies ? this.props.comment.replies.length : 0,
        loadingSubComments : false,
        isSubComment:this.props.comment.master_comment_id > 0 ? true : false,
        showEditComment:false,
        myReaction:"",
        totalReactionCount:0,
        reactions:[]
      };
    
      
      addCommentToRepliesArray = (commentToPost) => {
         console.log("IN addCommentToRepliesArray got : ")
         console.log(commentToPost)
        this.setState({
            replies : [
            ...this.state.replies, 
            commentToPost 
            ],
            subcomments_count : this.state.subcomments_count + 1
        })
      }
      
      
      loadSubComments = () => {
        // console.log("IN loadSubComments called...")
        this.setState({ loadingSubComments : true })
        // console.log(this.state.replies);
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_ltiDemo + "/subComments",
        JSON.stringify({	
          "id" : ""+this.state.comment.id ,
          "offset":1 ,
          "limit":500
        })
        ).then( response => {
            
            // console.log("loadSubComments  response : ")
            // console.log(response);
          
            if(response.data.comments.length > 0 ) {
                this.setState({
                    replies : []
                })
                  
                  this.setState({
                    replies : response.data.comments,
                      loadingSubComments : false
                    });
              
              
            }
        
            // console.log("loadSubComments after response : ")
            // console.log(this.state.replies);
        
        this.setState({
          isCommentsLoaded: true
        })

        }).catch(function(error){
            // console.log(error);
        })

// let loadMoreDivYOffset = this.refs.loadMoreDiv.getBoundingClientRect().top;
//var waitTillMoreCommnetsLoad = false;   
      };

      componentDidMount(){
            // console.log('>>>>>> In Comment componentDidMount()...');
            this.setState({
                isLoaded: true
                })
            // axios.defaults.headers.post['Content-Type'] = 'application/json';
            // axios.post(BASE_API_URL+"/studentportal/getFacultyDetails", 
            // JSON.stringify({
            //     "userId": this.props.facultyId
            // })
            // ).then( response => {
            //   // console.log("Got reponse data : ");
            //   // console.log(response.data);
             
            // }).catch(function(error){
            //   // console.log(error);
            // })
            this.getCommentAndReactions();
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
        //this.loadSubComments();
      }
      
      deleteCommentButtonClick = () => {
        
        // console.log("IN deleteCommentButtonClick got commentId : ")
        // console.log(this.state.comment.id)
        
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
          "id" : ""+this.state.comment.commentId  
        })
        ).then( response => {
            
            // console.log("deleteCommentButtonClick  response : ")
            // console.log(response);
          
            if(response.data.success === "true" ) {

              if(!isNaN(this.state.comment.commentId) && this.state.comment.commentId !== 0){
                if(this.state.isSubComment){
                  this.props.removeCommentFromRepliesArray(this.state.comment)
                }else{
                  this.props.removeCommentFromCommentsArray(this.state.comment)
                }  
              
              }


              this.props.showMessageInSnackBar(true,"Comment deleted !","success");
              //this.props.refreshComments() 
              //this.props.refreshReaction() 
            }else{
                this.props.showMessageInSnackBar(true,"Error In deleting Comment, Try Again.","error");
            }
        
        }).catch(function(error){
            // console.log(error);
          })
      }

                  
	componentDidUpdate(prevProps, prevState) {
		// console.log('In Comment componentDidUpdate()...');
		// console.log("Got prevProps, prevState : ")
		// console.log(prevProps)
		// console.log(prevState)
		if (prevState.comment.id !== this.state.comment.id) {
		  let updateSateObj = {
        comment : this.state.comment,
        showReplyInputBox : false,
        collapseRepliesDiv : false,
        replies : [],
        subcomments_count : this.state.comment.subcomments_count,
        
		  }
		  // console.log("updateSateObj : ");
		  // console.log(updateSateObj);
		  this.setState({updateSateObj})
    }else{
		  // console.log("No State update : ");
		}
	  }
	  
	static getDerivedStateFromProps(nextProps, prevState){
		// console.log('In Comment getDerivedStateFromProps()...');
		// console.log("Got nextProps, prevState : ")
		// console.log(nextProps)
		// console.log(prevState)
		// console.log("nextProps.comment.id :")
		// console.log(nextProps.comment.id)
		if(nextProps.comment.id !== prevState.comment.id){
		  let returnNewValuesObj = {
        comment: nextProps.comment
		  }
		  // console.log("returnNewValuesObj : ");
		  // console.log(returnNewValuesObj);
		 return returnNewValuesObj;
		}
		else { 
		  // console.log("returning null : ");
		  return null;
		}
	  }
    
    removeCommentFromRepliesArray = (commentToRemove) =>{
      
      var newReplies = this.state.replies.filter((c)=>{
        return c.commentId != commentToRemove.commentId
      })
     
      // console.log("removeCommentFromRepliesArray commentToRemove : ")
      // console.log(commentToRemove)
      // console.log("removeCommentFromRepliesArray newReplies : ")
      // console.log(newReplies)
      this.setState({
        replies : newReplies,
        subcomments_count : newReplies.length
      })
    }

    editComment=()=>{
      this.setState({
        showEditComment:!this.state.showEditComment
      })
    }

    
    updateCommentOnEdit=(editedComment)=>{
      let commnetToSetInState = this.state.comment;
      commnetToSetInState.comment = editedComment.comment;
      
      this.setState({
        comment : commnetToSetInState
      })

    }

    getCommentAndReactions = () => {
      this.setState(
          { isLoading: true },
          () => {
              axios.defaults.headers.post['Content-Type'] = 'application/json';
              axios.post(urls.apiUrl_ltiDemo+"getCommentAndReactions",
                  JSON.stringify({
                    "post_id": this.state.comment.commentId,
                    "role": "Student",
                    "sapid":this.state.student.sapid,
                    'postType':'comment'
                  })
              ).then(response => {
                  console.log('--------------------------->Loaded comments and reactions in comment')
                  this.setState({
                      reactions: response.data.reactions,
                      totalReactionCount: response.data.reactionCount,
                      commentCount: response.data.commentCount,
                      myReaction: response.data.myReaction
                  })
              }).catch(function (error) {
                  console.log(error);
              })
          }
      )
  }
  handleSetReaction = (emoji) => {
    this.setState({ reaction:  emoji});
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(urls.apiUrl_ltiDemo+"/getReactionCount",
    JSON.stringify({
        'sapid' : this.state.student.sapid,
        'reactionType' : emoji,
        'post_id': this.state.comment.commentId,
        'postType':'comment'
      })
    ).then( response => {
        console.log(response);
        this.setState({ 
            totalReactionCount:  response.data.reactionCount
            
        });
        this.setState({
            reactions:response.data.reactions,
            myReaction:emoji
        })    
    }).catch((error) => {
        console.log(error);
    })    
  }
   
  swapTags = (text)  =>  {
    let displayText = _clone(text)
    const tags = text.match(/@\{\{[^\}]+\}\}/gi) || []
    tags.map(myTag => {
      const tagData = myTag.slice(3, -2)
      const tagDataArray = tagData.split('||')

      var redirectProfile = (tagDataArray[0].slice(0,1)==7)?"studentProfile":"instructorProfile"
      const tagDisplayValue = `<a href=\"/timeline/${redirectProfile}?id=${tagDataArray[0]}\">${tagDataArray[1]}</a>`
  
      displayText = displayText.replace(new RegExp(_escapeRegExp(myTag), 'gi'), tagDisplayValue)
    })
    return displayText
  }

  render() { 
      const {
          state : { comment,student,showReplyInputBox,
                    collapseRepliesDiv,replies,subcomments_count,
                    loadingSubComments,showEditComment,myReaction,reactions }
      } = this
      //setting value for reaction button to toggle react unreact
      const likeOrUnlike=myReaction?"":"like"  
      console.log("subcomments_count")
      console.log(subcomments_count)
      var now =new Date()

      //check user id and decide user profile link
      var userProfile = (comment.sapid.slice(0,1)==7)?"studentProfile":"instructorProfile"

      if(!this.state.isLoaded)
      {
        return <div >
          <LoadingSpinner />
        </div>;
      }else{
          return  <div>
          <div > 
          <div className="commentAction">
          {this.state.student.sapid === comment.sapid &&
              <>
                <NavDropdown className="float-right" title={<span class="reply-caret"><FontAwesomeIcon icon="ellipsis-h"/></span>}  id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={this.editComment}> {showEditComment?'Undo Edit':'Edit Comment'}</NavDropdown.Item>
                  <NavDropdown.Item onClick={this.deleteCommentButtonClick}>Delete Comment</NavDropdown.Item>
                </NavDropdown><br/>
              </>
            }
            </div>             
            	<Media key ={comment.id} style={{display:(showEditComment?'none':'flex')}}>
                    <div className="circular-portrait mr-3 ">
                      <img 
                        src={comment.imageUrl !=null 
                            ? comment.imageUrl 
                            : adminDefaultImage
                            }
                        alt="image" />
                        </div>
                            <Media.Body >
                            <Link to={{pathname:'/timeline/'+userProfile,state: { userId: comment.sapid}}} style={usersName}><b className="cursor">{comment.firstName} {comment.lastName} </b></Link>
                            <div className="comment-word-break d-flex"> 
                             
                            <div className="float-left">
                              {/* <p>{comment.comment}</p>  */}
                              <p dangerouslySetInnerHTML = {{__html: this.swapTags(comment.comment)}}/>
                              </div>
                                                  <div className="float-right" style={{alignSelf: 'flex-end'}}>
                                {(reactions.length>0) &&

                                  <span className="reactionsBadge" >

                                    { reactions.map(reaction => {
                                    return <span  className={"reactionButton emoji "+reaction} style={{width: '20px'}}></span>
                                    })}

                                    <span style={{marginLeft:'3px',float: 'right'}}>{this.state.totalReactionCount}</span>

                                  </span> 
                                  }
                                </div>

                            </div> 
                            <div className="replyFooter"  >
                              <FbReactions handleSetReaction={this.handleSetReaction} myReaction={myReaction} likeOrUnlike={likeOrUnlike} />
                              <span className="btn noPaddingLeft" style={{color:'#8b8e9f',fontSize:'14px'}}>
                                
                                <div className="float-left"> 
                                {!this.state.isSubComment?
                                <><span className="dot "></span><span className="cursorPointer" onClick={ this.toggleReplyInputDiv}>Reply</span></>:<></>
                                }
                                </div>
                               
                               <div className="float-left">
                                 <span className="dot"></span>
                                  <span> 
                                  <FeedCardHeaderDate date={comment.createdDate} /> 
                                  {/* (now.subtractDays(7)<comment.createdDate)?<Moment fromNow >{comment.createdDate}</Moment> 
                                  : <FormattedDate date={comment.createdDate} />  
                                  */}
                                  </span>
                                </div> 

                                
                              </span>
                            </div>
                        {/* <button type="button" 
                        className="btn btn-link pl-0" 
                        style={{color: 'gray'}}
                        >
                        <i className="material-icons"> thumb_up </i> 0 Likes</button>
                        
                        &nbsp;&nbsp;  */}
                     
                        <div className="" >
                            <div className = "mb-2">
                            {
                                showReplyInputBox == true
                                ? <div style={{padding: '15px 15px'}}>
                                  <AddComment 
                                    post_id = {this.props.post_id}
                                    comment_id = {comment.commentId} 
                                    showMessageInSnackBar={this.props.showMessageInSnackBar.bind(this)} 
                                    refreshComments={this.props.refreshComments.bind(this)} 
                                    addCommentToCommentsArray={this.addCommentToRepliesArray.bind(this)} 
                                    loadPosts = {this.props.loadPosts.bind(this)}
                                    
                                    />
                                    </div>
                                : <div></div>
                            }
                            </div>
                            <div>
                            <div>
                            {    subcomments_count > 0 
                                ? 
                                    collapseRepliesDiv != true 
                                    ? <span className="viewReply "
                                        onClick={ this.toggleRepliesDiv} 
                                      > View  {
                                                    subcomments_count == 1 
                                                    ? <span>1 Reply</span> 
                                                    : <span>{subcomments_count} Replies</span>           
                                                  } 
                                        <FontAwesomeIcon  className="ml-2" icon="chevron-down"/>
                                      </span>
                                    : <span className="viewReply"
                                        onClick={ this.toggleRepliesDiv}
                                      > Hide {
                                                    subcomments_count == 1 
                                                    ? <span >1 Reply</span> 
                                                    : <span>{subcomments_count} Replies</span>           
                                                 }  
                                        <FontAwesomeIcon  className="ml-2" icon="chevron-up"/>
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
                                                        isSubComment={true}
                                                        showMessageInSnackBar={this.props.showMessageInSnackBar.bind(this)} 
                                                        comment={c}
                                                        post_id = {this.props.post_id}
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
        <div style={{
          display:(showEditComment?'block':'none'),paddingRight: '35px'
          }}>
            <AddComment 
              editComment={this.editComment.bind(this)}
              updateCommentOnEdit={this.updateCommentOnEdit.bind(this)}  
              comment= {comment.comment} 
              id={comment.commentId} 
              createdDate={comment.createdDate}
              post_id = {this.props.post_id}
              comment_id = {comment.commentId} 
              showMessageInSnackBar={this.props.showMessageInSnackBar.bind(this)} 
              refreshComments={this.props.refreshComments.bind(this)} 
              addCommentToCommentsArray={this.addCommentToRepliesArray.bind(this)} 
              commentToBeEdited = {true}
              isSubComment = {this.state.isSubComment}
              master_comment_id = {comment.master_comment_id}
          />
            </div>

        </div>
    
    }
  }
}
const usersName={ 
  fontWeight: '500',
  fontSize:'14px',   
  lineHeight: '20px'
}
const allreactions={padding:' 0.5rem 0.6rem'} 
Date.prototype.subtractDays= function(h){
  this.setDate(this.getDate()-h);
  return this;
}

export default Comment;