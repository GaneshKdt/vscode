import React, { Component } from 'react';
import './Specialisation.css'
import { Container, ListGroup, Card, Row, Col, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';
import ConfigUrls from '../../../src/shared/config';
import { connect } from 'react-redux';

import GoToGatewayForm from '../../../src/containers/ServiceRequest/GoToGatewayForm/GotToGatewayForm'
import PaymentOptions from '../../../src/containers/ServiceRequest/GoToGatewayForm/PaymentOptions'
import Alert from 'react-bootstrap/Alert'

const urls = new ConfigUrls().urls;
const CHANGE_IN_SPECIALISATION = "Change in Specialisation"

class ElectiveSRPaymentConfirmation extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        charges: null,
        studentdetails: [],
        isRequestFree: false,
        error: "",
        errors: {},
        trackId: "",
        amount: 0,
        showLoader: false,
        payment_url: null,
        proceed_to_payment: false,
        paymentOptionName: null,
        serviceRequestId: null,
        show_payment_options: false,
        selectedPaymentProvider: null,
        datafetched: false,
        productType: "MBAWX"
    }

    saveElectiveSRWithPayment = (selectedPaymentProvider) => {

        this.setState({
            show_payment_options: false,
            selectedPaymentProvider: selectedPaymentProvider,
            submitPayment: true,
            paymentOptionName: selectedPaymentProvider.name

        }, () => {

            confirmAlert({
                title: 'Confirm to submit',
                message: 'Are you sure you want to submit this Service Request?',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {
                            this.checkIfApplicableToRaiseSR()
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
        })
    }

    checkIfApplicableToRaiseSR = () => {

        let apiToCall = `${urls.apiUrl_web_studentPortal}/CheckServiceRequestCount?sapId=${this.props.sapid}&requestType=${CHANGE_IN_SPECIALISATION}&isFreeRequest=${parseInt(this.state.charges) === 0 ? "true" : "false"}`;
        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(apiToCall).then(response => {

            this.setState({
                responseDataForRequestCount: response.data,
            })
            
            if (this.state.responseDataForRequestCount.status === "200" && this.state.responseDataForRequestCount.result === "Applicable for service request") {
                this.raiseChangeInSpecializationRequest();
            } else {
                this.setState({
                    error: this.state.responseDataForRequestCount.result,
                })
            }

        }).catch(function (error) {
            console.log(error);
        })
    }

    raiseChangeInSpecializationRequest = () => {

        axios.defaults.headers.post['Content-Type'] = false;
        axios.post(urls.apiUrl_studentPortals + "saveChangeInSpecializationRequest",
            {
                sapId: this.props.sapid,
                serviceRequestType: CHANGE_IN_SPECIALISATION,
                amount: this.state.studentdetails.amount,
                productType: this.state.productType,
                paymentOption: this.state.paymentOptionName
            }
        ).then(response => {

            this.setState({
                proceed_to_payment: true,
                serviceRequestId: response.data.id,
                payment_url: urls.apiUrl_studentPortals + response.data.paymentUrl,
                responseData: response.data
            }, () => {
                this.submitPaymentForm()
            })

        }).catch(error => {
            console.log(error);
            this.setState({
                error: error,
            })
        })

    }

    submitPaymentForm() {

        window.$("#submit-payment").submit()

    }

    selectPaymentOption = () => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to raise Change in Specialisation Request?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {

                        this.setState({
                            show_payment_options: true
                        }, () => {

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

    getStudentElectiveDetailsForSR = () => {

        let data = {
            sapid: this.props.sapid
        }

        axios.defaults.headers.post['Content-Type'] = "application/json";
        return axios.post(urls.apiUrl_exam + "getStudentElectiveDetailsForSR", JSON.stringify(data)
        ).then(response => {

            this.setState({
                studentdetails: response.data,
                charges: response.data.amount
            })

        }).catch(error => {
            console.log(error);
            this.setState({
                error: "Error in saving Service Request.",
            })
        })

    }

    componentDidMount() {

        this.getStudentElectiveDetailsForSR().then(response => {

            this.setState({
                datafetched: true
            })

        })


    }

    render() {
        
        return this.state.datafetched ? (
            <Card>
                <Card.Header><h4>Change in Specialization</h4></Card.Header>
                <Card.Body>
                    <h5>Important</h5>
                    <div>

                        You have already raised a SR for change in specialisation on <b>{this.state.studentdetails.createdDate}</b>,
                        switching to <b>{this.state.studentdetails.specializationType}</b> in <b>{this.state.studentdetails.specialization}</b>,
                        if you want to change SR for specialization chagne again, it will be payable with amount <b>{this.state.studentdetails.amount}</b>

                    </div>

                    <hr />

                    <Form.Group as={Row} className="fs-16">
                        <Form.Label column sm={12}> <b>Specialisation Type: {this.state.studentdetails.specializationType} </b> </Form.Label>
                    </Form.Group>

                    <Form.Group as={Row} className="fs-16">
                        <Form.Label column sm={12}> <b>Specialisation In: {this.state.studentdetails.specialization}</b> </Form.Label>
                    </Form.Group>
                    <br />

                    {
                        this.state.error ?
                            <Alert variant="danger">
                                Error : {this.state.error}
                            </Alert>
                            : null
                    }

                    {
                        this.state.show_payment_options === true ?
                            <PaymentOptions

                                setPaymentProvider={this.saveElectiveSRWithPayment}

                            />
                            : null
                    }
                    
                    <GoToGatewayForm
                        sapId={this.props.sapid}
                        paymentOptionName={this.state.paymentOptionName}
                        serviceRequestId={this.state.serviceRequestId}
                        payment_url={this.state.payment_url}
                        productType={this.state.productType}

                    />

                    <Form.Group>
                        <Button variant="primary" id="submit" onClick={this.selectPaymentOption}>Save & Proceed to Payment</Button>
                        <Button variant="secondary" id="back" onClick={this.back}>Back</Button>
                    </Form.Group>

                </Card.Body>

            </Card>
        ) : null;
    }


}

const mapStateToProps = state => {
    return {
        sapid: state.sapid
    }
}

export default connect(mapStateToProps)(ElectiveSRPaymentConfirmation)