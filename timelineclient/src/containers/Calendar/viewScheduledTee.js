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

export class ScheduledTee extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount(){
		this.setState({
        //    session: this.props.session,
            tee: this.props.tee,
            join_enabled: false
        })

        if(TestDataHelper.CheckIfTestActive(this.props.tee)){
            this.setState({
                join_enabled : true
            })
        }
    }

    joinTest = () => {
        this.props.history.push({
            pathname: Pages.startTEEAssessment,
            state: { 
                startTest   : true,
                assessment : this.state.tee
            }
        })
    }

    viewTest = () => {
        this.props.history.push({
            pathname: Pages.startTEEAssessment,
            state: { 
                startTest   : false,
                assessment : this.state.tee
            }
        })
    }
    render() {
        const { tee, join_enabled } = this.state;
       
        return (
            <Card>
                <Card.Header>{tee.customAssessmentName ? tee.customAssessmentName : tee.name}</Card.Header>
                <Card.Body>
                    <Table striped hover>
                        <tbody>
                            <tr>
                                <td>Test Name</td>
                                <td>{tee.customAssessmentName ? tee.customAssessmentName : tee.name}</td>
                            </tr>                             
                            <tr>
                                <td>Start Date/Time</td>
                                <td>
                                    <Moment format="MMM D \at hh:mm a \(\I\S\T\)" withTitle>
                                        {tee.exam_start_date_time}
                                    </Moment>
                                </td>
                            </tr>                             
                            {/*<tr>
                                <td>End Date/Time</td>
                                <td>
                                    <Moment format="MMM D \at hh:mm a \(\I\S\T\)" withTitle>
                                        {tee.exam_end_date_time}
                                    </Moment>
                                </td>
        </tr>*/}                             
                            <tr>
                                <td>Weightage</td>
                                <td>
                                    {tee.max_score} marks.
                                </td>
                            </tr>
                            
                        </tbody>
                    </Table>
                    <hr />
                    
                    <ButtonGroup>
                        <Button 
                            disabled={!join_enabled}
                            variant="primary" 
                            size="sm"
                            onClick = {this.joinTest}
                        >
                            Start Test
                        </Button>
                        <Button 
                            variant="primary" 
                            size="sm"
                            onClick = {this.viewTest}
                        >
                            View Details
                        </Button>
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

export default connect(mapStateToProps)(withRouter(ScheduledTee))
