import React, { Component } from 'react'
import { Container, Row, Col, Button, Card, ButtonToolbar } from 'react-bootstrap'
import { Pages } from '../../shared/config';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import { LinkContainer } from 'react-router-bootstrap'
import Form from 'react-bootstrap/Form'


const queryString = require('query-string')

class SRStatusSuccess extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errorMessage : '',
            trackId : '',
            id : '',
            description: ''
        }
    }
    componentDidMount() {
        let trackId = queryString.parse(this.props.location.search).trackId
        let id = queryString.parse(this.props.location.search).id
        let error = queryString.parse(this.props.location.search).error
        let reqType = queryString.parse(this.props.location.search).reqType
        let description = queryString.parse(this.props.location.search).description

        this.setState({
            trackId : trackId,
            id : id,
            error: false,
            reqType: reqType,
            description: description,
            
            
        })

    }
    viewOrderDetails = () => {
        this.props.history.push({
            pathname: Pages.examBookingOrderDetails,
            trackId : this.state.trackId
		}) 
    }
    render() {
        return (
            <Container id="exam-booking">
                <Row>
                    <Col xl={10}>
                        <Card>
                            <Card.Body>
                                <h5 className="card-title"> Service Request </h5>
                                <hr/>
                                <Container>
                                    <Row className="mx-auto text-center justify-content-center">
                                        <Col md={"12"} className=" text-success">
                                            <CheckCircleOutlineOutlinedIcon style={{fontSize: '80px'}}/>
                                        </Col>
                                        <Col md={"12"} className="d-flex justify-content-center">
                                            <h4 className="my-auto">
                                                Service Request Raised Successfully.
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row className="mt-2 text-center justify-content-center">
                                        <Col className=" mx-auto">
                                            {/* <hr/> */}
                                            <h6 className="card-title">
                                                Transaction Id : 
                                                &nbsp;<span style={{fontSize : 'smaller'}}>
                                                    { this.state.trackId }
                                                </span>
                                            </h6>
                                        </Col>
                                        {/* {`Your seats are booked. Hall ticket will be available for download shortly. 
                                        Please click <a href=\"selectSubjectsForm\"> here </a> to verify subjects pending to be booked.`} */}
                                    </Row>
                                    <Card style={{maxWidth : "80%"}}>
                    <Card.Header className="cardHeader">Service Request Summary </Card.Header>
                    {/* <Card.Text>Dear Student, You have chosen below Service Request. Please fill in required information below before proceeding for Payment. </Card.Text> */}
                    <Card.Body>
                    <Row>
                        <Col>
                            <Form className="forFormInSR"> 

                                    { this.state.error ?
                                    <Form.Row as={Row}>
                                        <p>{this.state.error}</p>
                                    </Form.Row>
                                    :  
                                    <>
                                        <Form.Group as={Row}>
                                            <Form.Row>
                                                Service Request Type  : &nbsp;&nbsp;  { this.state.reqType ?
                                                            <p>{this.state.reqType} created successfully. </p>
                                                    : null
                                                    }
                                            </Form.Row>
                                        </Form.Group>
                                        <Form.Group as={Row}>
                                            <Form.Row>
                                                Service Request Description: &nbsp;&nbsp; { this.state.description ?
                                                    <p>{this.state.description}</p>
                                                    : null
                                                }
                                            </Form.Row>
                                            { this.state.error ?
                                            <Form.Row as={Row}>
                                                    <p>{this.state.error}</p>
                                            </Form.Row>
                                            : null}
                                        </Form.Group>
                                        <Form.Group as={Row} controlId="dob">
                                            <Form.Row>
                                                <p>Please quote Service request number
                                                { this.state.id ?
                                                    <b>   {this.state.id}  </b>
                                                    : null
                                                }
                                                for any future communications with Institute.</p>
                                            </Form.Row>
                                        </Form.Group>
                                    </>
                                    }
                               
                            </Form>
                            
                        </Col>
                    </Row>
                    </Card.Body>
                </Card>                                    <Row>
                                        <div className="mx-auto d-flex align-items-center mt-4">
                                            <ButtonToolbar>
                                                {/* {
                                                    this.state.trackId ? (
                                                        <Button variant="info" onClick = { this.viewOrderDetails } >
                                                            Order Details
                                                        </Button>
                                                    ) : null
                                                } */}
                                                <LinkContainer to='/timeline/serviceRequest' className="mx-1">
                                                    <Button variant="primary" className="mx-1">
                                                        Service Request Home
                                                    </Button>
                                                </LinkContainer>
                                            </ButtonToolbar>
                                        </div>
                                    </Row>


                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default SRStatusSuccess