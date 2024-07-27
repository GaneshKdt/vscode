import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
// import InboxIcon from '@material-ui/icons/Message';
import InboxIcon from '@material-ui/icons/Email';
import ModalForAnnouncement from '../Notifications/Announcements/ModalForAnnouncement';
import DueIcon from '@material-ui/icons/QueryBuilder';
import Moment from 'react-moment';
import ListGroup from 'react-bootstrap/ListGroup';
import ModalForInbox from './ModalForInbox';
// import AnnouncementModal from '../../Home/Templates/AnnouncementCard/AnnouncementModal'
import adminDefaultImage from '../../containers/Home/Assets/Default-Logo/admin.png'
import { Image } from 'react-bootstrap';
// import ImpIcon from '@material-ui/icons/ImportantDevices';
import ImpIcon from '@material-ui/icons/PriorityHigh';
import ExamIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ReminderIcon from '@material-ui/icons/NotificationsActive';
import SessionIcon from '@material-ui/icons/PlayCircleFilledOutlined';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const prof_pic = {
    height: '40px',
    width: '40px'
}
const senderStyle = {
    backgroundColor : 'darkmagenta',
    width :'40px',
    height : '40px',
    color : 'white',
    fontSize: '20px',
    textAlign: 'center',
    paddingTop: '10px',
  }
class RenderInboxCard extends Component{
    state = {
        item : this.props.item,
        show : null,
        bodyData : null,
        
    }
    
    handleClick = () =>{
        this.setState({ 
            show: true,
        });
    }
   
    renderLayout() {
        console.log("**********",this.state)
        if(this.state.show !== null && this.state.item !== null){
            console.log("inside if------------")
            return(
                <ModalForInbox show={this.state.show} bodyData={this.state.item} handleClose={this.handleClose}/>
                // <AnnouncementModal show={this.state.show} bodyData={this.state.bodyData} handleClose={this.handleClose}/>
            )
        }
    }
    handleClose =() => {
        console.log(" inside close--------")
       this.setState({
           show : false
       }, ()=>{console.log(" ******************")})
    }
   
    onError = (e) =>{
        console.log("onerr image(((())))))))))");  
        e.target.onError = null; 
        e.target.src=adminDefaultImage
    }

    render(){
        var fromAdmin = this.state.item.fromEmailId.includes("nmims.edu");
        var senderName = this.state.item.fromEmailId.slice(0,1).toUpperCase();
        return(
            // <Card className="mb-2">
            <ListGroup.Item className="styleForHover">
                <div onClick={this.handleClick} style={{cursor:"pointer"}}> 
                    <Row>
                        {/* <Col lg={1} sm={1}><InboxIcon /></Col> */}
                        <Col lg={1} sm={1} className="ml-1">
                            {/* <div className="circular-portrait mr-3">
                                <Image className="mr-3 rounded-circle" style={prof_pic} src={this.state.profile_pic} alt="image" onError={(e)=>{e.target.onerror = null; e.target.src=adminDefaultImage}}/>
                            </div> */}
                            {/* if the mail is from admin, show admin profile image else if profile pic exists show that else show first letter of mail id*/}
                            {fromAdmin ? 
                                <div className="circular-portrait mr-3">
                                    <Image className="mr-3 rounded-circle" style={prof_pic} src={adminDefaultImage}/>
                                </div>
                                
                            :
                                this.state.prof_pic ? 
                                    <div className="circular-portrait mr-3">
                                        <Image className="mr-3 rounded-circle" style={prof_pic} src={this.state.prof_pic}/>
                                    </div>
                                : 
                                    <div className="circular-portrait mr-3 rounded-circle" style={senderStyle}>
                                        {senderName}
                                    </div> 
                            }
                            
                        {/* <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"2%"}}>
                            <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                        </svg> */}
                        </Col>
                        <Col> {this.state.item.subject}
                            <div className="inboxTextUnderHeader" > 
                                    {/* <DueIcon className="iconForDueTest"/> */}
                                    {/* <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>
                                        {this.state.item.createdDate}
                                    </Moment>&nbsp; */}
                                    by {this.state.item.fromEmailId}
                            </div>
                        </Col>
                        <Col style={{textAlign: 'end'}}> 
                            <>
                                <span >
                                    {this.state.item.subject.toLowerCase().includes("important") ? 
                                        <OverlayTrigger
                                        placement="auto"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip >
                                            Marked as important
                                        </Tooltip>}
        
                                        >
                                            <ImpIcon style={{color: 'darkred'}}/> 
                                        </OverlayTrigger>
                                    : null}
                                    {this.state.item.subject.toLowerCase().includes("exam") ? 
                                        <OverlayTrigger
                                         placement="auto"
                                         delay={{ show: 250, hide: 400 }}
                                         overlay={<Tooltip >
                                             Exams
                                         </Tooltip>}
         
                                         >
                                            <ExamIcon style={{color: 'slategrey'}}/> 
                                        </OverlayTrigger>
                                    : null} 
                                    {this.state.item.subject.toLowerCase().includes("assignment") ? 
                                        <OverlayTrigger
                                        placement="auto"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip >
                                            Assignments
                                        </Tooltip>}
        
                                        >
                                            <AssignmentIcon style={{color: 'royalblue'}}/>  
                                        </OverlayTrigger>
                                    : null} 
                                    {this.state.item.subject.toLowerCase().includes("reminder") ? 
                                        <OverlayTrigger
                                        placement="auto"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip >
                                            Reminder
                                        </Tooltip>}
        
                                        >
                                            <ReminderIcon/>  
                                        </OverlayTrigger>
                                    : null}
                                    {this.state.item.subject.toLowerCase().includes("assessment") ? 
                                        <OverlayTrigger
                                        placement="auto"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip >
                                            Internal Assesment
                                        </Tooltip>}
        
                                        >
                                            <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" >
                                                <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                                            </svg>
                                        </OverlayTrigger>
                                    : null}
                                    {this.state.item.subject.toLowerCase().includes("online session") ? 
                                        <OverlayTrigger
                                        placement="auto"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={<Tooltip >
                                            Online Session
                                        </Tooltip>}
        
                                        >
                                            <SessionIcon />
                                        </OverlayTrigger>
                                    : null}
                                    
                                    
                                    
                                </span>
                                <div className="inboxTextUnderHeader"> <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>
                                        {this.state.item.createdDate}
                                    </Moment></div>
                            </>
                        </Col>
                    </Row>
                    
                   
                </div> 
                {this.renderLayout()}
            </ListGroup.Item>
            // </Card>
            
        )
        
        
    }
    
}

export default RenderInboxCard