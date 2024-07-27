import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ConfigUrls, { Pages } from '../../../../shared/config';
import TestDataHelper from '../../../../shared/Helpers/TestDataHelper';
import { FormattedDate } from '../../../../shared/MomentHelper/TimestampDate';
import './TEEExamCard.css';

const urls = new ConfigUrls().urls;
class TEEExamCard extends Component {
    constructor(props) {
		super(props)
		// Sets up our initial state
		this.state = {
            tee:this.props.tee
		}
    } 
    componentDidMount (){
        console.debug(this.props.tee)
        this.checkIfTestActive()
        setInterval(() => {
            this.checkIfTestActive()
        }, 10000);
    }
    
    checkIfTestActive = () => {
        this.setState({
            testActive : TestDataHelper.CheckIfTestActive(this.props.tee),
        }) 
    }

    joinTest = () => {
        this.props.history.push({
            pathname: Pages.startTEEAssessment,
            state: {
                assessment : {
                    startTest : true,
                    scheduleId : this.props.tee.referenceId,
                    timeboundId : this.props.tee.subjectConfigId,
                }
            }
        })
    }

    viewTest = () => {
        this.props.history.push({
            pathname: Pages.startTEEAssessment,
            state: {
                assessment : {
                    startTest : false,
                    scheduleId : this.props.tee.referenceId,
                    timeboundId : this.props.tee.subjectConfigId,
                }
            }
        })
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
            duration,
            endDate,
        }=this.props.tee

        let takeTestDisabled = this.props.testActive
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
                                <span><FontAwesomeIcon  icon="clock" /> Last Date : <FormattedDate date={endDate}/> </span>
                                {/* 
                                <Moment format="D MMM YYYY,hh:mm a \(\I\S\T\)" withTitle>{endDate}</Moment>
                                */}
                                </div>
                            </div>
                            <div class="content-info">
                                {/* <span>● {duration} Minutes</span> */}
                                <div className="float-right">
                                    <div>
                                        <div className="mcq-attend-btn-grp">
                                            <button 
                                                className={`${this.state.testActive ? 'attend-test' : 'attend-test-disabled'} btn`} 
                                                onClick = {this.joinTest}
                                                disabled = {!this.state.testActive}
                                            >
                                                <FontAwesomeIcon icon={["far","play-circle"]}/> Take Test
                                            </button> 
                                            <button 
                                                class="attend-test btn" 
                                                onClick = {this.viewTest}
                                            >
                                                <FontAwesomeIcon icon={["far","play-circle"]}/> View Details 
                                            </button>
                                        </div>
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

export default connect(mapStateToProps)(withRouter(TEEExamCard))
