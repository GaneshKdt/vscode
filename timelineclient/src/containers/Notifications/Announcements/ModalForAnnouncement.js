import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
 
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import "../ModalForNotification/ModalForNotification.css"
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import ConfigUrls from '../../../../shared/config';
import ConfigUrls from '../../../shared/config';
const urls = new ConfigUrls().urls;

require("react-bootstrap/ModalHeader");


class ModalForAnnouncement extends Component{
       
          render() {
              // console.log("inside render announcement modal---",this.props.bodyData.description);
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
                <Modal  show={this.props.show} onHide={this.props.handleClose} className="announcement-modal">
                  <Modal.Header closeButton>
                    <Modal.Title className="announcement-title " style={{fontSize:'16px'}}> <FontAwesomeIcon icon="bullhorn"/>&nbsp;{this.props.bodyData.subject}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="scrollForAnnouncementModal announcement-modal-category">
                    <p dangerouslySetInnerHTML={{__html: this.props.bodyData.description}}></p>
                    <div  className="announcement-attachment">
                      {this.props.bodyData.attachment1 &&
                          <div>{this.props.bodyData.attachment1}
                              <Button variant="light ml-2" 
                                  href={urls.apiUrl_Announcement_download +this.props.bodyData.attachment1} target="_blank">
                                  <FontAwesomeIcon icon="download" />
                              </Button>
                          </div>
                      }
                      {this.props.bodyData.attachment2 &&
                          <div>{this.props.bodyData.attachment2}
                              <Button variant="light ml-2" 
                                  href={urls.apiUrl_Announcement_download +this.props.bodyData.attachment2} target="_blank">
                                  <FontAwesomeIcon icon="download" />
                              </Button>
                          </div>
                      }
                      {this.props.bodyData.attachment3 &&
                          <div>{this.props.bodyData.attachment3}
                              <Button variant="light ml-2" 
                                  href={urls.apiUrl_Announcement_download +this.props.bodyData.attachment3} target="_blank">
                                  <FontAwesomeIcon icon="download" />
                              </Button>
                          </div>
                      }
                  
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            );
          }
}

export default ModalForAnnouncement