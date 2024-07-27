import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PageContent from '../../components/PageContent/PageContent';
import { analyticsManager } from "../../shared/Analytics";
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler';
import { API, AppConfig, URL } from "../../shared/config";
import DemoExamHelper from '../../shared/Helpers/DemoExamHelper/DemoExamHelper';
import { FormattedDate } from '../../shared/MomentHelper/TimestampDate';
import MomentHelper from '../../shared/MomentHelper/MomentHelper';
class StartAssessment extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            sapid : props.sapid,
            program : props.program,
            assessmentInfo : {},
            loaded : false,
            error : false,
            errorMessage : 'Error!',
        }
    }

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        if(error === "true") {
            let timeboundId = urlParams.get('timeboundId')
            let scheduleId = urlParams.get('scheduleId')
            let errorMessage = urlParams.get('errorMessage')

            this.setState({
                timeboundId : timeboundId,
                scheduleId : scheduleId,
                errorAlert : true,
                errorAlertMessage : errorMessage
            }, this.loadAssessmentDetails)
        } else {

            if(this.props && this.props.location && this.props.location.state && this.props.location.state.assessment) {
                let assessment = this.props.location.state.assessment
                this.setState({
                    timeboundId : assessment.timeboundId ? assessment.timeboundId : assessment.timebound_id,
                    scheduleId : assessment.scheduleId ? assessment.scheduleId : assessment.schedule_id,
                }, this.loadAssessmentDetails)
            } else {
                this.setState({
                    timeboundId : this.props.timeboundId,
                    scheduleId : this.props.scheduleId,
                }, this.loadAssessmentDetails)
            }
        }

    }

    startTest = () => {
        if(this.state.assessmentInfo && this.state.assessmentInfo.canStudentAttempt) {
            this.setState({
                loaded : false,
                error : false,
                loadingMessage : 'Starting Test....',
            }, () => {
                window.$("#submit").submit()
            })
        } else {
            alert(this.state.assessmentInfo.cantAttemptReason)
        }
    }

    loadAssessmentDetails = () => {

        if(this.state.timeboundId && this.state.scheduleId) {
            this.getAssessmentDetailsFromPortal()
        } else {
            this.setState({
                loaded : true,
                error : true,
                loadingMessage : 'Loading Test Info...',
                errorMessage : 'Error getting assessment details! Please try again!',
            })
        }

    }

    getAssessmentDetailsFromPortal = () => {
        
        this.setState({
            loaded : false,
            error : false,
            loadingMessage : 'Loading Test Info...',
            errorMessage : '',
        }, () => {

            AxiosHandler.AxiosPostHandler({
                url : API.getAssessmentDetails,
                data : {
                    sapid : this.state.sapid,
                    timeboundId : this.state.timeboundId,
                    scheduleId : this.state.scheduleId
                },
                successCallBack : (response) => {
                    if(response.data.status === 'success') {
                        if(response.data.response) {
                            this.setState({
                                loaded : true,
                                error : false,
                                errorMessage : '',
                                assessmentInfo : response.data.response,
                            }, () => {
                                if(!this.state.assessmentInfo.canStudentAttempt) {
                                    this.setState({
                                        errorAlert : true,
                                        errorAlertMessage : this.state.errorAlertMessage ? this.state.errorAlertMessage : this.state.assessmentInfo.cantAttemptReason
                                    })
                                } else {
                                    this.setState({
                                        successAlert : true,
                                        successAlertMessage : 'Test Active! Click the Take Test button to begin.'
                                    })
                                }
                                // if(this.props.location.state.startTest) {
                                //     this.startTest()
                                // }
                            })
                        }
                    } else {
                        this.setState({
                            loaded : true,
                            error : true,
                            errorMessage : response.data.error,
                        })
                    }
                    
                },
                failureCallBack : (error) => {
                    this.setState({
                        loaded : true,
                        error : true,
                        errorMessage : 'Internal Server Error!',
                    })
                }
            })
        })
    }

    checkSystemCompatibility = () => {
        window.open('https://tests.mettl.com/system-check?i=db696a8e#/systemCheck', '_blank')
    }

    demoTest = () => {
        DemoExamHelper.startDemoExam(this.state.program)
    }

    toggleAccept = () => {
        this.setState({
            accepted : !this.state.accepted
        })
    }
    
    render () {
        const { 
            loaded, loadingMessage, error, errorMessage, assessmentInfo, timeboundId, scheduleId, sapid, 
            successAlert, successAlertMessage, errorAlert, errorAlertMessage, accepted
        } = this.state
        return (
            <>
                <PageContent
                    title = "TEE Assessment"
                    subtitle = {assessmentInfo.testName}
                    loaded = {loaded}
                    error = {error}
                    loadingMessage = {loadingMessage}
                    errorMessage = { errorMessage }
                    successAlert = { successAlert }
                    errorAlert = { errorAlert }
                    successAlertMessage = { successAlertMessage }
                    errorAlertMessage = { errorAlertMessage }
                >
                    <Paper>
                        <Container as={Card.Body}>
                            
                            <Row>
                                <Col md={12}>
                                    <Table>
                                        <TableBody>
                                            <RowData 
                                                name  = 'Assessment Name' 
                                                value = {assessmentInfo.testName}
                                            />
                                            <RowData 
                                                name  = 'Subject' 
                                                value = {assessmentInfo.subject}
                                            />
                                            <RowData 
                                                name  = 'Start Time' 
                                                value = {<FormattedDate date = {assessmentInfo.startTimestamp}/>}
                                            />
                                            <RowData 
                                                name  = 'Exam Reporting Time' 
                                                value = {<FormattedDate date = {assessmentInfo.reportingStartTimeStamp}/>}
                                            />
                                            {/* <RowData 
                                                name  = 'End Time' 
                                                value = {<FormattedDate date = {assessmentInfo.endTimestamp}/>}
                                            /> */}
                                            <RowData 
                                                name  = 'Weightage' 
                                                value = {`${assessmentInfo.maxMarks} marks`}
                                            />
                                            <RowData 
                                                name  = 'Check System Compatibility' 
                                                value = {
                                                    <Link onClick = {this.checkSystemCompatibility}>
                                                        Link
                                                    </Link>
                                                }
                                            />
                                            <RowData 
                                                name  = 'Demo Test' 
                                                value = {
                                                    <Link onClick = {this.demoTest}>
                                                        Link
                                                    </Link>
                                                }
                                            />
                                        </TableBody>
                                    </Table>
                                </Col>
                                <Col className = "px-4" md={12}>
                                    <b className="card-title">Instructions :</b>
                                    <ul>
                                        <li>The access time is {assessmentInfo.maxMarks === 100 ? '15' : '15'} minutes from the start time to start the test on Mettl.</li>
                                        <li>The duration of the exam will be { assessmentInfo.duration } minutes from the start time.</li>
                                        <li>The link on our portal will be active for {assessmentInfo.maxMarks === 100 ? '3' : '2'} hours. The buffer time is only for technical issues.</li>
                                    </ul>
                                </Col>
                                <Col className = "px-4">
                                    <Row>
                                        {/* <Col className = "my-auto">
                                            <Form.Check type="checkbox" onClick={this.toggleAccept} label="I have read all the instructions" />
                                        </Col> */}
                                        <Col>
                                            <Button className = 'float-right' disabled = {!assessmentInfo.canStudentAttempt} onClick = {this.startTest}>
                                                I have read the instructions, Start Test
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Paper>
                </PageContent>
                <div className="d-none">
                    <form id="submit" target="_blank" action={ URL.startTEEAssessment } method="POST">
                        <input 
                            type  = "hidden" 
                            name  = "sapid" 
                            id    = "sapid" 
                            value = { sapid }
                        />
                        <input 
                            type  = "hidden" 
                            name  = "scheduleId" 
                            id    = "scheduleId" 
                            value = { scheduleId }
                        />
                        <input 
                            type  = "hidden" 
                            name  = "timeboundId" 
                            id    = "timeboundId" 
                            value = { timeboundId }
                        />
                    </form> 
                </div>
            </>
        )
    }
}

function RowData(props) {
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                <label style={{fontWeight : '500'}}>{props.name}</label>
            </TableCell>
            <TableCell component="th" scope="row">
                <label>{props.value}</label>
            </TableCell>
        </TableRow>
    )
}

const mapStateToProps = state => {
	return {
        sapid : state.sapid,
        program : state.program,
    }
}

export default connect(mapStateToProps)(analyticsManager(StartAssessment))