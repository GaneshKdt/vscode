import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
// 
import Card from 'react-bootstrap/Card'
import ConfigUrls from '../../../shared/config' 
import Image from 'react-bootstrap/Image'
import Moment from 'react-moment'
import SnackBarAlert from '../../../shared/SnackBarAlert/SnackBarAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import adminDefaultImage from '../Assets/Default-Logo/admin.png'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios'
import { connect } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert';
import { LinkContainer } from 'react-router-bootstrap'
import './FeedCardHeader.css'
import NavLink from 'react-bootstrap/NavLink'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { FeedCardHeaderDate } from '../../../shared/MomentHelper/TimestampDate';
const urls = new ConfigUrls().urls;

var ltiUrl = new ConfigUrls().urls.apiUrl_ltiDemo;
const prof_pic = {
    height: '40px',
    width: '40px'
}

const category = {
    fontSize: '14px',
    color: '#3b5998',
}

const view_button = {
    fontSize: '18px !important',
}

const action_button = {
    float: 'right',
    color: '#d9d9d9',
    marginTop : '-9%'
}

const bgColor = {
    color: 'grey'
}
class FeedCardHeader extends Component {
    constructor(props) {
		super(props)

		// Sets up our initial state

		this.state = {
            profile_pic:adminDefaultImage,
            firstName:'System',
            showSnackBar : true,
            snackBarType : "",
            snackBarMessage : "",
            system:true
        }
        this.reportPostButtonClick = this.reportPostButtonClick.bind(this)

    }   
    componentDidMount() {
        // Loads some users on initial load
        
        if(this.props.card_header.firstName!='System' &&
        this.props.card_header.firstName != "" &&
        this.props.card_header.firstName != null){
            this.setState({
                firstName: 'Prof. '+this.props.card_header.firstName,
                system:false,
                profile_pic:urls.productionUrl+this.props.card_header.profilePicFilePath
            })
            
        }else {
            this.setState({
                firstName: 'Course Coordinator',
                system:true,
            }) 
        }
    } 

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
    
    reportPostButtonClick = () => {
        console.log("IN reportPostButtonClick got postId : ")
        console.log(this.props.card_header.post_id)

        confirmAlert({
            title: 'Confirm to Report',
            message: 'Are you sure you want report this post?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    this.saveReportIntoDB(this.props.card_header.post_id)
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

    saveReportIntoDB(postId){
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_ltiDemo + "reportPost",
            JSON.stringify({
                "userId" : this.props.sapId,
                "postId" : this.props.card_header.post_id,
                "action" : "Report"
            })
        ).then(response => {
            console.log("saveReportIntoDB  response : ")
            console.log(response);

            if (response.data === "success") {
                alert('Post Reported Succesfully !')
                // this.props.showMessageInSnackBar(true,"Post Reported Succesfully !","success");
            } else if(response.data === "Already Reported") {
                alert('Already Reported on this post !')
                // this.props.showMessageInSnackBar(true,"Already Reported on this post !","success");
            }else{
                alert('Error while reporting, Please Try Again.')
                // this.props.showMessageInSnackBar(true,"Error while reporting, Please Try Again.","error");
            }
        }).catch(function(error){
            console.log(error);
        })
    } 


    render() {
        const { snackBarType,snackBarMessage,showSnackBar,system } = this.state;
        return (
            <>
                <Card.Header style={{backgroundColor : 'white', borderBottom: 'white'}}>
                <div className="media mb-2">
                    <div className="circular-portrait mr-3">
                        <Image className="mr-3 rounded-circle" style={prof_pic} src={this.state.profile_pic} alt="image" onError={(e)=>{e.target.onerror = null; e.target.src=adminDefaultImage}}/>
                    </div>
                <div className="media-body" >
                    <div class="d-flex">
                        <div className="col-md-11">
                        {this.state.system?<b>Course Coordinator </b>
                :<Link to={{pathname:'/timeline/instructorProfile',state: { userId: this.props.card_header.userId}}}><b className="cursor">{this.state.firstName + ' ' + this.props.card_header.lastName} </b></Link> 
                } 
                posted to
                <LinkContainer className="cursor"  to = {{
                            pathname : "/timeline/home",
                            searchParams: { 
                            keyword: this.props.card_header.subject
                            }
                        }}
                        ><b> {this.props.card_header.subject}</b></LinkContainer>
                             
                  
                <br /> 
                    <small className="text-muted text-capitalize"><b>{this.props.card_header.role}</b></small>
                    <br />  
                    <small className="text-muted">
                        {/* {
                            moment(parseInt(this.props.card_header.createdDate, 10)).format('D MMM YYYY,hh:mm a zz')
                          
                        } */}
                       
                        <FeedCardHeaderDate date={this.props.card_header.scheduledDate} />
                        
                        {/*
                            <Moment format="D MMM YYYY,hh:mm a \(\I\S\T\)" unix>{this.props.card_header.createdDate/1000}</Moment>
                         */}
                        </small>
                        
                    {/* <span className="action_menu_btn" style={action_button}><FontAwesomeIcon icon="ellipsis-h" /></span> */}
                    
                        </div>
                        <div className="col-md-1">
                        <span>
                        <Dropdown style={action_button}>
                            <Dropdown.Toggle variant="link" size="sm" style={bgColor}>
                                <FontAwesomeIcon icon="ellipsis-h" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.reportPostButtonClick}>Report</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </span>
                    <div className="action_menu">
                        <ul>
                            <li data-toggle="modal" data-target="#myModal" className="modal_show" data-post_id={this.props.card_header.post_id} data-type={this.props.card_header.type}
                                data-title={this.props.card_header.subject} data-content={this.props.card_header.content} data-fname={this.props.card_header.fileName}
                                data-heading="Edit Post"><i className="fas fa-share-square"></i> Edit</li>
                            <li><a className="text-light no-underline" href="deletePost/{this.props.card_header.post_id}"><i className="fas fa-trash"></i> Delete</a></li>
                            <li><i className="fas fa-ban"></i> Report...</li>
                            <li><i className="fas fa-users"></i> Unfollow</li>
                            <li><i className="far fa-eye-slash"></i> Hide Post</li>
                            <li><i className="fas fa-share-square"></i> Share</li>
                        </ul>
                    </div>
                        </div>
                        
                    </div>

                    </div>
                    
                    </div>
                </Card.Header>
                {
                    ( showSnackBar && snackBarMessage !="" )
                    ? <SnackBarAlert 
                        hideSnackBar={this.hideSnackBar.bind(this)} 
                        type={snackBarType} 
                        message={snackBarMessage} />    
                    : <div></div>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
	return {
		sapId: state.sapid
	}
}
export default connect(mapStateToProps)(FeedCardHeader)