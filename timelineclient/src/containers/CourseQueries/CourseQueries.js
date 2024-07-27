import React, { Component } from 'react'
import {Col, Tabs, Tab, Container, Row} from 'react-bootstrap'
import { connect } from 'react-redux'

import { API } from '../../shared/config'
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler';
import { analyticsManager } from '../../shared/Analytics'

import MyQueries from './MyQueries/MyQueries'
import AllQueries from './AllQueries/AllQueries'

export class CourseQueries extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: "My Queries"
        };
    }

    componentDidMount(){
        let currentSubject = this.getCurrentSubject()

        this.setState({
            currentSubject : currentSubject
        })

        this.getQueries()
    }

    getCurrentSubject = () => {
        if(this.props.applicableSubjects && this.props.currentTimeboundId){
            var applicableSubjects = this.props.applicableSubjects
            
            var subject = ""

            applicableSubjects.forEach((applicableSubject) => {
                console.debug("applicableSubject", applicableSubject)
                if(applicableSubject.timeBoundId == this.props.currentTimeboundId){
                    subject = applicableSubject.subject
                }
            })

            return subject
        }
    }

    tabChanged = (key) => {
        this.setState({
            selectedTab: key
        })
    }

    getQueries = () => {
        this.getMyQueries()
        this.getAllQueries()
    }

    getMyQueries = () => {
        this.setState({
            myQueriesLoaded: false,
            myQueriesError: false,
        },
        () => {
            AxiosHandler.AxiosPostHandler({
                url : API.getMyQueries,
                data : {
                    sapId: this.props.sapid,
                    timeBoundId: this.props.currentTimeboundId,
                },
                successCallBack : this.getMyQueriesSuccessCallBack,
                failureCallBack : this.getMyQueriesFailureCallBack,
            })
        })
    }

    getMyQueriesSuccessCallBack = (response) => {
        if(response.data.status == "success"){
            this.setState({
                myQueries : response.data.sessionQueryAnswerList,
                myQueriesLoaded : true,
                myQueriesError : false,
            })
        }
    }
    
    getMyQueriesFailureCallBack = (error) => {
        this.setState({
            myQueries : [],
            myQueriesError : true,
            myQueriesLoaded : true,
        })
    }


    getAllQueries = () => {
        this.setState({
            allQueriesLoaded: false,
            allQueriesError : false,
        },
        () => {
            AxiosHandler.AxiosPostHandler({
                url : API.getPublicQueries,
                data : {
                    sapId: this.props.sapid,
                    timeBoundId: this.props.currentTimeboundId,
                },
                successCallBack : this.getAllQueriesSuccessCallBack,
                failureCallBack : this.getAllQueriesFailureCallBack,
            })
        })
    }

    getAllQueriesSuccessCallBack = (response) => {
        if(response.data.status == "success"){
            this.setState({
                allQueries : response.data.sessionQueryAnswerList,
                allQueriesLoaded : true,
                allQueriesError : false,
            })
        }
    }
    
    getAllQueriesFailureCallBack = (error) => {
        this.setState({
            allQueries : [],
            allQueriesError : true,
            allQueriesLoaded : true,
        })
    }
    render() {
        return(
            <Container id="grade-book" className="mb-2">
                <Row>
                    <Col>
                        <Tabs 
                            style={{
                                borderBottom: '1px solid #dee2e6'
                            }} 
                            className="mx-2 my-0 pt-2 px-2 bg-light" 
                            onSelect={ this.tabChanged }
                            defaultActiveKey={"My Queries"}
                        >
                            <Tab 
                                key={"My Queries"} 
                                eventKey={"My Queries"} 
                                title={
                                    `My Queries ${ 
                                        this.state.myQueriesLoaded && this.state.myQueries ? 
                                        "(" + this.state.myQueries.length + ")" : 
                                        "" 
                                    }`
                                }
                            />
                            <Tab 
                                key={"All Queries"}
                                eventKey={"All Queries"} 
                                title={
                                    `All Queries ${ 
                                        this.state.allQueriesLoaded && this.state.allQueries ? 
                                        "(" + this.state.allQueries.length + ")" : 
                                        "" 
                                    }`
                                }
                            />
                        </Tabs>
                        <div 
                            className="mx-2 border-left border-right border-bottom" 
                            style={{backgroundColor: 'white'}}
                        >
                            {
                                this.state && this.state.selectedTab == "My Queries" ? (
                                    <>
                                        <MyQueries 
                                            currentSubject = {this.state.currentSubject}
                                            queries = {this.state.myQueries} 
                                            queriesLoaded = {this.state.myQueriesLoaded}
                                            error = {this.state.myQueriesError}
                                            reload = {this.getQueries}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <AllQueries
                                            currentSubject = {this.state.currentSubject}
                                            queries = {this.state.allQueries} 
                                            queriesLoaded = {this.state.allQueriesLoaded}
                                            error = {this.state.allQueriesError}
                                            reload = {this.getQueries}
                                        />
                                    </>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}


const mapStateToProps = state => {
	return {
		applicableSubjects: state.applicableSubjects,
		sapid: state.sapid,
		currentTimeboundId: state.currentTimeboundId
	}
}

export default connect(mapStateToProps)(analyticsManager(CourseQueries))