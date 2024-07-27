import AxiosHandler from "../../../../shared/AxiosHandler/AxiosHandler"
import { API } from "../../../../shared/config"

class LoadExamBookingData {
    
    Initiate(sapid, setState, bookingType) {
        this.GetStudentFailSubjects(sapid, setState, bookingType)
    }
    
    GetStudentFailSubjects = (sapid, setState, bookingType) => {
        AxiosHandler.AxiosPostHandler({
            url : API.getExamBookingData,
            data : {
                sapid : sapid,
            },
            successCallBack : (response) => {
                let data = response.data.response
                if(response.data && response.data.status == "success") {
                    if(!data.canBook) {
                        setState({
                            loaded : true,
                            error : !data.canBook,
                            errorMessage : data.canNotBookReason ? data.canNotBookReason : '',
                        })
                    } else {
                        let subjectsAppliedFor = data.subjectsAppliedFor ? data.subjectsAppliedFor : []
                        let failedSubjects = data.failedSubjectsList ? data.failedSubjectsList : []
                        
                        var failedSubjectsWithType = failedSubjects.map(function(el) {
                            var o = el;
                            o.bookingType = bookingType;
                            return o;
                        })
                        this.GetAvailableCenters(setState, subjectsAppliedFor, failedSubjectsWithType)
                    }
                } else {
                    setState({
                        loaded : true,
                        error : true,
                        errorMessage : "Internal Server Error! Please try again!",
                    })
                }
            },
            failureCallBack : (error) => {
                setState({
                    loaded : true,
                    error : true,
                    errorMessage : "Error connecting to server!",
                })
            },
        })
    }

    GetAvailableCenters = (setState, subjectsAppliedFor, failedSubjects) => {
        AxiosHandler.AxiosGetHandler({
            url : API.getAllCenters,
            successCallBack : (response) => {
                let data = response.data
                if(data && data.status == "success" && data.response) {
                    // let centers = createStateAndCenterMap(data.response)
                    setState({
                        loaded : true,
                        error : false,
                        errorMessage : "",
                        allCenters : data.response,
                        subjectsAppliedFor : subjectsAppliedFor,
                        failedSubjects : failedSubjects,
                    })
                } else {
                    setState({
                        loaded : true,
                        error : true,
                        errorMessage : "Internal Server Error! Please try again!",
                    })
                }
            },
            failureCallBack : (error) => {
                setState({
                    loaded : true,
                    error : true,
                    errorMessage : "Error connecting to server!",
                })
            },
        })
    }
}
export default LoadExamBookingData