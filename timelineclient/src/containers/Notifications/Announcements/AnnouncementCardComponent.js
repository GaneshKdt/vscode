import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import ExamIcon from '@material-ui/icons/EventNote';
import ModalForAnnouncement from './ModalForAnnouncement';
import DueIcon from '@material-ui/icons/QueryBuilder';
import Moment from 'react-moment';
import ListGroup from 'react-bootstrap/ListGroup';
import AnnouncementModal from '../../Home/Templates/AnnouncementCard/AnnouncementModal'
import {   withRouter } from 'react-router-dom';
import TextsmsOutlinedIcon from '@material-ui/icons/TextsmsOutlined';
import _clone from 'lodash/clone'
import _escapeRegExp from 'lodash/escapeRegExp'



class RenderCard extends Component{
    state = {
        item : this.props.item,
        show : null,
        bodyData : null,
    }
    componentDidMount(){
        this.setState({
            bodyData : this.props.item
        })
    }
    handleClick = () =>{
        this.setState({ 
            show: true,
        });
    }
    handleActivityClick = (post_id) =>{
        
        this.props.history.push(`/timeline/home?post_id=${post_id}`)
    }
   
    renderLayout() {
        // console.log("**********",this.state)
        if(this.state.show !== null && this.state.bodyData !== null){
            // console.log("inside if------------")
            return(
                <ModalForAnnouncement show={this.state.show} bodyData={this.state.bodyData} handleClose={this.handleClose}/>
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

      swapTags = (text)  =>  {
   
        let displayText = _clone(text)
        const tags = text.match(/@\{\{[^\}]+\}\}/gi) || []        
        tags.map(myTag => {
          const tagData = myTag.slice(3, -2)
          const tagDataArray = tagData.split('||')        
          var redirectProfile = (tagDataArray[0].slice(0,1)==7)?"studentProfile":"instructorProfile"        
          const tagDisplayValue = `@${tagDataArray[1]}`
          displayText = displayText.replace(new RegExp(_escapeRegExp(myTag), 'gi'), tagDisplayValue)           
        })
        if(displayText.length > 120){ displayText = displayText.substring(0,120)+'...';  }        
        return `"${displayText}"`
      }

    displaySubject  =(name,sapid,comment)  =>{
        var redirectProfile = (sapid.slice(0,1)==7)?"studentProfile":"instructorProfile"
        const tagDisplayValue = `<a  href=\"/timeline/${redirectProfile}?id=${sapid}\"><b>${name}</b></a> mentioned you in a comment: <div style=
        "line-height: 25px;">${this.swapTags(comment)}</div>`
        return tagDisplayValue;
    }
    
    render(){
               
        return(
            // <Card className="mb-2">
            <ListGroup.Item className="styleForHover">
                <div     
                onClick={() => this.state.item.category === 'Activity' ? this.handleActivityClick(this.state.item.post_id) : this.handleClick()  }                
                style={{cursor:"pointer"}}> 
                    <Row>
                        <Col lg={1} sm={1}>
                      {  this.state.item.category === 'Activity' ? (   <TextsmsOutlinedIcon />      )  :
                        (   <ExamIcon />  )}
                            </Col>
                        {/* <Col lg={1} sm={1} className="ml-1"> */}
                        {/* <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28" style={{marginRight:"2%"}}>
                            <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#3366cc" fill-rule="evenodd"></path>
                        </svg> */}
                        {/* </Col> */}
                      
                        <Col> 
                        {
                            this.state.item.category === 'Activity' ? (                            
                            <p dangerouslySetInnerHTML = {{__html: this.displaySubject(this.state.item.mentionBy,this.state.item.sapid,this.state.item.comment)}}/>
                             
                          
                        ): (
                            this.state.item.subject
                            )
                            }
                            <div className="notiTextUnderHeader" > <DueIcon className="iconForDueTest"/>
                                    <Moment format="MMM D, hh:mm a \(\I\S\T\)" withTitle>
                                        {this.state.item.startDate}
                                    </Moment> &nbsp;
                            </div>
                        </Col>
                    </Row>
                    
                   
                </div> 
                {this.renderLayout()}
            </ListGroup.Item>
            // </Card>
            
        )
        
        
    }
    
}

export default withRouter(RenderCard)