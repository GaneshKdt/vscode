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
              postCommentText:"",
              savingPost : false,  
            }
        this.handlePostCommentTextChange = this.handlePostCommentTextChange.bind(this)
        this.saveComment = this.saveComment.bind(this)
        
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
        this.setState({ postCommentText: event.target.value })
      }
      saveComment = () => {
        
      const {
        state : {student,post_id,comment_id,postCommentText,showSnackBar,snackBarMessage,snackBarType},
      } = this
      if(this.state.postCommentText.trim() == ""){
        this.props.showMessageInSnackBar(true,"Add Valid Text.","error");
        
        return
      } 
        this.setState({ savingPost: true })
        console.log("In saveComment student : " );
        console.log(student);
        
        
        let commentToPost ={
            "sapid": student.sapid,
            "firstName": student.firstName,
            "lastName": student.lastName,
            "createdDate": new Date(),
            "post_id": post_id,
            "master_comment_id": 0,
            "imageUrl": student.imageUrl,
            "comment": postCommentText,
            "id": 0,
            "comment_id": ""+comment_id,
          }
          console.log("In saveComment created comment : ")
          console.log(commentToPost);

           commentToPost = this.saveCommentToDB(commentToPost);  
          
          console.log("In saveComment After saving to db : ")
          console.log(commentToPost);

          this.setState({ savingPost: false })
        
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
              commentToPost.id = id;
              //this.props.addCommentToCommentsArray(commentToPost);
        
              this.setState({
                  postCommentText: "",
              })
              this.props.showMessageInSnackBar(true,"Comment Posted Successfully !","success");
              this.props.refreshComments()
            }else{
                this.props.showMessageInSnackBar(true,"Error In Saving Comment, Try Again.","error");
            }


            return commentToPost

        }).catch((error) => {
            console.log(error);
            this.props.showMessageInSnackBar(true,"Error In Saving Comment, Try Again.","error");
            
            return commentToPost
        })

      }    
    
                  
	componentDidUpdate(prevProps, prevState) {
		console.log('In AddComment componentDidUpdate()...');
		console.log("Got prevProps, prevState : ")
		console.log(prevProps)
		console.log(prevState)
    if (prevState.post_id+'-'+prevState.comment_id !== 
        this.state.post_id+'-'+this.state.comment_id) {
		  let updateSateObj = {
        post_id:this.state.post_id,
        comment_id:this.state.comment_id,
        postCommentText:""
		  }
		  console.log("updateSateObj : ");
		  console.log(updateSateObj);
		  this.setState({updateSateObj})
		  this.refreshComments()
    }else{
		  console.log("No State update : ");
		}
	  }
	  
	  static getDerivedStateFromProps(nextProps, prevState){
		console.log('In AddComment getDerivedStateFromProps()...');
		console.log("Got nextProps, prevState : ")
		console.log(nextProps)
		console.log(prevState)
		console.log("nextProps.post_id :")
		console.log(nextProps.post_id)
    if(nextProps.post_id+'-'+nextProps.comment_id !== 
       prevState.post_id+'-'+prevState.comment_id){
      
        let returnNewValuesObj = {
        post_id: nextProps.post_id,
        comment_id: nextProps.comment_id
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
  

  render() { 
      const {
          state : { student, savingPost }
      } = this
    if(!this.state.isLoaded)
    {
        return <div > <LoadingSpinner /> </div>;
    }else{
        return  <div className="">
            
		<Media className=" mb-3">
        <img className="mr-3 rounded-circle" 
          
          src=
            {
              student.imageUrl != null 
              ? student.imageUrl
              : urls.apiUrl_ltiDemo + "/assets/images/people/110/guy01.jpg"
            }
        alt="image" style={{width: '40px', height:'40px'}} />
			  <Media.Body className="">
          <input type="text" 
            className="form-control mb-1 post-comment-input" 
            placeholder="Post a Comments..." 
            aria-label="comment"
            value={this.state.postCommentText}
            onChange={this.handlePostCommentTextChange}
           />
			  	<div className="float-right mt-2">
                  <Button
                    variant="primary"
                    disabled={savingPost}
                    className="btn btn-primary btn-sm"
                    onClick={!savingPost ? this.saveComment : null}
                  >
                  {!savingPost ? "Comment" : "saving..."}
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
		student: state
	}
}

export default connect(mapStateToProps)(AddComment)