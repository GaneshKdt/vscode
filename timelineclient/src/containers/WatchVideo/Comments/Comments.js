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
          comments : [],
          commentsLimit : 1,
          commentsOffset : 0,
          loadingMoreComments : false,
          noMoreCommnetsToLoad : false,
          showSnackBar : true,
          snackBarType : "",
          snackBarMessage : "",
        }
    
    window.onscroll = () => {

      const {
        loadComments,
        state : {post_id,
        error,
        isLoaded,
        isCommentsLoaded,
        comments,
        postCommentText,
        savingPost,
        commentsLimit,
        commentsOffset,
        loadingMoreComments,
        noMoreCommnetsToLoad,
        },
      } = this  
      // console.log("window.pageYOffset  :"+window.pageYOffset);
      // console.log("window.height  :"+window.innerHeight );
      // console.log("this.refs.loadMoreDiv.getBoundingClientRect().top :"+this.refs.loadMoreDiv.getBoundingClientRect().top);
      // console.log("loadMoreDivYOffset : "+loadMoreDivYOffset);
      
     if( loadingMoreComments || noMoreCommnetsToLoad ) return

     let loadMoreDivYOffset = 0;
     try{
     loadMoreDivYOffset = this.refs.loadMoreDiv.getBoundingClientRect().top;
     }catch(err){
      console.log('get loadMoreDivYOffset error :');
      console.log(err);
     } 
     if (window.pageYOffset + window.innerHeight >=
            loadMoreDivYOffset + 200){
              console.log('---------->loadComments')

              loadComments();
        }
    }
  }

  componentDidMount(){
    console.log('In Comments componentDidMount()...');
    console.log("post_id");
    console.log(this.state.post_id);
    console.log("student");
    console.log(this.state.student);
    this.loadComments();
    this.setState({ isLoaded: true })
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
      //   console.log("addToCommentsArray before comments : ")
      //   console.log(commentsInState);
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
      //   console.log("addToCommentsArray comments : ")
      //   console.log(commentsInState);
      //   return commentsInState;
      // }

      // addToCommentsArray = (newComments) =>{
      //   var commentsInState = this.state.comments;
      //   console.log("addToCommentsArray before comments : ")
      //   console.log(commentsInState);
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
      //   console.log("addToCommentsArray comments : ")
      //   console.log(commentsInState);
      //   return commentsInState;
      // }

      hideSnackBar = () => {
        this.setState({
          showSnackBar : false,
        })
      }

      showMessageInSnackBar = (showSnackBar,snackBarMessage,snackBarType) => {
        
        this.setState({  
          showSnackBar : showSnackBar,
          snackBarMessage: snackBarMessage,
          snackBarType: snackBarType,
        })

      }

      addCommentToCommentsArray = (commentToPost) => {
        // this.setState({
        //   comments : [
        //     ...this.state.comments,
        //     commentToPost  
        //     ],
        // })
        this.setState(state => {
          const comments = [...state.comments, commentToPost];
          console.log("IN comments addCommentToCommentsArray() comments : ");
          console.log(comments);
          alert("IN comments addCommentToCommentsArray() comments : ");
         
          return {
            comments
          };
        });
      }

      getUpdatedCommentsOffset(){
        console.log("In getUpdatedCommentsOffset : ");
        var offsetFromState = this.state.commentsOffset;
        console.log("offsetFromState : "+offsetFromState);
        var limitFromState = this.state.commentsLimit;
        console.log("limitFromState : "+limitFromState);
        var updatedOffset = limitFromState + offsetFromState;
        console.log("updatedOffset : "+updatedOffset);
        
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
        })
        this.loadComments()
        this.setState({ isLoaded: true })
      } 
    

      loadComments = () => {
        this.setState({ loadingMoreComments : true })
        console.log(this.state.comments);
        console.log(urls.apiUrl_ltiDemo + "/viewMoreComments");
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_ltiDemo + "/viewMoreComments",
        JSON.stringify({	
          "post_id" :this.state.post_id,
          "limit" : "" + this.state.commentsLimit,
          "offset" : ""  + this.state.commentsOffset  
        })
        ).then( response => {
            
            console.log("getComments OnLoad response : ")
            console.log(response);
          
            if(response.data.comments.length > 0 ) {
                  this.setState({
                    comments : [
                      ...this.state.comments,
                      ...response.data.comments,  
                      ],
                      
                      isCommentsLoaded: true,
                      commentsOffset : this.state.commentsLimit + this.state.commentsOffset,
                      loadingMoreComments : false,
                      loadMoreDivYOffset: this.refs.loadMoreDiv.getBoundingClientRect().top,                  });
              
              
            }else{
              this.setState({
                noMoreCommnetsToLoad: true,
                loadingMoreComments : false,
              })
            }
        
        console.log("getComments OnLoad comments : ")
        console.log(this.state.comments);
        
        this.setState({
          isCommentsLoaded: true
        })

        }).catch(function(error){
            console.log(error);
        })

// let loadMoreDivYOffset = this.refs.loadMoreDiv.getBoundingClientRect().top;
//var waitTillMoreCommnetsLoad = false;   
      };
   
              
	componentDidUpdate(prevProps, prevState) {
		console.log('In Comments componentDidUpdate()...');
		console.log("Got prevProps, prevState : ")
		console.log(prevProps)
		console.log(prevState)
		if (prevState.post_id !== this.state.post_id) {
		  let updateSateObj = {
        post_id:this.state.post_id
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
		console.log('In Comments getDerivedStateFromProps()...');
		console.log("Got nextProps, prevState : ")
		console.log(nextProps)
		console.log(prevState)
		console.log("nextProps.post_id :")
		console.log(nextProps.post_id)
		if(nextProps.post_id !== prevState.post_id){
		  let returnNewValuesObj = {
        post_id: nextProps.post_id
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
    const { student,savingPost,snackBarType,
            snackBarMessage,showSnackBar,post_id } = this.state;
    if(!this.state.isLoaded)
    {
      return <LoadingSpinner />
    }else
    {    
        return  <div className="">
        <AddComment 
          student = {student}
          post_id = {post_id}
          comment_id = "0" 
          showMessageInSnackBar={this.showMessageInSnackBar.bind(this)} 
          refreshComments={this.refreshComments.bind(this)} 
          addCommentToCommentsArray={this.addCommentToCommentsArray.bind(this)} 
        />  
    <Col xs={12}>
    {  
      !this.state.isCommentsLoaded 
      ? <LoadingSpinner />
      : 
    
      this.state.comments.length < 1 
      ? <div> <h6 className="text-muted text-center" ><i className="material-icons">error_outline</i> Be The First One To Comment On This. </h6> </div>
      : this.state.comments.map((comment) => {
        return <div key={comment.id} className=""> 
                <Comment
                 showMessageInSnackBar={this.showMessageInSnackBar.bind(this)} 
                 refreshComments={this.refreshComments.bind(this)} 
                 comment={comment}
                 student = {student} />
                </div>

      })
      
    }
    
    
    
    <div ref="loadMoreDiv" style = {{ width:'100%',height:'10px'}}>
    {  
      this.state.loadingMoreComments 
      ? <div> <LoadingSpinner /> </div>
      : <div></div>
    }
    </div>
    </Col>

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

