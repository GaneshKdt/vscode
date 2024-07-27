import React, { Component } from 'react'
import { Container, Row, Col, Button, Card, ButtonToolbar } from 'react-bootstrap'
import { Pages } from '../../shared/config';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { LinkContainer } from 'react-router-bootstrap'

const queryString = require('query-string')

class SRStatusFailure extends Component {
    constructor(props) {
        super(props)

        this.state = {
            errorMessage : '',
            trackId : '',
        }
    }
    componentDidMount() {
        let errorMessage = queryString.parse(this.props.location.search).errorMessage
        let trackId = queryString.parse(this.props.location.search).trackId
        
        this.setState({
            errorMessage: errorMessage ? errorMessage : '',
            trackId : trackId,
        })

    }
    viewOrderDetails = () => {
        this.props.history.push({
            pathname: Pages.examBookingOrderDetails,
            trackId : this.state.trackId
		}) 
    }
    goToBookingPage = () => {
        this.props.history.push({
			pathname: Pages.examBooking
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
                                        <Col md={"12"} className=" text-danger">
                                            <CancelOutlinedIcon style={{fontSize: '80px'}}/>
                                        </Col>
                                        <Col md={"12"} className="d-flex justify-content-center">
                                            <h4 className="my-auto">
                                                There was an error processing your payment.
                                                <br/>
                                                {this.state.errorMessage}
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
                                    </Row>
                                    <Row>
                                        <LinkContainer to={Pages.examBooking} className="mx-1">
                                            <Button variant="link" className="mx-1">
                                                Back
                                            </Button>
                                        </LinkContainer>
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
export default SRStatusFailure