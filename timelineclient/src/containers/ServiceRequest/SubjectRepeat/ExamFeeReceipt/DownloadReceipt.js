import React, { Component } from 'react'
import { API } from '../../../../shared/config' 
import {connect} from 'react-redux';

import AxiosHandler from '../../../../shared/AxiosHandler/AxiosHandler'
import ErrorAndLoadingModal from '../../../../components/ErrorAndLoadingModal/ErrorAndLoadingModal';

class DownloadReceipt extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded : false,
            error  : false,
        }
    } 
    componentDidMount() {
        this.startDownload()
    }
    startDownload = () =>{
        this.setState({
            loaded : false
        }, 
        () => {
            AxiosHandler.AxiosPostHandler({
                url : API.printBookingStatus,
                data : {
                    sapid : this.props.sapid,
                },
                successCallBack : (response) => {
                    let data = response.data

                    if(data.status === "success" && data.downloadURL) {
                        window.open(data.downloadURL, "_blank")
                        this.props.hideDownloadModal()
                    } else {
                        
                        this.setState({
                            loaded : true,
                            error : true,
                            errorMessage : data.errorMessage ? data.errorMessage : 'Error Loading Download',
                        })
                    }
                },
                failureCallBack : (error) => {
                    this.setState({
                        loaded : true,
                        error : true,
                        errorMessage : 'Internal Server Error',
                    })
                },
            })
        })
    }
    

    hideErrorDialog = () => {
        if(this.state.loaded) {
            this.props.hideDownloadModal()
        }
    }

    render() {
        return (
            <ErrorAndLoadingModal
                show = { true }
                loaded = { this.state.loaded }
                loadingMessage = { 'Loading Receipt...' }
                error = { this.state.error }
                errorMessage = { this.state.errorMessage }
                onHide = { this.hideErrorDialog }
            />
        )
    }
}

const mapStateToProps = state => {
	return {
        sapid: state.sapid,
	}
}

export default connect(mapStateToProps)(DownloadReceipt)