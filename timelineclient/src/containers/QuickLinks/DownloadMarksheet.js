import React, { Component } from 'react';
import axios from 'axios';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfigUrls from '../../shared/config'
import {analyticsManager} from '../../shared/Analytics'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {connect} from 'react-redux';
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Alert from 'react-bootstrap/Alert';
import handleValidation from "../ServiceRequest/Validations";
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import "../QuickLinks/DownloadMarksheet.css";


const apis = new ConfigUrls().api;
const urls = new ConfigUrls().urls;

class DownloadMarksheet extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        student : this.props.student,
        sapId : this.props.student.sapid,
        examMode : 'Online',
        
        // exam attributes
        examYearList : ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019","2020"],
        examMonList : ["Apr", "Jun", "Sept", "Dec"],
        semList : ["1","2","3","4"],
        
        // Exam UI selections
        examYear : "",
        examMon : "",
        sem : "",

        responseData : [],
        downloadLink : null,
        showLoader : false,
        errors : {},
        error : null,
        success : null,
        message : null,
        fieldsToValidate : null,
        marksHistory : null,
       
    }

   
    componentDidMount = () =>{
        console.log("inside mount--***********"+JSON.stringify(this.props.student));
        this.getStudentMarksHistory();
        
    }
    
    handleDropdownChange = (evt) => {
        console.log("handler--");
        this.setState({
            [evt.target.name] : evt.target.value,
        })
        let field = {"name" : [evt.target.name], "value" : evt.target.value, "type" : "mandatoryText"};
        handleValidation(this,field);
    }

    getStudentMarksHistory = () => {
        console.log(" inside marks history")
        this.setState( {
            showLoader : true
        })
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(apis.getMostRecentResults,
        {
            sapid: this.state.sapId
            // sapid: 77118634372
        },
        ).then(response =>{
            console.log(JSON.stringify(response));
            this.setState({
                marksHistory : response.data.studentMarksHistory,
                showLoader : false,
            })
            
        }).catch(error => {
            console.log(error);
            this.setState({
                error : error,
                showLoader : false,
            })
        });
    }

    generateMarksheet = (evt) =>{
        
        console.log("handler-------");
        // fields to be validated
        let fieldsToValidateHash = {
            examYear : {"name" : "examYear", "value" : this.state.examYear, "type" : "mandatoryText"},
            examMon : {"name" : "examMon", "value" : this.state.examMon, "type" : "mandatoryText"},
            sem : {"name" : "sem", "value" : this.state.sem, "type" : "mandatoryText"},
            
        }

        this.setState({
            fieldsToValidate : fieldsToValidateHash,
        },
        () => {
            handleValidation(this);
            if(Object.entries(this.state.errors).length === 0){
                this.setState( {
                    showLoader : true
                })
                var examYear = this.state.examYear;
                var examMonth = this.state.examMon;
                var sem = this.state.sem
                var sapid = this.state.sapId;
                var examMode = this.state.examMode;
            
                
                console.log("&^&^&^&^&^&^&&^&^&",this.state.marksheetDetailRecord);
                // demo data
                // var body =  {
                //     "sapid": "77118634372",
                //     "writtenYear": "2018",
                //     "writtenMonth": "Dec",
                //     "sem": "1",
                //     "examMode" : "Online"
                // };
                // actual data
                var body =  {
                    'sapid' : sapid,
                    'writtenYear' : examYear,
                    'writtenMonth' : examMonth,
                    'sem' : sem,
                    'examMode' : examMode
                };
                console.log("body--",body);
                axios.defaults.headers.post['Content-Type'] = false;
                axios.post(apis.generateMarksheet,
                body,
                ).then(response =>{
                    console.log(JSON.stringify(response));
                    this.setState({
                        responseData : response.data,
                        showLoader : false,
                        downloadLink : response.data.fileName,
                        error : response.data.error,
                        success : response.data.success,
                        message :  response.data.message,
    
                    })
                    
                }).catch(error => {
                    console.log(error);
                    this.setState({
                        error : error,
                        showLoader : false,
                    })
                });
            }
            
        })
        
        
    }


    render(){
        return(

            <>
            <Card style={{maxWidth : "80%"}}>
                    <Card.Body>
                        <Card.Header>
                            <Card.Text className="cardHeader">Generate Marksheet</Card.Text>
                        </Card.Header>
                    
                    <Row>
                        <Col>

                        <br/>
                            {this.state.success && this.state.message ? 
                                <><Alert variant="success">
                                    {this.state.message}
                                </Alert></>
                            : null
                            }
                            {this.state.error && this.state.message ? 
                                <><Alert variant="danger">
                                    {this.state.message}
                                </Alert></>
                            : null
                            }
                            <Form className="forFormInSR"> 
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3">
                                        Select Exam Year :   
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control as="select"  name="examYear" value={this.state.examYear} onChange={this.handleDropdownChange} >
                                            <option value="" key="select">Select</option>
                                            {this.state.examYearList.map(year => 
                                                <option value={year} key={year}>{year}</option>
                                            )}
                                        </Form.Control>
                                        {this.state.errors["examYear"] ? 
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["examYear"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3">
                                        Select Exam Month :   
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control as="select"  name="examMon" value={this.state.examMon} onChange={this.handleDropdownChange} >
                                            <option value="" key="select">Select</option>
                                            {this.state.examMonList.map(mon => 
                                                <option value={mon} key={mon}>{mon}</option>
                                            )}
                                        </Form.Control>
                                        {this.state.errors["examMon"] ? 
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["examMon"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3">
                                        Select Sem :   
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control as="select"  name="sem" value={this.state.sem} onChange={this.handleDropdownChange} >                >
                                            <option value="" key="select">Select</option>
                                            {this.state.semList.map(sem => 
                                                <option value={sem} key={sem}>{sem}</option>
                                            )}
                                        </Form.Control>
                                        {this.state.errors["sem"] ? 
                                            <Form.Text className="text-muted"><span className="mandatory">{this.state.errors["sem"]}</span></Form.Text>
                                        :null}
                                    </Col>
                                </Form.Group>
                                {this.state.showLoader ? 
                                    <LoadingSpinner />
                                :null}
                                {this.state.marksHistory !== null ? 
                                <>
                                <Accordion>
                                 <Accordion.Toggle as={Card.Header} eventKey="0" className="toggleHeader">
                                    Marks History ({this.state.marksHistory.length } records available)
                                 </Accordion.Toggle>
                              
                                <Accordion.Collapse eventKey="0">
                                    <Table striped bordered size="sm" responsive>
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>Exam Year</th>
                                                <th>Exam Month</th>
                                                <th>Sem</th>
                                                <th>Subject</th>
                                                <th>Written</th>
                                                <th>Assignment</th>
                                                <th>Grace</th>
                                            </tr>
                                        </thead>
                                        {this.state.marksHistory.map((marks,index) => 
                                        <tbody>
                                            <tr>
                                                <td>{index+1}</td>
                                                <td>{marks.year}</td>
                                                <td>{marks.month}</td>
                                                <td>{marks.sem}</td>
                                                <td>{marks.subject}</td>
                                                <td>{marks.writenscore}</td>
                                                {marks.program !== "EPBM" && marks.program !== "MPDV" && marks.assignmentscore? 
                                                    <td>{marks.assignmentscore}</td> 
                                                : <td></td>}
                                                {marks.program !== "EPBM" && marks.program !== "MPDV" && marks.gracemarks ?
                                                    <td>{marks.assignmentscore}</td>
                                                :<td></td>}
                                            </tr>
                                        </tbody>   
                                        )}
                                </Table>
                                </Accordion.Collapse>
                                </Accordion>
                                </>
                                :null}
                            </Form>
                        </Col>
                     </Row>   
                </Card.Body>
                <Card.Footer>
                    <Form.Group as={Row}>
                        <Col sm="12" style={{textAlign : "center"}}>
                            <Button variant="secondary" id="generateMarksheet" onClick={this.generateMarksheet} >
                                Generate Marksheet
                            </Button>
                        </Col>
                    </Form.Group>
                    
                    
                    {this.state.success && this.state.downloadLink ? 
                        <Form.Group as={Row}>
                            <Col sm="12" style={{textAlign : "center"}}>
                                <Button size="sm"  variant="light ml-2" 
                                    href={urls.baseUrl + this.state.downloadLink.split(":")[1].slice(1, this.state.downloadLink.length)} target="_blank">
                                    <FontAwesomeIcon icon="download" /> &nbsp;
                                    <span>Download Marksheet</span>
                                </Button>
                            </Col>
                        </Form.Group>
                    :null} 
                </Card.Footer>
            </Card>
                
            </>
        )
    }
}


const mapStateToProps = state => {
	return {
        student: state,
	}
}

export default connect(mapStateToProps)(DownloadMarksheet)
