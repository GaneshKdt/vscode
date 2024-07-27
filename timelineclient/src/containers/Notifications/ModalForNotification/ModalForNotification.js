import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
 
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import "./ModalForNotification.css"
import Table from 'react-bootstrap/Table'

require("react-bootstrap/ModalHeader");


class ModalForNotification extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
        };
      }
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }
    
    
        
        
       
          render() {
              console.log("inside render---");
            return (
              <>
              {/* view 1 for announcements*/}
                {/* <tr>
                  <td><a id="announcementLink" className="nav-link dark-text notificationLinkClass" href="#" onClick= {this.handleShow}> {this.props.linkText} </a></td>
                  <td><div >{this.props.item.startDate}</div></td>
                  <td><div>{this.props.item.endDate}</div></td>
                  <td><div>{this.props.item.category}</div></td>
                </tr> */}


                {/* view 2 for notifications */}
                <Row>
                    <a id="announcementLink" className="nav-link dark-text notificationLinkClass" href="#" onClick= {this.handleShow}> {this.props.linkText} </a>
                </Row>
                <Row>
                    <Col className="notificationLinkClass">
                      <div className="text-muted announcementInfo">Start Date  : <br/>{this.props.item.startDate}</div>
                    </Col>
                    <Col className="notificationLinkClass">
                      <div className="text-muted announcementInfo">End Date : <br/>{this.props.item.endDate}</div>
                    </Col>
                    <Col className="notificationLinkClass">
                      <div className="text-muted announcementInfo">Catagory : <br/>{this.props.item.category}</div>
                    </Col>
                </Row>
                
                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Announcement</Modal.Title>
                  </Modal.Header>
                  <Modal.Body><div dangerouslySetInnerHTML={{__html: this.props.bodyData}}></div></Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            );
          }
}

export default ModalForNotification