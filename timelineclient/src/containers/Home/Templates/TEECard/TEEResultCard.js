import React, { Component } from 'react'
import './MCQResultCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from 'react-moment'
export class MCQResultCard extends Component {
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
                             <div class="progress-wrapper"><div class="progress-value">0</div><div class="total-value">/2</div></div>
                             <div class="completed"><div class="completed-image"><FontAwesomeIcon  icon="check" /></div></div>
                             
                         </div>
                         <div class="subbox-wrapper">
                             <div class="due-date">
                             <span><FontAwesomeIcon  icon="clock" /> Last Date <Moment format="D/MM/YYYY" withTitle>{endDate}</Moment></span>
                             </div>
                         </div>
                         <div class="content-info">
                             <span>● {duration} Minutes</span>
                             <div className="float-right">
                             <div>
                            
                                 <button type="button " class="attend-test btn ">View Test Results </button>
                                 
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

export default MCQResultCard
