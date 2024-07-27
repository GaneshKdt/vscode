import React from 'react'
import { Modal } from 'react-bootstrap'
import LoadingSpinner from '../../shared/LoadingSpinner/LoadingSpinner';
import ErrorComponent from '../ErrorComponent/ErrorComponent';

const ErrorAndLoadingModal = (props) => {
    return (
        <>
            <Modal 
                show = { props.show } 
                onHide = { props.onHide } 
                dialogClassName="download-hallticket-modal"
                centered
                scrollable
            >
                <Modal.Body>
                    {
                        !props.loaded ? (
                            <div className="text-center mx-auto">
                                <LoadingSpinner loadingText = { props.loadingMessage } noSpace />
                            </div>
                        ) : props.error ? (
                            <ErrorComponent message = { props.errorMessage } />
                        ) : props.successMessage ? 
                            props.successMessage
                        : null 
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ErrorAndLoadingModal