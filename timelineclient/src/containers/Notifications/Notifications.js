import React, { Component } from 'react';
 
import SingleNotification from './SingleNotification/SingleNotification'
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'
import ConfigUrls from '../../shared/config'
import {analyticsManager} from '../../shared/Analytics'

const urls = new ConfigUrls().urls;

class Notifications extends Component{
    
    isLoading = true;
    startIndex = 0;
    endIndex = 1;
    total = 1;
    itemsToDisplay = [];

    
    state={
        sapId:this.props.sapId,
        notificationData:
        [
            {
                id:1,
                subject: "Project Registration & Preparation Guidelines for Sem-IV PG students appearing for April 2019 Term End Examination is made live!",
                description:"abcd"
            }
        ],
        responseData: [],
       
    }

    componentDidMount(){
        console.log("userid-"+this.state.sapId)
		axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.defaults.headers.post["Access-Control-Allow-Origin"] = '*';
        axios.post(urls.apiUrl_announcement + "/getAllStudentAnnouncements",
            JSON.stringify({ 
                userId : this.state.sapId,
                currentSemPSSId : []
            })
        ).then(response => {
        // console.log("****************"+JSON.stringify(response));
        this.setState({
            responseData : response.data
        });
        // console.log("responseData---in notification===="+JSON.stringify(this.state.responseData));
        }).catch(function(error){
        console.log(error);
        })
    }

    loadMore = () =>{
        console.log("inside---1--"+this.itemsToDisplay);
        if(this.state.responseData.length > 0){
            return(
                console.log("inside---b4 slice--"+this.startIndex+"---endIndex--"+this.endIndex),
                this.itemsToDisplay = this.state.responseData.slice(this.startIndex,this.endIndex),
                console.log("inside---2--"+JSON.stringify(this.itemsToDisplay)),
                this.startIndex = this.startIndex + this.total,
                console.log("inside---3--"+this.startIndex),
                this.endIndex = this.endIndex + this.total, 
                console.log("inside---4--"+ this.endIndex)
                
            );
        }
    }
    
    render(){
            // console.log("inside render--**************"+JSON.stringify(this.state.responseData));
            return(
                <Col md={8} pl={5}>
                    <Card>
                        <Card.Body id="notificationNavbar_1">
                            <h5 className="card-title" >Your Notification</h5>
                            <hr/>
                            {/* Announcement view */}
                            {/* <Table responsive>
                                <thead>
                                    <tr>
                                    <th>Subject</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <SingleNotification responseData={this.state.responseData} />
                                </tbody>
                            </Table>
                            <hr/> */}
                            {/* <MyAnnouncementTable responseData={this.state.responseData} /> */}
                            
                            {/* View 2 */}
                                <SingleNotification responseData={this.state.responseData} />
                            {/* <RenderLoader responseData={this.state.responseData} currObject={this}/> */}
                        </Card.Body>
                    </Card>
                </Col>
            )
       
                       
    }
}
function RenderLoader(props){
    console.log("inside render loader--"+(props.responseData.length > 0))
    if(props.responseData.length > 0){
        return(
            <>
            <InfiniteScroll
                pageStart={0}
                loadMore={props.currObject.loadMore}
                hasMore={true}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
            {props.currObject.itemsToDisplay}
            <SingleNotification responseData={props.currObject.itemsToDisplay} />
            </InfiniteScroll>
            
            </>
            
        );
    }
    else{
        return null;
    }
    
    
}


const mapStateToProps = state => {
	return {
		sapId: state.sapid
	}
}

export default connect(mapStateToProps)(analyticsManager(Notifications))
