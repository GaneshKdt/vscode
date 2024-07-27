import React from 'react'
import moment from 'moment-timezone'
import { API } from '../../config'
import AxiosHandler from '../../AxiosHandler/AxiosHandler'
import AttendSessionModal from './AttendSessionModal'
import TestDataHelper from '../TestDataHelper'

class SessionHelper {

    static CheckIfSessionActive = (session) => {
        
        //Checks session date and time to verify if its active
        
        //get session start and end time in current utc time format
        let sessionStartDateTime = moment.tz(session.date + " " + session.startTime, 'Asia/Calcutta').subtract(1, 'hours')
        let sessionEndDateTime = moment.tz(session.date + " " + session.startTime, 'Asia/Calcutta').add(2.5, 'hours')
        // console.debug(sessionStartDateTime.valueOf())
        if(session.isCancelled === 'Y'){
            return false
        }else{
            if (sessionStartDateTime.isBefore() && sessionEndDateTime.isAfter()) {
                return true
            }
            return false
        }
    }
    
    static JoinSessionIfActive = (session, student) => {
        //First, check if this session is active

        console.debug("session", session)
        if(this.CheckIfSessionActive(session)){
        }else{
            window.alert("The session seems to no longer be live!")
        }
        
    }
    
    static GetSessionDetails = (sessionId, sapid, successCallback, failureCallback) => {
        if(TestDataHelper.CanCallApiIfTimeIsOutOfWindowOfHighLoad()){
            console.log("get session details")
        
        AxiosHandler.AxiosPostHandler(
            {
                url     : API.viewScheduledSessions + `?id=${sessionId}`,
                data    : {
                    'sapid' : sapid
                },
                successCallBack: (response) => {
                    console.debug("get session details success")
                    successCallback(response)
                },
                failureCallBack: (error) => {
                    console.debug("get session details failure")
                    failureCallback(error)
                }
            }
        )
    }else{
        console.log("Not getting session details")
        
    }

    }
}

export default SessionHelper