import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConfigUrls from '../../../shared/config';
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler';
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner'

const getStudentidCard = new ConfigUrls().api.getStudentidCard;
const studentidcardURL =new ConfigUrls().api.studentidcardURL;

class IdCardDetails extends Component{
    
    constructor(props) {
        super(props);
      }

      state={
        sapid : this.props.sapid,
        data: {},
        loaded : true,
        error : false,
        errorMessage : "",
        idCardURL : ""
    }
    componentDidMount(){
        this.getIdCardDetails();
    }

    getIdCardDetails = () =>{
        AxiosHandler.AxiosPostHandler({
            url: getStudentidCard,
            data: {
              "sapid":this.props.sapid,
            },
            successCallBack: (response) => {
                this.setState({
                    data: response.data,
                    idCardURL: "https://studentprofiledocuments.s3.ap-south-1.amazonaws.com/digitalIdCard/"+response.data.fileName,
                    loaded: false,
                    error : false
                });
            },
            failureCallBack: (error) => {
                this.setState({
                loaded: false,
                error: true,
                errorMessage: "Error in Loading details!",
                });
            },
        });
    }

    render() {
        return (
            <div className="container">
                 <h6>My ID Card </h6><hr/>
                { 
                    this.state.error ? (
                            <h6 className="text-center"> <FontAwesomeIcon icon="exclamation-circle"/> Error in Fetching Details!</h6>
                     ):(
                    this.state.loaded ? (
                        <Card className="mx-auto text-center p-2">
                            { <LoadingSpinner noSpace loadingText={'Fetching available resources..'}/> }
                        </Card>
                    ) : (
                        <Card>
                            <Card.Body>
                               { this.state.data.status == 'success' ? (                   
                                <h6> View Id Card Here [ <a href={studentidcardURL} target="_blank">View</a> ]</h6>
                                ) : (
                                    <h6 className="text-center"><FontAwesomeIcon icon="exclamation-circle"/>{this.state.data.message}</h6> 
                                )
                                }

                            <br />
                            </Card.Body>
                        </Card>
                    )
                    )
                }
            </div>
        )
    }

}
    const mapStateToProps = state => {
        return {
            sapid: state.sapid
        }
    }
export default IdCardDetails