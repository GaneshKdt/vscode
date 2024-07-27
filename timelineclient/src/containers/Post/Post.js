import React, { Component, Fragment } from 'react'
import AnnouncementCard from '../Home/Templates/AnnouncementCard/AnnouncementCard'
import ImageCard from '../Home/Templates/ImageCard/ImageCard'
import SessionVideoCard from '../Home/Templates/SessionCard/SessionVideoCard'
import SessionCard from '../Home/Templates/SessionCard/SessionCard'
import VideoCard from '../Home/Templates/VideoCard'
import TextCard from '../Home/Templates/TextCard'
import LinkCard from '../Home/Templates/LinkCard'
import FileCard from '../Home/Templates/FileCard'
import MCQCard from '../Home/Templates/MCQCard/MCQCard'
import FeedCardHeader from '../Home/FeedCardHeader/FeedCardHeader'
import Card from 'react-bootstrap/Card'
import Comments from '../Home/Comments/Comments'
import Reaction from '../Reaction/Reaction'
import { connect } from 'react-redux'
import MCQResultCard from '../Home/Templates/MCQCard/MCQResultCard'
import TEEExamCard from '../Home/Templates/TEECard/TEEExamCard'
import './Post.css'
export class Post extends Component {

    constructor(props) {
		super(props)
		// Sets up our initial state
		this.state = {
            post:this.props.post,
            serverPath:this.props.serverPath,
            sapId:this.props.sapId,
            student:this.props.data,
            expandComment:false,
            focusAddComment:false,
            refreshReaction:false
		}
	} 
    expandComments=()=>{
        this.setState({
            expandComment:!this.state.expandComment 
        })
    }
    focusAddComment=()=>{
        this.setState({
            focusAddComment:true 
        })
    }
    refreshReaction=()=>{
        this.setState({
            refreshReaction:true 
        })
    }
    render() {
        const {
            post,
            serverPath,
            sapId,
            student
        } = this.state;
        console.log("IN post ");
        console.log(post);   
        return (
                            <Fragment>
                                <Card className="mb-2 Post_card center-block">
                                    <FeedCardHeader card_header={post}/>
                                    {
                                    post.type === "Announcement" ? <AnnouncementCard announcement={post} /> :
                                    post.type === "SessionVideo" ? <SessionVideoCard session={post} url={post.videolink} /> :
                                    post.type === "Session" ? <SessionCard session={post} url={post.url} /> :
                                    post.type === "Image" ? <ImageCard image={post} serverPath={serverPath}/> :
                                    post.type === "Video" ? <VideoCard video={post} serverPath={serverPath} /> :
                                    (post.type === "File"||post.type === "Resource") ? <FileCard file={post} /> :
                                    post.type === "Text" ? <TextCard text={post} /> :
                                    post.type === "Link" ?<LinkCard link={post} />:
                                    post.type === "MCQ" ?<MCQCard mcq={post} />:
                                    post.type === "MCQResult" ?<MCQResultCard mcq={post} />:
                                    post.type === "TEE" ?<TEEExamCard tee={post} />: null
                                    }
                                    <Reaction 
                                        post={post} 
                                        sapId={sapId}  
                                        expandComments={this.expandComments.bind(this)} 
                                        focusAddComment={this.focusAddComment.bind(this)} 
                                        refreshReaction={this.state.refreshReaction}
                                        postReactions ={post.postReactions}
                                        postComments={post.postComments}
                                    />

                                    <Card.Footer style={{backgroundColor : '#f8f9fa',margin:'0px',padding:'0px'}} >
                                    <Comments 
                                        student={student} 
                                        post_id={post.postId} 
                                        postComments={post.postComments} 
                                        expandComment={this.state.expandComment} 
                                        expandComments={this.expandComments.bind(this)}
                                        focusAddComment={this.state.focusAddComment} 
                                        refreshReaction={this.refreshReaction.bind(this)}
                                        loadPosts = {this.props.loadPosts.bind(this)}
                                    />
                                    </Card.Footer>
                                </Card>
                            </Fragment>
        )
    }
}


const mapStateToProps = state => {
	return {
		sapId: state.sapid,
		data:state
	}
}

export default connect(mapStateToProps)(Post)
