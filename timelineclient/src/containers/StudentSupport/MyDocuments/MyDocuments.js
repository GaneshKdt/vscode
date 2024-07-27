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
import SRDocument from './SRDocument';

const admissionFeeReceipt = new ConfigUrls().api.admissionFeeReceipt;

class MyDocuments extends Component{
    
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
        this.admissionFeeReceipt();
    }

    admissionFeeReceipt = () =>{
        AxiosHandler.AxiosPostHandler({
            url: admissionFeeReceipt,
            data: {
              "sapid":this.props.sapid,
            },
            successCallBack: (response) => {
            this.setState({
            data: response.data,
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
            <div className="container">
                { 
                    this.state.loaded ? (
                        <Card className="mx-auto text-center p-2">
                            { <LoadingSpinner noSpace loadingText={'Fetching available resources..'}/> }
                        </Card>
                    ) : (
                        <Card>
                            <Card.Body>                           
                                <h6>Admission Fee Receipt</h6>
                            <br />
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                        <th>Sr. No</th>
                                        <th>Month</th>
                                        <th>Year</th>
                                        <th>Semester</th>
                                        <th>Registered</th>
                                        <th>Download</th>
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
                                                 <FontAwesomeIcon icon="exclamation-circle"/> No Fee Receipt available </td>
                                             </tr>
                                        ) : this.state.data.map((resource, index)=>{
                                                return(
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{resource.acadMonth}</td>
                                                    <td>{parseInt(resource.acadYear, 10 )}</td>
                                                    <td>{resource.sem}</td>
                                                    <td>{resource.registered}</td>
                                                    <td> 
                                                    <Link target="_blank" to={{
                                                        pathname: "http://ngasce.force.com/StudentZoneFeeReceipt?StudentNo="+this.state.sapid+"&Sem="+resource.sem}}> Download
                                                    </Link>
                                                    </td>
                                                </tr>
                                                )
                                            })
                                    }
                                    </tbody>
                                </Table>
                                <IdCardDetails sapid={this.state.sapid}/>
                            </Card.Body>
                        </Card>   
                    ) 
                }
                <SRDocument sapid={this.state.sapid}/>
            </div>
        )
    }

}
    const mapStateToProps = state => {
        return {
            sapid: state.sapid
        }
    }
export default connect(mapStateToProps)(analyticsManager(MyDocuments))