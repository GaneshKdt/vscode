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
import './AddComment.css';
import 'material-design-icons/iconfont/material-icons.css';
import {   Redirect } from 'react-router-dom';
import LoadingSpinner from '../../../../shared/LoadingSpinner/LoadingSpinner';
import ConfigUrls from '../../../../shared/config'
import { MentionsInput, Mention } from 'react-mentions'
import {  API } from '../../../../shared/config'
import AxiosHandler from '../../../../shared/AxiosHandler/AxiosHandler'
import { Link } from 'react-router-dom'
import _clone from 'lodash/clone'

const urls = new ConfigUrls().urls;

//const BASE_API_URL ="https://uat-studentzone-ngasce.nmims.edu"
//const BASE_API_URL ="http://localhost:8080"
//const BASE_API_URL ="http://10.100.100.92:8080"
//const BASE_API_URL ="http://localhost:8080"

class AddComment extends Component {
    constructor(props) {
        super(props)
        this.state = {
              student : this.props.student,
              post_id : this.props.post_id,
              comment_id : this.props.comment_id,
              error: null,
              isLoaded: false,
              postCommentText:(this.props.comment!=null)?this.props.comment:"",
              savingPost : false,  
              displayInputComment : "none",
              id:(this.props.id!=null)?this.props.id:0,
              commentToBeEdited : this.props.commentToBeEdited ? this.props.commentToBeEdited  :false,
              isSubComment : this.props.isSubComment,
              master_comment_id : this.props.master_comment_id
            }
        this.handlePostCommentTextChange = this.handlePostCommentTextChange.bind(this)
        this.saveComment = this.saveComment.bind(this)
        
    }
    componentWillReceiveProps(nextprops){
      this.props=nextprops
      if(this.props.focusAddComment){
        this.textInput.focus();
       
      }
    } 
      componentDidMount(){
            console.log('>>>>>> In AddComment componentDidMount()...');
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
      
      handlePostCommentTextChange = (event) => {
          console.log('--------------------->handlePostCommentTextChange')
        this.setState({ postCommentText: event.target.value,
            displayInputComment:""
        })
      }

      cancelComment = () => {
        this.setState({
            displayInputComment : "none"
        })
        if(this.props.editComment)
        this.props.editComment()
      }
      saveComment = () => {
        
      const {
        state : {student,post_id,comment_id,postCommentText,showSnackBar,snackBarMessage,snackBarType,id},
      } = this
      if(this.state.postCommentText.trim() == ""){
        this.props.showMessageInSnackBar(true,"Add Valid Text.","error");
        
        return
      } 
        this.setState({ savingPost: true })
        console.log("In saveComment student : " );
        console.log(student);
         let mentioned_users = this.getMentionedUsers(postCommentText)
        
        let commentToPost ={
            "sapid": student.sapid,
            "firstName": student.firstName,
            "lastName": student.lastName,
            "createdDate": Date.now(),
            "post_id": this.state.post_id,
            "master_comment_id": 0,
            "imageUrl": student.imageUrl,
            "comment": postCommentText,
            "id": id,
            "comment_id": ""+comment_id,
            "mentioned_users": mentioned_users

          }
          
          if(!this.state.commentToBeEdited){
              
           if(this.state.comment_id > 0  ){
              commentToPost.master_comment_id = this.state.comment_id;
           }else {
              commentToPost.master_comment_id = 0;
           }

          }else{
            if(this.state.isSubComment){
              commentToPost.comment_id = this.state.master_comment_id;
            }else{
               commentToPost.comment_id = 0;
            }
          }



          console.log("In saveComment created comment : ")
          console.log(commentToPost);

         commentToPost = this.saveCommentToDB(commentToPost);  
          
          console.log("In saveComment After saving to db : ")
          console.log(commentToPost);

      }
      
      saveCommentToDB = (commentToPost) => {
   
        console.log("IN saveCommentToDB() ");
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_ltiDemo + "/submitComment",  
        JSON.stringify(commentToPost)
        ).then( response => {
            
            console.log("saveCommentToDB response : ")
            console.log(response);

            let id = response.data.id;
            
            //console.log("id : "+id );
            //console.log("isNaN(id) : "+isNaN(id));
            
            if(!isNaN(id)){
              commentToPost.commentId = id;
              //this.props.addCommentToCommentsArray(commentToPost);
        
              this.setState({
                  postCommentText: "",
                  savingPost : false,
              })
              
          if(!this.state.commentToBeEdited){
              this.props.addCommentToCommentsArray(commentToPost);
          }else{
            this.props.updateCommentOnEdit(commentToPost);
            this.props.editComment();
          }
              this.props.showMessageInSnackBar(true,"Comment Posted Successfully !","success");
              //this.props.refreshComments() 
              //this.props.refreshReaction()
            }else{
                this.props.showMessageInSnackBar(true,"Error In Saving Comment, Try Again.","error");
            }


            return commentToPost

        }).catch((error) => {
            console.log(error);
            this.props.showMessageInSnackBar(true,"Error In Saving Comment, Try Again.","error");
            
            this.setState({
              postCommentText: "",
              savingPost : false,
          })
            return commentToPost
        })

      }         
        
        renderSuggestion = (id, display, search, suggestion,highlightedDisplay,imageUrl) => {
          return (
            <div className="suggestion-item">
               <img 
              style={{borderRadius:"10px"}}
          src=
            {
              id.imageUrl != null 
              ? id.imageUrl
              : urls.apiUrl_ltiDemo + "/assets/images/people/110/guy01.jpg"
            }
        alt="image" height="20px"  width="20px" /> &ensp;
               {id.display}
            </div>
          );
        }

        displayTransform = (id,display) =>  {
        
        return `@${display}`      
        }
       
        getMentionedUsers = (text)  =>  {
          let displayText = _clone(text)
          return text.match(/@\{\{[^\}]+\}\}/gi) || []        
        }

  render() { 
    const userMentionData = this.props.mentionUsers.map(myUser => ({
      id: myUser.sapId,
      display: `${myUser.firstName} ${myUser.lastName}`,
      imageUrl:  myUser.imageUrl
    }))
      const {
          state : { student, savingPost,displayInputComment ,postCommentText}
      } = this
    if(!this.state.isLoaded)
    {
        return <div > <LoadingSpinner /> </div>;
    }else{
        return  <div className="" >
            
		<Media>
      <div className="circular-portrait mr-3" >
        <img 
          
          src=
            {
              student.imageUrl != null 
              ? student.imageUrl
              : urls.apiUrl_ltiDemo + "/assets/images/people/110/guy01.jpg"
            }
        alt="image"  /></div>
			  <Media.Body className="">

          <MentionsInput
            type="text" 
            className="form-control mb-1 focused mentions-input" 
            placeholder="Write a Comment..." 
            aria-label="comment"
            value= {postCommentText}
            onChange={this.handlePostCommentTextChange}
            style = {{backgroundColor:'#fff'}} 
           
            inputRef ={(input) => { this.textInput = input; }} 
           >
            <Mention
            trigger="@"
            data={userMentionData}
            renderSuggestion={this.renderSuggestion}
            markup="@{{__id__||__display__}}"            
            appendSpaceOnAdd={true}                        
            displayTransform={this.displayTransform}
            />
          </MentionsInput>  

          {/* <input type="text" 
            className="form-control mb-1 focused" 
            placeholder="Write a Comment..." 
            aria-label="comment"
            value= {postCommentText}
            onChange={this.handlePostCommentTextChange}
            style = {{backgroundColor:'#fff'}} ref={(input) => { this.textInput = input; }}
           /> */}

			  	<div className="float-right mt-2"  style={{display:displayInputComment}}>
                  <a 
                    variant="primary"
                    disabled={savingPost}
                    className="cancelBtn"
                    onClick={!savingPost ? this.cancelComment : null
                    }
                  >
                  {!savingPost ? "Cancel" : " "}
                  </a> 
                  <Button
                    variant="primary"
                    disabled={savingPost}
                    className="btn btn-primary btn-sm"
                    onClick={!savingPost ? this.saveComment : null}
                  >
                    {(this.props.editComment)?" Save ":
                  !savingPost ? "Comment" : "saving..."}
                  </Button>
               	</div>
			  </Media.Body>
			</Media>
        </div>
    
    }
  }
}

const mapStateToProps = state => {
	return {
    student: state,
    mentionUsers: state.contacts 
	}
}
const usersName={ 
  fontWeight: '500',
  fontSize:'14px',   
  lineHeight: '20px'
}
export default connect(mapStateToProps)(AddComment)