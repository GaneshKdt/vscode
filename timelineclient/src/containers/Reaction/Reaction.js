import React, { Component } from 'react'
import './Reaction_emoji.css'
import './ReactionSetup.js'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import ConfigUrls, { API } from '../../shared/config' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import FbReactions from '../../containers/FbReactions/FbReactions'
import { Link } from 'react-router-dom'
import ReactionModal from './ReactionModal'
const emojis =['like','celebrate','love','insightful','curious']
const urls = new ConfigUrls().urls.apiUrl_ltiDemo;
var emojiFile = urls+"assets/css/emojis/"
export class Reaction extends Component {
    constructor(props) {
		super(props)
		this.state = {
            myId:this.props.sapId,
            post_id:this.props.post.postId,
            reactions: this.props.postReactions,
			totalReactionCount: this.props.postReactions ? this.props.postReactions.length : 0,
            commentCount: this.props.postComments ? this.props.postComments.length : 0, 
            myReaction:"",
            reactedUserList:this.props.postReactions,
            showComments: this.props.showComments, // add by Pranit to hide comments button
            showReactedPeople:false,
            IfMyComments:false,
            modalShow:false,
           modalPostId:0
        } 
        this.handleSetReaction = this.handleSetReaction.bind(this)
    } 
    ShowMore=()=>{ 
                this.setState({
                    modalShow:true,
                    modalPostId:this.state.post_id
                })  
    }
    handleClose = () => this.setState({modalShow:false});
    handleShow = () => this.setState({modalShow:true}); 
    componentDidMount(){
        // $(document).on('mouseover', '.FB_reactions',  function(e) {
		// 	$(this).facebookReactions(); 
		// });
        //this.getCommentAndReactions();
        this.setCurrentUsersReactionAndIfMyComments();

       // this.loadReactedPeople();
    }
    componentWillReceiveProps(nextprops){
        this.props=nextprops
        if(this.props.refreshReaction){
            //this.getCommentAndReactions();
        }
        
        this.setCurrentUsersReactionAndIfMyComments();
      }     

      setCurrentUsersReactionAndIfMyComments = () => {
          console.log("IN setCurrentUsersReactionAndIfMyComments() called : ");
        this.state.reactions.map((r) => {
            if(r.userId === this.state.myId){
                
                this.setState({
                    myReaction : r.reactionType,
                    IfMyComments : "true"
                })
                
                return "Done";
            }

        });
    }

    handleSetReaction = (emoji) => {
        this.setState({ reaction:  emoji});
        if(this.state.myId!="" && this.state.post_id!=""){ 
            axios.defaults.headers.post['Content-Type'] = 'application/json';
            axios.post(API.getReactionCount,
            JSON.stringify({
                'sapid' : this.state.myId,
                'reactionType' : emoji,
                'post_id': this.state.post_id})
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
    }
    getCommentAndReactions = () => {
        this.setState(
            { isLoading: true },
            () => {
                axios.defaults.headers.post['Content-Type'] = 'application/json';
                axios.post(API.getCommentAndReactions,
                    JSON.stringify({
                        "post_id": this.state.post_id,
                        "role": "Student",
                        "sapid":this.state.myId
                    })
                ).then(response => {
                    console.log('--------------------------->Loaded comments')
                    console.log(response)
                    this.setState({
                        reactions: response.data.reactions,
                        totalReactionCount: response.data.reactionCount,
                        commentCount: response.data.commentCount,
                        myReaction: response.data.myReaction,
                        IfMyComments:response.data.flag
                    }) 
                }).catch(function (error) {
                    console.log(error);
                })
            }
        )
    }
    loadReactedPeople =()=>{ 
    
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post(API.getReactedUserList,
        JSON.stringify({
            "post_id": this.state.postId
        })
    ).then(response => {
        console.log('--------------------------->Hovered and showing users')
        console.log(response)
        this.setState({
           reactedUserList:response.data
        })
    }).catch(function (error) {
        console.log(error);
    })
    }
    showReactedPeople =()=>{ 
        this.setState({
            showReactedPeople:true
        })
        }
    hideReactedPeople=()=>{
        setTimeout(function() { //Start the timer
            this.setState({showReactedPeople:false}) //After 1 second, set render to true
        }.bind(this), 2000)
    }
    expandComments=()=>{
        this.props.expandComments();
      }
    focusAddComment=()=>{
        this.props.focusAddComment();
    }
    render() {
        const {
            reactions,
            totalReactionCount,
            commentCount,
            myReaction,
            showComments,
            reactedUserList,
            post_id,
            IfMyComments,
            modalShow,
            modalPostId
        } = this.state;
        const likeOrUnlike=myReaction?"":"like" //setting value for reaction button to toggle react unreact 
        let hasMoreReactions=0;
        let limitedReactionCount=0;
         if(reactedUserList !=null) {// if more reactions show count of remaining
            console.log("reactedUserList"+reactedUserList.length)
            limitedReactionCount=5
            console.log("limitedReactionCount"+limitedReactionCount)
            hasMoreReactions=(totalReactionCount>6)?totalReactionCount - limitedReactionCount:0
              console.log("hasMoreReactions"+hasMoreReactions)
        } 
        let commentClass = (IfMyComments)?"replied":""             
        return (
<>
                  <Row className="p-1 m-1" >
                    
                 
<div className="reaction-count" onMouseOver={this.showReactedPeople} onMouseLeave={this.hideReactedPeople} >
                   

                    { reactions.slice(0, 3).map(reaction => {
                    return <span  className={"w20 reactionButton reaction-count-emoji "+reaction.reactionType} ></span>
                    })}

                        {totalReactionCount} {(totalReactionCount>1)?"Reactions":"Reaction" }

                        {this.state.showReactedPeople && limitedReactionCount > 0 && totalReactionCount > 0 &&

                        <div class="usersHover">
                            {reactedUserList.slice(0, limitedReactionCount).map(reaction => {
                                console.log("IN reaction.js reaction for userProfile ");
                                console.log(reaction);
                                //check user id and decide user profile link
                                var userProfile = ( reaction.userId 
                                                    ?  
                                                    (reaction.userId.slice(0,1)==7 ? "studentProfile":"instructorProfile") 
                                                    :"instructorProfile"
                                                  )

                                return <div className="d-flex px-2 f500">
                                            <div className={"w20 reactionButton reaction-count-emoji "+reaction.reactionType}></div>
                                            <div class="ml-1"></div>
                                            <Link to={{pathname:'/timeline/'+userProfile,state: { userId: reaction.userId}}} ><b className="cursor removelink">{reaction.fullName} </b></Link>
                            
                                        </div>
                            }) }
                            {(hasMoreReactions>0 || modalShow) ? <span onClick={this.ShowMore}>and {hasMoreReactions} more</span>:""}
                         
                        </div>

                        }
                        </div>

                  
                   
                    <div className="cmt-count">

                    {
                        showComments !== 'false'
                        ?
                        <span onClick={this.expandComments} className="pointer"
                        
                        >{commentCount} {(commentCount>1)?"Comments":"Comment" }</span>
                        :
                        <span></span>
                    }
                        
                    </div>
    
                </Row>
                
                <Row className="m-0 interactive-button">

                    <div className="container-fluid btnGrp no-margin">

                        <div className="reaction-btn"><FbReactions handleSetReaction={this.handleSetReaction} myReaction={myReaction} likeOrUnlike={likeOrUnlike} /></div>
                              
                    {
                        showComments !== 'false'
                        ?
                        <button class={"rButton btn  "+commentClass} variant="light"  data-toggle="collapse" data-target="#collapse-comment3" onClick={this.focusAddComment}>
                        <FontAwesomeIcon  icon="comment-alt"/>  Comment</button>
                        :
                        <span></span>
                    }
                    </div>              
                </Row>
                <ReactionModal modalShow={modalShow}  modalPostId={modalPostId} handleClose={this.handleClose} handleShow={this.handleShow}/>
               </>
        )
    }
}

export default Reaction


//>>--------------->css


