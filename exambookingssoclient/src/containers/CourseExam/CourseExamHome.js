import React, { Component } from 'react'
import { Card, Tab, Tabs } from 'react-bootstrap'
// import {analyticsManager} from '../../shared/Analytics'
import { connect } from 'react-redux'
import PageContent from '../../components/PageContent/PageContent'
import './CourseExamHome.css'
import CourseExamHomeKey from './CourseExamHomeKey'
import CurrentSubjectResults from './ResultOverview/CurrentSubjectResults'
import MarksheetDownload from './ResultOverview/MarksheetDownload'
import MarksHistory from './ResultOverview/MarksHistory'
import PassFailStatus from './ResultOverview/PassFailStatus'
class CourseExamHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: 'current',
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
            case 'current' :  return <CurrentSubjectResults sapid = {this.props.sapid} />
            case 'passFail' :  return <PassFailStatus sapid = {this.props.sapid} />
            case 'history' : return  <MarksHistory sapid = {this.props.sapid} />
            case 'marksheet' : return <MarksheetDownload sapid = {this.props.sapid} />
            default : return <CurrentSubjectResults sapid = {this.props.sapid} />
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
                            <Tab eventKey = "marksheet" title = 'Gradesheet' />
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
export default connect(mapStateToProps)(CourseExamHome)
    //analyticsManager(CourseExamHome))