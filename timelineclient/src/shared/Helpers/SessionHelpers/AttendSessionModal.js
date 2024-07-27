import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import { API } from '../../config'
import AxiosHandler from '../../AxiosHandler/AxiosHandler'

class AttendSessionModal extends Component{
    
    componentWillMount() {
        this.startLoading()
    }

    startLoading = () => {
        this.setState({
            loading     : true,
            showModal   : true,
        },
        () => {
            AxiosHandler.AxiosPostHandler({
                url     :API.attendScheduledSession,
                data    :{
                    "sapId"     : this.props.student.sapid,
                    "forMobile" : false ,
                    "id"        : this.props.session.id,
                    "email"     : this.props.student.emailId,
                    "mobile"    : this.props.student.mobile,
                    "firstName" : this.props.student.firstName,
                    "lastName"  : this.props.student.lastName
                },
                successCallBack: this.GetAttendLinkSuccessCallback,
                failureCallBack: this.GetAttendLinkFailureCallBack
            })
        })
    }

    GetAttendLinkSuccessCallback = (response) => {
        if(this.state.showModal){
            this.setState({
                loaded   : true,
                error    : false,
                showModal: false,
            })
            window.open(response.data.join_url, "_blank")
            this.props.onClose()
        }
    }

    GetAttendLinkFailureCallBack = (error) => {
        console.error("error joining zoom live session", error)
        this.setState({
            loaded  : true,
            error   : true,
        })
    }

    setShow = () => {
        this.setState({
            showModal: false,
        },
        () => {
            this.props.onClose()
        }
        )
    }
    render() {
        return (
            <Modal
                show={this.state.showModal}
                onHide={() => this.setShow(false)}
                onExit={() => this.setShow(false)}
                dialogClassName="modal-90w"
                centered
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body className="text-center">
                    {
                        this.state.loading ? (
                            <LoadingSpinner noSpace loadingText = {'Getting Zoom Link...'} />
                        ) : (
                            <>
                                {
                                    this.state.error ? (
                                        <ErrorComponent message = {'Error!'} />
                                    ) : null
                                }
                            </>
                        )
                    }
                </Modal.Body>
            </Modal>
        )
    }
}

export default AttendSessionModal