import React, { Component } from 'react'
import {analyticsManager} from '../../shared/Analytics'
import { connect } from 'react-redux'

import CourseExamHomeKey from './CourseExamHomeKey'
import PageContent from '../../components/PageContent/PageContent'
import './CourseExamHome.css'
import { Card, Tabs, Tab, Col, Row } from 'react-bootstrap'

import CurrentSubjectResults from './ResultOverview/CurrentSubjectResults'
import MarksheetDownload from './ResultOverview/MarksheetDownload'
import PassFailStatus from './ResultOverview/PassFailStatus'
import MarksHistory from './ResultOverview/MarksHistory'
import NonGradedMarksheetDownload from './ResultOverview/NonGradedMarksheetDownload'

import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

class CourseExamHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: 'current',
            nonGradedMasterKeys : [142,143,144,145,146,147,148,149]
        };
    }

    handleKeyModalClose = () => {
        this.setState({
            showKeyModal : false,
        })
    }
    handleKeyModalOpen = () => {
        this.setState({
            showKeyModal : true,
        })
    }

    
    // tabChanged = (event, key) => {
    tabChanged = (key) => {
        this.setState({
            activeKey : key
        })
    }

    getContent = () => {
        switch(this.state.activeKey) {
            case 'current' : return <CurrentSubjectResults sapid = {this.props.sapid} />
            case 'passFail' : return <PassFailStatus sapid = {this.props.sapid} />
            case 'history' : return <MarksHistory sapid = {this.props.sapid} />
            case 'marksheet' : return <MarksheetDownload sapid = {this.props.sapid} />
            case 'nonGradedMarksheet' : return <NonGradedMarksheetDownload sapid = {this.props.sapid} />
        }
    }
    render() {
        return(
            <PageContent
                id="grade-book"
                title = 'Exam Results'
                loaded = { true }
            >
                <Card className = "mb-3">
                    <Card.Header className="pb-0">
                        <Tabs defaultActiveKey="current" className="m-0" onSelect = { this.tabChanged }>
                            <Tab eventKey = "current"   title = 'Current Subjects' />
                            <Tab eventKey = "passFail"  title = 'Pass Fail Status' />
                            <Tab eventKey = "history"   title = 'TEE Marks History' />
                           { (this.state.nonGradedMasterKeys.some(masterKey => this.props.data.consumerProgramStructureId == masterKey)) ? <Tab eventKey = "nonGradedMarksheet" title = 'Marksheet' />
                           : <Tab eventKey = "marksheet" title = 'Gradesheet' />
                           }            

                        </Tabs>
                    </Card.Header>
                    <Card.Body>
                        { this.getContent() }
                    </Card.Body>
                </Card>
                <CourseExamHomeKey/>
            </PageContent>
        )
    }
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid,
		data: state,
		currentTimeboundId: state.currentTimeboundId
	}
}
export default connect(mapStateToProps)(analyticsManager(CourseExamHome))