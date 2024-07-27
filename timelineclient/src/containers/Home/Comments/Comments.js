import React, { Component } from 'react';
import { Route } from 'react-router-dom'
 
import axios from 'axios'
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner';
import SnackBarAlert from '../../../shared/SnackBarAlert/SnackBarAlert';
import Col from 'react-bootstrap/Col';
import './Comments.css';
import 'material-design-icons/iconfont/material-icons.css';
import {   Redirect } from 'react-router-dom';
import Comment from './Comment/Comment';
import AddComment from './AddComment/AddComment';
import ConfigUrls from '../../../shared/config'
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const urls = new ConfigUrls().urls;

//const BASE_API_URL ="https://uat-studentzone-ngasce.nmims.edu"
//const BASE_API_URL ="http://localhost:8080"
//const BASE_API_URL ="http://10.100.100.92:8080"
// const BASE_API_URL ="http://localhost:8080"

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
          student : this.props.student,
          post_id : this.props.post_id,
          error: null,
          isLoaded: false,
          isCommentsLoaded: false,
          comments : this.props.postComments,
          commentsLimit : 1,
          commentsOffset : 0,
          loadingMoreComments : false,
          noMoreCommnetsToLoad : true,
          showSnackBar : true,
          snackBarType : "",
          snackBarMessage : "",
          showComments:false,
          commentIndex:3,
          limit:3,
          commentViewMoreText:"View More Comments"
        }
    

  }

  componentDidMount(){
    // // console.log("post_id");
    // // console.log(this.state.post_id);
    // // console.log("student");
    // // console.log(this.state.student);
    // // console.log('In Comments componentDidMount()...');
    //this.loadComments();
    this.setState({ isLoaded: true, isCommentsLoaded: true })
    
    console.log("Comments componentDidMount() : ");
    console.log(this.state);
}


      
      // addToCommentsArray = (postCommentText) =>{
      //   var newlyPostedComment = {
      //     "firstName": "Shubham",
      //     "lastName": "Abbott",
      //     "post_id": "57",
      //       "master_comment_id": 0,
      //       "imageUrl": "http://admissions-ngasce.nmims.edu:4001/StudentDocuments/00190000025PrZQ/00190000025PrZQ_h9Xb_Picture.jpg",
      //       "comment": this.state.postCommentText,
      //       "id": 4,
      //       "subcomments_count": 2
      //   }
      //   // console.log("addToCommentsArray before comments : ")
      //   // console.log(commentsInState);
      //   newComments.map((c) => {
      //     var isCommentInArray = false;
      //     commentsInState.map((cS) => {
      //       if( c.id === cS.id ){
      //         isCommentInArray= true;
      //       }
      //     })
      //     if(!isCommentInArray){
      //       commentsInState.push(c)
      //     }
      //   } )    
      //   // console.log("addToCommentsArray comments : ")
      //   // console.log(commentsInState);
      //   return commentsInState;
      // }

      // addToCommentsArray = (newComments) =>{
      //   var commentsInState = this.state.comments;
      //   // console.log("addToCommentsArray before comments : ")
      //   // console.log(commentsInState);
      //   newComments.map((c) => {
      //     var isCommentInArray = false;
      //     commentsInState.map((cS) => {
      //       if( c.id === cS.id ){
      //         isCommentInArray= true;
      //       }
      //     })
      //     if(!isCommentInArray){
      //       commentsInState.push(c)
      //     }
      //   } )    
      //   // console.log("addToCommentsArray comments : ")
      //   // console.log(commentsInState);
      //   return commentsInState;
      // }

      hideSnackBar = () => {
        this.setState({
          showSnackBar : false,
        })
      }

       loadmoreComments = () => {
        this.setState({commentViewMoreText:"View More Comments"})
        var length = this.state.comments.length
        var limit = this.state.limit
        var index=this.state.commentIndex
        if(index==length){//for hide post onclick
          this.setState({
            commentIndex:limit
          })
        }
       else if(length-(index)>=0){//when theres more comments to load
        this.setState({
          commentIndex:length
        })
        //when all posts loaded
        this.setState({commentViewMoreText:"Hide Comments"})
       }
      }

      showMessageInSnackBar = (showSnackBar,snackBarMessage,snackBarType) => {
        
        this.setState({  
          showSnackBar : showSnackBar,
          snackBarMessage: snackBarMessage,
          snackBarType: snackBarType,
        })

      }

      addCommentToCommentsArray = (commentToPost) => {
        // console.log("IN comments addCommentToCommentsArray()  ");
        // this.setState({
        //   comments : [
        //     commentToPost,
        //     ...this.state.comments,  
        //     ],
        // })

        
        this.setState(state => {
          const comments = [...state.comments, commentToPost];
          return {
            comments
          };
        });

      }

      getUpdatedCommentsOffset(){
        // console.log("In getUpdatedCommentsOffset : ");
        var offsetFromState = this.state.commentsOffset;
        // console.log("offsetFromState : "+offsetFromState);
        var limitFromState = this.state.commentsLimit;
        // console.log("limitFromState : "+limitFromState);
        var updatedOffset = limitFromState + offsetFromState;
        // console.log("updatedOffset : "+updatedOffset);
        
        return updatedOffset;
      }
      refreshComments = () =>{
        this.setState({ 
          isLoaded: false,
          isCommentsLoaded: false,
          comments : [],
          commentsLimit : 1,
          commentsOffset : 0, 
          loadingMoreComments : false,
          noMoreCommnetsToLoad : false
        }, function () {
          this.loadComments()
          this.setState({ isLoaded: true })
     });
      } 
      loadComments2 = () => {
        this.setState({ loadingMoreComments : true })
        // console.log(this.state.comments);
        // console.log(urls.apiUrl_ltiDemo + "/viewMoreComments");
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_ltiDemo + "/viewMoreComments",
        JSON.stringify({	
          "post_id" :this.state.post_id,
          "limit" : "" + 4,
          "offset" : ""  + this.state.commentsOffset  
        })
        ).then( response => {
            
            // console.log("getComments OnLoad response : ")
            // console.log(response);
          
            if(response.data.comments.length > 0 ) {
                  this.setState({
                    showComments:!this.state.showComments,
                    comments : [
                      ...this.state.comments,
                      ...response.data.comments,  
                      ],
                      
                      isCommentsLoaded: true,
                      commentsOffset : 4 + this.state.commentsOffset,
                      loadingMoreComments : false,
                      loadMoreDivYOffset: this.refs.loadMoreDiv.getBoundingClientRect().top,                  
                      allCommentsLoaded: false
                    });
                    if(response.data.comments.length < 4 ){
                      this.setState({
                        noMoreCommnetsToLoad: true,
                        allCommentsLoaded : true,
                      })
                    }
            }else{
              this.setState({
                noMoreCommnetsToLoad: true,
                loadingMoreComments : false,
              })
            }
        
        // console.log("getComments OnLoad comments : ")
        // console.log(this.state.comments);
        
        this.setState({
          isCommentsLoaded: true
        })

        }).catch(function(error){
            // console.log(error);
        })

// let loadMoreDivYOffset = this.refs.loadMoreDiv.getBoundingClientRect().top;
//var waitTillMoreCommnetsLoad = false;   
      };

      
    removeCommentFromCommentsArray = (commentToRemove) =>{
      var newReplies = this.state.comments.filter((c)=>{
        return c.commentId !== commentToRemove.commentId
      })
      
      // console.log("removeCommentFromRepliesArray commentToRemove : ")
      // console.log(commentToRemove)
      // console.log("removeCommentFromRepliesArray newReplies : ")
      // console.log(newReplies)
      this.setState({
        comments : newReplies
      })
    }

      componentWillReceiveProps(nextprops){
        this.props=nextprops
        if(this.props.expandComment){
          //this.loadComments2()
          //this.refreshComments();
          //this.loadComments2();
        }else{
          //this.refreshComments()
        }
        this.setState({
          comments : this.props.postComments
        })
        console.log("Comments componentWillReceiveProps() : ");
        console.log(this.state.comments);
      }
      loadComments = () => {
        this.setState({ loadingMoreComments : true })
        // console.log(this.state.comments);
        // console.log(urls.apiUrl_ltiDemo + "/viewMoreComments");
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_ltiDemo + "/viewMoreComments",
        JSON.stringify({	
          "post_id" :this.state.post_id,
          "limit" : "" + this.state.commentsLimit,
          "offset" : ""  + this.state.commentsOffset  
        })
        ).then( response => {
            
            // console.log("getComments OnLoad response : ")
            // console.log(response);
            //alert(response.data.commentCount)
            if(response.data.commentCount > response.data.comments.length ) {
              this.setState({
              allCommentsLoaded: false
              })
            }else{
              this.setState({
                allCommentsLoaded: true
                })
            }
            if(response.data.comments.length > 0 ) {
                  this.setState({
                    comments : [
                      ...this.state.comments,
                      ...response.data.comments,  
                      ],
                      
                      isCommentsLoaded: true,
                      commentsOffset : this.state.commentsLimit + this.state.commentsOffset,
                      loadingMoreComments : false,
                      loadMoreDivYOffset: this.refs.loadMoreDiv.getBoundingClientRect().top,                  
                      
                    });
              
            }else{
              this.setState({
                noMoreCommnetsToLoad: true,
                loadingMoreComments : false,
              })
            }
        
        // console.log("getComments OnLoad comments : ")
        // console.log(this.state.comments);
        
        this.setState({
          isCommentsLoaded: true
        })

        }).catch(function(error){
            // console.log(error);
        })

// let loadMoreDivYOffset = this.refs.loadMoreDiv.getBoundingClientRect().top;
//var waitTillMoreCommnetsLoad = false;   
      };
   
  render() { 
    const { student,savingPost,snackBarType,
            snackBarMessage,showSnackBar,post_id } = this.state;
    if(!this.state.isLoaded)
    {
      return <LoadingSpinner />
    }else
    {    
        return  <div className="">
     
    {!this.state.isCommentsLoaded && 
    <LoadingSpinner />

    }
    {
     !this.state.noMoreCommnetsToLoad ?<div className="show-more-comments pt-1" onClick={this.props.expandComments}>view comments</div>:<></>
    }
    {
      
     this.state.comments.slice((this.state.comments.length-this.state.commentIndex), this.state.comments.length).map((comment) => {
      return <>
                
      <div key={comment.commentId} className="comment" > 
              <Comment
               showMessageInSnackBar={this.showMessageInSnackBar.bind(this)} 
               comment={comment}
               student = {student} 
               refreshComments={this.refreshComments.bind(this)} 
               refreshReaction={this.props.refreshReaction}
               loadPosts = {this.props.loadPosts.bind(this)}
               post_id ={post_id}
               removeCommentFromCommentsArray={this.removeCommentFromCommentsArray.bind(this)} 
                              
               />
              </div>
      </>
      

    }) 
    }

 

 


      
    
    
   
    
    {  
      this.state.comments.length>3 
    ? <div className="show-more-comments" onClick={this.loadmoreComments}>{this.state.commentViewMoreText}</div>
      :<></>
    }
    
   <hr className="divider"/>
   <div style={{padding: '15px 5px 15px 14px'}}>
    <AddComment focusAddComment={this.props.focusAddComment} refreshReaction={this.props.refreshReaction}
          student = {student}
          post_id = {post_id}
          comment_id = "0" 
          showMessageInSnackBar={this.showMessageInSnackBar.bind(this)} 
          refreshComments={this.refreshComments.bind(this)} 
          addCommentToCommentsArray={this.addCommentToCommentsArray.bind(this)} 
        />
    </div>
          
    {
      ( showSnackBar && snackBarMessage !="" )
      ? <SnackBarAlert 
          hideSnackBar={this.hideSnackBar.bind(this)} 
          type={snackBarType} 
          message={snackBarMessage} />    
      : <div></div>
    }
  </div>
  
  }
}
}

export default Comments;

