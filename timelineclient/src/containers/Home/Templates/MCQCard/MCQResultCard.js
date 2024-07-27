import React, { Component } from 'react'
import './MCQResultCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment'
import axios from 'axios' 
import ConfigUrls from '../../../../shared/config' 
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Pages } from '../../../../shared/config';
const urls = new ConfigUrls().urls;

export class MCQResultCard extends Component {

	constructor(props) {
		super(props)
		// Sets up our initial state
		this.state = {
			score: 0,
            maxscore:0,
            noOfQuestionsAttempted:0,
            maxQuestions:0,
            testStartedOn:"",
            testCompleted:false,
            sessionPlanData:""
        }
        
        this.loadDetails()
        
    }
    loadDetails= () =>{
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        axios.post(urls.apiUrl_exam + "/getStudentsTestDetailsBySapidAndTestId", 
            JSON.stringify({
                "testId": this.props.mcq.referenceId,
                "sapid": this.props.sapId
            })
        ).then(response => {
            console.log(response)
            if(response.data.testCompleted=="Y"){
                this.setState({
                    testCompleted:true
                });
            }
            this.setState({
                score:response.data.score,
                noOfQuestionsAttempted:response.data.noOfQuestionsAttempted,
                maxscore:response.data.maxScore,
                maxQuestions:response.data.maxQuestnToShow,
                testStartedOn:response.data.testStartedOn,
                sessionPlanData:response.data.sessionplanModule
                
            })
        }).catch(function (error) {
            console.log(error);
        })


    }


    render() {
        const{
            content,
            subject,
            duration,
            endDate
        }=this.props.mcq

        var dt = new Date(endDate)
        var now =new Date()
        var activeTest = (dt>now)?true:false
        console.log('mcq test')
        console.log(dt+'---'+now)
        
        return (
            <div>
            <div class="mcq-result-card">
                <div class="mcq-result-card-head">
                    <div class="mcq-result-card-content-left">
                        <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28">
                            <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#003DB8" fill-rule="evenodd">
                             </path>
                         </svg>
                     </div>
                     <div class="mcq-result-card-content-center">
                         <div class="title-wrapper">
                             <div class="center-title">{content}
                             </div>
                             <div class="progress-wrapper"><div class="progress-value">{this.state.score}</div><div class="total-value">/{this.state.maxscore}</div></div>
                             {this.state.testCompleted && 
                                <div class="completed"><div class="completed-image"><FontAwesomeIcon  icon="check" /> </div></div>
                             }
                             {!this.state.testCompleted &&
                                 <div class="completed"><div class="completed-image"><FontAwesomeIcon style={{color:"red"}} icon="times" /></div></div> 
                             }

                         </div>
                         <div class="subbox-wrapper">
                             <div class="due-date">
                             <span><FontAwesomeIcon  icon="calendar-alt" /> <b><Moment format=" DD/MM/YYYY" withTitle>{this.state.testStartedOn}</Moment> </b>
                             </span>
                             </div>
                         </div>
                         <div class="content-info">
                            <span><FontAwesomeIcon  icon="clock" /> Duration {duration} Minutes</span><br/>
                             <span><FontAwesomeIcon  icon="clipboard-list" /> Attempted <b>{this.state.noOfQuestionsAttempted}</b>/{this.state.maxQuestions} questions</span>
                             <div className="float-right">
                             <div>
                             
                                 <button type="button " onClick = {this.loadDetails} class="attend-test btn ">
                                 <Link
                        to={{
                            pathname: Pages.viewTestResults,
                            state: {
                                sapId : this.props.sapId,
                                testId : this.props.mcq.referenceId,
                                module : this.state.sessionPlanData,
                                testName: this.props.mcq.content
                            }
                        }} 
                    >View Test Results </Link> 
                                 </button>
                                 
                             </div>
                             </div>
                         </div>
                     </div>
                     </div>
             </div>
         </div>
        )
    } 
}


const mapStateToProps = state => {
	return {
		sapId: state.sapid,
		data:state,
        currentTimeboundId: state.currentTimeboundId,
        student:state
	}
}

export default connect(mapStateToProps)(MCQResultCard)