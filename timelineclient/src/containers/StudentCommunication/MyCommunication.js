import React, { Component } from 'react';
import axios from 'axios';
import './MyCommunication.css';
import MyCommunicationTable from './MyCommunicationTable';
import Image from 'react-bootstrap/Image'
import emailIcon from './images/email.png'
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ConfigUrls from '../../shared/config'
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {analyticsManager} from '../../shared/Analytics'
import MyCommunicationNew from './MyCommunicationNewUI';
import { Row } from 'react-bootstrap';

const urls = new ConfigUrls().urls;

class MyCommunications extends Component{ 
    
    state ={
        studentData : this.props.student,
        responseData : null,
        sapid:this.props.student.sapid,
        // layout : "Vertical",
        layout : "Horizontal",
    }
    componentDidMount() {
        //console.log("base url----"+baseUrl);
        axios.defaults.headers.post['Content-Type'] = false;
        // axios.post("http://localhost:8080/studentportal/m/myEmailCommunicationsForm",
        axios.post(urls.apiUrl_studentPortals+"myEmailCommunicationsForm",
        {
            'sapid' : this.state.sapid
        }
        ).then(response =>{
            // console.log("@@@@@@@@@@@@@@@@@@@@@"+JSON.stringify(response.data));
            this.setState({
                responseData : response.data,
            })
        }).catch(function(error){
            console.log(error);
        })
    }
    setLayout = (e) =>{
        this.setState({
            layout : e.target.name
        })
        // console.log("layout---"+this.state.layout)
        
    }
    renderLayout(){
        console.log(" inside render layout***************"+this.state.responseData.length)
        if(this.state.layout === "Vertical" && this.state.responseData.length !== 0){
            // console.log("inside if------1111111----------")
            return(
                <MyCommunicationTable responseData={this.state.responseData} layout="Vertical"/>
            )
        }
        else if(this.state.layout === "Horizontal" && this.state.responseData.length !== 0){
            // console.log("inside else------2222222----------")
            return(
                <MyCommunicationTable responseData={this.state.responseData} layout="Horizontal"/>
            )
        }
        else if(this.state.responseData.length === 0){
            // console.log("inside else------33333333----------")
            return(
                <Card style={{height : '200px', textAlign : 'center'}}>
                    <Card.Text><h5 style={{marginTop: '50px'}}><FontAwesomeIcon icon="exclamation-circle"/>&nbsp;&nbsp;&nbsp;No Messages to Display.</h5></Card.Text>
                </Card>
            )
        }
        else{
            // console.log("inside else-----44444444-----------")
            return(null)
        }
       
    }
    render(){
        return(
            <div className="marginRightForChatInbox">
               
                   
                        {this.state.responseData !== null ?
                            <>
                            {/* <Card className="emailCard">
                            <Card.Header>
                                <h5>My Inbox
                                    <ButtonGroup className="layoutButtons"  aria-label="Basic example">
                                        <Button variant="secondary" name="Horizontal" onClick={this.setLayout.bind(this)}>Horizontal</Button>
                                        <Button variant="secondary" name="Vertical" onClick={this.setLayout.bind(this)}>Vertical</Button>
                                    </ButtonGroup> 
                                </h5>
                            </Card.Header>
                                {this.renderLayout()}
                                    
                            </Card> */}
                            <MyCommunicationNew responseData={this.state.responseData} />
                                
                                
                            </>
                        : <LoadingSpinner />}
                   
            </div>
        )
    }
}


const mapStateToProps = state => {
	return {
		student: state
	}
}

export default connect(mapStateToProps)(analyticsManager(MyCommunications))