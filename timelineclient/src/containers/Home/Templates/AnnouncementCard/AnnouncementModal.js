import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

import Modal from 'react-bootstrap/Modal'
import ConfigUrls from '../../../../shared/config';
const urls = new ConfigUrls().urls;

export class AnnouncementModal extends Component {

    render() {

        let setShow=false;
		
		
        
        return (
            <Modal show={this.props.setShow} onHide={this.props.handleShow} >
            <Modal.Header closeButton>
            <div className="announcement-title "> <FontAwesomeIcon style={{fontSize:'18px'}} icon="bullhorn"/> {this.props.announcement.fileName}</div>
            </Modal.Header>
            <Modal.Body>
                <div>
                <span className="announcement-subheading announcement-modal-category">Category:{this.props.announcement.category} </span>
                </div>
                <br/>

                <div  className="announcement-modal-category"><p   dangerouslySetInnerHTML = {{__html: this.props.announcement.content}}></p></div>
                <div  className="announcement-attachment">
                {this.props.announcement.attachment1 &&
                    <div>{this.props.announcement.attachment1}
                        <Button variant="light ml-2" 
                            href={urls.apiUrl_Announcement_download +this.props.announcement.attachment1} target="_blank">
                            <FontAwesomeIcon icon="download" />
                        </Button>
                    </div>
                }
                {this.props.announcement.attachment2 &&
                    <div>{this.props.announcement.attachment2}
                        <Button variant="light ml-2" 
                            href={urls.apiUrl_Announcement_download +this.props.announcement.attachment2} target="_blank">
                            <FontAwesomeIcon icon="download" />
                        </Button>
                    </div>
                }
                {this.props.announcement.attachment3 &&
                    <div>{this.props.announcement.attachment3}
                        <Button variant="light ml-2" 
                            href={urls.apiUrl_Announcement_download +this.props.announcement.attachment3} target="_blank">
                            <FontAwesomeIcon icon="download" />
                        </Button>
                    </div>
                }
                
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleShow}>
                Close
                </Button>
            </Modal.Footer>
          </Modal>
        )
    }
}

export default AnnouncementModal
