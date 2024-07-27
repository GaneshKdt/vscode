import React, { Component } from 'react';
import { Alert, Button, ButtonToolbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import PageContent from '../../../components/PageContent/PageContent';
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler';
import { API, Pages } from '../../../shared/config';
import SRDetails from './SRDetails';
import { withRouter } from 'react-router';


const queryString = require('query-string')

class SRStatusPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errorMessage : '',
            trackId : '',
        }
    }
    componentDidMount() {
        this.setState({
            loaded : false,
            error : false,
            errorMessage : '',
            trackId : this.props.trackId,
        },
        () => {
            this.fetchSRDetails()
        })
    }

    fetchSRDetails = () => {
        console.debug(this.props)
        AxiosHandler.AxiosPostHandler({
            url : API.findServiceRequest,
            data : {
                trackId : this.props.trackId,
                sapId : this.props.sapid,
            },
            successCallBack : (response) => {
                if(response.data) {
                    let data = response.data
                    if(data.error === "false") {
                        this.setState({
                            loaded : true,
                            error : false,
                            paymentResponse : data.paymentResponse,
                            response : data.response ? data.response : []
                        })
                    } else {
                        this.setState({
                            loaded : true,
                            error : true,
                            errorMessage : data.errorMessage ? data.errorMessage : 'Error Fetching data from server!'
                        })
                    }
                }
            },
            failureCallBack : (error) => {
                console.debug(error)
            }
        })
    }

    goToSRHome = () => {
        this.props.history.push({
			pathname: Pages.selectSR
		})
    }

    render() {
        const { loaded, error, errorMessage } = this.state
        return (
            <PageContent
                id="exam-booking"
                title = 'Service Request'
                subtitle = {this.state.paymentResponse}

                loaded = { loaded }
                error = { error }
                loadingMessage = 'Loading...'
                errorMessage = { errorMessage }
            >
                <Alert variant={this.props.paymentStatusType}> {this.state.paymentResponse} </Alert>
                <SRDetails srDetails = { this.state.response } />

                <ButtonToolbar className = "mt-2">
                    <Button
                        variant = "primary" 
                        className = "mx-1 mt-1 mb-1"
                        onClick = {this.goToSRHome}
                    >
                        Back To Service Request Home
                    </Button>
                </ButtonToolbar>
            </PageContent>
        )
    }
}

const mapStateToProps = state => {
	return {
		sapid: state.sapid
	}
}
export default connect(mapStateToProps)(withRouter(SRStatusPage))