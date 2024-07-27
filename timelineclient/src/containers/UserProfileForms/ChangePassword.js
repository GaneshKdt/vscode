import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom'
import CustomForm from '../../components/Forms/Form'
import {Alert} from 'react-bootstrap'
import axios from 'axios'
import { API } from '../../shared/config'
// import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner'
import { confirmAlert } from 'react-confirm-alert';
import {analyticsManager} from '../../shared/Analytics'

const changePasswordAPIUrl = API.changeUserPassword;
export class ChangePassword extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.setState({
            infoMessage: {
                heading: this.props.showFirstLoginMessage? (
                    <>
                        <p>
                            Please change your password before continuing.
                        </p>
                    </>
                ): "Password Policy",
                body: (
                        <>
                            <hr/>
                            <p>Please adhere to the below password policy while you set your new password</p>
                            <ul>
                                <li>Passwords cannot contain the user's account name or parts of the user's full name that exceed two consecutive characters or spaces.</li>
                                <li>Passwords must be eight characters in length.</li>
                                <li>Passwords must contain characters from the following categories: </li>
                                <li>English alphabet characters (A-Z/a-z)</li>
                                <li>Numbers (0-9)</li>
                                <li>Non-alphanumeric characters (for example, !$#%)</li>
                            </ul>
                        </>
                    ),
            },
            formStructure: {
                formInputs: [
                    {
                        name: 'userId',
                        inputType: 'hidden',
                        value: this.props.data.sapid,
                        // value: '77777777777',
                        required: true,
                        group: 1
                    },
                    {
                        name: 'oldPassword',
                        inputType: 'password',
                        label: 'Enter Old Password',
                        elementConfig: {
                            type: 'password',
                            placeholder: 'Enter Old Password'
                        },
                        value: '',
                        required: true,
                        group: 1
                    },
                    {
                        name: 'password',
                        inputType: 'password',
                        label: 'Enter New Password',
                        elementConfig: {
                            type: 'password',
                            placeholder: 'Enter New Password'
                        },
                        value: '',
                        group: 1,
                        required: true,
                        confirmKey: "password"
                    },
                    {
                        name: 'confPassword',
                        inputType: 'password',
                        label: 'Confirm New Password',
                        elementConfig: {
                            type: 'password',
                            placeholder: 'Confirm New Password'
                        },
                        value: '',
                        group: 1,
                        required: true,
                        confirmKey: "password"
                    },
                ],
                inputGroups: [
                    {
                        groupId: "1",
                        title: "Change Password",
                    }
                ],
                submitForm: this.submitForm,
                submitButtonProcessing: false,
            },
        })
    }
    submitForm = (formInputs) => {
        const formData = {};
        for (let inputElement in formInputs) {
            formData[formInputs[inputElement].name] = (formInputs[inputElement].value)
        }
        let formStructure = this.state.formStructure

        this.setState({
            formStructure: {
                formInputs: formInputs,
                submitForm: formStructure.submitForm,
                inputGroups: formStructure.inputGroups,
                submitButtonProcessing: true,
                submitButtonText: (
                    <>
                        Loading...
                    </>),
            }
        })

        axios.post( 
            changePasswordAPIUrl, 
            formData ).then( 
            response => {
                this.formPostResponse(response)
                this.setState({
                    formStructure: {
                        formInputs: formInputs,
                        submitForm: formStructure.submitForm,
                        inputGroups: formStructure.inputGroups,
                        submitButtonProcessing: false,
                        submitButtonText: "Submit",
                    }
                })
            }
        ).catch( 
            error => {
                this.formPostErrorResponse(error)
                this.setState({
                    formStructure: {
                        formInputs: formInputs,
                        submitForm: formStructure.submitForm,
                        inputGroups: formStructure.inputGroups,
                        submitButtonProcessing: false,
                        submitButtonText: "Submit",
                    }
                })
            }
        );
    }
    
    formPostResponse = (response) => {
        switch(response.data.Status){
            case 'success':
                this.setState({
                    successMessage: {
                        "heading": "Success",
                        body: response.data.Message,
                    },
                    errorMessage : null,
                    loading: false,
                })
                
                confirmAlert({
                    title: 'Password changed successfully!',
                    message: 'Please login again to continue.',
                    buttons: [
                        {
                            label: 'Continue',
                            onClick: () => {
                                this.props.history.push('/timeline/logout')
                            }
                        },
                    ]
                });
                break;
            case 'error':
                this.setState({
                    successMessage : null,
                    errorMessage: {
                        heading: "Error",
                        body: response.data.Message,
                    },
                    loading: false,
                })
                break;
        }
    }
    formPostErrorResponse = (error) => {
        
        this.setState({
            successMessage : null,
            errorMessage: {
                heading: "Error",
                body: "The server responded with error code : " + error.response.status,
                loading: false,
            }
        })
    }
    dismissError = () => {
        this.setState({
            errorMessage : null
        })
    }
    dismissSuccess = () => {
        this.setState({
            successMessage : null
        })
    }
    render() {
        return( 
                <>
                    {
                        this.state.infoMessage ? (
                            <Alert variant="info">
                                <Alert.Heading>
                                    {this.state.infoMessage.heading}
                                </Alert.Heading>
                                {this.state.infoMessage.body}
                            </Alert>
                        ) : null
                    }
                    {
                        this.state.successMessage ? (
                            <Alert variant="success" onClose={this.dismissSuccess} dismissible>
                                <Alert.Heading>
                                    {this.state.successMessage.heading}
                                </Alert.Heading>
                                {this.state.successMessage.body}
                            </Alert>
                        ) : null
                    }
                    {
                        this.state.errorMessage ? (
                            <Alert variant="danger" onClose={this.dismissError} dismissible>
                                <Alert.Heading>
                                    {this.state.errorMessage.heading}
                                </Alert.Heading>
                                {this.state.errorMessage.body}
                            </Alert>
                        ) : null
                    }
                    
                    <CustomForm 
                        {...this.state.formStructure}
                    />
            </>
        )
    }
}

const mapStateToProps = state => {
	return {
		sapId: state.sapid,
        data:state,
	}
}

export default connect(mapStateToProps)(analyticsManager(ChangePassword))