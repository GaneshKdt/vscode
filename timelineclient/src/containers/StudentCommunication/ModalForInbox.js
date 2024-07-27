import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
 
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import "./ModalForInbox.css"
import Table from 'react-bootstrap/Table'
import { Image, Form } from 'react-bootstrap';

require("react-bootstrap/ModalHeader");
const senderStyle = {
  backgroundColor : 'darkmagenta',
  width :'60px',
  height : '60px',
  color : 'white',
  fontSize: '38px',
  textAlign: 'center',
  // paddingTop : '10px'
}

class ModalForInbox extends Component{

       
          render() {
            console.log("inside render---",this.props.bodyData);
              var senderName = this.props.bodyData.fromEmailId.slice(0,1).toUpperCase();
              // set display name for ngasce mails
              var displayName = "";
              if(this.props.bodyData.fromEmailId.includes(".exams"))
                displayName = "NGASCE Exams";
              if(this.props.bodyData.fromEmailId.includes(".academics"))
                displayName = "NGASCE Academics";
              if(displayName !== "NGASCE Exams" && displayName !== "NGASCE Academics"){
                if(this.props.bodyData.fromEmailId.includes("ngasce@")){
                  displayName = "NGASCE";
                }
              }
            return (
              <>
                <Modal size="lg" show={this.props.show} onHide={this.props.handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title >
                      <Row>
                        <Col>
                          <div className="circular-portrait mr-3 rounded-circle" style={senderStyle}>
                            {senderName}
                          </div>
                        </Col>
                        <Col>
                          <Form.Label style={{marginBottom : '0px'}}>{displayName}</Form.Label>
                          <Form.Text style={{marginTop : '0px',fontSize: 'initial'}}>{this.props.bodyData.fromEmailId}</Form.Text> 
                        </Col>
                      </Row>
                      {/* From : {this.props.bodyData.fromEmailId} */}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body><div dangerouslySetInnerHTML={{__html: this.props.bodyData.body}}></div></Modal.Body>
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

export default ModalForInbox