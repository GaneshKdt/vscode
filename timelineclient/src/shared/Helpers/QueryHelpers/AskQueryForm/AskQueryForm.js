import React, { Component } from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

import LoadingSpinner from '../../../LoadingSpinner/LoadingSpinner'
import { API, AppConfig } from '../../../config'
import AxiosHandler from '../../../AxiosHandler/AxiosHandler'

import CustomForm from '../../../../components/Forms/Form';
import SuccessComponent from '../../../../components/SuccessComponent/SuccessComponent';

class AskQueryForm extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            submitted: false,
            loading: false,
            error: false
        }
    }

    componentDidMount() {
        
        // var facultySelectOptions = []

        // let facultySelectOption0 = {
        //     displayValue : "" ,
        //     value        : ""
        // }

        // facultySelectOptions.push(facultySelectOption0)

        // this.props.faculties.forEach((faculty) => {
        //     let facultySelectOption = {
        //         displayValue :  faculty.firstName + " " + faculty.lastName ,
        //         value        : faculty.facultyId
        //     }
        //     facultySelectOptions.push(facultySelectOption)
        // })

        var facultyName = ""
        var facultyId = ""

        this.props.faculties.forEach((faculty) => {
            facultyName = faculty.firstName + " " + faculty.lastName
            facultyId = faculty.facultyId
        })

        this.setState({
            formStructure: {
                formInputs: [
                    // {
                    //     name: 'faculty',
                    //     elementType: 'select',
                    //     label: 'Faculty',
                    //     elementConfig: {
                    //         type: 'select',
                    //         placeholder: 'Select Faculty',
                    //         options : facultySelectOptions
                    //     },
                    //     value: '',
                    //     required: true,
                    //     group: 1,
                    // },
                    {
                        name: 'faculty',
                        inputType: 'hidden',
                        value: facultyId,
                        required: true,
                        group: 1,
                    },
                    {
                        name: 'facultyName',
                        elementType: 'label',
                        label: 'Faculty',
                        elementConfig: {
                            elementType: 'label',
                            placeholder: 'Faculty Name',
                            readonly: true,
                        },
                        value: facultyName,
                        group: 1,
                    },
                    {
                        name: 'question',
                        elementType: 'textarea',
                        label: 'Question',
                        elementConfig: {
                            type: 'textarea',
                            placeholder: 'Query',
                            rows: 10,
                        },
                        value: '',
                        max : 600,
                        min : 0,
                        group: 1,
                        required: true,
                    },
                ],
                inputGroups: [
                    {
                        groupId: "1",
                        title: "",
                    }
                ],
                submitForm: this.postQueries,
                submitButtonProcessing: false,
            },
        })
    }

    
    getCurrentSubject = () => {
        if(this.props.applicableSubjects && this.props.currentTimeboundId){
            var applicableSubjects = this.props.applicableSubjects
            
            var subject = ""

            applicableSubjects.forEach((applicableSubject) => {
                console.debug("applicableSubject", applicableSubject)
                if(applicableSubject.timeBoundId == this.props.currentTimeboundId){
                    subject = applicableSubject.subject
                }
            })

            return subject
        }
    }

    changeSubmitButtonLoadingState = (val) => {

        var formStructure = this.state.formStructure
        formStructure.submitButtonProcessing = val

        this.setState({
            formStructure : formStructure,
        })
    }

    postQueries = (formInputs) => {
        this.changeSubmitButtonLoadingState(true)
        
        var formStructure = this.state.formStructure
        formStructure.formInputs = formInputs
        this.setState({
            loading : true,
            error : false,
            formStructure : formStructure,
        },
        () => {
            
            var faculty = ""
            var question = ""
            
            formInputs.forEach((input) => {
                if(input.name == "faculty"){
                    faculty = input.value
                }else if(input.name == "question"){
                    question = input.value
                }
            })
            AxiosHandler.AxiosPostHandler({
                url     :API.postQuery,
                data    :{
                    sapId : this.props.sapid,
                    timeBoundId : this.props.currentTimeboundId,
                    query : question,
                    assignedToFacultyId : faculty,
                    consumerProgramStructureId : this.props.consumerProgramStructureId,
                    subject : this.getCurrentSubject()
                 },                 
                successCallBack: this.submitQuerySuccessCallback,
                failureCallBack: this.submitQueryFailureCallback
            })
        })
    }

    submitQuerySuccessCallback = (response) => {
        this.changeSubmitButtonLoadingState(false)
        console.debug(response)
        if(response.data.status == "success"){
            this.setState({
                loading : false,
                error : false,
                submitted : true,
                messageToShow : response.data.message
            })
        }else{
            this.setState({
                loading : false,
                error : true,
                messageToShow : response.data.message
            })
        }
    }

    submitQueryFailureCallback = (error) => {
        
        this.changeSubmitButtonLoadingState(false)

        this.setState({
            loading : false,
            error : true,
            messageToShow : 'Error posting query! Please check your network and try again!'
        })
    }

    facultyChanged = (event, elementId) => {
        console.debug(event.target.value)
        this.setState({
            assignedFacultyId : event.target.value
        })
    }

    questionChanged = (event, elementId) => {
        console.debug(event.target.value)
        this.setState({
            query : event.target.value
        })
    }
    render() {
        return (
            <>
                {
                    this.state.loading ? (
                        <div className="text-center">
                            <LoadingSpinner noSpace/>
                        </div>
                    ) : (
                        <>
                            {
                                this.state.submitted && !this.state.error ? (
                                    <SuccessComponent message = { `Your query has been received successfully. It will be answered in ${AppConfig.QUERY_TAT} days.` } />
                                ) : null
                            }
                            {
                                this.state.error ? (
                                    <Alert variant="danger" onClose={this.dismissError} dismissible>
                                        { this.state.messageToShow }
                                    </Alert>
                                ) : null
                            }
                            {
                                !this.state.submitted ? (
                                    <CustomForm 
                                        {...this.state.formStructure} 
                                    />
                                ) : null
                            }
                        </>
                    )
                }
            </>
        )
    }
}

const mapStateToProps = state => {
	return {
		applicableFaculties: state.currentFaculties,
		applicableSubjects: state.applicableSubjects,
		sapid: state.sapid,
		currentTimeboundId: state.currentTimeboundId,
        consumerProgramStructureId : state.consumerProgramStructureId
	}
}

export default connect(mapStateToProps)(AskQueryForm)