import React, { Component } from 'react'
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom'
import CustomForm from '../../components/Forms/Form'
import {Alert, Row, Container, Col, Card} from 'react-bootstrap'

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){

        this.setState({
            infoMessage: {
                heading: "Password Policy",
                body: (
                        <>
                            <hr/>
                            <p>Please adhere to the below password policy while you set your new password</p>
                            <ul class="policy">
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
                        value: this.state.sapiId,
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
                submitAction: "https://studentzone-ngasce.nmims.edu/studentportal/m/savePassword",
                formPostResponse: this.formPostResponse,
                formPostErrorResponse: this.formPostErrorResponse,
            },
        })
    }
    formPostResponse = (response) => {
        console.log(response.data)
        switch(response.data.Status){
            case 'success':
                this.setState({
                    successMessage: {
                        "heading": "Success",
                        body: response.data.Message,
                    },
                    errorMessage : null,
                })
                break;
            case 'error':
                this.setState({
                    successMessage : null,
                    errorMessage: {
                        heading: "Error",
                        body: response.data.Message,
                    }
                })
                break;
        }
        console.log(this.state.successMessage)
        console.log(this.state.errorMessage)
    }
    formPostErrorResponse = (error) => {
        console.log(error)
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
            <Container>
                    <Row style={{
                            'min-height': '100vh',
                            'display': 'flex',
                            'alignItems': 'center',
                        }}>
                        <Col style={{
                        }} className="mx-auto" md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }} xs={{ span: 12, offset: 0 }}>
                            <Card>
                                <Card.Body>
                                    {
                                        this.state.infoMessage ? (
                                            <Alert variant="info" onClose={this.dismissInfo} dismissible>
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
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
	return {
		sapId: state.sapid,
		data: state
	}
}

export default withRouter(connect(mapStateToProps)(ChangePassword))