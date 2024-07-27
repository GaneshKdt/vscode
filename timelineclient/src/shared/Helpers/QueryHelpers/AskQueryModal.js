import React, { Component } from 'react'
import { Modal, Card } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import { API, Pages } from '../../config'
import AxiosHandler from '../../AxiosHandler/AxiosHandler'
import AskQueryForm from './AskQueryForm/AskQueryForm';

class AskQueryModal extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            loadingFaculties : false,
            errorLoadingFaculties: false,
            faculties : [],
            showModal: true
        }
    }
    
    componentDidMount(){
        this.startLoading()
    }
    startLoading = () => {
        this.setState({
            loadingFaculties : true,
            errorLoadingFaculties: false,
        },
        () => {
            console.debug(this.props)
            AxiosHandler.AxiosPostHandler({
                url : API.facultyByTimeboundId,
                data :{
                    "timeBoundId" : this.props.currentTimeboundId,
                 },                 
                successCallBack: this.getFacultiesSuccessCallback,
                failureCallBack: this.getFacultiesFailureCallback
            })
        })
    }

    getFacultiesSuccessCallback = (response) => {
        if(this.state.showModal){
            this.setState({
                loadingFaculties : false,
                errorLoadingFaculties : false,
                faculties : response.data.faculties
            })
        }
    }

    getFacultiesFailureCallback = (error) => {
        this.setState({
            loadingFaculties : false,
            errorLoadingFaculties : true,
        })
    }

    setShow = (val) => {
        this.setState({
            showModal: val,
        },
        () => {
            this.props.onClose()
        })
    }

    render() {
        return (
            <Modal
                show={true}
                onHide={() => this.setShow(false)}
                onExit={() => this.setShow(false)}
                dialogClassName="modal-90w"
                centered
                size = 'lg'
            >
                <Modal.Header className="d-block" closeButton>
                    <h6 className="card-title mb-0 mt-0">Ask Faculty</h6>
                    <small className="card-subtitle">
                        Please raise academic queries only. 
                        For any technical assistance, please visit the 
                        <Link
                            to= { Pages.contactUs }
                        >&nbsp;support&nbsp;</Link>
                        section.
                    </small>
                </Modal.Header>
                <Modal.Body as={Card.Body}>
                    { 
                        this.state.loadingFaculties ? (
                            <div className="text-center">
                                <LoadingSpinner noSpace />
                            </div>
                        ) : (
                            <>
                                {
                                    this.state.errorLoadingFaculties ? (
                                        <ErrorComponent message = {'Error loading faculty list!'} />
                                    ) : (
                                        <AskQueryForm 
                                            faculties = {this.state.faculties}
                                        />
                                    )
                                }
                            </>
                        )
                    }
                </Modal.Body>
            </Modal>
        )
    }
}


const mapStateToProps = state => {
	return {
		applicableFaculties: state.currentFaculties,
		sapid: state.sapid,
		currentTimeboundId: state.currentTimeboundId,
	}
}

export default connect(mapStateToProps)(AskQueryModal)