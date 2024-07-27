import React, { Component } from 'react'
import { Row, Col, ListGroup, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { Pages, API, AppConfig } from '../../../../shared/config'
import ErrorComponent from '../../../../components/ErrorComponent/ErrorComponent'
import LoadingSpinner from '../../../../shared/LoadingSpinner/LoadingSpinner'
import AxiosHandler from '../../../../shared/AxiosHandler/AxiosHandler'

import ResultFeedback from './ResultFeedback/ResultFeedback'
import MomentHelper from '../../../../shared/MomentHelper/MomentHelper'
import TestDataHelper from '../../../../shared/Helpers/TestDataHelper'


class ResultsFeedback extends Component{

	constructor(props) {
		super(props)

		this.state = {
            student:this.props.student,
            loading: false,
		}
    }
    
    componentDidMount(){
        //Load recent feedback on first load and on each time timebound id is changed
        this.firstLoadRecentFeedback()
    }

	componentWillReceiveProps(nextProps){
        //Load recent feedback on first load and on each time timebound id is changed
        console.debug(nextProps, this.props)
		if(this.props.currentTimeboundId != nextProps.currentTimeboundId){
			this.firstLoadRecentFeedback()
		}
		this.props = nextProps
    } 
    
    asyncWaitAndUpdateData(){
        if(TestDataHelper.CanCallApiIfTimeIsOutOfWindowOfHighLoad()){
            setTimeout(this.loadRecentFeedback , AppConfig.SIDEBAR_UPDATE_INTERVAL)
        }else{
            console.log("Not doing asyncWaitAndUpdateData() ResultsFeedback.");
        }
    }

    firstLoadRecentFeedback = () => {
        this.setState({
            loading: true,
            firstLoad : true,
        },
        () => {
            this.loadRecentFeedback()
        })
    }

    loadRecentFeedback = () => {
        // set the state to loading and then make axios call
        // make the call
        AxiosHandler.AxiosPostHandler({
            url: API.getTestDataForTODO_V2,
            // url: API.getFinishedTestDataForTODO,
            data: {
                id : this.props.currentTimeboundId,
                sapid : this.state.student.sapid
            },
            successCallBack: this.resultsFeedbackSuccessCallback,
            failureCallBack: this.resultsFeedbackErrorCallback,
        })
    }
    
    resultsFeedbackErrorCallback = (error) => {
        console.error("Error loading results feedback", error)
        if(this.state.firstLoad){
            this.setState({
                loading : false,
                error   : true,
                firstLoad : false,
            },
            () => {
                this.asyncWaitAndUpdateData()
            })
        }else{
            this.asyncWaitAndUpdateData()
        }
    }
    
    resultsFeedbackSuccessCallback = (response) => {
        console.debug("Successfully loaded results feedback", response)
        let sortedFeedback = this.sortTestsForTodo(response.data)

        let feedbackToReturn = []


        sortedFeedback.forEach((feedback) => {
            if(
                TestDataHelper.CheckIfResultIsToBeShownToStudent(feedback)
            ){
                feedbackToReturn.push(feedback)
            }
        })

        this.setState({
            loading: false,
            recentFeedback: feedbackToReturn,
            firstLoad : false,
        },
        () => {
            this.asyncWaitAndUpdateData()
        })
    }

	sortTestsForTodo = (todos) => {
        //Sort incoming tests in the descending order of start date ( tests that started earlier will be displayed earlier. )
        
        let sortedTodos = MomentHelper.getSortedList(todos,{descending: true, param: 'startDate'})
        
		return sortedTodos
    }
    
    render(){
        return	(
            <>
                <Card>
                    <Card.Header style={{backgroundColor : 'white'}}>
                        <Link 
                            to={Pages.courseExamHome}
                        >
                            <div class="media">
                                <div class="media-body media-middle">
                                    <h6 class="card-title">Recent Feedback</h6>
                                    <p class="card-subtitle">Grades</p>
                                </div>
                                <div class="media-right media-middle">
                                    <i class="material-icons">keyboard_arrow_right</i>
                                </div>
                            </div>
                        </Link>
                    </Card.Header>
                    <ListGroup as={Card.Body} variant="flush" className="p-0">
                        {
                            this.state && !this.state.loading ? (
                                <>
                                {
                                    !this.state.error && this.state.recentFeedback && this.state.recentFeedback.length > 0 ? (
                                        <>
                                        {
                                            this.state.recentFeedback.slice(0, 3).map((feedback, index)=>{
                                                if(index < 3){
                                                    //var time = session.date+' '+session.startTime
                                                    return	(
                                                        <ResultFeedback 
                                                            feedback = {feedback} 
                                                            student = {this.props.student}
                                                        />
                                                    )
                                                }else if(index == 3){
                                                    return(
                                                        <Row>
                                                            <Col style={{textAlign:'right'}}>
                                                                <Link to={Pages.courseExamHome}>
                                                                    <small>
                                                                        See More({this.state.recentFeedback.length - 3})
                                                                    </small>
                                                                </Link>
                                                            </Col>
                                                        </Row>
                                                    )
                                                }else{
                                                    return null
                                                }
                                            })
                                        }
                                        </>
                                    ) :
                                    (
                                        <div> 
                                            <ErrorComponent message = {"Nothing for now."} />
                                        </div>
                                    )
                                }
                                </>
                            ) : (
                                <div className="mx-auto p-1 text-center">
                                    <LoadingSpinner noSpace loadingText={'Loading Recent Feedback..'}/>
                                </div>
                            )
                        }
                    </ListGroup>
                </Card>
            </>
        )
    }
}

const mapStateToProps = state => {
	return {
		student: state,
		currentTimeboundId: state.currentTimeboundId
    }
}

export default connect(mapStateToProps)(ResultsFeedback)