import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import ConfigUrls from '../../../shared/config';
import { Row, Col } from 'react-bootstrap';
const urls = new ConfigUrls().urls;

require("react-bootstrap/ModalHeader");


class ModalForPreviewMarks extends Component{

          render() {
              // console.log("inside render announcement modal---",this.props.bodyData.description);
            return (
              <>
           
                <Modal  show={this.props.show} onHide={this.props.handleModalClose} className="announcement-modal">
                  <Modal.Header closeButton>
                    <Modal.Title className="announcement-title " style={{fontSize:'16px'}}> &nbsp;Grades Summary</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="scrollForAnnouncementModal announcement-modal-category">   
                  <Row style={{fontWeight:500}}>
                  <Col md={7}>
                    <p>Name : {this.props.studentData.firstName} {this.props.studentData.lastName}</p>
                    <p>Father's Name: {this.props.studentData.fatherName} </p>
                    <p>Mother's Name: {this.props.studentData.motherName}</p>
                    <p>Program: {this.props.studentData.program}</p>
                  </Col>
                  <Col md={5}> 
                    <p>Term: {this.props.sem}</p>
                    <p>Student No: {this.props.studentData.sapid}</p> </Col>
                  </Row>            
                  <Row>
                      <Col md={12}>
                      <p style={{wordBreak: 'break-word'}}>**This is a system generated preview for Gradesheet and cannot be used as Gradesheet</p>
                      </Col>
                      </Row>    
                   <Table striped hover size="sm">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Credits</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.previewData.marks.map(record => 
                                <tr key={record.subject}>
                                    <td>{record.subject}</td>
                                    <td>{record.credits}</td>

                                   
                                    <td>{record.grade}</td>
                                    {/* {record.graceMarks ? 
                                      <td>{record.graceMarks}</td>
                                    : <td>-</td>}
                                    <td>{record.total}</td> */}
                                </tr>
                                )
                            }
                        </tbody>
                    </Table>
                  
                    <Row>
                      <Col md={12}>
                      <p style={{wordBreak: 'break-word'}}>GPA: {this.props.previewData.credits[0]}</p>
                      </Col>
                      </Row>

                      <Row>
                      <Col md={12}>
                      <p style={{wordBreak: 'break-word'}}>CGPA: {this.props.previewData.credits[1]}</p>
                      </Col>
                      </Row>
                    <Row>
                      <Col md={12}>
                      <p style={{wordBreak: 'break-word'}}>**If&nbsp;there&nbsp;are&nbsp;any&nbsp;changes&nbsp;in&nbsp;the&nbsp;above&nbsp;details,&nbsp;kindly&nbsp;update&nbsp;through&nbsp;your&nbsp;account&nbsp;or&nbsp;raise&nbsp;a&nbsp;service&nbsp;request&nbsp;to&nbsp;update&nbsp;the&nbsp;same.</p>
                      </Col>
                      </Row>
                
                      

                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleModalClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            );
          }
}

export default ModalForPreviewMarks