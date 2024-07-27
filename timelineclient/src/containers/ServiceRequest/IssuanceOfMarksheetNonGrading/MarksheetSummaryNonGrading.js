import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom' 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ConfigUrls from '../../../shared/config'
import {analyticsManager} from '../../../shared/Analytics'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../SelectSR/SelectSR.css';
import { Table } from 'react-bootstrap';


const urls = new ConfigUrls().urls;

class MarksheetSummaryNonGrading extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        summaryData : this.props.location.state.responseData,
        responseData : [],
        back : false,
        forward : false,
    }

    
    componentDidMount = () =>{
        //console.log("inside marksheet summary--***********"+JSON.stringify(this.props.location.state.responseData));
       
    }
    
    backToSR = () => {
        //console.log("back--");
        this.setState({
            back : true,
        })
    }

    confirmMarksheetRequest = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to proceed?',
            buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    axios.defaults.headers.post['Content-Type'] = false;
                    axios.post(urls.apiUrl_studentPortals + "/confirmMarksheetRequest",
                    this.state.summaryData
                    ).then(response =>{
                        //console.log("response dataaaaaa is :"+JSON.stringify(response));
                        this.setState({
                            responseData : response.data,
                            forward : true,
                        })
                    }).catch(function(error){
                        console.log(error);
                    })
                }
            },
            {
                label: 'No',
                onClick: () => {
                    //do nothing
                }
            }
            ]
        });
    }

   
   

    render(){
        return(

            <Card style={{maxWidth : "80%"}}>
                    <Card.Body>
                        <Card.Header>Marksheet Summary </Card.Header>
                        <Table striped hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Sr. No.</th>
                                            <th>Marksheet Details</th>
                                            <th>Charges</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.summaryData && this.state.summaryData.marksheetDetailAndAmountToBePaidList.map((data,index) => 
                                            <RowForMarksheetSummary id = {index} data={data} />
                                        )}
                                        <br/>
                                        <tr>
                                            <td></td>
                                            <td>
                                                Amount To Be Paid For Courier
                                            </td>
                                            <td>
                                                {this.state.summaryData.courierAmount}
                                            </td>
                                        </tr>
                                       
                                    </tbody>
                                </Table>
                    
                    </Card.Body>
                    <Card.Footer>
                        <Form.Group>
                            <div className="forButtons"> 
                                <Button variant="primary" id="submit" onClick={this.confirmMarksheetRequest}>Proceed</Button>
                                <Button variant="secondary" id="backToSR" onClick={this.backToSR}>Back to New Service Request</Button>
                            </div>
                        </Form.Group>
            
                        {this.state.back === true?
                            <Redirect  to='/timeline/selectSR' />
                        : null }
                        {this.state.forward === true?

                            <Redirect to={{pathname:'/timeline/marksheetRequestConfirmationNonGrading' ,state:{responseData : this.state.responseData}}}  />
                            
                        : null }
                        
                        
                    </Card.Footer>
                </Card>
         
        )
    }
}
const RowForMarksheetSummary = ({ id,data }) => (
    <>
    <tr >
        <td>
            {id + 1}
        </td>
        <td>
            {data.descriptionToBeShownInMarksheetSummary}
        </td>
        <td>
            {data.amountToBeDisplayedForMarksheetSummary}
        </td>
    </tr>
    </>
  );



export default analyticsManager(MarksheetSummaryNonGrading)
