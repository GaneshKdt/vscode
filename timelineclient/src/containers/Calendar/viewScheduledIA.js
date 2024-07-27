import React, { Component } from 'react'
import { ButtonGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Pages } from '../../shared/config'
import TestDataHelper from '../../shared/Helpers/TestDataHelper'
import moment from 'moment'

export class ScheduledIA extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){
		this.setState({
            ia: this.props.ia,
            sapId : this.props.sapid,
            join_enabled: false
        })

        
        if(TestDataHelper.CheckIfIATestIsActive(this.props.ia)){
            this.setState({
                join_enabled : true
            })
        }
    }

    joinTest = () => {
        this.props.history.push({
            // pathname: Pages.todo,

            pathname: Pages.startIATest,
            state: { 
                sapId : this.state.sapId,
                testId : this.state.ia.testId,
                module : '',
                testName: this.state.ia.testName 
            }
        })
    }

    viewTest = () => {
        this.props.history.push({
            pathname: Pages.viewTestResults,
            state: {
                sapId : this.state.ia.sapId,
                testId : this.state.ia.testId,
                testName: this.state.ia.testName,
                isAssessmentResult : true  
                }
        })
    }

    changeTestDurationFormat(testDuration){   
        return moment.duration(testDuration, "minutes").format("D [days] h [hrs] mm [mins]");
    }

    render() {
        const { ia, join_enabled } = this.state;
       
        return (
            <Card>
                <Card.Header>{ia.subject ? ia.subject : ''}</Card.Header>
                <Card.Body>
                    <Table striped hover>
                        <tbody>
                            <tr>
                                <td>Test Name</td>
                                <td>{ia.testName ? ia.testName : ''}</td>
                            </tr>                             
                            <tr>
                                <td>Joining Window</td>
                                <td>
                                    <Moment format="MMM D \at hh:mm a \to " withTitle>
                                        {ia.startDate}
                                    </Moment>
                                    <Moment format=" MMM D \at hh:mm a \(\I\S\T\)" withTitle>
                                        {ia.endDate}
                                    </Moment>
                                </td>
                            </tr>
                            <tr>
                                <td>Duration</td>
                                <td>
                                {this.changeTestDurationFormat(ia.duration)}
                                </td>
                            </tr>                             
                            {
                                ia.showResultsToStudents == 'Y' && (ia.attemptStatus == 'Attempted' || ia.attemptStatus == 'CopyCase') ? (
                                <>
                                <tr>
                                <td>Your Score</td>
                                <td>
                                {ia.score} out of {ia.maxScore} 
                                </td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>Attempted IA</td>
                                </tr>
                                </>
                                ) : ia.attemptStatus == 'Upcoming' ? (
                                    <>
                                    <tr>
                                    <td>Weightage</td>
                                    <td>
                                        {ia.maxScore} Marks
                                    </td>
                                    </tr>
                                    <tr>
                                    <td>Status</td>
                                    <td>Upcoming IA</td>
                                    </tr>
                                    </>
                                ) :  ia.showResultsToStudents == 'N' && ia.attemptStatus == 'Attempted' ? (
                                    <>
                                    <tr>
                                    <td>Status</td>
                                    <td>
                                        Result not declared 
                                    </td>
                                    </tr>
                                    </>
                                ) : ia.attemptStatus == 'Not Attempted' ? (
                                    <>
                                    <tr>
                                    <td>Status</td>
                                    <td >
                                    Not Attempted IA
                                    </td>
                                    </tr>
                                    </>
                                ) :  (
                                    <>
                                    </>
                                )
                                }
                        </tbody>
                    </Table>
                    <hr />
                    
                    <ButtonGroup>
                        {
                         join_enabled  || ia.attemptStatus == 'Resume' ? (   
                            <Button 
                                variant="primary" 
                                size="sm"
                                onClick = {this.joinTest}
                            >
                               Take Test 
                            </Button>
                         ) : (
                            <Button 
                                variant="primary" 
                                size="sm"
                                onClick = {this.viewTest}
                            >
                                View Details
                            </Button>
                         ) 
                        }
                    </ButtonGroup>
                </Card.Body>
            </Card>
        )
    }
}
const mapStateToProps = state => {
	return {
		data: state
	}
}

export default connect(mapStateToProps)(withRouter(ScheduledIA))
