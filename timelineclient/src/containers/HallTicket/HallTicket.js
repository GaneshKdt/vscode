import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import { API } from '../../shared/config' 
import {connect} from 'react-redux';
import './HallTicketDownload.css'
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler'
import { Table, Row, Col, Form } from 'react-bootstrap'
import PageContent from '../../components/PageContent/PageContent'
import GetAppIcon from '@material-ui/icons/GetApp';
import { Button } from '@material-ui/core';
import DownloadHallTicket from './DownloadHallTicket';
import { formatExamDate, formatExamStartTime, formatExamEndTime } from '../ExamBooking/Common/Functions/TimeFormatHelper';

class HallTicket extends Component {

    constructor(props) {
        super(props)
        this.state = {
            agreedWithInfo  :false,
            title           : '', 
            programFullName : '', 
            examination     : '', 
            examBookings    : [],
        };
    } 

    componentDidMount(){
        this.preview();
    }


    hideDownloadModal = () => {
        console.debug('hide')
        this.setState({
            showDownloadModal : false
        })
    }

    preview=()=>{
        AxiosHandler.AxiosPostHandler({
            url : API.previewHallTicket,
            data : {
                sapid : this.props.sapid,
            },
            successCallBack : (response) => {
                let data = response.data
                if(data.status === "success" ) {
                    this.setState({
                        loaded  : true,
                        error   : false,
                        ...data,
                    })
                } else {
                    this.setState({
                        loaded : true,
                        error  : true,
                        errorMessage : data.errorMessage,
                    })
                }
            },
            failureCallBack : (error) => {
                console.debug('error')
                console.debug(error)

                this.setState({
                    loaded : true,
                    error  : true,
                    errorMessage : 'Internal Server error',
                })
            },
        })
    }

    agreedWithInfo=(e)=>{
		if(e.target.checked){
			this.setState({
				agreedWithInfo:true
			})
		}else{
			this.setState({
				agreedWithInfo:false
			})
		}
    } 
    
    startDownload = () => {
        if(this.state.agreedWithInfo) {
            this.setState({
                showDownloadModal : true
            })
        } else {
            alert('Please Confirm your details before proceeding')
        }
    }

    render() {
        const { title, programFullName, examination, examBookings } = this.state;
        const { student } = this.props
        return (
            <PageContent
                id = 'hallticket'
                title = 'Hall Ticket Download'
                loaded = {this.state.loaded}
                error = {this.state.error}
                loadingMessage = 'Loading...'
                errorMessage = { this.state.errorMessage }
            >
                <Card>
                    <Card.Header>
                        <h5>Preview</h5>
                    </Card.Header>
                    <Card.Body className="pt-2" >
                        <Row>
                            <Col md={12} className = "text-center">
                                <h4>{ title }</h4>
                            </Col>
                        </Row>
                        <Table bordered responsive>
                            <tbody>
                                <tr>
                                    <td colSpan="2"><b>Student No : </b>{ student.sapid }</td>
                                    <td colSpan="2"><b>Gender : </b>{ student.gender }</td>
                                    <td rowSpan="4" width="120px">
                                        <span id="authentic-photograph">AUTHENTIC PHOTOGRAPH</span>
                                        <img 
                                            src={ student.imageUrl } 
                                            alt={`${ student.firstName } ${ student.lastName }`} 
                                            height="140" 
                                            width="110"
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="4"><b>Student Name : </b>{ student.firstName } { student.lastName }</td>
                                </tr>
                                <tr>
                                    <td colSpan="2"><b>Program : </b>{ programFullName }</td>
                                    <td colSpan="2"><b>Examination : </b>{ examination }</td>
                                </tr>
                                <tr>
                                    <td colSpan="4"><b>Exam User ID : </b>{ student.sapid }</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table bordered responsive>
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Subject</th>
                                    <th>Term</th>
                                    <th>Date</th>
                                    <th>Start Time</th>
                                    <th>End Time</th>
                                    <th>Location</th>
                                    <th>Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    examBookings.map((booking, index) => {
                                        return (
                                            <tr key = {`Hall-Ticket-Subject-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{ booking.subjectName }</td>
                                                <td>{ booking.term }</td>
                                                <td className="text-nowrap">{ formatExamDate(booking) }</td>
                                                <td className="text-nowrap">{ formatExamStartTime(booking) }</td>
                                                <td className="text-nowrap">{ formatExamEndTime(booking) }</td>
                                                <td>{ booking.centerAddress }</td>
                                                <td></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <Row className = "pt-3">
                            <Col md={12} className="d-flex">
                                <Form.Group 
                                    controlId="formBasicCheckbox"
                                    className="mx-auto"
                                >
                                    <Form.Check 
                                        type="checkbox" 
                                        id="agreed" 
                                        checked = {this.state.agreedWithInfo}
                                        label="The above details are correct proceed to download." 
                                        onChange={this.agreedWithInfo}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={12} className="d-flex">
                                <Button 
                                    className="mx-auto"
                                    // variant="contained"
                                    variant="outlined"
                                    color="primary" 
                                    onClick={this.startDownload}
                                >
                                    Download <GetAppIcon/>
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                {
                    this.state.showDownloadModal ? (
                        <DownloadHallTicket
                            hideDownloadModal = {this.hideDownloadModal}
                        />
                    ) : null
                }
            </PageContent>
        )
    }
}

const mapStateToProps = state => {
	return {
        sapid: state.sapid,
        student: state
	}
}

export default connect(mapStateToProps)(HallTicket)