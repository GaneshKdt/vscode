import { Button, Paper } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';
import { Badge, Col, Row, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageContent from '../../components/PageContent/PageContent';
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler';
import { API, Pages } from "../../shared/config";
import { FormattedDate } from '../../shared/MomentHelper/TimestampDate';


class UpcomingExams extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            sapid : props.sapid,
            assessments : [],
            loaded : false,
            error : false,
            errorMessage : 'Error!',
        }
    }

    componentDidMount() {
        this.loadAssessments()
    }

    loadAssessments = () => {
        
        this.setState({
            loaded : false,
            error : false,
            loadingMessage : 'Loading Assessments...',
            errorMessage : '',
        }, () => {

            AxiosHandler.AxiosPostHandler({
                url : API.getAssessmentsBySapid,
                data : {
                    sapid : this.state.sapid
                },
                successCallBack : (response) => {
                    if(response.data.status === 'success') {
                        if(response.data.response) {
                            if(response.data.response.length > 0) {
                                this.setState({
                                    loaded : true,
                                    error : false,
                                    errorMessage : '',
                                    assessments : response.data.response
                                })
                            } else {
                                this.setState({
                                    loaded : true,
                                    error : true,
                                    errorMessage : 'No assessments available at this time!',
                                    assessments : []
                                })
                            }
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

    joinTest = (assessment) => {
        this.props.history.push({
            pathname: Pages.startAssessment,
            state: { 
                startTest   : true,
                assessment : assessment
            }
        })
    }

    viewTest = (assessment) => {
        this.props.history.push({
            pathname: Pages.startAssessment,
            state: { 
                startTest   : false,
                assessment : assessment
            }
        })
    }

    render () {
        const { 
            loaded, loadingMessage, error, errorMessage,
            successAlert, successAlertMessage, errorAlert, errorAlertMessage
        } = this.state
        return (
            <PageContent
                title = "Upcoming Exams"
                loaded = {loaded}
                error = {error}
                loadingMessage = {loadingMessage}
                errorMessage = { errorMessage }
                successAlert = { successAlert }
                errorAlert = { errorAlert }
                successAlertMessage = { successAlertMessage }
                errorAlertMessage = { errorAlertMessage }
            >
                <Row>
                    {
                        this.state.assessments.map((assessment) => {
                            return (
                                <AssessmentInfo 
                                    assessment = {assessment} 
                                    viewAssessment = {this.viewTest}
                                    startAssessment = {this.joinTest}
                                />
                            )
                        })
                    }
                </Row>
            </PageContent>
        )
    }
}

function AssessmentInfo(props) {
    let assessment = props.assessment

    let currentTimestamp = Math.floor(Date.now() / 1000);

    let isOver = currentTimestamp > assessment.endTimestamp
    let hasStarted = currentTimestamp > assessment.startTimestamp
    let isActive = hasStarted && !isOver

    console.debug(isOver, hasStarted, isActive)
    console.debug(currentTimestamp, assessment.startTimestamp, assessment.endTimestamp)
    let getBadge = () => {
        let variant = isOver ? "danger" : isActive ? "success" : "warning"
        let text = isOver ? "Ended" : isActive ? "Active" : "Upcoming"
        return (
            <Badge className="my-auto float-right p-2" pill variant = {variant}>
                {text}
            </Badge>
        )
    }
    return (
        <Col md={4}> 
            <Paper className = 'p-3 my-1' style = {{overflowX : 'auto'}}>
                <Row>
                    <Col md={10}>
                        <h5 className = "float-left">{assessment.subject}</h5>
                    </Col>
                    <Col md={2}>
                        {getBadge()}
                    </Col>
                </Row>
                
                <hr/>
                <Row>
                    <Col>
                        <Table borderless className="mt-4">
                            <TableBody>
                                <RowData 
                                    name  = 'Assessment Name' 
                                    value = {assessment.testName}
                                />
                                <RowData 
                                    name  = 'Start Time' 
                                    value = {<FormattedDate date={assessment.startTimestamp}/>}
                                />
                                <RowData 
                                    name  = 'Weightage' 
                                    value = {`${assessment.maxMarks} marks`}
                                />
                            </TableBody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    {
                        isActive ? (
                            <Button
                                variant="contained"
                                color="primary"
                                className="mx-3"
                                onClick = { () => {props.startAssessment(assessment)} }
                            >
                                Start
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="secondary"
                                className="mx-3"
                                onClick = { () => {props.viewAssessment(assessment)} }
                            >
                                View
                            </Button>
                        )
                    }
                </Row>

            </Paper>
        </Col>
    )
}

function RowData(props) {
    return (
        <TableRow>
            <TableCell component="th" scope="row" className="p-0">
                <label style={{fontWeight : '500'}}>{props.name}</label>
            </TableCell>
            <TableCell component="th" scope="row" className="p-0">
                <label  >{props.value}</label>
            </TableCell>
        </TableRow>
    )
}

const mapStateToProps = state => {
	return {
        sapid : state.sapid,
    }
}

export default connect(mapStateToProps)(withRouter(UpcomingExams))