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
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import { connect } from 'react-redux'
// import { analyticsManager } from '../../shared/Analytics';
import { Option } from './Option/Option';
import { IAQuestion } from './IAQuestion/IAQuestion';
import { CorrectAnswer } from './CorrectAnswer/CorrectAnswer';
import { IATestDescription } from './IATestDescription/IATestDescription';
import { Descriptive } from './Descriptive/Descriptive';
import { CaseStudy } from './CaseStudy/CaseStudy';
import AxiosHandler from '../../shared/AxiosHandler/AxiosHandler';
import { PdfLink } from './PdfLink/PdfLink';
import PageContent from '../../components/PageContent/PageContent'

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
            testQuestionDeatils:[],          
            
        }  }

    componentDidMount(){                
        if(!this.props.location.state){         
          this.props.history.push(`/ssoservices/mbax/examBookingHome `)
          return
        }     
        this.setState({
          loading: true,
      })    
        this.getTestDetails()    
    }

    getTestDetails  = ()  =>{
      AxiosHandler.AxiosPostHandler({
        url : urls.apiUrl_exam  + `viewTestDetailsForStudentsMBAX?sapId=${this.props.sapid}&testId=${this.props.location.state.testId}`,
        
        successCallBack : this.getTestDetailsSuccessCallBack,
        failureCallBack : this.getTestDetailsFailureCallBack,
    })
    }

    getTestDetailsSuccessCallBack = (response) => {  
        this.setState({
          data: response.data,
          isLoading: false,  
          test:response.data.test,
          studentsTestDetails:response.data.upgradAssessmentBean,
          testQuestionDeatils:response.data.upgradTestQuestionBean,
          status: true,
          loading : false,
            error : false,
            loaded:true
         })
      }

      getTestDetailsFailureCallBack = (error) => {
        this.setState({
          isLoading: false,    
          error: true,
          loaded:true,
          errorMessage:"Internal Server Error! Please try again!",         
          status: false
       });      
      }
    
   
    render() {      
      const { open } = this.state;
		  const {               
             isLoading,                
                test,
                studentsTestDetails,
                testQuestionDeatils,
                status,
                loaded,
                error,
                data
			} = this.state
 
        
        return (
          <PageContent
            id = 'IAResultDetails'
            title = 'IA Result Details'
            subtitle = 'Your IA Result Details'
            loaded = {this.state.loaded}
         error = {this.state.error}
             loadingMessage = 'Loading...'
             errorMessage = { this.state.errorMessage }
        >
          
         { 
                  status ? (   
                 //   TestDataHelper.CheckIfTestActive(test) ?  (  ):(                                
                  <>                 
                  <Container fluid id="start-IA-container">
                  <Row className="breadcrumbs">
                  <Col xs={12}>   
                    <Card >
                      <Card.Body className="text-secondary">
                        <Link to={{pathname: '/ssoservices/mbax/examBookingHome'}}>
                           Home 
                        </Link> 

                        &nbsp;
                          <ArrowForwardIosIcon fontSize="small" />
                        &nbsp; 
                        {
                          //isAssessmentResult is used to check if this page was accessed via "Exams" tab.
                         
                            <Link to={{ 
                              pathname: '/ssoservices/mbax/courseExamHome',
                              state: {
                                timeboundId : this.props.currentTimeboundId
                              }
                            }}>
                              Exam Result 
                            </Link>
                          
                        }
                        &nbsp;
                        <ArrowForwardIosIcon fontSize="small" />
                        &nbsp;

                        <a className="active" > {this.props.location.state.testName} </a> 
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              
            {data.code === 200 ?(      
          <div className="IAResultDetails_content" >
           
          <IATestDescription  test={studentsTestDetails}  />
          
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
                    
                  
                    {open === true ? 
                    <RemoveIcon
                    fontSize="large"
                    style={{ color: "#26a9e0", float: "right", cursor: "pointer", margin: 5}}
                    onClick={() => this.setState({ open: !open })}
                    /> : <AddIcon
                    fontSize="large"
                    style={{ color: "#26a9e0", float: "right", cursor: "pointer", margin: 5 }}
                    onClick={() => this.setState({ open: !open })}
                    />}
                    
                  </Card.Header>
                </Card>

                <Collapse in={this.state.open}>
                  <Col xs={12}>
                    <br />
                    <h6>
                      
                      Attempted Questions:&ensp;
                      {studentsTestDetails.noOfQuestionsAttempted }
                      &ensp;Total Questions:&ensp;{studentsTestDetails.maxQuestnToShow}
                      
                      
                    </h6>
                
                    {studentsTestDetails.showResult === "Y" ? (
                        testQuestionDeatils.length > 0 ? (
                      
                          testQuestionDeatils.map((testQuestion, index) => (
                          <div className="IAResultDetails_well">
                            <Row>
                              <IAQuestion question={testQuestion} index={index} />

                      {testQuestion.question_type === 1 ||
                      testQuestion.question_type === 2 ||
                      testQuestion.question_type === 5 ? (
                                <>
                                  <span className="IAResultDetails_optionFont">
                                    Options:
                                  </span>

                                  <Col xs={12} style={{ width: "100%" }}>
                                    {testQuestion.testQuestionOptions.map((option, oIndex) => (
                                      <Option options={option} oIndex={oIndex} />
                                    ))}

                                    <CorrectAnswer question={testQuestion} />
                                  </Col>
                                </>
                      ) : testQuestion.question_type === 4 ? (
                              
                                <Descriptive testQuestion={testQuestion}/>
                             
                      ) 
                      // : testQuestion.question_type === 3 ? (

                      //           <CaseStudy testQuestion={testQuestion}/>
                             
                      // )
                       : testQuestion.question_type === 8 ? (

                                <PdfLink testQuestion={testQuestion} publicUrl={urls.baseUrl}/>
                                
                    ): null}
                            </Row>
                          </div>
                        ))
                     
                    ):(
                      <h5>You have not Attempted this test.</h5>                    
                    )
                        ) : (
                          <h5>Questions will be available after results are declared.</h5> 
                      )
                      } 
                  </Col>
                </Collapse>
              </Col>
            </Row> 

          </div>          
          </div> 
            ): data.code === 421 ? (
              
                 <h5>For this Test Result not available.</h5> 
              
            ):(
              <h5>Error in Fetching Data.Please Try Again Later.</h5>
            )}
          </Container>
          
              </>
              //)
                  ):(
                    <h5>Error in Fetching Data.Please Try Again Later.</h5>
                  )
           }   
        </PageContent>                 
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

export default connect(mapStateToProps)(IAResultDetails)