import React, { Component } from 'react'
import './MCQCard.css'
import Moment from 'react-moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios'
import ConfigUrls from '../../../../shared/config'
import TestDataHelper from '../../../../shared/Helpers/TestDataHelper';
import { FormattedDate } from '../../../../shared/MomentHelper/TimestampDate';

const urls = new ConfigUrls().urls;
export class MCQCard extends Component {
    constructor(props) {
		super(props)
		// Sets up our initial state
		this.state = {
            moduleToReturn : 0,
            // attempt:false,
            mcq:this.props.mcq
		}
    } 
    componentDidMount (){
        console.debug("props", this.props)
        this.handleTakeTest();
        // this.getStudentAttemptDetails();
    }
    handleTakeTest = () => {
        if(this.props.sessionPlanModuleData && this.props.sessionPlanModuleData.length>0){
            this.props.sessionPlanModuleData.map(mod => {
                if(mod.id == this.props.mcq.session_plan_module_id){
                        this.setState({
                            moduleToReturn : mod,
                        })
                }
                        
            })
        }
    }
// static getDerivedStateFromProps(nextProps, prevState){
//     return {
//         mcq:nextProps.mcq
//     }
// }    

// getStudentAttemptDetails=()=>{
//     console.log("calling student attempt details")
//         axios.defaults.headers.post['Content-Type'] = 'application/json';
//         axios.post(urls.apiUrl_exam+"/getAttemptsDetailsBySapidNTestId",
//         JSON.stringify({
//             'sapid' : this.props.sapId,
//             'testId' : this.state.mcq.referenceId})
//         ).then( response => {
//             console.log("getStudentAttemptDetails--->")
//             if(response.data[0].attempt>0)
//             this.setState({
//                 attempt:true
//             })
//         }).catch((error) => {
//             console.log(error);
//         })
// }
    render() {
        const{
            content,
            subject,
            duration,
            startDate,
            endDate,
            referenceId,
            session_plan_module_id,
            attempt
        }=this.state.mcq

        return (
            <div>
               <div class="mcq-card">
                   <div class="mcq-card-head">
                       <div class="mcq-card-content-left">
                           <svg data-name="\u7EC4 1 \u62F7\u8D1D" width="28" height="28">
                               <path data-name="\u5F62\u72B6 2" d="M14 0A14 14 0 1 1 0 14 14 14 0 0 1 14 0zm6.662 21.994H7.338a1.332 1.332 0 0 1-1.332-1.332V7.338a1.332 1.332 0 0 1 1.332-1.332h13.324a1.332 1.332 0 0 1 1.332 1.332v13.324a1.332 1.332 0 0 1-1.332 1.332zM8 20.993h8.983V19.01H8v1.983zm9.962-13.009l-3.983 4.053-2.022-1.937-.95 1.2 1.836 1.9.723.795h.723L18.995 9.1zM20 16H8v1.983h12V16z" fill="#003DB8" fill-rule="evenodd">
                                </path>
                            </svg>
                        </div>
                        <div class="mcq-card-content-center">
                            <div class="title-wrapper">
                                <div class="center-title">{content}
                                </div>
                                
                            </div>
                            <div class="subbox-wrapper">
                                <div class="due-date">
                                <span><FontAwesomeIcon  icon="clock" /> Join Within : <FormattedDate date={startDate}/>  to  <FormattedDate date={endDate}/> </span>
                                {/* 
                                <Moment format="D MMM YYYY,hh:mm a \(\I\S\T\)" withTitle>{endDate}</Moment>
                                */}
                                </div>
                            </div>
                            <div class="content-info">
                                <span>● {duration} Minutes</span>
                                <div className="float-right">
                                <div>
                                {
                                    // TestDataHelper.CheckIfTestActive(this.props.mcq) && this.state.attempt ? 
                                    TestDataHelper.CheckIfIATestIsActive(this.props.mcq) ? 
                                    (
                                        <Link 
                                        title="Start Test"
                                        className="attend-test btn"
                                        to = {{
                                        pathname : "/timeline/startIATest",
                                        state:  {
                                            sapId : this.props.sapid,
                                            testId : referenceId,
                                            module : this.state.moduleToReturn,
                                            testName: content
                                        }
                                        }}
                                        >
                                            <FontAwesomeIcon icon={["far","play-circle"]}/> Take Test 
                                        
                                        </Link> 
                                    ) : (
                                        <div className="mcq-attend-btn-grp">
                                            <button type="button " class="attend-test-disabled btn "><FontAwesomeIcon icon={["far","play-circle"]}/> Take Test </button>
                                    { TestDataHelper.CheckIfTestEnded(this.props.mcq)	? (
                                            <Link 
                                            title="View Details"
                                            className="attend-test btn"
                                            to = {{
                                            pathname : "/timeline/viewTestResults",
                                            state:  {
                                                sapId : this.props.sapid,
                                                testId : referenceId,
                                                module : this.state.moduleToReturn,
                                                testName: content
                                            }
                                            }}
                                            >
                                        
                                            
                                                <FontAwesomeIcon icon={["far","play-circle"]}/> View Details
                                                
                                         

                                            </Link>
                                             ):null
                                            }
                                        </div>
                                    )}
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
		testTodos : state.testTodos,
		sessionPlanModuleData : state.sessionPlanData,
		currentTimeboundId : state.currentTimeboundId,
	}
}

export default connect(mapStateToProps)(MCQCard)
