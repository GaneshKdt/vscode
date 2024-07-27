import React from 'react'
import ConfigUrls, { API } from '../../config'
import AxiosHandler from '../../AxiosHandler/AxiosHandler'

const urls = new ConfigUrls().urls;

class TeeHelper { 

    static GetTeeDetails = (teeId,sapId, successCallback, failureCallback) => {
        AxiosHandler.AxiosPostHandler(
            {                
                // url     : `http://localhost:8080/exam/m/getTeeAssessmentsByExamScheduleId?id=${teeId}`,
                url     : urls.apiUrl_exam+`getTeeAssessmentsByExamScheduleId?id=${teeId}`,                
                data    : {
                    'sapid' : sapId
                },
                successCallBack: (response) => {
                    console.debug("get tee details success")
                    successCallback(response)
                },
                failureCallBack: (error) => {
                    console.debug("get tee details failure")
                    failureCallback(error)
                }
            }
        )
    }
}

export default TeeHelper