import React, { useState ,Component, Fragment } from 'react'
import './IAResultDetails.css';
import axios from 'axios'
import ConfigUrls from '../../shared/config'
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {   Link } from 'react-router-dom';
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux'
import { analyticsManager } from '../../shared/Analytics';
import { Option } from './Option/Option';
import { IAQuestion } from './IAQuestion/IAQuestion';
import { CorrectAnswer } from './CorrectAnswer/CorrectAnswer';
import { IATestDescription } from './IATestDescription/IATestDescription';
import { Descriptive } from './Descriptive/Descriptive';
import { CaseStudy } from './CaseStudy/CaseStudy';
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler';
import { PdfLink } from './PdfLink/PdfLink';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
import Index from '../../components/Breadcrumbs/Index'
import Paths from '../../components/Breadcrumbs/Paths'
import { Alert } from 'react-bootstrap';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const urls = new ConfigUrls().urls
class IAResultDetails extends Component{

    constructor(props){
        super(props)
        this.state = {
            data: [],
            isLoading: true,
            status: false,   
            test:[],
            studentsTestDetails:[],
            open: false,
            attemptDetail1:[],          
            bodQuestions:[]
        }  }

    componentDidMount(){                
        if(!this.props.location.state){         
          this.props.history.push(`/timeline/home`)
          return
        }         
        this.getTestDetails()    
    }

    getTestDetails  = ()  =>{
      AxiosHandler.AxiosPostHandler({
        url : urls.apiUrl_exam  + `/viewTestDetailsForStudents?sapId=${this.props.sapid}&id=${this.props.location.state.testId}&message=`,
        data : {
            sapId : this.props.sapid,
            message : '',
            id  :   this.props.location.state.testId       
        },
        successCallBack : this.getTestDetailsSuccessCallBack,
        failureCallBack : this.getTestDetailsFailureCallBack,
    })
    }

    getTestDetailsSuccessCallBack = (response) => {  
        this.setState({
          data: response.data,
          isLoading: false,  
          test:response.data.test,
          studentsTestDetails:response.data.studentsTestDetails,
          attemptDetail1:response.data.attemptDetail1,
          bodQuestions:response.data.bodQuestions,
          status: true
         })
      }

      getTestDetailsFailureCallBack = (error) => {
        this.setState({
          isLoading: false,             
          status: false
       });      
      }
    
	  getCrumbsBasedOnSource() {
		if(this.props.location.state.isAssessmentResult) {
			return [
				Index.courseExamHome,
				{
					...Index.viewTestResults,
					text : this.props.location.state.testName,
				}
			]
		} else {
			return [
				{
					...Index.sessionPlanDashboard,
					data : {
						state: {
						timeboundId : this.props.currentTimeboundId
						}
					}
				},
				{
					...Index.sessionPlanModule,
					text : this.props.location.state.module.topic,
					data : {
						state: {
						id:  this.props.location.state.module.id,
						module:  this.props.location.state.module 
						}
					}
				},
				{
					...Index.viewTestResults,
					text : this.props.location.state.testName,
				},
			]
		}
	}

  checkBodApplicable = (testQuestion) => {
    return this.state.bodQuestions.some(questionId => testQuestion.id === questionId);
  }

    render() {      
      const { open } = this.state;
		  const {               
             isLoading,                
                test,
                studentsTestDetails,
                attemptDetail1,
                status

			} = this.state
 
        return (
          
          isLoading ? (
                    <Card className="mx-auto text-center p-2">
                    <LoadingSpinner noSpace loadingText={'Fetching available resources..'}/>
                </Card>
                ) : (
                  status ? (   
                 //   TestDataHelper.CheckIfTestActive(test) ?  (  ):(                                
                  <>                 
                  <Container fluid id="start-IA-container">
                     
                    <Breadcrumbs 
                      crumbsList = {[
                        Index.home, 
                        ...this.getCrumbsBasedOnSource()
                      ]}
                    />
              
                  
          <div className="IAResultDetails_content" >
           
          <IATestDescription test={test} studentsTestDetails={studentsTestDetails} subject={this.state.data.subject} />
          
          <div className="IAResultDetails_well">
            <h2 className="IAResultDetails_wellText" style={{color:"grey"}}>Attempt Details </h2>

            <Row>
              <Col>
                <Card
                  onClick={() => this.setState({ open: !open })}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Header>
                    <Button
                      variant="link"
                      style={{ color: "#26a9e0" }}
                      onClick={() => this.setState({ open: !open })}
                    >
                      Details of Attempt No. 1
                    </Button>
                    <FontAwesomeIcon
                      size="lg"
                      style={{ color: "#26a9e0", float: "right", cursor: "pointer" }}
                      onClick={() => this.setState({ open: !open })}
                      icon={open === true ? ( "minus" ) : ("plus")}
                    />
                  </Card.Header>
                </Card>

                <Collapse in={this.state.open}>
                  <Col xs={12}>
                    <h6>
                      
                      Attempted Questions:&ensp;
                      {studentsTestDetails.noOfQuestionsAttempted }
                      &ensp;Total Questions:&ensp;{test.maxQuestnToShow}
                      
                      
                    </h6>
                      
                      { studentsTestDetails.attemptStatus && studentsTestDetails.attemptStatus == "CopyCase" 
                          && studentsTestDetails.showResult !== 'N'?
                          (
                            <>
                            <div className="IAResultDetails_well alert alert-danger">
                              <Row>
                                <h6>Attempt Status : Marked For Copy Case.</h6>
                              </Row>
                            </div> 
                    
                            </>
                          ) : (
                            <></>
                          ) 
                        }
                
                    {studentsTestDetails.showResult === "Y" ? (
                    
                        attemptDetail1.map((attempt, index) => (
                          <div className="IAResultDetails_well">
                            <Row>
                              <IAQuestion question={attempt} index={index} />

                      {attempt.type === 1 ||
                      attempt.type === 2 ||
                      attempt.type === 5 ? (
                                <>
                                  <span className="IAResultDetails_optionFont">
                                    Options:
                                  </span>

                                  <Col xs={12} style={{ width: "100%" }}>
                                    {attempt.optionsList.map((option, oIndex) => (
                                      <Option options={option} oIndex={oIndex} />
                                    ))}

                                    <CorrectAnswer question={attempt} />
                                    {this.checkBodApplicable(attempt) && 
                                      <Alert variant="success">
                                        <ErrorOutlineIcon/> Benefit of Doubt has been applied for this question.
                                      </Alert>}
                                  </Col>
                                </>
                      ) : attempt.type === 4 ? (
                                (this.checkBodApplicable(attempt) 
                                  ? <Descriptive attempt={attempt} bodApplied={true} />
                                  : <Descriptive attempt={attempt} bodApplied={false} />)
                             
                      ) : attempt.type === 3 ? (
                                (this.checkBodApplicable(attempt) 
                                ? <CaseStudy attempt={attempt} bodApplied={true} />
                                : <CaseStudy attempt={attempt} bodApplied={false} />)
                             
                      ) : attempt.type === 8 ? (
                                (this.checkBodApplicable(attempt) 
                                  ? <PdfLink attempt={attempt} publicUrl={urls.baseUrl} bodApplied={true} />
                                  : <PdfLink attempt={attempt} publicUrl={urls.baseUrl} bodApplied={false} />)
                                
                    ): null}
                            </Row>
                          </div>
                        ))
                     
                    
                        )  : studentsTestDetails.attempt == 1 && studentsTestDetails.showResult === "N" ? (
                          
                          <h5>Questions will be available after results are declared.</h5>    
                        ) : studentsTestDetails.attempt == 0 ? (
                          <h5>You have not Attempted this test.</h5> 
                      ):(
                        <>
                        </>
                      )
                      }
                  </Col>
                </Collapse>
              </Col>
            </Row>

          </div>          
          </div> 
          </Container>
          
              </>
              //)
                  ):(
                    <h5>Error in Fetching Data.Please Try Again Later.</h5>
                  )
        
            
                )             
        )
    }
}

const mapStateToProps = state => {

	return {
    sapid:state.sapid,
		data:state,
    currentTimeboundId: state.currentTimeboundId
   
	}
}

export default connect(mapStateToProps)(analyticsManager(IAResultDetails))