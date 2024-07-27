import CloseIcon from '@material-ui/icons/Close'
import GetAppIcon from '@material-ui/icons/GetApp'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ErrorComponent from '../../../components/ErrorComponent/ErrorComponent'
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler'
import { API } from '../../../shared/config'
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner'
class DownloadStudentSelfMarksheet extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded : false,
            loadingMessage : 'Preparing Gradesheet.',
            error : false,
            errorMessage : 'Error connecting to Server',
            showDownloadModal : false
        }
    }

    generateGradesheet = () => {
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
                    if( response.data && response.data.success ) {
                        this.setState({
                            loaded : true,
                            error : false,
                            showDownloadModal : false,
                        })
                        
                        window.open(response.data.downloadPath ,'_blank')
                    }else{
                        this.setState({
                            loaded : true,
                            error  : true,
                            errorMessage : response.data.message
                        })
                    }
                },
                failureCallBack : (error) => {
    
                }
            })
        })
    }

    handleModalClose = () => {
        this.setState ({
            showDownloadModal : false
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
                    onClick = { this.generateGradesheet }
                >
                    {/* <FontAwesomeIcon icon="download" /> */}
                    <GetAppIcon/>
                     &nbsp;
                    <span>Download</span>
                </Button>   
                <Modal
                    size="lg"
                    show={ showDownloadModal }
                    centered
                >
                    <Button
                       className = "modalCloseBtn" 
                       size = "sm"
                       variant = "light"
                       onClick = {this.handleModalClose}
                    ><CloseIcon/></Button>                   
                    <Modal.Body >
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
            </>
        )
    }
}

export default DownloadStudentSelfMarksheet