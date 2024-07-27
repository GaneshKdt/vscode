import React, { Component } from 'react'

import Assessment from './Assessment/Assessment'
import './SubjectResult.css'
import ErrorAndLoadingWrapper from '../../../shared/Helpers/ErrorAndLoadingWrapper/ErrorAndLoadingWrapper'
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler'
import { API } from '../../../shared/config'
import { connect } from 'react-redux'

class SubjectResult extends Component {

    state = {
        tests: []
    }

    componentDidMount(){
        
        AxiosHandler.AxiosPostHandler({
            url : API.getAllAttemptedIAForSubject,
            data : {
                sapid: this.props.sapid,
                id : this.props.timeboundId,
            },
            successCallBack : (response) => {
                let data = response.data
                let status = data.status                
                if(status === 'success'){
                    if(data.tests && data.tests.length > 0) {
                        this.setState({
                            loaded : true,
                            error : false,
                            tests :  data.tests,
                        })
                    } else {
                        this.setState({
                            loaded : true,
                            error : true,
                            errorMessage : 'No Internal Assessments Available!',
                        })
                    }
                } else {
                    this.setState({
                        loaded : true,
                        error : true,
                        errorMessage : 'Error getting list of attempted Internal Assessments!',
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

    render(){
        return(
            <ErrorAndLoadingWrapper
                loaded = { this.state.loaded }
                error = { this.state.error }
                errorMessage = { this.state.errorMessage }
            >
                <div className="m-2 row">
                    {
                        this.state.tests.map(
                            (attemptedTest, index) => {
                                return (
                                    <Assessment 
                                        key={index} 
                                        attemptedTest={attemptedTest}
                                    />
                                )
                            }
                        )
                    }
                </div>
            </ErrorAndLoadingWrapper>
        )
    }
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid
	}
}
export default connect(mapStateToProps)(SubjectResult)