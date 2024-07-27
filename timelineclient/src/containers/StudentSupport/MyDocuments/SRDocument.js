import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {connect} from 'react-redux';
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'
import {analyticsManager} from '../../../shared/Analytics'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ConfigUrls from '../../../shared/config';
import AxiosHandler from '../../../shared/AxiosHandler/AxiosHandler';
import LoadingSpinner from '../../../shared/LoadingSpinner/LoadingSpinner'
import IdCardDetails from './IdCardDetails';

const getServiceRequestDocuments = new ConfigUrls().api.getServiceRequestDocuments;

class SRDocument extends Component{
    
    constructor(props) {
        super(props);
      }

      state={
        sapid : this.props.sapid,
        data: [],
        loaded : true,
        error : false,
        errorMessage : ""
    }
    componentDidMount(){
        this.getServiceRequestDocuments();
    }

    getServiceRequestDocuments = () =>{
        AxiosHandler.AxiosPostHandler({
            url: getServiceRequestDocuments,
            data: {
              "sapid":this.props.sapid,
            },
            successCallBack: (response) => {
            this.setState({
            data: response.data.serviceRequestBean,
            loaded: false,
            error : false
          });
           },
            failureCallBack: (error) => {
            this.setState({
            loaded: false,
            error: true,
            errorMessage: "Error in Loading  details!",
           });
          },
        });
    }

    render() {
        return (
            // <div className="container">
            //     { 
                    this.state.loaded ? (
                        <Card className="mx-auto text-center p-2">
                            { <LoadingSpinner noSpace loadingText={'Fetching available resources..'}/> }
                        </Card>
                    ) : (
                        <Card>
                            <Card.Body>                           
                                <h6>MY SR DOCUMENTS</h6>
                            <br />
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                        <th>Sr. No</th>
                                        <th>Sapid</th>
                                        <th>Service Reqest Type</th>
                                        <th>Download SR Documents</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { this.state.error == true ? (
                                        <tr>
                                        <td colSpan="6" className="text-center">
                                           <FontAwesomeIcon icon="exclamation-circle"/> Error in Fetching Details </td>
                                       </tr>
                                    ):  this.state.data.length < 1 ? ( 
                                            <tr>
                                              <td colSpan="6" className="text-center">
                                                 <FontAwesomeIcon icon="exclamation-circle"/> No Service Request Document available </td>
                                             </tr>
                                        ) : this.state.data.map((resource, index)=>{
                                                return(
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{resource.sapid}</td>
                                                    <td>
                                                        {resource.documentType === 'SR E-Bonafide' ? (
                                                            'Issuance of Bonafide'
                                                        )
                                                        : (
                                                            resource.documentType
                                                        )
                                                        }
                                                    </td>
                                                    <td> 
                                                    <Link target="_blank" to={{
                                                        pathname: resource.filePath}}> Download
                                                    </Link>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                    }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>   
                    ) 
            //     }
            // </div>
        )
    }

}
    const mapStateToProps = state => {
        return {
            sapid: state.sapid
        }
    }
export default SRDocument