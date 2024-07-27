import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler'
import { API, URL } from '../../../shared/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner'
import Alert from 'react-bootstrap/Alert';

class DownloadStudentSelfMarksheet extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded : false,
            loadingMessage : 'Preparing Marksheet.',
            error : false,
            errorMessage : 'Error connecting to Server',
            showDownloadModal : false
        }
    }

    generateMarksheet = () => {
        const sapid = this.props.sapid
        const acadsMonth = this.props.acadsMonth
        const acadsYear = this.props.acadsYear
        const examMonth = this.props.examMonth
        const examYear = this.props.examYear
        const term = this.props.term
        
        this.setState({
            loaded : false,
            error : false,
            showDownloadModal : true,
        },
        () => {
            AxiosHandler.AxiosPostHandler({
                url : API.studentSelfMarksheetForSem,
                data : {
                    sapid : sapid,
                    acadsMonth : acadsMonth,
                    acadsYear  : acadsYear,
                    examMonth : examMonth,
                    examYear  : examYear,
                    term  : term,
                },
                successCallBack : (response) => {
                    if( response.data && response.data.success && response.data.downloadPath.length > 0) {
                        this.setState({
                            loaded : true,
                            error : false,
                            showDownloadModal : false,
                        })
                        
                        //window.open(URL.baseUrl + response.data.downloadPath ,'_blank')
                        window.open(response.data.downloadPath ,'_blank')
                    }else{
                       
                        this.setState({
                            error : true,
                            showDownloadModal : false,
                            errorMessage : "Not able to generate gradesheet!."
                        })
                    }
                },
                failureCallBack : (error) => {
    
                }
            })
        })
    }

    render() {
        const { loaded, loadingMessage, error, errorMessage, showDownloadModal } = this.state
        return (
            <>
                <Button 
                    className = "py-0 my-0"
                    size = "sm" 
                    variant = "light"
                    onClick = { this.generateMarksheet }
                >
                    <FontAwesomeIcon icon="download" /> &nbsp;
                    <span>Download</span>
                </Button>   
                <Modal
                    size="lg"
                    show={ showDownloadModal }
                    centered
                >
                    <Modal.Body>
                        {
                            loaded ? (
                                error ? (
                                    <ErrorComponent message = { errorMessage } />
                                ) : 'Downloading....'
                            ) : (
                                <div className="text-center">
                                    <LoadingSpinner loadingText = { loadingMessage } noSpace />
                                </div>
                            )
                        }
                    </Modal.Body>

                </Modal>
                <div>
                {this.state.error? 
                        
                    <p style={{ fontSize: 10,color : 'red' }}>
                        {this.state.errorMessage}
                    </p>
              : null}
              </div>
            </>
        )
    }
}

export default DownloadStudentSelfMarksheet