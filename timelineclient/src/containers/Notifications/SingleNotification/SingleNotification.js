import React, { Component } from 'react';
import { join } from 'path';
import ModalForNotification from '../ModalForNotification/ModalForNotification';
 
import FiberNewIcon from '@material-ui/icons/FiberNew';
import PeopleIcon from '@material-ui/icons/People';
import ThumbsUp from '@material-ui/icons/ThumbUp';
import InsertComment from '@material-ui/icons/InsertComment';
// import Person from 'images/people/110/guy-10';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table'



class SingleNotification extends Component{

    getNotificationPopup = (data) =>{
         console.log("inside func---"+ JSON.stringify(data));
         return  (
             <div>
                    <ModalForNotification bodyData={data} sendFuntion={this.getNotificationPopup}/> 
             </div>
         );
       
    }
    render(){
        console.log("render of single---")
        return this.props.responseData.map((item)=>(
            <>
                {/* <div className="row">
                    <div className="col-md-1">
                        <div ><PeopleIcon/></div>
                    </div>
                    <div className="col-md-10">
                        <b>Deepak Gupta</b> posted new post for <b>Business Statistics</b>.<br />
                        <span style={{color: 'gray'}}><i className="material-icons"><FiberNewIcon/></i> 2 Hr ago</span>
                    </div>
	            </div>
                <hr/>
                <div className="row">
                    <div className="col-md-1">
                        <div ><PeopleIcon/></div>
                    </div>
                    <div className="col-md-10">
                        <b>Dr. Dimple Pandey </b> posted new post for <b>Business Economics</b>.<br/>
                        <span style={{color: 'gray'}}><i className="material-icons"><FiberNewIcon/></i> 3 Hr ago</span>
                    </div>
	            </div>
	            <hr/>
	            <div className="row">
                    <div className="col-md-1">
                        <div ><PeopleIcon/></div>
                    </div>
                    <div className="col-md-10">
                        <b>Johnson</b> shared your post.<br/>
                        <span style={{color: 'gray'}}><i className="fas fa-share"></i> 23 Hr ago</span>
                    </div>
	            </div>
	            <hr/>
	            <div className="row">
                    <div className="col-md-1">
                        <div ><PeopleIcon/></div>
                    </div>
                    <div className="col-md-10">
                        <b>Davis</b> liked your post.<br/>
                        <span style={{color: 'gray'}}> <i className="material-icons" style={{fontSize: '20px'}}><ThumbsUp/></i> 23 Hr ago</span>
                    </div>
	            </div>
                <hr/>
                <div className="row">
	    	        <div className="col-md-1">
                        <div ><PeopleIcon/></div>
	    	        </div>
	    	        <div className="col-md-10">
	    		        <b>Smith</b> commented on your post.<br/>
	    		        <span style={{color: 'gray'}}><i class="material-icons" style={{fontSize: '20px'}}><InsertComment/></i> 23 Hr ago</span>
	    	        </div>
	            </div>
                <hr/> */}
                <>
                    {/* Commented code needed for future use */}
                    <Row>
                        <Col md={1}>
                            <h5><span className="badge badge-secondary">New</span></h5> 
                        </Col>
        
                        <Col md={10}>
                            <div>
                                <ModalForNotification bodyData={item.description} linkText ={item.subject} item={item}/> 
                            </div>
                        </Col>
                    </Row>
                </>
                
                <hr/>
            </>
            
        )
        
        );
    }
}



export default SingleNotification;