import React, { Component } from 'react'
import ErrorAndLoadingWrapper from '../../../shared/Helpers/ErrorAndLoadingWrapper/ErrorAndLoadingWrapper'
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler'
import { API } from '../../../shared/config'
import ExamResultsTable from '../Common/ExamResultsTable'


class MarksHistory extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data : [], 
            loaded : false, 
            error : false, 
            errorMessage : false,  
        }
    }

    componentDidMount() {
        this.getStudentResults()
    }

    getStudentResults = () => {
        AxiosHandler.AxiosPostHandler({
            url : API.getMarksHistory,
            data : { sapid: this.props.sapid },
            successCallBack : (response) => {
                let data = response.data

                let status = data.status
                let errorMessage = data.errorMessage

                
                if(status === 'success'){
                    let historyMarks = data.data ? data.data : []
                    historyMarks.filter((result) => {
                        return result.teeScore !== 'Not Attempted'
                    })
                    this.setState({
                        loaded : true,
                        error : false,
                        data : historyMarks
                    })
                } else {
                    this.setState({
                        loaded : true,
                        error : true,
                        errorMessage : errorMessage,
                    })
                }
            },
            failureCallBack : (error) => {
                console.debug(error)
                this.setState({
                    loaded : true,
                    error : true,
                    errorMessage : "Error connecting to server!",
                })
            },
        })
    }

    render() {
        const { data, loaded, error, errorMessage } = this.state
        return (
            <ErrorAndLoadingWrapper
                loaded = { loaded }
                error = { error }
                loadingMessage = 'Loading...'
                errorMessage = { errorMessage } 
            >
                <ExamResultsTable
                    data = { data }
                    type = { 'history' }
                />
            </ErrorAndLoadingWrapper>
        )
    }
}

export default MarksHistory